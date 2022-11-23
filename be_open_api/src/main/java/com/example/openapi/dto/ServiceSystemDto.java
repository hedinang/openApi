package com.example.openapi.dto;

import com.example.openapi.model.ServerUrl;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceSystemDto {
    String id;
    String name;
    List<ServerUrl> serverUrl;
    List<GroupDto> groupDtoList;
}
