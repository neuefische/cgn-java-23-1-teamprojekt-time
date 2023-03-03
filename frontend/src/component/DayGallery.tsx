import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Task} from "../model/Task";
import axios from "axios";
import TasksCard from "./TasksCard";
import moment from "moment/moment";

export default function DayGallery() {
    const params = useParams()
    const year = params.year
    const month = params.month
    const day = params.day
    const[tasks,setTasks]=useState<Task[]>([])

    useEffect(() => {
            axios.get(`/api/tasks/${year}/${month}/${day}/offset/${moment().utcOffset()/60}`)
                .then(response => response.data
                    .map((task: { dateTime: string; }) =>
                        ({
                            ...task,
                            dateTime:new Date(task.dateTime)
                        })
                    )
                )
                .then(setTasks)
                .catch(console.error);
    }, []);

    const taskCards = tasks.map((task) => {
            return <TasksCard key={task.id} task={task}/>
        }
    )
    return (
        <>
            <h2>{moment(`${year}/${month}/${day}`).format("dddd. YYYY-MM-DD")}</h2>
            {taskCards}
        </>
    )
}