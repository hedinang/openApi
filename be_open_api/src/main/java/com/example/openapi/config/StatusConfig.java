package com.example.openapi.config;

public enum StatusConfig {
    INACTIVE("INACTIVE"),
    ACTIVE("ACTIVE"),
    REMOVED("REMOVED");
    private final String config;

    StatusConfig(String config) {
        this.config = config;
    }

    public String getValue() {
        return this.config;
    }
}