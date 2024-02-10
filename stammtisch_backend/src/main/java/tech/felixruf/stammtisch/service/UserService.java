package tech.felixruf.stammtisch.service;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import tech.felixruf.stammtisch.dto.UserNameMapDTO;
import tech.felixruf.stammtisch.repository.UserRepository;
import java.util.List;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserNameMapDTO> getUserList() {
        return userRepository.findAll().stream().map(UserNameMapDTO::from).toList();
    }
}
