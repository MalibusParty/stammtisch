package tech.felixruf.stammtisch.service;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import tech.felixruf.stammtisch.enums.DrinkType;
import tech.felixruf.stammtisch.model.Drink;
import tech.felixruf.stammtisch.model.DrinkTransaction;
import tech.felixruf.stammtisch.model.User;
import tech.felixruf.stammtisch.repository.DrinkRepository;
import tech.felixruf.stammtisch.repository.DrinkTransactionRepository;
import java.util.List;
import java.util.LinkedList;

@Service
@Transactional
public class DrinkService {
    
    private final DrinkRepository drinkRepository;
    private final DrinkTransactionRepository drinkTransactionRepository;

    public DrinkService(DrinkRepository drinkRepository, DrinkTransactionRepository drinkTransactionRepository) {
        this.drinkRepository = drinkRepository;
        this.drinkTransactionRepository = drinkTransactionRepository;
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
}
