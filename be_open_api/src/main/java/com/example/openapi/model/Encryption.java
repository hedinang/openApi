package com.example.openapi.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "encryption")
public class Encryption {
    String id;
    String name;
}
