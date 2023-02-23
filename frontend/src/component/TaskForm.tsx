import {NewTask} from "../model/Task";
import {ChangeEvent, FormEvent, useState} from "react";

type Props = {
    onAdd:(newTask:NewTask)=>Promise<void>
    title : string
    dateTime : Date
    action:"add"|"Update"
}


export default function TaskForm (props:Props){
    const [title,setTitle] = useState<string>(props.title)
    const [dateTime,setDateTime] = useState<Date>(props.dateTime)

    function handleTitleChange(event:ChangeEvent<HTMLInputElement>){
        setTitle(event.target.value)
    }

    function handleDateTimeChange(event:ChangeEvent<HTMLInputElement>){
        const date = new Date(event.target.value)
        setDateTime(date)
    }

    function formSubmitHandler(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        const newTask : NewTask = {
            title,dateTime
        }
        props.onAdd(newTask)
            .then(()=>{
                setTitle("")
                setDateTime(new Date())
            })
    }
   return(
       <form onSubmit={formSubmitHandler} className={"add-task"}>
           <label>
               Title:
               <input type={"text"} onChange={handleTitleChange} value={title} placeholder={"Have a long break"}required={true}/>
           </label>
           <label>Please select date and time:
               <input type={"datetime-local"} onChange={handleDateTimeChange} value={dateTime.toISOString().slice(0,-5)}required={true}/>
           </label>
           <button type={"submit"}>{props.action=="add"&& "Save"}{props.action=="Update"&& "Update"}</button>
       </form>
   )
}