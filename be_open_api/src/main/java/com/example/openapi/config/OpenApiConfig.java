package com.example.openapi.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
@SecurityScheme(type = SecuritySchemeType.APIKEY, name = "token", in = SecuritySchemeIn.HEADER)
public class OpenApiConfig {
    @Bean
    public OpenAPI initialize() {
        OpenAPI defaultOpenAPI = new OpenAPI();
        defaultOpenAPI.info(new Info()
                .title("OPEN API")
//                .description("ABC")
                .version("v1.0.0"));
        //uat
//        Server hyperSms = new Server();
//        hyperSms.setDescription("Hyper SMS");
//        hyperSms.setUrl("https://openapi-uat.hypersms.vn");
        //local
        Server local = new Server();
        local.setDescription("Hyper SMS");
        local.setUrl("http://localhost:8082");
        defaultOpenAPI.setServers(Arrays.asList(local));
        return defaultOpenAPI;
    }
}
