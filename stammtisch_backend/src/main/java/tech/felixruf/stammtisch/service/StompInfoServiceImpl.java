package tech.felixruf.stammtisch.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class StompInfoServiceImpl implements StompInfoService {
    @Autowired
    private SimpMessagingTemplate messaging;

    @Override
    public void sendInfo(String topicName, Object objToSend) {
        String destName = "/topic/" + topicName;
        Gson gson = new GsonBuilder().create();
        messaging.convertAndSend(destName, gson.toJson(objToSend));
    }
}
