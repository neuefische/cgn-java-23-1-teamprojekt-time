import {Task} from "../model/Task";
import TasksCard from "./TasksCard";
import "./TaskGallery.css";

type Props = {
    tasks: Task[]
}
export default function TasksGallery(props: Props) {
    const taskCards = props.tasks.map((task) => {
            return <TasksCard key={task.id} task={task}/>
        }
    )
    return (
        <>
            <h2>All Tasks</h2>
            <section className={"task-gallery"}>
                {taskCards.length>0 ? taskCards : "No Tasks Yet"}
            </section>
        </>
    )
}