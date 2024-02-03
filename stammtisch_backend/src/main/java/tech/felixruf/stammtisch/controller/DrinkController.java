package tech.felixruf.stammtisch.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import tech.felixruf.stammtisch.dto.DrinkDTO;
import tech.felixruf.stammtisch.dto.DrinkTransactionDTO;
import tech.felixruf.stammtisch.model.Drink;
import tech.felixruf.stammtisch.service.DrinkService;


@RestController
@RequestMapping("/api/drink")
public class DrinkController {

    Logger logger = LoggerFactory.getLogger(DrinkController.class);

    public final DrinkService drinkService;

    public DrinkController(DrinkService drinkService) {
        this.drinkService = drinkService;
    }

    @GetMapping
    public ResponseEntity<List<DrinkDTO>> getDrinks() {
        return ResponseEntity.ok(drinkService.getAllDrinks().stream().map(DrinkDTO::from).toList());
    }

    @PostMapping
    public ResponseEntity<Boolean> postAddDrink(@RequestBody DrinkDTO drinkDTO) {
        Drink drink = drinkService.addDrink(drinkDTO.drinkType(), drinkDTO.volume());
        logger.info("Added new drink: {} {}ml", drink.getDrinkType(), drink.getVolume());
        return ResponseEntity.ok(true);
    }

    @GetMapping("/transactions/all")
    public ResponseEntity<List<DrinkTransactionDTO>> getAllTransactions() {
        return ResponseEntity.ok(drinkService.getAllTransactions().stream().map(transaction -> DrinkTransactionDTO.from(transaction)).toList());
    }

    // @GetMapping("/transactions/{year}")
    // public ResponseEntity<List<DrinkTransactionDTO>> getTransactionsForYear() {
    //     return new SomeData();
    // }
    
    @PostMapping("/transactions/all")
    public ResponseEntity<Boolean> postDrinkTransaction(@RequestBody List<DrinkTransactionDTO> drinkTransactions) {
        for (DrinkTransactionDTO transactionDTO : drinkTransactions) {
            logger.info("id: {}, count: {}, user: {}, date: {}",
                transactionDTO.drink_id(),
                transactionDTO.count(),
                transactionDTO.username(),
                transactionDTO.timestamp()
            );
        }
        try {
            boolean result = drinkService.addAllDrinkTransactions(drinkTransactions);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(false);
        }
    }
}
