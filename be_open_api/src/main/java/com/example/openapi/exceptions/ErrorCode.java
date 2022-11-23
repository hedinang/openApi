package com.example.openapi.exceptions;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    INVALID_SMS("Invalid", HttpStatus.BAD_REQUEST);
    private final String errorMessage;
    private final HttpStatus status;

    ErrorCode(String errorMessage, HttpStatus status) {
        this.errorMessage = errorMessage;
        this.status = status;
    }

    // TODO refactor method name
    public String getValue() {
        return this.errorMessage;
    }

    public HttpStatus getStatus() {
        return status;
    }
}