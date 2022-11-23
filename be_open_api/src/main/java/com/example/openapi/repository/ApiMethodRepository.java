package com.example.openapi.repository;

import com.example.openapi.model.ApiMethod;
import com.example.openapi.model.Group;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApiMethodRepository extends MongoRepository<ApiMethod, String> {
}
