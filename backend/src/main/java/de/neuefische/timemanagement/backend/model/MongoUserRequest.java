package de.neuefische.timemanagement.backend.model;

public record MongoUserRequest(
        String username,
        String password
) {
}
