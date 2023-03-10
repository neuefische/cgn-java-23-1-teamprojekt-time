import {Task} from "../model/Task";
import TaskCard from "../component/TaskCard";
import "./TaskGallery.css";
import Layout from "../component/Layout";
import useAuth from "../hooks/useAuth";

type Props = {
    tasks: Task[]
}
export default function TasksGallery(props: Props) {
    const user = useAuth(true)
    const taskCards = props.tasks.map((task) => {
            return <TaskCard key={task.id} task={task}/>
        }
    )
    return !user ? null : (
        <Layout>
            <h2>All Tasks</h2>
            <section className={"task-gallery"}>
                {taskCards.length>0 ? taskCards : "No Tasks Yet"}
            </section>
        </Layout>
    )
}