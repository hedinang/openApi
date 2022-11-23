package com.example.openapi.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document(collection = "group")
public class Group {
    @Id
    String id;
    @Field("name")
    String groupName;
    Integer priority;
    @Field("system_id")
    String systemId;
}
