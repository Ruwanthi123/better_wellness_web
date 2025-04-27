package com.betterwellness.repository;

import com.betterwellness.model.Profile;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;

@Registered
public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    Profile findByEmail(String email);

}