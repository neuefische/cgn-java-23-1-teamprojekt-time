import {Task} from "../model/Task";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";

type Props = {
    tasks:Task[]
    deleteTask:(id: string) => Promise<void>
}

export default function TaskDetails(props:Props){
    const params = useParams()
    const id = params.id
    const navigate=useNavigate()
    const[task,setTask]=useState<Task|undefined>()

    useEffect(() => {
        const filteredTask = props.tasks.find(task => task.id === id);
        if (filteredTask) {
            setTask(filteredTask);
        } else {
            axios.get("/api/tasks/" + id)
                .then(response => response.data)
                .then(setTask)
                .catch(console.error);
        }
    }, [id, props.tasks]);

    if (!task) {
        return (
            <h2>Sorry, no task with id {id} found :(</h2>
        )
    }
    function handleDeleteButton(){
        props.deleteTask(id || "undefined")
            .then(()=>navigate("/tasks/"))
            .catch(console.error)
    }

    return (
        <>
        <h2>{task.title}</h2>
        <div>
            {task.dateTime.getFullYear()} / {task.dateTime.getMonth()+1} / {task.dateTime.getDate()}<br/>
            {task.dateTime.getHours()}:{task.dateTime.getMinutes().toString().padStart(2,'0')}
            <br/>
            <button onClick={handleDeleteButton}>Delete</button>
        </div>
            <Link to={"/tasks/"}>back to gallery</Link>
        </>
    )

}