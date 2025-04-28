package com.betterwellness.controller;

import com.betterwellness.dto.LoginRequestDTO;
import com.betterwellness.model.Profile;
import com.betterwellness.security.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/getLoginUserDetails")
    public ResponseEntity<Profile> getLoginUserDetails(@RequestBody LoginRequestDTO request) {
        Profile profile = profileService.getProfileByEmail(request.getEmail());
        return ResponseEntity.ok(profile);
    }

    @PostMapping("/createProfile")
    public ResponseEntity<?> createProfile(@RequestBody Profile profile) {
        Profile savedProfile = profileService.createProfile(profile);
        return ResponseEntity.ok(savedProfile);
    }

    @GetMapping("/getAllCounsellors")
    public ResponseEntity<List<Profile>> getAllCounsellors() {
        List<Profile> counsellors = profileService.getAllCounsellors();
        return ResponseEntity.ok(counsellors);
    }

    @GetMapping("/getAllCustomers")
    public ResponseEntity<List<Profile>> getAllCustomers() {
        List<Profile> counsellors = profileService.getAllCustomers();
        return ResponseEntity.ok(counsellors);
    }

}