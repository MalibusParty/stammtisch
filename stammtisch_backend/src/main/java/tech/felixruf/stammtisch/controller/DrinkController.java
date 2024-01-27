package tech.felixruf.stammtisch.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import tech.felixruf.stammtisch.dto.DrinkDTO;
import tech.felixruf.stammtisch.model.Drink;
import tech.felixruf.stammtisch.service.DrinkService;

@RestController
@RequestMapping("/api/drink")
public class DrinkController {
    
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
        drinkService.addDrink(drinkDTO.drinkType(), drinkDTO.volume());
        return ResponseEntity.ok(true);
    }
}
