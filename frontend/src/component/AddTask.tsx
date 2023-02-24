import {Task} from "../model/Task";
import './AddTask.css'
import TaskForm from "./TaskForm";

type Props = {
    onAdd: (newTask: Task) => Promise<void>
}

export default function AddTask(props: Props) {

    return (
        <>
            <h2>Add New Task</h2>
            <TaskForm
                onSubmit={props.onAdd}
                task={{title: "", dateTime: new Date()}}
                action={"add"}
            />
        </>
    )

}