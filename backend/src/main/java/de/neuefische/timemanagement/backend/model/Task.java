package de.neuefische.timemanagement.backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document("tasks")
public record Task(
        @Id
        String id,
        String title,
        Instant dateTime) {
}
