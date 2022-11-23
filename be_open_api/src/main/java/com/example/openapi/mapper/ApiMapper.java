package com.example.openapi.mapper;

import com.example.openapi.dto.ApiCreateDto;
import com.example.openapi.dto.ApiDto;
import com.example.openapi.model.Api;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ApiMapper {

    Api apiCreateDtoToApi(ApiCreateDto apiCreateDto);
    ApiDto apiToApiDto(Api api);
}
