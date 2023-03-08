package de.neuefische.timemanagement.backend.model;

public record MongoUser(
        String id,
        String username,
        String password,
        String role
) {
}
