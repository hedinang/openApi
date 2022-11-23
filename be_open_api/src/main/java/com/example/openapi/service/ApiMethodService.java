package com.example.openapi.service;

import com.example.openapi.model.ApiMethod;
import com.example.openapi.repository.ApiMethodRepository;
import com.example.openapi.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApiMethodService {
    @Autowired
    ApiMethodRepository apiMethodRepository;
    public ApiResponse list() {
        ApiResponse apiResponse = new ApiResponse();
        List<ApiMethod> apiMethodList = apiMethodRepository.findAll();
        apiResponse.setData(apiMethodList);
        apiResponse.setStatus(HttpStatus.OK);
        return apiResponse;
    }
}
