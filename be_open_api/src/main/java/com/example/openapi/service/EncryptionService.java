package com.example.openapi.service;

import com.example.openapi.model.Encryption;
import com.example.openapi.repository.EncryptionRepository;
import com.example.openapi.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class EncryptionService {
    @Autowired
    EncryptionRepository encryptionRepository;
    public ApiResponse list() {
        ApiResponse apiResponse = new ApiResponse();
        List<Encryption> encryptionList = encryptionRepository.findAll();
        apiResponse.setData(encryptionList);
        apiResponse.setStatus(HttpStatus.OK);
        return apiResponse;
    }
}
