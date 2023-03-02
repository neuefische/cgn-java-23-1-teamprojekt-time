import {NavLink} from "react-router-dom";
import "./Navigation.css"

export default function Navigation(){
    return(
        <nav className={"nav"}>
            <ul>
                <li>
                    <NavLink to={"/tasks/"}>All Tasks</NavLink>
                </li>
                <li>
                    <NavLink to={"/tasks/add"}>Add Task</NavLink>
                </li>
            </ul>
        </nav>
    )
}