import {Task} from "../model/Task";
import React from "react";
import "./TaskCard.css";
import {Link} from "react-router-dom";
import {User} from "../model/User";

type Props={
    task: Task,
    user: User | null
}
export default function TaskCard(props:Props){
   return(
       <div className={"task-card"}>
           <h2>{props.task.title}</h2>
           {props.task.dateTime.getFullYear()} / {(props.task.dateTime.getMonth()+1).toString().padStart(2,'0')} / {props.task.dateTime.getDate().toString().padStart(2,'0')}<br/>
           {props.task.dateTime.getHours().toString().padStart(2,'0')}:{props.task.dateTime.getMinutes().toString().padStart(2,'0')}
           <br/>
           <Link to={"/tasks/"+props.task.id}>Details</Link>
           <br/>
           {props.user && props.user.id === props.task.userId ? <Link to={`/tasks/${props.task.id}/update`}>Edit</Link> : "\u00A0" }
       </div>
   )
}