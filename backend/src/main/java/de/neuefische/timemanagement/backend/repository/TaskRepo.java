package de.neuefische.timemanagement.backend.repository;

import de.neuefische.timemanagement.backend.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends MongoRepository<Task, String> {
    }