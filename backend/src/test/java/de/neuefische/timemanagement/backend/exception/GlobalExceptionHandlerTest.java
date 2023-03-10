package de.neuefische.timemanagement.backend.exception;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;
class GlobalExceptionHandlerTest {

    @Test
    @ExceptionHandler(UnauthorizedException.class)
     void testHandleUnauthorizedException() {

        String errorMessage = "You are not authorized to access this task!";
        UnauthorizedException exception = new UnauthorizedException(errorMessage);

        GlobalExceptionHandler handler = new GlobalExceptionHandler();
        ResponseEntity<Map<String, Object>> responseEntity = handler.handleUnauthorizedException(exception);

        Assertions.assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());

        Map<String, Object> responseBody = responseEntity.getBody();
        Assertions.assertEquals(errorMessage, responseBody.get("message"));
        Assertions.assertNotNull(responseBody.get("timestamp"));
    }
}
