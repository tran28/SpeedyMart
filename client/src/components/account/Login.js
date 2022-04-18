import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./account.css"

function Login() {
    let navigate = useNavigate();

    // set of states to keep track of email, password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const redirect = localStorage.getItem("redirect");

    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        // login user
        var axios = require('axios');
        var data = JSON.stringify({
            "email": email,
            "password": password,
        });
        var config = {
            method: 'post',
            url: '/api/users/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(res => {
                // add token to localStorage
                localStorage.setItem("jwtToken", "Bearer " + res.data.token);
                // navigate to the corresponding page route depending on account type
                if (res.data.isAdmin) {
                    navigate("/admin");
                    localStorage.setItem("admin", true);
                }
                else {
                    navigate("/account");
                }
                // remove redirect key once logged in
                localStorage.removeItem("redirect");
            })
            .catch(err => {
                console.log(err);
                setLoginError("Incorrect email or password.");
            });
    };

    const handleClick = () => {
        navigate("/account/register");
    };

    return (
        <>
            <div className="main-container">
                <div className="boxes">
                    {/* M: This is top 'Already Registered' block */}
                    <div className="box" id="login">
                        <div className="left">
                            <h2>Already Registered</h2>
                        </div>
                        <div className="right">
                            <h3>start new session</h3>
                            <div className="row">
                                <form method="post" action="/account/login" onSubmit={handleSubmit}>

                                    {/* M: This is the 'email' input */}
                                    <div className="row">
                                        <input className="text-long" type="email" id="customer_email" placeholder="Email" value={email} onChange={e => {
                                            setEmail(e.target.value);
                                            setLoginError("");
                                        }} />
                                    </div>

                                    {/* M: This is the 'password' input */}
                                    <div className="row">
                                        <input className="text-long" type="password" id="customer_password" placeholder="Password" value={password} onChange={e => {
                                            setPassword(e.target.value)
                                            setLoginError("");
                                        }} />
                                    </div>

                                    {/* M: This is the 'loginError' output
                                        Error shows up if email and/or password does not match database
                                    */}
                                    <h3 >{loginError}</h3>

                                    {/* M: User must be signed in before adding item to cart */}
                                    <h3 className={redirect ? "warning-h3" : "hidden"}>please sign in to add items to cart</h3>

                                    {/* M: This is the 'Sign in' button */}
                                    <div className="button-wrapper">
                                        <button className="button" type="submit">
                                            <span>Sign in</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* M: This is bottom 'New Customer' block */}
                    <div className="box" id="register">
                        <div className="left">
                            <h2>New Customer</h2>
                        </div>
                        <div className="right">
                            <h3>create new account</h3>

                            {/* M: This is the 'Register' button */}
                            <div className="button-wrapper">
                                <button className="button" onClick={handleClick}>
                                    <span>Register</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Login;