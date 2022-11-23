package com.example.openapi.repository;

import com.example.openapi.model.ServiceSystem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SystemServiceRepository extends MongoRepository<ServiceSystem, String> {
    Optional<ServiceSystem> findByIdAndStatus(String systemId, String status);

    List<ServiceSystem> findByStatus(String status);

    boolean existsByNameAndStatus(String name, String status);
}
