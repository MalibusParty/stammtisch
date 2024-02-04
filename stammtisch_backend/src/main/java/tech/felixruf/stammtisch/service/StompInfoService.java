package tech.felixruf.stammtisch.service;

public interface StompInfoService {
    public void sendInfo(String topicName, Object objToSend);
}