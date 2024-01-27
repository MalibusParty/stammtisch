package tech.felixruf.stammtisch.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tech.felixruf.stammtisch.enums.DrinkType;
import tech.felixruf.stammtisch.model.Drink;

import java.util.Optional;

public interface DrinkRepository extends JpaRepository<Drink, Long> {
    
    Optional<Drink> findByDrinkType(DrinkType drinkType);
}
