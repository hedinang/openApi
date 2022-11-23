package com.example.openapi.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    public static final int REST_TEMPLATE_MAX_RETRY = 3;
    public static final int REST_TEMPLATE_RETRY_INTERVAL = 1;
}
