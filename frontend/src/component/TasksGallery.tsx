import {Task} from "../model/Task";
import TasksCard from "./TasksCard";

type Props={
    tasks:Task[]
}
export default function TasksGallery(props:Props){
    const taskCard=props.tasks.map((task)=>{
        return <TasksCard key={task.id} task={task}/>
        }
    )
    return<div>
        {taskCard}
    </div>
}