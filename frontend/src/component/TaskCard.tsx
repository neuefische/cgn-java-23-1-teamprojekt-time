import {Task} from "../model/Task";
import React from "react";
import "./TaskCard.css";
import {Link} from "react-router-dom";

type Props={
    task:Task
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
           <Link to={`/tasks/${props.task.id}/update`}>Edit</Link>
       </div>
   )
}