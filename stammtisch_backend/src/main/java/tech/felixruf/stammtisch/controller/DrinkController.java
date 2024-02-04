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
import tech.felixruf.stammtisch.service.StompInfoService;


@RestController
@RequestMapping("/api/drink")
public class DrinkController {

    Logger logger = LoggerFactory.getLogger(DrinkController.class);

    private final DrinkService drinkService;
    private final StompInfoService stompInfoService;

    public DrinkController(DrinkService drinkService, StompInfoService stompInfoService) {
        this.drinkService = drinkService;
        this.stompInfoService = stompInfoService;
    }

    @GetMapping
    public ResponseEntity<List<DrinkDTO>> getDrinks() {
        return ResponseEntity.ok(drinkService.getAllDrinks().stream().map(DrinkDTO::from).toList());
    }

    @PostMapping
    public ResponseEntity<Boolean> postAddDrink(@RequestBody DrinkDTO drinkDTO) {
        Drink drink = drinkService.addDrink(drinkDTO.drinkType(), drinkDTO.volume());
        logger.info("Added new drink: {} {}ml", drink.getDrinkType(), drink.getVolume());
        stompInfoService.sendInfo("drinks", DrinkDTO.from(drink));
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
        try {
            boolean result = drinkService.addAllDrinkTransactions(drinkTransactions);
            stompInfoService.sendInfo("transactions", drinkTransactions);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(false);
        }
    }
}
