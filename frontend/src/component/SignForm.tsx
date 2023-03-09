import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
type Props={
    action: "sign-up" | "sign-in"
}

export default function SignForm(props:Props){
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const [formError, setFormError] = useState<string>("");

    function handleUsernameChange(event:ChangeEvent<HTMLInputElement>){
        setUsername(event.currentTarget.value)
    }

    function handlePasswordChange(event:ChangeEvent<HTMLInputElement>){
        setPassword(event.currentTarget.value)
    }

    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        const btoaString = `${username}:${password}`
        const  url="/api/users"+(props.action === "sign-in" ? "/login" : null)
        const data=props.action === "sign-in" ? {} : {username, password}
        const config=props.action === "sign-in" ? {headers: {Authorization: `Basic ${window.btoa(btoaString)}`}} :{}
        event.preventDefault();
        axios.post(url, data, config)
            .then(() => {
            navigate("/");
        }).catch(err => {
            console.error(err);
            setFormError(err.response.data.error || err.response.data.message);
        });
    }
    return(
        <form className={"signup-form"} onSubmit={formSubmitHandler}>
            {formError && <div className={"form-error"}>Error: {formError}</div>}
            <div>
                <label>
                    Username<br/>
                    <input
                        type="text"
                        value={username}
                        placeholder={"username"}
                        onChange={handleUsernameChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Password<br/>
                    <input
                        type="password"
                        value={password}
                        placeholder={"password"}
                        onChange={handlePasswordChange}
                    />
                </label>
            </div>

            <button type="submit">
                {props.action === "sign-in" && "Sign In"}
                {props.action === "sign-up" && "Sign Up"}
            </button>
        </form>
    )
}