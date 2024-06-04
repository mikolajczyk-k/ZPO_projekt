package com.nextbank.nextbank;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Enable CORS for all endpoints
                .allowedOrigins("http://localhost:5173") // Allow only this origin; adjust as necessary
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed request methods
                .allowedHeaders("*") // Allowed request headers
                .allowCredentials(true); // Allow credentials
    }
}

