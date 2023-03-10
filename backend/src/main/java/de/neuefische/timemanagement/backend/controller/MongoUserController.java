package de.neuefische.timemanagement.backend.controller;

import de.neuefische.timemanagement.backend.model.MongoUserRequest;
import de.neuefische.timemanagement.backend.model.MongoUserResponse;
import de.neuefische.timemanagement.backend.service.MongoUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class MongoUserController {
    private final MongoUserDetailsService mongoUserDetailsService;

    @PostMapping
    public MongoUserResponse signup(@RequestBody MongoUserRequest user) {
        return mongoUserDetailsService.signup(user);
    }

    @PostMapping("/login")
    public MongoUserResponse login(Principal principal) {
        return getMe(principal);
    }

    @GetMapping("/me")
    public MongoUserResponse getMe(Principal principal) {
        return mongoUserDetailsService.getMe(principal);
    }

    @PostMapping("/logout")
    public void logout() {
        // this method exists only to define the endpoint!
    }
}
