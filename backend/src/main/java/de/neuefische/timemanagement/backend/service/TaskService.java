package de.neuefische.timemanagement.backend.service;

import de.neuefische.timemanagement.backend.model.Task;
import de.neuefische.timemanagement.backend.model.TaskDTO;
import de.neuefische.timemanagement.backend.repository.TaskRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepo taskRepo;
    private final IdService idService;

    public List<Task> getAllTasks(){
        return taskRepo.findAll();
    }

    public Task addTask(TaskDTO newTask){
        if(newTask.title()==null ||newTask.title().equals("") ||newTask.dateTime()==null){
            throw new IllegalArgumentException("missing title or date");
        }
        String id= idService.generateId();
        Task newTaskWithId = new Task(id, newTask.title(), newTask.dateTime());
        return taskRepo.save(newTaskWithId);
    }

    public Task getTaskById(String id){
        return taskRepo.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Task updateTask(String id,TaskDTO task){
        if(!taskRepo.existsById(id)){
            throw new NoSuchElementException("Task with id "+id +" doesn't exist");
        }

        Task updatedTask = new Task(id, task.title(), task.dateTime());

        return taskRepo.save(updatedTask);
    }

    public List<Task> deleteTask(String id) {
        if(!taskRepo.existsById(id)){
            throw new NoSuchElementException("Task with id "+id +" doesn't exist");
        }
        taskRepo.deleteById(id);
        return getAllTasks();
    }
}
