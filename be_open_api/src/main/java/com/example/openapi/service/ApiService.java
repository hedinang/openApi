package com.example.openapi.service;

import com.example.openapi.config.StatusConfig;
import com.example.openapi.dto.ApiCreateDto;
import com.example.openapi.dto.ApiDetailDto;
import com.example.openapi.dto.GroupApiDto;
import com.example.openapi.exceptions.ObjectDoesNotExistException;
import com.example.openapi.mapper.ApiMapper;
import com.example.openapi.mapper.GroupMapper;
import com.example.openapi.model.Api;
import com.example.openapi.model.Group;
import com.example.openapi.model.Params;
import com.example.openapi.model.ServiceSystem;
import com.example.openapi.repository.ApiRepository;
import com.example.openapi.repository.GroupRepository;
import com.example.openapi.repository.SystemServiceRepository;
import com.example.openapi.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ApiService {
    @Autowired
    ApiRepository apiRepository;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    SystemServiceRepository systemServiceRepository;
    @Autowired
    ApiMapper apiMapper;
    @Autowired
    GroupMapper groupMapper;

    @Transactional
    public ApiResponse create(ApiCreateDto apiCreateDto) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            // validate general information
            if (validateGeneralInformation(apiCreateDto))
                throw new Exception("General information isn't correct! Please check again.");
            //validate parameter list
            if (validateParameterList(apiCreateDto.getParams()))
                throw new Exception("Params list isn't correct! Please check again.");
            Api api = apiMapper.apiCreateDtoToApi(apiCreateDto);
            apiRepository.save(api);
            apiResponse.setData("Create successfully api: " + api.getName());
            apiResponse.setStatus(HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.setStatus(HttpStatus.BAD_REQUEST);
            apiResponse.setMessage(e.getMessage());
        }

        return apiResponse;
    }

    @Transactional
    public ApiResponse update(String apiId, ApiCreateDto apiCreateDto) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Optional<Api> apiOptional = apiRepository.findById(apiId);
            if (apiOptional.isEmpty()) throw new ObjectDoesNotExistException("Not exist api has id: " + apiId);
            Api api = apiMapper.apiCreateDtoToApi(apiCreateDto);
            if (!apiCreateDto.isHasRequestBody()) api.setDefaultRequestBody("");
            api.setId(apiId);
            apiRepository.save(api);
            apiResponse.setData("Create successfully api: " + api.getName());
            apiResponse.setStatus(HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse delete(String apiId) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Optional<Api> apiOptional = apiRepository.findById(apiId);
            if (apiOptional.isEmpty()) throw new ObjectDoesNotExistException("Not exist api has id: " + apiId);
            Api api = apiOptional.get();
            api.setStatus(StatusConfig.REMOVED.getValue());
            apiRepository.save(api);
            apiResponse.setData("Delete successfully api: " + api.getName());
            apiResponse.setStatus(HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    public ApiResponse list(String systemId) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            // check existence according to systemId
            Optional<ServiceSystem> serviceSystemOptional = systemServiceRepository.findByIdAndStatus(systemId, StatusConfig.ACTIVE.getValue());
            if (serviceSystemOptional.isEmpty())
                throw new ObjectDoesNotExistException("Not exist service has id: " + systemId);
            //retrieve
            List<GroupApiDto> groupApiDtoList = groupRepository.findBySystemId(systemId).stream().map(e -> {
                GroupApiDto groupApiDto = groupMapper.groupToGroupApiDto(e);
                List<Api> apiList = apiRepository.findByGroupIdAndStatus(e.getId(), StatusConfig.ACTIVE.getValue());
                groupApiDto.setApiList(apiList);
                return groupApiDto;
            }).collect(Collectors.toList());
            apiResponse.setData(groupApiDtoList);
            apiResponse.setStatus(HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse detail(String apiId) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            //retrieve
            Optional<Api> apiOptional = apiRepository.findById(apiId);
            if (apiOptional.isEmpty()) throw new ObjectDoesNotExistException("Not exist api has id: " + apiId);
            Api api = apiOptional.get();

            Optional<Group> groupOptional = groupRepository.findById(api.getGroupId());
            if (apiOptional.isEmpty())
                throw new ObjectDoesNotExistException("Not exist group contains apiId: " + apiId);
            Group group = groupOptional.get();

            Optional<ServiceSystem> serviceSystemOptional = systemServiceRepository.findById(group.getSystemId());
            if (serviceSystemOptional.isEmpty())
                throw new ObjectDoesNotExistException("Not exist service contains apiId: " + apiId);
            ServiceSystem serviceSystem = serviceSystemOptional.get();
            ApiDetailDto apiDetailDto = new ApiDetailDto(apiId, api.getName(), api.getMethod(),
                    group.getId(), serviceSystem.getId(), api.getEncryptionType(), api.isHasRequestBody(), api.getDefaultRequestBody(), api.getParams());
            apiResponse.setData(apiDetailDto);
            apiResponse.setStatus(HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    public boolean validateGeneralInformation(ApiCreateDto apiCreateDto) {
        if (apiCreateDto.getName() == null || apiCreateDto.getName().equals("")) return true;
        if (apiCreateDto.getGroupId() == null) return true;
        if (!groupRepository.existsById(apiCreateDto.getGroupId())) return true;
        if (apiCreateDto.getEncryptionType() == null) return true;
        if (apiCreateDto.getMethod() == null) return true;
        return false;
    }

    public boolean validateParameterList(List<Params> params) {
        Set<String> nameSet = new HashSet<>();
        for (Params p : params) {
            if (p.getParamName() == null || p.getParamName().equals("")) return true;
            if (p.getDataType() == null || p.getDataType().equals("")) return true;
            if (p.getParamType() == null || p.getParamType().equals("")) return true;
            nameSet.add(p.getParamName());
        }
        if (nameSet.size() != params.size()) return true;
        return false;
    }
}
