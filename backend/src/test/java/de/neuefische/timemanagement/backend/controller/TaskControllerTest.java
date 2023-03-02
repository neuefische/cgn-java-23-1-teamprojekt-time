package de.neuefische.timemanagement.backend.controller;

import de.neuefische.timemanagement.backend.model.Task;
import de.neuefische.timemanagement.backend.repository.TaskRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    TaskRepo taskRepo;
    Task task1;

    @BeforeEach
    void setUp() {
        Instant today= Instant.now().truncatedTo(ChronoUnit.MILLIS);
        task1=new Task("1", "task 1",today );
    }

    @Test
    @DirtiesContext
    void getAllTasks() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/tasks/"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        "[]"));
    }

    @Test
    @DirtiesContext
    void addTask() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/tasks/")
                        .contentType(MediaType.APPLICATION_JSON).content("""               
                                {"id": null, "title": "task 1","dateTime": "2023-02-23T09:32:27.325Z" }
                                    """))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """                        
                                {"title": "task 1","dateTime": "2023-02-23T09:32:27.325Z" }
                                    """
                )).andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void addTaskNotValidDateTime() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/tasks/")
                        .contentType(MediaType.APPLICATION_JSON).content("""               
                                {"id": null, "title": "task 1","dateTime": "Non valid DateTime" }
                                    """))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void getTaskById() throws Exception {
        taskRepo.save(task1);
            mockMvc.perform(MockMvcRequestBuilders.get("/api/tasks/1"))
                    .andExpect(status().isOk())
                    .andExpect(content().json(
                            """                        
                                    { "id":"1","title": "task 1","dateTime": "%s"}
                                        """.formatted(task1.dateTime())
                    ));

    }
    @Test
    @DirtiesContext
    void updateTask() throws Exception{
        taskRepo.save(task1);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/tasks/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "id": "1",
                        "title": "task updated",
                        "dateTime":"2023-02-23T09:32:27.325Z"
                        }
                        """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "1",
                        "title": "task updated",
                        "dateTime":"2023-02-23T09:32:27.325Z"
                        }
                        """));
    }

    @Test
    @DirtiesContext
    void deleteTask_whenIDExists_thenReturnEmptyList() throws Exception {
        taskRepo.save(task1);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/tasks/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}