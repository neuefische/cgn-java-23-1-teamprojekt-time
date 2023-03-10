package de.neuefische.timemanagement.backend.controller;

import de.neuefische.timemanagement.backend.model.Task;
import de.neuefische.timemanagement.backend.model.TaskDTO;
import de.neuefische.timemanagement.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/tasks/")
public class TaskController {
    private final TaskService taskService;


    @GetMapping
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task addTask(@RequestBody TaskDTO task, Principal principal){
        return taskService.addTask(task,principal);
    }

    @PutMapping("{id}")
    public Task updateTask(@PathVariable String id, @RequestBody TaskDTO task,Principal principal){
        return taskService.updateTask(id,task,principal);
    }

    @GetMapping("{id}")
    public Task getTaskById(@PathVariable String id){
        return taskService.getTaskById(id);
    }

    @DeleteMapping("{id}")
    public List<Task> deleteTaskById(@PathVariable String id,Principal principal) {
        return taskService.deleteTask(id, principal);
    }

    @GetMapping("{year}/{month}/{day}")
    public List<Task> getTasksForDay(@PathVariable int year, @PathVariable int month, @PathVariable int day,@RequestParam int offset) {
        return taskService.getTasksForDay(year, month, day,offset);
    }

}