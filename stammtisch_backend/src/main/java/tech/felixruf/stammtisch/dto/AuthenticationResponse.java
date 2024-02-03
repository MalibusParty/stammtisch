package tech.felixruf.stammtisch.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tech.felixruf.stammtisch.enums.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String username;
    private String firstname;
    private String lastname;
    private String token;
    private Role role;
}

