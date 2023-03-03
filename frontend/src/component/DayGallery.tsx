import {useEffect, useState} from "react";
import {Task} from "../model/Task";
import axios from "axios";
import TasksCard from "./TasksCard";
import moment from "moment/moment";
import {useNavigate} from "react-router-dom";


type Props = {
    year:string
    month: string
    day:string

}

export default function DayGallery(props: Props) {

    const[tasks,setTasks]=useState<Task[]>([])
    const navigate = useNavigate()
    const date = moment().year(parseInt(props.year)).month(parseInt(props.month)-1).date(parseInt(props.day));

    function handleLeftButton(){
        date.subtract(1,"d")
        navigate(`/tasks/${date.year()}/${date.month()+1}/${date.date()}`)
    }

    function handleRightButton(){
        date.add(1,"d")
        navigate(`/tasks/${date.year()}/${date.month()+1}/${date.date()}`)
    }

    useEffect(() => {
            axios.get(`/api/tasks/${props.year}/${props.month}/${props.day}`)
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
    }, [props.year, props.month, props.day]);

    const taskCards = tasks.map((task) => {
            return <TasksCard key={task.id} task={task}/>
        }
    )
    return (
        <div>
            <h2>{moment(`${props.year}/${props.month}/${props.day}`).format("dddd")}<br/>
                {moment(`${props.year}/${props.month}/${props.day}`).format("YYYY-MM-DD")}
            </h2>
            <button onClick={handleLeftButton}>◀️</button>
            <button onClick={handleRightButton}>▶️</button>

            {taskCards}
        </div>
    )
}