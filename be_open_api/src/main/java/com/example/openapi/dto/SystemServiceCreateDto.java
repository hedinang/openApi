package com.example.openapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SystemServiceCreateDto {
    String name;
    List<ServerUrlDto> serverUrl;
    List<GroupDto> group;
    String status;
}
