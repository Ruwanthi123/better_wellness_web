package com.betterwellness.service;

import com.betterwellness.dto.MessageRequestDTO;
import com.betterwellness.model.Message;
import com.betterwellness.repository.MessageRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final JdbcTemplate jdbcTemplate;

    private final MessageRepository messageRepository;

    public MessageService(JdbcTemplate jdbcTemplate, MessageRepository messageRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.messageRepository = messageRepository;
    }

    public List<Message> getMessagesBySenderAndReceiver(MessageRequestDTO messageRequestDTO) {
        String sql = "SELECT * FROM message WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY timestamp ASC";
        return jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(Message.class),
                messageRequestDTO.getSender(),
                messageRequestDTO.getReceiver(),
                messageRequestDTO.getReceiver(),
                messageRequestDTO.getSender()
        );
    }



}
