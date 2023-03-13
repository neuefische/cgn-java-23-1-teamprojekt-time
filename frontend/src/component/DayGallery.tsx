import {useEffect, useState} from "react";
import {Task} from "../model/Task";
import axios from "axios";
import TaskCard from "./TaskCard";
import moment from "moment/moment";
import {User} from "../model/User";



type Props = {
    year: string
    month: string
    day: string,
    user: User | null

}

export default function DayGallery(props: Props) {

    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        axios.get(`/api/tasks/${props.year}/${props.month}/${props.day}?offset=${moment().utcOffset() / 60}`)
            .then(response => response.data
                .map((task: { dateTime: string; }) =>
                    ({
                        ...task,
                        dateTime: new Date(task.dateTime)
                    })
                )
            )
            .then(setTasks)
            .catch(console.error);
    }, [props.year, props.month, props.day]);

    const taskCards = tasks.map((task) => {
            return <TaskCard key={task.id} task={task} user={props.user} />
        }
    )
    return (
        <div className={"day-gallery"}>
            <h2>{moment(`${props.year}/${props.month}/${props.day}`).format("dddd")}<br/>
                {moment(`${props.year}/${props.month}/${props.day}`).format("YYYY-MM-DD")}
            </h2>

            {taskCards}
        </div>
    )
}