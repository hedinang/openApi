package com.example.openapi.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "api_method")
public class ApiMethod {
    String id;
    String name;
}
