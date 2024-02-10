package tech.felixruf.stammtisch.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import tech.felixruf.stammtisch.dto.UserNameMapDTO;
import tech.felixruf.stammtisch.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserNameMapDTO>> getUsers() {
        return ResponseEntity.ok(userService.getUserList());
    }
}
