package de.neuefische.timemanagement.backend.service;
import de.neuefische.timemanagement.backend.model.Task;
import de.neuefische.timemanagement.backend.model.TaskDTO;
import de.neuefische.timemanagement.backend.repository.TaskRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class TaskServiceTest {
    TaskRepo taskRepo;
    TaskService taskService;
    IdService idService;
    TaskDTO task1DTO;
    Task task1;

    @BeforeEach
    void setUp() {
        taskRepo= mock(TaskRepo.class);
        idService=mock(IdService.class);
        taskService = new TaskService(taskRepo,idService);
        Instant today= Instant.now();
        task1DTO = new TaskDTO( "task 1", today);
        task1 = new Task("1", task1DTO.title(), task1DTO.dateTime());
    }

    @Test
    void getAllTasks() {
        //GIVEN
        when(taskRepo.findAll()).thenReturn(new ArrayList<>());
        //WHEN
        List<Task> actual = taskService.getAllTasks();
        List<Task> expected = new ArrayList<>();
        //THEN
        verify(taskRepo).findAll();
        Assertions.assertEquals(expected, actual);
    }
    @Test
    void getTaskById(){

        //GIVEN
        when(taskRepo.findById("1")).thenReturn(Optional.of(task1));
        //WHEN
        Task actualTask=taskService.getTaskById("1");
        Task expected = task1;
        //THEN
        verify(taskRepo).findById("1");
        Assertions.assertEquals(expected,actualTask);
    }

    @Test
    void getTaskById_idDoesntExist(){
        // GIVEN
        when(taskRepo.findById("3")).thenReturn(Optional.empty());
        // WHEN
        assertThrows(NoSuchElementException.class, () ->taskService.getTaskById("3"));
        // THEN
        verify(taskRepo).findById("3");
    }

    @Test
    void addTask(){
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        Task taskWithId= new Task("Whatever Id",task1.title(),task1.dateTime());
        when(taskRepo.save(taskWithId)).thenReturn(taskWithId);

        //WHEN
        Task expected=taskWithId;
        Task actualTask=taskService.addTask(task1DTO);

        //THEN
        verify(taskRepo).save(taskWithId);
        verify(idService).generateId();
        Assertions.assertEquals(expected,actualTask);

    }

    @Test
    void addTask_MissingTitle(){
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        TaskDTO invalidTask= new TaskDTO(null,task1.dateTime());

        //WHEN & THEN
        assertThrows(IllegalArgumentException.class,()->taskService.addTask(invalidTask));
    }
    @Test
    void updateTask(){
        //GIVEN
        when(taskRepo.existsById(task1.id())).thenReturn(true);
        when(taskRepo.save(task1)).thenReturn(task1);
        //WHEN
        Task actual=taskService.updateTask(task1.id(),task1DTO);
        Task expected=task1;
        //THEN
        verify(taskRepo).save(task1);
        verify(taskRepo).existsById(task1.id());
        Assertions.assertEquals(expected,actual);
    }
    @Test
    void updateTask_idDoesntExist(){
        //GIVEN
        when(taskRepo.existsById(task1.id())).thenReturn(false);
        //WHEN & THEN
        assertThrows(NoSuchElementException.class,()->taskService.updateTask(task1.id(), task1DTO));
        verify(taskRepo).existsById(task1.id());
    }

    @Test
    void deleteTask_whenTaskExists_thenReturnEmptyList() {
        // GIVEN
        when(taskRepo.existsById(task1.id())).thenReturn(true);
        when(taskRepo.findAll()).thenReturn(new ArrayList<>());
        // WHEN
        List<Task> expected = new ArrayList<>();
        List<Task> actual = taskService.deleteTask(task1.id());
        // THEN
        assertEquals(expected, actual);
        verify(taskRepo).existsById(task1.id());
        verify(taskRepo).findAll();
    }

    @Test
    void deleteTask_whenTaskDoesntExist_thenThrowException() {
        // GIVEN
        when(taskRepo.existsById("5")).thenReturn(false);
        // WHEN
        assertThrows(NoSuchElementException.class, () -> taskService.deleteTask("5"));
        verify(taskRepo).existsById("5");
    }
}