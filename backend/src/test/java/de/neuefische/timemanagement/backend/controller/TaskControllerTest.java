package de.neuefische.timemanagement.backend.controller;

import de.neuefische.timemanagement.backend.repository.TaskRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.boot.test.mock.mockito.MockReset.before;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    TaskRepo taskRepo;
    @BeforeEach
    void setUp() {

    }

    @Test
    @DirtiesContext
    void getAllTasks() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        "[]"));
    }
}