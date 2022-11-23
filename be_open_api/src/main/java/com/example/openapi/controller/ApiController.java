package com.example.openapi.controller;

import com.example.openapi.config.ControllerPath;
import com.example.openapi.dto.ApiCreateDto;
import com.example.openapi.response.ApiResponse;
import com.example.openapi.service.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ControllerPath.API)
public class ApiController {
    @Autowired
    ApiService apiService;

    @PostMapping(path = "/create")
    public ApiResponse create(@RequestBody ApiCreateDto apiCreateDto) {
        return apiService.create(apiCreateDto);
    }

    @PostMapping(path = "/list/{groupId}")
    public ApiResponse list(@PathVariable String groupId) {
        return apiService.list(groupId);
    }

    @GetMapping(path = "/detail/{apiId}")
    public ApiResponse detail(@PathVariable String apiId) {
        return apiService.detail(apiId);
    }

    @PutMapping(path = "/update/{apiId}")
    public ApiResponse update(@PathVariable String apiId, @RequestBody ApiCreateDto apiCreateDto) {
        return apiService.update(apiId, apiCreateDto);
    }
    @DeleteMapping(path = "/delete/{apiId}")
    public ApiResponse delete(@PathVariable String apiId) {
        return apiService.delete(apiId);
    }

}
