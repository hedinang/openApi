package com.example.openapi.service;

import com.example.openapi.config.StatusConfig;
import com.example.openapi.dto.LoginDto;
import com.example.openapi.exceptions.ObjectDoesNotExistException;
import com.example.openapi.model.User;
import com.example.openapi.repository.UserRepository;
import com.example.openapi.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    JsonWebTokenService jsonWebTokenService;

    public ApiResponse login(LoginDto loginDto) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            Optional<User> userOptional = userRepository.findByUsernameAndPasswordAndStatus(loginDto.getUsername(),
                    loginDto.getPassword(), StatusConfig.ACTIVE.getValue());
            if (userOptional.isEmpty())
                throw new ObjectDoesNotExistException("Username or password incorrect");
            Map<String, Object> map = new HashMap<>();
            map.put("password", loginDto.getPassword());
            String token = jsonWebTokenService.doGenerateToken(map, loginDto.getUsername());
            apiResponse.setData(token);
            apiResponse.setStatus(HttpStatus.OK);
        } catch (Exception e) {
            apiResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }
}
