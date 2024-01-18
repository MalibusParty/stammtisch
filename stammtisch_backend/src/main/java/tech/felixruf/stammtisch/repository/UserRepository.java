package tech.felixruf.stammtisch.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tech.felixruf.stammtisch.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}
