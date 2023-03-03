package de.neuefische.timemanagement.backend.repository;

import de.neuefische.timemanagement.backend.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface TaskRepo extends MongoRepository<Task, String> {
    List<Task> getTasksByDateTimeBetween(Instant startDate, Instant stopDate);
}