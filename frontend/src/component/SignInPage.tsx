import axios from "axios";
import {ChangeEvent, FormEvent, useState} from "react";
import Layout from "./Layout";
import {useNavigate} from "react-router-dom";

export default function SignInPage () {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    function handleUsernameChange(event:ChangeEvent<HTMLInputElement>){
        setUsername(event.currentTarget.value)
    }

    function handlePasswordChange(event:ChangeEvent<HTMLInputElement>){
        setPassword(event.currentTarget.value)
    }

    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        const btoaString = `${username}:${password}`
        event.preventDefault();
        axios.post("/api/users/login", {}, {
            headers: {
                Authorization: `Basic ${window.btoa(btoaString)}`
            }
        }).then(() => {
            navigate("/");
        }).catch(err => {
            alert(err.response.data.error);
        });
    }

    return (
        <Layout>
            <div style={{padding: "5rem 0"}}>
                <h1>Sign In</h1>
                <div>
                    <form onSubmit={formSubmitHandler}>
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

                        <button type="submit">Sign In</button>

                    </form>
                </div>
            </div>
        </Layout>
    );
}