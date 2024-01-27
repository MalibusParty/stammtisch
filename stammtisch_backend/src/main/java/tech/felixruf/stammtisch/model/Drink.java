package tech.felixruf.stammtisch.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tech.felixruf.stammtisch.enums.DrinkType;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Drink {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    private long id;

    @Version
    private long version;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private DrinkType drinkType;

    @Getter
    @Setter
    private int volume;     // in milliliters
}
