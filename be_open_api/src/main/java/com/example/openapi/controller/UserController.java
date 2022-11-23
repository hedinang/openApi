package com.example.openapi.controller;

import com.example.openapi.config.ControllerPath;
import com.example.openapi.dto.LoginDto;
import com.example.openapi.response.ApiResponse;
import com.example.openapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ControllerPath.USER)
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping(path = "/login")
    public ApiResponse login(@RequestBody LoginDto loginDto) {
        return userService.login(loginDto);
    }

}
