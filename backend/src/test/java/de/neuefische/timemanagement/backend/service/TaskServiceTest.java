package de.neuefische.timemanagement.backend.service;

import de.neuefische.timemanagement.backend.model.Task;
import de.neuefische.timemanagement.backend.repository.TaskRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class TaskServiceTest {
    TaskRepo taskRepo;
    TaskService taskService;

    @BeforeEach
    void setUp() {
        taskRepo= mock(TaskRepo.class);
        taskService = new TaskService(taskRepo);
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
}