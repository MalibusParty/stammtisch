package tech.felixruf.stammtisch.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import tech.felixruf.stammtisch.adapter.LocalDateAdapter;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class StompInfoServiceImpl implements StompInfoService {
    @Autowired
    private SimpMessagingTemplate messaging;
    private static final Gson gson = new GsonBuilder()
        .registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
        .create();

    @Override
    public void sendInfo(String topicName, Object objToSend) {
        String destName = "/topic/" + topicName;
        messaging.convertAndSend(destName, gson.toJson(objToSend));
    }
}
