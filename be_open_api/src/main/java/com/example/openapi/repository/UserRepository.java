package com.example.openapi.repository;

import com.example.openapi.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsernameAndPasswordAndStatus(String username, String password, String status);
}
