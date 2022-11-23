package com.example.openapi.repository;

import com.example.openapi.model.Api;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ApiRepository extends MongoRepository<Api, String> {
    List<Api> findByGroupId(String groupId);
    List<Api> findByGroupIdAndStatus(String groupId, String status);
}

