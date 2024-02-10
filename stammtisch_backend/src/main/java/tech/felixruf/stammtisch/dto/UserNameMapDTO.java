package tech.felixruf.stammtisch.dto;

import tech.felixruf.stammtisch.model.User;

public record UserNameMapDTO(
    String username,
    String fullname
) {
    public static UserNameMapDTO from(User user) {
        return new UserNameMapDTO(user.getUsername(), user.getFullname());
    }
}
