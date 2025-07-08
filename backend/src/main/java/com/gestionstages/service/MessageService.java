package com.gestionstages.service;

import com.gestionstages.entity.Message;
import com.gestionstages.entity.User;
import com.gestionstages.repository.MessageRepository;
import com.gestionstages.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MessageService {
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Message sendMessage(String senderEmail, Long receiverId, String content) {
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new RuntimeException("Expéditeur non trouvé"));
        
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Destinataire non trouvé"));
        
        Message message = new Message(sender, receiver, content);
        return messageRepository.save(message);
    }
    
    public List<Message> getConversation(String userEmail, Long otherUserId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        return messageRepository.findConversation(user.getId(), otherUserId);
    }
    
    public void markAsRead(Long messageId, String userEmail) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message non trouvé"));
        
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        if (message.getReceiver().getId().equals(user.getId())) {
            message.setIsRead(true);
            messageRepository.save(message);
        }
    }
    
    public Long getUnreadCount(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        return messageRepository.countUnreadMessages(user.getId());
    }
}