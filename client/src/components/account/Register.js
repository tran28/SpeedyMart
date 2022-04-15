import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./account.css"

function Register() {
    let navigate = useNavigate();

    // set of states to keep track of name, email, password
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // validate function to be used in handleSubmit function
    const validate = () => {
        let isValid = true;
        if (!email) {
            setEmailError("email can't be blank")
            document.getElementById("create_email").style.background = "#f1c7c3";
            isValid = false;
        }
        if (!password) {
            setPasswordError("password can't be blank")
            document.getElementById('create_password').style.background = "#f1c7c3";;
            isValid = false;
        }
        return isValid;
    }

    // handleSubmit function to be used when <form></form> block onSubmit={} is called
    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        // validate form
        const isValid = validate();
        if (isValid) {
            navigate("/account/login");
        }
        else {
            console.log({
                message: "missing email and/or password",
                name,
                email,
                password,
            })
        }
    }

    return (
        <>
            <div className="main-container">
                <div className="boxes">
                    <div className="box" id="login">
                        <div className="left">
                            <h2>Create New Account</h2>
                        </div>
                        <div className="right">
                            <h3>provide us with your contact information</h3>
                            <div className="row">
                                <form method="post" id="create_customer" onSubmit={handleSubmit}>

                                    {/* M: This is the 'name' input */}
                                    <div className="row">
                                        <input className="text-long" type="text" id="create_name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                                    </div>

                                    {/* M: This is the 'email' input
                                        Error shows up and input box turns red when 'email' is blank.
                                        Upon re-click, error disapears and input box turns back to white.
                                    */}
                                    <div className="row">
                                        <input className="text-long" type="email" id="create_email" placeholder="Email" value={email} onChange={e => {
                                            setEmail(e.target.value);
                                            e.target.style.background = "white";
                                            setEmailError("");
                                        }} />
                                    </div>
                                    <h3 >{emailError}</h3>

                                    {/* M: This is the 'password' input
                                        Error shows up and input box turns red when 'password' is blank.
                                        Upon re-click, error disapears and input box turns back to white.
                                    */}
                                    <div className="row">
                                        <input className="text-long" type="password" id="create_password" placeholder="Password" value={password} onChange={e => {
                                            setPassword(e.target.value);
                                            e.target.style.background = "white";
                                            setPasswordError("");

                                        }} />
                                    </div>
                                    <h3>{passwordError}</h3>

                                    {/* M: This is the 'Create my account' button */}
                                    <div className="button-wrapper">
                                        <button className="button" type="submit">
                                            <span>Create my account</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Register;