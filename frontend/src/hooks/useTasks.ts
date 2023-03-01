import {useEffect, useState} from "react";
import {NewTask, Task} from "../model/Task";
import axios from "axios";




export default function useTasks(){
const [tasks,setTasks]=useState<Task[]>([]);
function loadAllTasks(){
    axios.get("/api/tasks/")
        .then(response => response.data
            .map((task: { dateTime: string; }) =>
                ({
                    ...task,
                    dateTime:new Date(task.dateTime)
                })
            )
        )
        .then(setTasks)
        .catch(console.error)
}

    function postNewTask(newTask: NewTask){
        return axios.post("/api/tasks/",newTask)
            .then(response=>{
                const returnedTask ={
                    ...response.data,
                    dateTime:new Date(response.data.dateTime)
                }
                setTasks(prevState => [...prevState,returnedTask])
            })
            .catch(console.error)
    }

useEffect(()=> {
    loadAllTasks()
},[])

return {tasks,postNewTask}
}