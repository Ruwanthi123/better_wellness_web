package com.betterwellness.controller;

import com.betterwellness.dto.MessageRequestDTO;
import com.betterwellness.model.Message;
import com.betterwellness.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/message")
public class MessagingController {

    private final MessageService messageService;

    public MessagingController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/getMessagesBySenderAndReceiver")
    public ResponseEntity<List<Message>> getMessagesBySenderAndReceiver(@RequestBody MessageRequestDTO request) {
        List<Message> counsellors = this.messageService.getMessagesBySenderAndReceiver(request);
        return ResponseEntity.ok(counsellors);
    }
}
