import {useEffect, useState} from "react";
import {NewTask, Task} from "../model/Task";
import axios from "axios/index";



export default function useTask(){
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
            setTasks(prevState => [...prevState,response.data])
        })
        .catch(console.error)
}

useEffect(()=> {
    loadAllTasks()
},[])

return {tasks,postNewTask}
}