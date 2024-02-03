package tech.felixruf.stammtisch.service;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import tech.felixruf.stammtisch.dto.DrinkTransactionDTO;
import tech.felixruf.stammtisch.enums.DrinkType;
import tech.felixruf.stammtisch.model.Drink;
import tech.felixruf.stammtisch.model.DrinkTransaction;
import tech.felixruf.stammtisch.model.User;
import tech.felixruf.stammtisch.repository.DrinkRepository;
import tech.felixruf.stammtisch.repository.DrinkTransactionRepository;
import tech.felixruf.stammtisch.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.util.LinkedList;

@Service
@Transactional
public class DrinkService {
    
    private final DrinkRepository drinkRepository;
    private final DrinkTransactionRepository drinkTransactionRepository;
    private final UserRepository userRepository;

    public DrinkService(DrinkRepository drinkRepository, DrinkTransactionRepository drinkTransactionRepository, UserRepository userRepository) {
        this.drinkRepository = drinkRepository;
        this.drinkTransactionRepository = drinkTransactionRepository;
        this.userRepository = userRepository;
    }

    public List<Drink> getAllDrinks() {
        return drinkRepository.findAll();
    }

    public Drink addDrink(DrinkType type, int volume) {
        Drink drink = Drink.builder()
            .drinkType(type)
            .volume(volume)
            .build();
        return drinkRepository.save(drink);
    }
    
    public List<DrinkTransaction> getAllTransactionsOfUser(User user) {
        return drinkTransactionRepository.findAllByUser(user).orElse(new LinkedList<>());
    }
    
    public List<DrinkTransaction> getAllTransactions() {
        return drinkTransactionRepository.findAll();
    }

    public boolean addAllDrinkTransactions(List<DrinkTransactionDTO> drinkTransactions) throws NullPointerException {
        Optional<User> optionalUser = userRepository.findByUsername(drinkTransactions.getFirst().username());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<DrinkTransaction> transactions = new LinkedList<>();
            for (DrinkTransactionDTO drinkTransactionDTO : drinkTransactions) {
                Optional<Drink> optionalDrink = drinkRepository.findById(drinkTransactionDTO.drink_id());
                if (optionalDrink.isPresent()) {
                    transactions.add(createDrinkTransaction(optionalDrink.get(), user, drinkTransactionDTO.count(), drinkTransactionDTO.timestamp()));
                }
            }
            return true;
        }

        return false;
    }

    private DrinkTransaction createDrinkTransaction(Drink drink, User user, int count, LocalDate localDate) {
        return DrinkTransaction.builder()
            .user(user)
            .drink(drink)
            .count(count)
            .timeStamp(localDate)
            .build();
    }
}
