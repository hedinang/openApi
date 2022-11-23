package com.example.openapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SystemServiceDto {
    String id;
    String name;
    long amountOfUrl;
    long amountOfGroup;
}
