package tech.felixruf.stammtisch.dto;

import tech.felixruf.stammtisch.enums.DrinkType;
import tech.felixruf.stammtisch.model.Drink;

public record DrinkDTO(
    long drink_id,
    DrinkType drinkType,
    int volume              // in milliliters
) {
    public static DrinkDTO from(Drink drink) {
        return new DrinkDTO(drink.getId(), drink.getDrinkType(), drink.getVolume());
    }
}
