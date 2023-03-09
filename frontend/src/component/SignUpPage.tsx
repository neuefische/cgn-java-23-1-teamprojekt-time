import Layout from "./Layout";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import "./SignUpPage.css"

export default function SignUpPage (){
    const [username,setUsername] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const navigate = useNavigate()
    const [formError, setFormError] = useState<string>("");

    function handleUsernameChange(event:ChangeEvent<HTMLInputElement>){
        setUsername(event.currentTarget.value)
    }

    function handlePasswordChange(event:ChangeEvent<HTMLInputElement>){
        setPassword(event.currentTarget.value)
    }

    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("/api/users", {
            username,
            password
        }).then(() => {
            navigate("/sign-in");
        }).catch(err => {
            console.error(err);
            setFormError(err.response.data.error || err.response.data.message);
        });
    }


    return (
        <Layout>
            <div style={{padding: "5rem 0"}}>
                <h1>Sign Up</h1>
                <div >
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

                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </Layout>
    );

}