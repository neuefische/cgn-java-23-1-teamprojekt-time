import {Task} from "../model/Task";
import React from "react";
import "./TaskCard.css";
import {Link} from "react-router-dom";

type Props={
    task:Task
}
export default function TasksCard(props:Props){

   return(
       <div className={"task-card"}>
           <h2>{props.task.title}</h2>
           {props.task.dateTime.getFullYear()} / {props.task.dateTime.getMonth()+1} / {props.task.dateTime.getDate()}<br/>
           {props.task.dateTime.getHours()}:{props.task.dateTime.getMinutes()}
           <br/>
           <Link to={"/tasks/"+props.task.id}>details</Link>
       </div>
   )
}