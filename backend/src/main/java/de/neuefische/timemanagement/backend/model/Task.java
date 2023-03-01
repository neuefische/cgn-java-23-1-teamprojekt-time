package de.neuefische.timemanagement.backend.model;

import java.time.Instant;

public record Task(String id,
                   String title,
                   Instant dateTime) {
}
