package tech.felixruf.stammtisch.dto;

import java.time.LocalDate;

import tech.felixruf.stammtisch.model.DrinkTransaction;

public record DrinkTransactionDTO(
    long drink_id,
    int count,
    String username,
    LocalDate timestamp
) {
    public static DrinkTransactionDTO from(DrinkTransaction transaction) {
        return new DrinkTransactionDTO(
            transaction.getDrink().getId(),
            transaction.getCount(),
            transaction.getUser().getUsername(),
            transaction.getTimeStamp()
        );
    }
}
