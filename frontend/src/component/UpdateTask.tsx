import {Task} from "../model/Task";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import TaskForm from "./TaskForm";

type Props = {
    tasks: Task[],
    onUpdate: (updatedTask: Task) => Promise<void>
}

export default function UpdateTask(props: Props) {
    const params = useParams();
    const taskId: String | undefined = params.id;

    const [task, setTask] = useState<Task | undefined>();

    useEffect(() => {
        const filteredTask = props.tasks.find(task => task.id === taskId);
        if (filteredTask) {
            setTask(filteredTask);
        } else {
            axios.get("/api/tasks/" + taskId)
                .then(response => response.data)
                .then(setTask)
                .catch(console.error);
        }
    }, [taskId, props.tasks]);

    if (!task) {
        return (
            <h2>Sorry, no task with id {taskId} found :(</h2>
        )
    }

    return (
        <>
            <h2>Update Task</h2>
            <TaskForm
                onSubmit={props.onUpdate}
                task={task}
                action={"update"}
            />
        </>
    )
}