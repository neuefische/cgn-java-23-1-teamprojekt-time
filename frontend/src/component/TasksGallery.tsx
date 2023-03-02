import {Task} from "../model/Task";
import TasksCard from "./TasksCard";
import "./TaskGallery.css";

type Props = {
    tasks: Task[]
}
export default function TasksGallery(props: Props) {
    const taskCard = props.tasks.map((task) => {
            return <TasksCard key={task.id} task={task}/>
        }
    )
    return (
        <>
            <h2>All Tasks</h2>
            <section className={"task-gallery"}>
                {taskCard.length>0 ? taskCard : "No Tasks Yet"}
            </section>
        </>
    )
}