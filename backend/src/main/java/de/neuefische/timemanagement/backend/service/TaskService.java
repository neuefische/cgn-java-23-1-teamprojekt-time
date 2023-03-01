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
    private final IdService idService;

    public List<Task> getAllTasks(){
        return taskRepo.getAllTasks();
    }

    public Task addTask(Task newTask){
        if(newTask.title()==null ||newTask.title().equals("") ||newTask.dateTime()==null){
            throw new IllegalArgumentException("missing title or date");
        }
        String id= idService.generateId();
        Task newTaskWithId = new Task(id, newTask.title(), newTask.dateTime());
        return taskRepo.addTask(newTaskWithId);
    }

    public Task getTaskById(String id){
        return taskRepo.getTaskById(id).orElseThrow(NoSuchElementException::new);
    }

    public Task updateTask(String id,Task task){
        if (!task.id().equals(id)) {
            throw new IllegalArgumentException("Id don't match");
        }
        Task oldTask=taskRepo.updateTask(task);
        if(oldTask==null){
            throw new NoSuchElementException("Task with id "+id +"doesn't exist");
        }
        return task;
    }
}
