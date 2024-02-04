package tech.felixruf.stammtisch.dto;

public record StompMessage(String topicName, String jsonString) {
}
