package de.neuefische.timemanagement.backend.model;

public record MongoUserResponse(
        String id,
        String username,
        String role
) {
}
