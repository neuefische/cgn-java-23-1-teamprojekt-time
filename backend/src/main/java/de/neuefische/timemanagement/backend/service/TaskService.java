package de.neuefische.timemanagement.backend.service;

import de.neuefische.timemanagement.backend.model.Task;
import de.neuefische.timemanagement.backend.repository.TaskRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepo taskRepo;

    public List<Task> getAllTasks(){
        return taskRepo.getAllTasks();
    }
    public Task getTaskById(String id){ return taskRepo.getTaskById(id).orElseThrow(NoSuchElementException::new);}


    }

