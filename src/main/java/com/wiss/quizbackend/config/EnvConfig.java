package com.wiss.quizbackend.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties
public class EnvConfig {
    // spring-dotenv will automatically load .env file
    // No additional configuration needed
}



