package com.example.openapi.mapper;

import com.example.openapi.dto.ServiceSystemDto;
import com.example.openapi.dto.SystemServiceCreateDto;
import com.example.openapi.dto.SystemServiceUpdateDto;
import com.example.openapi.model.ServiceSystem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ServiceSystemMapper {
    ServiceSystem systemServiceCreateDtoToServiceSystem(SystemServiceCreateDto systemServiceCreateDto);
    ServiceSystem systemServiceUpdateDtoToServiceSystem(SystemServiceUpdateDto systemServiceCreateDto);
    ServiceSystemDto systemServiceToServiceSystemDto(ServiceSystem serviceSystem);
}
