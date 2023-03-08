package de.neuefische.timemanagement.backend.exception;

public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(){
        super("Current Task not found");

    }
    public TaskNotFoundException(String message){
        super(message);

    }

}
