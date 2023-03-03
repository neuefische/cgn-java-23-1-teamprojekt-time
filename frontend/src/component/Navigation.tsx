import {NavLink} from "react-router-dom";
import "./Navigation.css"
import moment from "moment";

export default function Navigation(){
    const today=moment()
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
                    <NavLink to={`/tasks/${today.year()}/${today.month()+1}/${today.date()}`}>What's up today</NavLink>
                </li>
                <li>
                    <NavLink to={`/tasks/${today.year()}/week/${today.week()}`}>What's up this week</NavLink>
                </li>
            </ul>
        </nav>
    )
}