package com.example.openapi.service;

import com.example.openapi.config.StatusConfig;
import com.example.openapi.dto.*;
import com.example.openapi.exceptions.ObjectDoesNotExistException;
import com.example.openapi.mapper.ApiMapper;
import com.example.openapi.mapper.GroupMapper;
import com.example.openapi.mapper.ServiceSystemMapper;
import com.example.openapi.model.Group;
import com.example.openapi.model.ServiceSystem;
import com.example.openapi.repository.ApiRepository;
import com.example.openapi.repository.GroupRepository;
import com.example.openapi.repository.SystemServiceRepository;
import com.example.openapi.response.ApiResponse;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SystemService {
    @Autowired
    SystemServiceRepository systemServiceRepository;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    ServiceSystemMapper serviceSystemMapper;
    @Autowired
    GroupMapper groupMapper;

    @Autowired
    ApiRepository apiRepository;
    @Autowired
    ApiMapper apiMapper;

    @Transactional
    public ApiResponse create(SystemServiceCreateDto systemServiceCreateDto) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            // check existence of service name
            if (systemServiceCreateDto.getName() == null || systemServiceCreateDto.getName().equals(""))
                throw new Exception("Service name can't be null or blank");
            // validate url list
            if (!validateServerUrlCreate(systemServiceCreateDto.getServerUrl()))
                throw new Exception("Server url not allow to duplicate name and priority!" +
                        "\nPriority must be different null or blank");
            // validate group list
            if (!validateGroupCreate(systemServiceCreateDto.getGroup()))
                throw new Exception("Group not allow to duplicate name and priority!" +
                        "\nPriority must be different null or blank");
            if (systemServiceRepository.existsByNameAndStatus(systemServiceCreateDto.getName(),
                    StatusConfig.ACTIVE.getValue()))
                throw new Exception("Service name has existed! Let's choose other service name.");
            // insert system first
            ServiceSystem systemService = serviceSystemMapper.systemServiceCreateDtoToServiceSystem(systemServiceCreateDto);
            ServiceSystem result = systemServiceRepository.save(systemService);
            // after that just add systemId for group and insert group
            List<Group> groupList = systemServiceCreateDto.getGroup().stream()
                    .map(e -> {
                        Group group = groupMapper.groupDtoToGroup(e);
                        group.setSystemId(result.getId());
                        group.setId(null);
                        return group;
                    }).collect(Collectors.toList());
            groupRepository.saveAll(groupList);
            apiResponse.setData("Create successfully service: " + systemServiceCreateDto.getName());
            apiResponse.setStatus(HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.setStatus(HttpStatus.BAD_REQUEST);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;

    }

    @Transactional
    public ApiResponse update(String systemId, SystemServiceUpdateDto systemServiceUpdateDto) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            //check existence of id
            Optional<ServiceSystem> optionalServiceSystem = systemServiceRepository.findById(systemId);
            if (optionalServiceSystem.isEmpty())
                throw new ObjectDoesNotExistException("Not exist service system has this id");
            if (systemServiceRepository.existsByNameAndStatus(systemServiceUpdateDto.getName(),
                    StatusConfig.ACTIVE.getValue()) && !systemServiceUpdateDto.getName().equals(optionalServiceSystem.get().getName()))
                throw new Exception("Service name has existed! Let's choose other service name.");


            // check existence of service name
            if (systemServiceUpdateDto.getName() == null || systemServiceUpdateDto.getName().equals(""))
                throw new Exception("Service name can't be null or blank");
            // validate url list
            if (!validateServerUrlCreate(systemServiceUpdateDto.getServerUrl()))
                throw new Exception("Server url not allow to duplicate name and priority!" +
                        "\nPriority must be different null or blank");
            // validate group list
            if (!validateGroupCreate(systemServiceUpdateDto.getGroup()))
                throw new Exception("Group not allow to duplicate name and priority!" +
                        "\nPriority must be different null or blank");
            ServiceSystem systemService = serviceSystemMapper.systemServiceUpdateDtoToServiceSystem(systemServiceUpdateDto);
            ServiceSystem result = systemServiceRepository.save(systemService);
            List<Group> groupList = systemServiceUpdateDto.getGroup().stream().map(e -> {
                Group group = groupMapper.groupDtoToGroup(e);
                group.setSystemId(systemId);
                return group;
            }).collect(Collectors.toList());
            // remove all of old record
            groupRepository.deleteBySystemId(systemId);
            groupRepository.saveAll(groupList);
            apiResponse.setData(result);
            apiResponse.setStatus(HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;

    }

    @Transactional
    public ApiResponse getDetail(String id) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Optional<ServiceSystem> optionalServiceSystem =
                    systemServiceRepository.findByIdAndStatus(id, StatusConfig.ACTIVE.getValue());
            if (optionalServiceSystem.isEmpty())
                throw new ObjectDoesNotExistException("Not exist service system has this id");
            ServiceSystem serviceSystem = optionalServiceSystem.get();
            // get group by systemId
            List<GroupDto> groupDtoList = listGroupBySystemId(serviceSystem.getId());
            // sort group as far as property
            groupDtoList.sort(Comparator.comparingInt(GroupDto::getPriority));
            ServiceSystemDto serviceSystemDto = serviceSystemMapper.systemServiceToServiceSystemDto(serviceSystem);
            serviceSystemDto.setGroupDtoList(groupDtoList);
            apiResponse.setData(serviceSystemDto);
            apiResponse.setStatus(HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.setStatus(HttpStatus.NOT_FOUND);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;

    }

    public ApiResponse list() {
        ApiResponse apiResponse = new ApiResponse();
        List<SystemServiceDto> serviceSystemDtoList = systemServiceRepository.findByStatus(StatusConfig.ACTIVE.getValue()).stream().
                map(e -> {
                    long amountOfGroup = groupRepository.countBySystemId(e.getId());
                    SystemServiceDto systemServiceDto = new SystemServiceDto(e.getId(), e.getName(),
                            e.getServerUrl().stream().count(), amountOfGroup);
                    return systemServiceDto;
                }).collect(Collectors.toList());
        apiResponse.setData(serviceSystemDtoList);
        apiResponse.setStatus(HttpStatus.OK);
        return apiResponse;
    }

    public ApiResponse listGroup(String serviceId) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            List<GroupDto> groupDtoList = listGroupBySystemId(serviceId);
            apiResponse.setData(groupDtoList);
            apiResponse.setStatus(HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.setStatus(HttpStatus.NOT_FOUND);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    public List<GroupDto> listGroupBySystemId(String serviceId) {
        return groupRepository.findBySystemId(serviceId).stream().
                map(e -> {
                    GroupDto groupDto = groupMapper.groupToGroupDto(e);
                    List<ApiDto> apiDtoList = apiRepository.findByGroupIdAndStatus(groupDto.getId(),
                            StatusConfig.ACTIVE.getValue()).stream().
                            map(f -> apiMapper.apiToApiDto(f)).collect(Collectors.toList());
                    groupDto.setApiDtoList(apiDtoList);
                    return groupDto;
                }).collect(Collectors.toList());
    }

    @Transactional
    public ApiResponse delete(String serviceId) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Optional<ServiceSystem> serviceSystemOptional = systemServiceRepository.findById(serviceId);
            if (serviceSystemOptional.isEmpty())
                throw new ObjectDoesNotExistException("Not exist service system has this id");
            ServiceSystem serviceSystem = serviceSystemOptional.get();
            serviceSystem.setStatus(StatusConfig.REMOVED.getValue());
            systemServiceRepository.save(serviceSystem);
            apiResponse.setData("Delete successfully service: " + serviceId);
            apiResponse.setStatus(HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.setStatus(HttpStatus.NOT_FOUND);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    public boolean validateServerUrlCreate(List<ServerUrlDto> serverUrl) {
        // cant duplicate name and priority
        Set<String> nameSet = new HashSet<>();
        Set<Integer> prioritySet = new HashSet<>();
        for (ServerUrlDto e : serverUrl) {
            if (e.getPriority() == null) return false;
            nameSet.add(e.getUrlName());
            prioritySet.add(e.getPriority());
        }
        if (nameSet.size() < serverUrl.size() || prioritySet.size() < serverUrl.size())
            return false;
        return true;
    }

    public boolean validateGroupCreate(List<GroupDto> group) {
        // cant duplicate name and priority
        Set<String> nameSet = new HashSet<>();
        Set<Integer> prioritySet = new HashSet<>();
        for (GroupDto e : group) {
            if (e.getPriority() == null) return false;
            nameSet.add(e.getGroupName());
            prioritySet.add(e.getPriority());
        }
        if (nameSet.size() < group.size() || prioritySet.size() < group.size())
            return false;
        return true;
    }
}
