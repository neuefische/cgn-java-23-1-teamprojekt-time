package de.neuefische.timemanagement.backend.model;

import java.time.Instant;

public record TaskDTO(
        String id,
        String title,
        Instant dateTime
) {
}
