package de.neuefische.timemanagement.backend.controller;

import de.neuefische.timemanagement.backend.model.Task;
import de.neuefische.timemanagement.backend.repository.TaskRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.time.Instant;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
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
        Instant today= Instant.parse("2023-03-02T15:30:00Z");
        task1=new Task("1", "task 1",today );
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void getAllTasks() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/tasks/"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        "[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void addTask() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/tasks/")
                        .contentType(MediaType.APPLICATION_JSON).content("""               
                                {"id": null, "title": "task 1","dateTime": "2023-02-23T09:32:27.325Z" }
                                    """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """                        
                                {"title": "task 1","dateTime": "2023-02-23T09:32:27.325Z" }
                                    """
                )).andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void addTaskNotValidDateTime() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/tasks/")
                        .contentType(MediaType.APPLICATION_JSON).content("""               
                                {"id": null, "title": "task 1","dateTime": "Non valid DateTime" }
                                    """)
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
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
    @WithMockUser(username = "user")
    void getTaskById_WhenId_isNot_Valid_Then_404() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/tasks/1"))
                .andExpect(status().isNotFound());

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
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
                        """)
                        .with(csrf()))
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
    @WithMockUser(username = "user")
    void deleteTask_whenIDExists_thenReturnEmptyList() throws Exception {
        taskRepo.save(task1);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/tasks/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void getTasksForDay_whenOneTaskExists_thenReturnThatTask() throws Exception {
        taskRepo.save(task1);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/tasks/2023/03/02?offset=0"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                            {
                                "id": "1",
                                "title": "task 1",
                                "dateTime": "2023-03-02T15:30:00Z"
                            }
                        ]
                                                """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void getTasksForDay_whenOneTaskExistsOnAnotherDay_thenReturnEmptyList() throws Exception {
        taskRepo.save(task1);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/tasks/2024/03/02?offset=0"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                                                """));
    }
}