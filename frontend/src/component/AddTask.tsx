import {Task} from "../model/Task";
import './AddTask.css'
import TaskForm from "./TaskForm";
import Layout from "./Layout";

type Props = {
    onAdd: (newTask: Task) => Promise<void>
}

export default function AddTask(props: Props) {

    return (
        <Layout>
            <h2>Add New Task</h2>
            <TaskForm navigateTo={"/tasks"}
                onSubmit={props.onAdd}
                task={{title: "", dateTime: new Date()}}
                action={"add"}
            />
        </Layout>
    )

}