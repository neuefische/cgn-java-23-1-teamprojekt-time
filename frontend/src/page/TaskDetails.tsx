import {Task} from "../model/Task";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Layout from "../component/Layout";
import useAuth from "../hooks/useAuth";
import "./TaskDetails.css";

type Props = {
    tasks: Task[]
    deleteTask: (id: string) => Promise<void>
}

export default function TaskDetails(props: Props) {
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()
    const [task, setTask] = useState<Task | undefined>()
    const user = useAuth(true)

    useEffect(() => {
        const filteredTask = props.tasks.find(task => task.id === id);
        if (filteredTask) {
            setTask(filteredTask);
        }
    }, [id, props.tasks]);

    if (!task) {
        return (
            <h2>Sorry, no task with id {id} found :(</h2>
        )
    }

    function handleDeleteButton() {
        props.deleteTask(id || "undefined")
            .then(() => navigate("/tasks/"))
            .catch(console.error)
    }

    return !user ? null : (
        <Layout>
            <h2>{task.title}</h2>
            <div className={"task-details"}>
                {task.dateTime.getFullYear()} / {task.dateTime.getMonth() + 1} / {task.dateTime.getDate()}<br/>
                {task.dateTime.getHours()}:{task.dateTime.getMinutes().toString().padStart(2, '0')}
                <br/>
                <br/>
                <button onClick={handleDeleteButton}>Delete</button>
            </div>
            <br/>
            <Link to={"/tasks/"}>back to gallery</Link>
        </Layout>
    )
}