package com.example.openapi.controller;

import com.example.openapi.config.ControllerPath;
import com.example.openapi.dto.SystemServiceCreateDto;
import com.example.openapi.dto.SystemServiceUpdateDto;
import com.example.openapi.response.ApiResponse;
import com.example.openapi.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ControllerPath.SERVICE)
public class ServiceSystemController {
    @Autowired
    SystemService systemService;

    @PostMapping(path = "/create")
    public ApiResponse create(@RequestBody SystemServiceCreateDto systemServiceCreateDto) {
        return systemService.create(systemServiceCreateDto);
    }

    @PutMapping(path = "/update/{id}")
    public ApiResponse update(@PathVariable String id, @RequestBody SystemServiceUpdateDto systemServiceUpdateDto) {
        return systemService.update(id, systemServiceUpdateDto);
    }

    @GetMapping(path = "/detail/{id}")
    public ApiResponse getDetail(@PathVariable String id) {
        return systemService.getDetail(id);
    }

    @GetMapping(path = "/list")
    public ApiResponse list() {
        return systemService.list();
    }

    @GetMapping(path = "/group/list/{id}")
    public ApiResponse listGroup(@PathVariable String id) {
        return systemService.listGroup(id);
    }

    @DeleteMapping(path = "/delete/{id}")
    public ApiResponse delete(@PathVariable String id) {
        return systemService.delete(id);
    }

}
