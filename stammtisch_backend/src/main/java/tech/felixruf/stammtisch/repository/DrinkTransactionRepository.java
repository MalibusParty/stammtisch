package tech.felixruf.stammtisch.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tech.felixruf.stammtisch.model.DrinkTransaction;
import tech.felixruf.stammtisch.model.User;

import java.util.Optional;
import java.util.List;

public interface DrinkTransactionRepository extends JpaRepository<DrinkTransaction, Long> {
    
    Optional<List<DrinkTransaction>> findAllByUser(User user);
}
