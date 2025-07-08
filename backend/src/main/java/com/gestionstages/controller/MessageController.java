package com.gestionstages.controller;

import com.gestionstages.entity.Message;
import com.gestionstages.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@Controller
public class MessageController {
    
    @Autowired
    private MessageService messageService;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload Map<String, Object> messageData, Authentication auth) {
        Long receiverId = Long.valueOf(messageData.get("receiverId").toString());
        String content = messageData.get("content").toString();
        
        Message message = messageService.sendMessage(auth.getName(), receiverId, content);
        
        // Envoyer le message au destinataire
        messagingTemplate.convertAndSendToUser(
            receiverId.toString(), 
            "/queue/messages", 
            message
        );
    }
    
    @GetMapping("/api/messages/conversation/{userId}")
    @ResponseBody
    public List<Message> getConversation(@PathVariable Long userId, Authentication auth) {
        return messageService.getConversation(auth.getName(), userId);
    }
    
    @PostMapping("/api/messages/{messageId}/read")
    @ResponseBody
    public void markAsRead(@PathVariable Long messageId, Authentication auth) {
        messageService.markAsRead(messageId, auth.getName());
    }
}