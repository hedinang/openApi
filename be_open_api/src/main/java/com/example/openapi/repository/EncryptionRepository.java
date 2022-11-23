package com.example.openapi.repository;

import com.example.openapi.model.Encryption;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EncryptionRepository extends MongoRepository<Encryption, String> {
}
