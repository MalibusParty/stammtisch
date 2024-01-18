package tech.felixruf.stammtisch.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tech.felixruf.stammtisch.dto.AuthenticationRequest;
import tech.felixruf.stammtisch.dto.AuthenticationResponse;
import tech.felixruf.stammtisch.dto.RegisterRequest;
import tech.felixruf.stammtisch.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody RegisterRequest request) {
        logger.info("Register request: {} {}", request.getFirstname(), request.getLastname());
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        logger.info("Login request: {}", request.getUsername());
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
    
}
