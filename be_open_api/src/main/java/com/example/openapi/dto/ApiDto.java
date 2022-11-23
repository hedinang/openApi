package com.example.openapi.dto;

import com.example.openapi.model.Params;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiDto {
    String id;
    String name;
    String method;
    String encryptionType;
    boolean hasRequestBody;
    String defaultRequestBody;
    List<Params> params;
}
