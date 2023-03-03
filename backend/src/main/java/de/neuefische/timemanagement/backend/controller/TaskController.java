package de.neuefische.timemanagement.backend.controller;

import de.neuefische.timemanagement.backend.model.Task;
import de.neuefische.timemanagement.backend.model.TaskDTO;
import de.neuefische.timemanagement.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public Task addTask(@RequestBody TaskDTO task){
        return taskService.addTask(task);
    }

    @PutMapping("{id}")
    public Task updateTask(@PathVariable String id, @RequestBody TaskDTO task){
        return taskService.updateTask(id,task);
    }

    @GetMapping("{id}")
    public Task getTaskById(@PathVariable String id){
        return taskService.getTaskById(id);
    }

    @DeleteMapping("{id}")
    public List<Task> deleteTaskById(@PathVariable String id) {
        return taskService.deleteTask(id);
    }

    @GetMapping("{year}/{month}/{day}/offset/{offset}")
    public List<Task> getTasksForDay(@PathVariable int year, @PathVariable int month, @PathVariable int day,@PathVariable int offset) {
        return taskService.getTasksForDay(year, month, day,offset);
    }

}