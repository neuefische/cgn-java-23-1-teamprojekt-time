package de.neuefische.timemanagement.backend.model;

import java.time.ZonedDateTime;

public record Task(String id,
                   String title,
                   ZonedDateTime dateTime) {
}
