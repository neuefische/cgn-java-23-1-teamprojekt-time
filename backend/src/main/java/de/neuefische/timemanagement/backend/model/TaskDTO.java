package de.neuefische.timemanagement.backend.model;

import java.time.Instant;

public record TaskDTO(
        String title,
        Instant dateTime
) {
}
