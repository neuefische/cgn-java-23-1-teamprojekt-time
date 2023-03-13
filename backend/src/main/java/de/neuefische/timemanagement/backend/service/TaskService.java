package de.neuefische.timemanagement.backend.service;

import de.neuefische.timemanagement.backend.exception.TaskNotFoundException;
import de.neuefische.timemanagement.backend.exception.UnauthorizedException;
import de.neuefische.timemanagement.backend.model.Task;
import de.neuefische.timemanagement.backend.model.TaskDTO;
import de.neuefische.timemanagement.backend.repository.TaskRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepo taskRepo;
    private final IdService idService;
    private  final MongoUserDetailsService mongoUserDetailsService;

    public List<Task> getAllTasks(){
        return taskRepo.findAllByOrderByDateTimeAsc();
    }

    public Task addTask(TaskDTO newTask,Principal principal){
        if(newTask.title()==null ||newTask.title().equals("") ||newTask.dateTime()==null){
            throw new IllegalArgumentException("missing title or date");
        }
        String id= idService.generateId();
        Task newTaskWithId = new Task(id, newTask.title(), newTask.dateTime(), mongoUserDetailsService.getMe(principal).id());
        return taskRepo.save(newTaskWithId);
    }

    public Task getTaskById(String id){
        return taskRepo.findById(id).orElseThrow(TaskNotFoundException::new);
    }

    public Task updateTask(String id,TaskDTO task,Principal principal){
        String userId = mongoUserDetailsService.getMe(principal).id();
        Optional<Task> optionalTask = taskRepo.findById(id);
        if(optionalTask.isEmpty()){
            throw new TaskNotFoundException("Task with id "+id +" doesn't exist");
        }

        if(!optionalTask.get().userId().equals(userId)){
            throw new UnauthorizedException("You may only update your own tasks!");
        }

        Task updatedTask = new Task(id, task.title(), task.dateTime(), userId);

        return taskRepo.save(updatedTask);
    }

    public List<Task> deleteTask(String id, Principal principal) {
        String userId = mongoUserDetailsService.getMe(principal).id();
        Optional<Task> optionalTask = taskRepo.findById(id);
        if(optionalTask.isEmpty()){
            throw new TaskNotFoundException("Task with id "+id +" doesn't exist");
        }
        if(!optionalTask.get().userId().equals(userId)){
            throw new UnauthorizedException("You may only delete your own tasks!");
        }
        taskRepo.deleteById(id);
        return getAllTasks();
    }

    public List<Task> getTasksForDay(int year, int month, int day, int offset) {
        Instant startDate = Instant.parse(String.format("%d-%02d-%02dT00:00:00Z", year, month, day)).minus(offset,ChronoUnit.HOURS);
        Instant stopDate = startDate.plus(1, ChronoUnit.DAYS);
        return taskRepo.getTasksByDateTimeBetweenOrderByDateTimeAsc(startDate, stopDate);
    }
}
