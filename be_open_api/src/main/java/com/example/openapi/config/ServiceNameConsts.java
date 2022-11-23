package com.example.openapi.config;

public enum ServiceNameConsts {
    HYPER_SMS("openapi-uat.hypersms.vn");

    private final String config;

    ServiceNameConsts(String config) {
        this.config=config;
    }

    public String getValue() {
        return this.config;
    }

}