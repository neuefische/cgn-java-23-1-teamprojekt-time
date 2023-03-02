import {NavLink} from "react-router-dom";
import "./Navigation.css"

export default function Navigation(){
    const today=new Date()
    return(
        <nav className={"nav"}>
            <ul>
                <li>
                    <NavLink to={"/tasks/"}>All Tasks</NavLink>
                </li>
                <li>
                    <NavLink to={"/tasks/add"}>Add Task</NavLink>
                </li>
                <li>
                    <NavLink to={`/tasks/${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`}>What's up today</NavLink>
                </li>
            </ul>
        </nav>
    )
}