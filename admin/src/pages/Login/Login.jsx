import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

const Login = ({ url, setToken }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                url + "/api/admin/login",
                {
                    email,
                    password
                }
            );

            if (response.data.success) {

                localStorage.setItem("adminToken", response.data.token);

                setToken(response.data.token);

            } else {
                alert(response.data.message);
            }

        } catch (error) {
               console.log(error);
               console.log(error.response);
               console.log(error.message);
               alert("Login Failed");

        }
    };

    return (
        <div className="login">

            <form className="login-container" onSubmit={onSubmitHandler}>

                <div className="login-title">
                    <h2>Admin Panel</h2>
                    <p>Login to continue</p>
                </div>

                <div className="login-input">

                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />

                </div>

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    )
}

export default Login;