package com.example.openapi.dto;

import com.example.openapi.model.Params;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiCreateDto {
    String name;
    String method;
    String groupId;
    String encryptionType;
    boolean hasRequestBody;
    String defaultRequestBody;
    List<Params> params;
    String status;
}
