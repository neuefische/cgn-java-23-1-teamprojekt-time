package de.neuefische.timemanagement.backend.service;

import de.neuefische.timemanagement.backend.model.Task;
import de.neuefische.timemanagement.backend.repository.TaskRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class TaskServiceTest {
    TaskRepo taskRepo;
    TaskService taskService;

    Task task1;

    @BeforeEach
    void setUp() {
        taskRepo= mock(TaskRepo.class);
        taskService = new TaskService(taskRepo);
        LocalDateTime today= LocalDateTime.now();
        task1=new Task("1", "task 1",today );
    }

    @Test
    void getAllTasks() {
        //GIVEN
        when(taskRepo.getAllTasks()).thenReturn(new ArrayList<>());
        //WHEN
        List<Task> actual = taskService.getAllTasks();
        List<Task> expected = new ArrayList<>();
        //THEN
        verify(taskRepo).getAllTasks();
        Assertions.assertEquals(expected,actual);

    }

    @Test
    void getTaskById(){

        //GIVEN
        when(taskRepo.getTaskById("1")).thenReturn(Optional.of(task1));
        //WHEN
        Task actualTask=taskService.getTaskById("1");
        Task expected = task1;
        //THEN
        verify(taskRepo).getTaskById("1");
        Assertions.assertEquals(expected,actualTask);

    }

    @Test
    void getTaskById_idDoesntExist(){
        // GIVEN
        when(taskRepo.getTaskById("3")).thenReturn(Optional.empty());
        // WHEN
        assertThrows(NoSuchElementException.class, () -> {
            taskService.getTaskById("3");
        });
        // THEN
        verify(taskRepo).getTaskById("3");
    }
}