package com.example.openapi.controller;

import com.example.openapi.config.ControllerPath;
import com.example.openapi.response.ApiResponse;
import com.example.openapi.service.EncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ControllerPath.ENCRYPTION)
public class EncryptionController {
    @Autowired
    EncryptionService encryptionService;

    @GetMapping(path = "list")
    public ApiResponse listEncryption() {
        return encryptionService.list();
    }
}
