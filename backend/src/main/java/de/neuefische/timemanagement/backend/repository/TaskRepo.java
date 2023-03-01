package de.neuefische.timemanagement.backend.repository;

import de.neuefische.timemanagement.backend.model.Task;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class TaskRepo {
    private final Map<String, Task> taskMap;

    public List<Task> getAllTasks(){
        return taskMap.values().stream().toList();
    }

    public Task addTask(Task newTask){
        taskMap.put(newTask.id(),newTask);
        return newTask;}



    public Optional<Task> getTaskById(String id){ return Optional.ofNullable(taskMap.get(id));}


}
