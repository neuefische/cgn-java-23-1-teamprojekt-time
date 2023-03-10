import {Task} from "../model/Task";
import TaskForm from "../component/TaskForm";
import Layout from "../component/Layout";

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