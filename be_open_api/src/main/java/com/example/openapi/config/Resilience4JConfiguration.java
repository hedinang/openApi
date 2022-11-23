package com.example.openapi.config;

import com.sun.jersey.api.client.UniformInterfaceException;
import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.timelimiter.TimeLimiterConfig;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JCircuitBreakerFactory;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JConfigBuilder;
import org.springframework.cloud.client.circuitbreaker.Customizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class Resilience4JConfiguration {
    @Bean
    public Customizer<Resilience4JCircuitBreakerFactory> globalCustomConfiguration() {
        TimeLimiterConfig timeLimiterConfig = TimeLimiterConfig.custom()
                .timeoutDuration(Duration.ofSeconds(40))
                .build();
        CircuitBreakerConfig circuitBreakerConfig = CircuitBreakerConfig.custom()
                .slowCallRateThreshold(80) // X% of calls are to slow
                .failureRateThreshold(50) // X% of request result in an error
                .waitDurationInOpenState(Duration.ofMillis(1000)) // wait 1s to go into half open state
                .slowCallDurationThreshold(Duration.ofMillis(2000)) // After 2s of response time a call is slow
                .permittedNumberOfCallsInHalfOpenState(3) //Do a maximum 3 calls in half open state
                .minimumNumberOfCalls(10) // have at least 10 calls in the window to calculate rates
                .slidingWindowType(CircuitBreakerConfig.SlidingWindowType.TIME_BASED)
                .slidingWindowSize(5) // Record 5 seconds of requests for the window
                .recordExceptions(UniformInterfaceException.class)
                .build();

        return factory -> factory.configureDefault(id -> new Resilience4JConfigBuilder(id)
                .timeLimiterConfig(timeLimiterConfig)
                .circuitBreakerConfig(circuitBreakerConfig)
                .build());
    }
}
