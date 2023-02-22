import {Task} from "../model/Task";
import React from "react";

type Props={
    task:Task
}
export default function TasksCard(props:Props){
   return(
       <div>
           {props.task.id}
           {props.task.title}
           {props.task.dateTime.toString()}
       </div>
   )
}