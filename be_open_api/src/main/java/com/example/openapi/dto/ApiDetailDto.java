package com.example.openapi.dto;

import com.example.openapi.model.Params;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiDetailDto {
    String id;
    String name;
    String method;
    String groupId;
    String systemId;
    String encryptionType;
    boolean hasRequestBody;
    String defaultRequestBody;
    List<Params> params;
}
