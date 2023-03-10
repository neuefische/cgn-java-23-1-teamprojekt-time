import {Link, NavLink, useLocation} from "react-router-dom";
import "./Navigation.css"
import moment from "moment";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export default function Navigation() {
    const today = moment()
    const user = useAuth(false);
    const location = useLocation()
    function handleLogOutClick(){
        axios.post("/api/users/logout").then(() => {
            window.sessionStorage.setItem(
                "signInRedirect",
                location.pathname || "/"
            );
            window.location.href = "/sign-in";
        });
    }
    return (

        <nav className={"nav"}>
            <ul>
                {user ?
                    <>
                        <li>
                            <NavLink to={"/tasks/"}>All tasks</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/tasks/add"}>Add task</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/tasks/${today.year()}/${today.month() + 1}/${today.date()}`}>What's up
                                today?</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/tasks/${today.year()}/week/${today.week()}`}>What's up this week?</NavLink>
                        </li>
                        <li>
                            <Link to={"#"} onClick={handleLogOutClick}>Sign out</Link>
                        </li>

                    </>
                    :
                    <>
                        <li>
                            <NavLink to={"/sign-up/"}>Sign up</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/sign-in/"}>Sign in</NavLink>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}