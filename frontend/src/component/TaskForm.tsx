import {Task} from "../model/Task";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

type Props = {
    onSubmit: (task: Task) => Promise<void>,
    task: Task
    action: "add" | "update"
    navigateTo:string | undefined
}

export default function TaskForm(props: Props) {
    const [title, setTitle] = useState<string>(props.task.title)
    const [dateTime, setDateTime] = useState<Date>(props.task.dateTime)
    const [dateTimeString, setDateTimeString] = useState("");
    const navigate=useNavigate()

    useEffect(() => {
            const d = new Date(dateTime.valueOf() - dateTime.getTimezoneOffset() * 60000);
            setDateTimeString(d.toISOString().slice(0, -5));
    }, [dateTime]);

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function handleDateTimeChange(event: ChangeEvent<HTMLInputElement>) {
        const date = new Date(event.target.value)
        setDateTime(date)
    }

    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newTask: Task = {
            title,
            dateTime
        }
        if (props.task.id) {
            newTask.id = props.task.id
        }
        props.onSubmit(newTask)
            .then(() => {
                setTitle("")
                setDateTime(new Date())
                if(props.navigateTo){
                    navigate(props.navigateTo)
                }
            })
    }

    return (
        <form onSubmit={formSubmitHandler} className={"add-task"}>
            <label>
                Title:
                <input type={"text"} onChange={handleTitleChange} value={title} placeholder={"Have a long break"}
                       required={true}/>
            </label>
            <label>Please select date and time:
                <input type={"datetime-local"} onChange={handleDateTimeChange}
                       value={dateTimeString} required={true}/>
            </label>
            <button type={"submit"}>
                {props.action === "add" && "Save"}
                {props.action === "update" && "Update"}
            </button>
        </form>
    )
}