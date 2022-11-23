package com.example.openapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupDto {
    String id;
    String groupName;
    Integer priority;
    List<ApiDto> apiDtoList;
}
