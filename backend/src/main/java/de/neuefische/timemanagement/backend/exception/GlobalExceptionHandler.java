package de.neuefische.timemanagement.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler{
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<Map<String,Object>> handleTaskNotFoundException(TaskNotFoundException exception){
        Map<String,Object>responseBody = new LinkedHashMap<>();
        responseBody.put("timestamp", Instant.now());
        responseBody.put("message", exception.getMessage());
        return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String,Object>> handleGeneralException(){
        Map<String,Object>responseBody = new LinkedHashMap<>();
        responseBody.put("timestamp", Instant.now());
        responseBody.put("message", "Sorry, Bad request");
        return new ResponseEntity<>(responseBody, HttpStatus.BAD_REQUEST);
    }


}
