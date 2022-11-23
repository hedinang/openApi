package com.example.openapi.dto;

import com.example.openapi.model.Api;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
public class GroupApiDto {
    String id;
    String groupName;
    Integer priority;
    List<Api> apiList;
}
