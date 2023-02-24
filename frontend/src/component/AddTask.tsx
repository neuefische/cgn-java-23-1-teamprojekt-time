import {NewTask} from "../model/Task";
import './AddTask.css'
import TaskForm from "./TaskForm";

type Props = {
    onAdd: (newTask: NewTask) => Promise<void>
}

export default function AddTask(props: Props) {

    return (
        <>
            <h2>Add New Task</h2>
            <TaskForm
                onSubmit={props.onAdd}
                title={""}
                dateTime={new Date()}
                action={"add"}
            />
        </>
    )

}