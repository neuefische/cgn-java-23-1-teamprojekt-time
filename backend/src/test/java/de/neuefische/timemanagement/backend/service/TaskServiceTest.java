package de.neuefische.timemanagement.backend.service;
import de.neuefische.timemanagement.backend.exception.TaskNotFoundException;
import de.neuefische.timemanagement.backend.model.MongoUserResponse;
import de.neuefische.timemanagement.backend.model.Task;
import de.neuefische.timemanagement.backend.model.TaskDTO;
import de.neuefische.timemanagement.backend.repository.TaskRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.security.Principal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class TaskServiceTest {
    TaskRepo taskRepo;
    TaskService taskService;
    IdService idService;
    TaskDTO task1DTO;
    Task task1;
    MongoUserDetailsService mongoUserDetailsService;
    Principal principal;

    @BeforeEach
    void setUp() {
        taskRepo= mock(TaskRepo.class);
        idService=mock(IdService.class);
        mongoUserDetailsService = mock(MongoUserDetailsService.class);
        principal = mock(Principal.class);
        taskService = new TaskService(taskRepo,idService,mongoUserDetailsService);
        Instant today= Instant.parse("2023-03-02T15:30:00Z");
        task1DTO = new TaskDTO( "task 1", today);
        task1 = new Task("1", task1DTO.title(), task1DTO.dateTime(),"a");
    }

    @Test
    void getAllTasks() {
        //GIVEN
        when(taskRepo.findAllByOrderByDateTimeAsc()).thenReturn(new ArrayList<>());
        //WHEN
        List<Task> actual = taskService.getAllTasks();
        List<Task> expected = new ArrayList<>();
        //THEN
        verify(taskRepo).findAllByOrderByDateTimeAsc();
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
        assertThrows(TaskNotFoundException.class, () ->taskService.getTaskById("3"));
        // THEN
        verify(taskRepo).findById("3");
    }

    @Test
    void addTask(){
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        Task taskWithId= new Task("Whatever Id",task1.title(),task1.dateTime(),"a");
        when(taskRepo.save(taskWithId)).thenReturn(taskWithId);
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));

        //WHEN
        Task expected=taskWithId;
        Task actualTask=taskService.addTask(task1DTO,principal);

        //THEN
        verify(taskRepo).save(taskWithId);
        verify(idService).generateId();
        verify(mongoUserDetailsService).getMe(principal);
        Assertions.assertEquals(expected,actualTask);

    }

    @Test
    void addTask_MissingTitle(){
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        TaskDTO invalidTask= new TaskDTO(null,task1.dateTime());

        //WHEN & THEN
        assertThrows(IllegalArgumentException.class,()->taskService.addTask(invalidTask,principal));
    }
    @Test
    void updateTask(){
        //GIVEN
        when(taskRepo.save(task1)).thenReturn(task1);
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        when(taskRepo.findById(task1.id())).thenReturn(Optional.ofNullable(task1));
        //WHEN
        Task actual=taskService.updateTask(task1.id(),task1DTO,principal);
        Task expected=task1;
        //THEN
        verify(taskRepo).save(task1);
        verify(mongoUserDetailsService).getMe(principal);
        verify(taskRepo).findById(task1.id());
        Assertions.assertEquals(expected,actual);
    }
    @Test
    void updateTask_idDoesntExist(){
        //GIVEN
        when(taskRepo.existsById(task1.id())).thenReturn(false);
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        when(taskRepo.findById(task1.id())).thenReturn(Optional.empty());
        //WHEN & THEN
        assertThrows(TaskNotFoundException.class,()->taskService.updateTask(task1.id(), task1DTO,principal));
        verify(mongoUserDetailsService).getMe(principal);
        verify(taskRepo).findById(task1.id());
    }

    @Test
    void deleteTask_whenTaskDoesntExist_thenThrowException() {
        // GIVEN
        when(taskRepo.findById("5")).thenReturn(Optional.empty());
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        // WHEN
        assertThrows(TaskNotFoundException.class, () -> taskService.deleteTask("5",principal));
        verify(mongoUserDetailsService).getMe(principal);
        verify(taskRepo).findById("5");
    }

    @Test
    void deleteTask_whenTaskExists_thenReturnEmptyList() {
        // GIVEN

        when(taskRepo.findAllByOrderByDateTimeAsc()).thenReturn(new ArrayList<>());
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        when(taskRepo.findById(task1.id())).thenReturn(Optional.ofNullable(task1));

        // WHEN
        List<Task> expected = new ArrayList<>();
        List<Task> actual = taskService.deleteTask(task1.id(),principal);
        // THEN
        assertEquals(expected, actual);
        verify(taskRepo).findAllByOrderByDateTimeAsc();
        verify(mongoUserDetailsService).getMe(principal);
        verify(taskRepo).findById(task1.id());
    }

    @Test
    void getTasksForDay_whenOneTaskExists_thenReturnThatTask() {
        // GIVEN
        Instant startDate = Instant.parse("2023-03-02T00:00:00Z");
        Instant stopDate = startDate.plus(1, ChronoUnit.DAYS);
        when(taskRepo.getTasksByDateTimeBetweenOrderByDateTimeAsc(startDate, stopDate)).thenReturn(List.of(task1));
        // WHEN
        List<Task> expected = List.of(task1);
        List<Task> actual = taskService.getTasksForDay(2023, 3, 2,0);
        // THEN
        assertEquals(expected, actual);
        verify(taskRepo).getTasksByDateTimeBetweenOrderByDateTimeAsc(startDate, stopDate);
    }
}