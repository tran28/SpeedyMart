import { useNavigate } from "react-router-dom";
import "./login.css"

function Login() {
    let navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        navigate("/account");
    };

    const handleClick = () => {
        navigate("/account/register");
    };

    return (
        <>
            <div className="main-container">
                <div className="boxes">
                    <div className="box" id="login">
                        <div className="left">
                            <h2>Already Registered</h2>
                        </div>
                        <div className="right">
                            <h3>start new session</h3>
                            <div className="row">
                                <form method="post" action="/account/login" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <input className="text-long" type="email" id="customer_email" placeholder="Email" />
                                    </div>
                                    <div className="row">
                                        <input className="text-long" type="password" id="customer_password" placeholder="Password" />
                                    </div>
                                    <div className="button-wrapper">
                                        <button className="button" type="submit">
                                            <span>Sign In</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="box" id="register">
                        <div className="left">
                            <h2>New Customer</h2>
                        </div>
                        <div className="right">
                            <h3>create new account</h3>
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