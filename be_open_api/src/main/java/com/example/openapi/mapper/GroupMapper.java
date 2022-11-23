package com.example.openapi.mapper;

import com.example.openapi.dto.GroupApiDto;
import com.example.openapi.dto.GroupDto;
import com.example.openapi.model.Group;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GroupMapper {
    Group groupDtoToGroup(GroupDto groupDto);
    GroupDto groupToGroupDto(Group group);
    GroupApiDto groupToGroupApiDto(Group group);
}
