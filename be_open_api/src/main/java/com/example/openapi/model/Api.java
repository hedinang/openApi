package com.example.openapi.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "api")
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Api {
    @Id
    String id;
    String name;
    String method;
    String groupId;
    @Field("encryption_type")
    String encryptionType;
    @Field("has_request_body")
    boolean hasRequestBody;
    @Field("default_request_body")
    String defaultRequestBody;;
    List<Params> params;
    String status;
}
