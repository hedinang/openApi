package com.example.openapi.repository;

import com.example.openapi.model.Group;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface GroupRepository extends MongoRepository<Group, String> {
    long countBySystemId(String systemId);

    List<Group> findBySystemId(String systemId);

    Long deleteBySystemId(String systemId);

}
