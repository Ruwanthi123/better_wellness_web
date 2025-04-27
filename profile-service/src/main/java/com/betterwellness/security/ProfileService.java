package com.betterwellness.security;

import com.betterwellness.model.Profile;
import com.betterwellness.repository.ProfileRepository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    private final JdbcTemplate jdbcTemplate;

    private final ProfileRepository profileRepository;

    public ProfileService(JdbcTemplate jdbcTemplate, ProfileRepository profileRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.profileRepository = profileRepository;
    }

    public Profile getProfileByEmail(String email) {
        return profileRepository.findByEmail(email);
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public List<Profile> getAllCounsellors() {
        String sql = "SELECT * FROM profile WHERE role = 'Counsellor'";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Profile.class));
    }
}