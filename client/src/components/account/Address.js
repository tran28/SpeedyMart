import { useState } from "react";

function Address() {
    const [street, setStreet] = useState("");
    const [unit, setUnit] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const [blankError, setBlankError] = useState("");
    const blankErrorMessage = "cannot be blank"

    const validate = () => {
        let isValid = true;
        if (!street) {
            setBlankError(blankErrorMessage)
            document.getElementById("add_street").style.background = "#f1c7c3";
            isValid = false;
        }
        if (!city) {
            setBlankError(blankErrorMessage)
            document.getElementById("add_city").style.background = "#f1c7c3";
            isValid = false;
        }
        if (!province) {
            setBlankError(blankErrorMessage)
            document.getElementById("add_province").style.background = "#f1c7c3";
            isValid = false;
        }
        if (!postalCode) {
            setBlankError(blankErrorMessage)
            document.getElementById("add_postalcode").style.background = "#f1c7c3";
            isValid = false;
        }
        if (!country) {
            setBlankError(blankErrorMessage)
            document.getElementById("add_country").style.background = "#f1c7c3";
            isValid = false;
        }
        return isValid;
    }

    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        // validate form
        const isValid = validate();
        if (isValid) {
            // run axios to add address
        }
        else {
            console.log({
                message: "missing email and/or password",
                street,
                unit,
                city,
                province,
                postalCode,
                country,
            })
        }

    }


    return (
        <>
            <div className="main-container">
                <div className="boxes">
                    <div className="box">
                        <div className="left">
                            <h2>Your Address</h2>
                        </div>
                        <div className="right">
                            <h3>provide us with an address</h3>
                            <div className="row">
                                <form method="post" id="create_customer" onSubmit={handleSubmit}>

                                    <div className="row">
                                        <input className="text-long" type="text" id="add_street" placeholder="Street" value={street} onChange={e => {
                                            setStreet(e.target.value);
                                            e.target.style.background = "white";
                                            setBlankError("");
                                        }} />
                                    </div>
                                    <h3 >{blankError}</h3>

                                    <div className="row">
                                        <input className="text-long" type="text" id="add_unit" placeholder="Unit (optional)" value={unit} onChange={e => {
                                            setUnit(e.target.value);
                                            e.target.style.background = "white";
                                            setBlankError("");
                                        }} />
                                    </div>

                                    <div className="row">
                                        <input className="text-long" type="text" id="add_city" placeholder="City" value={city} onChange={e => {
                                            setCity(e.target.value);
                                            e.target.style.background = "white";
                                            setBlankError("");
                                        }} />
                                    </div>
                                    <h3 >{blankError}</h3>

                                    <div className="row">
                                        <input className="text-long" type="text" id="add_province" placeholder="Province" value={province} onChange={e => {
                                            setProvince(e.target.value);
                                            e.target.style.background = "white";
                                            setBlankError("");

                                        }} />
                                    </div>
                                    <h3>{blankError}</h3>

                                    <div className="row">
                                        <input className="text-long" type="text" id="add_postalcode" placeholder="Postal Code" value={postalCode} onChange={e => {
                                            setPostalCode(e.target.value);
                                            e.target.style.background = "white";
                                            setBlankError("");

                                        }} />
                                    </div>
                                    <h3>{blankError}</h3>

                                    <div className="row">
                                        <input className="text-long" type="text" id="add_country" placeholder="Country" value={country} onChange={e => {
                                            setCountry(e.target.value);
                                            e.target.style.background = "white";
                                            setBlankError("");

                                        }} />
                                    </div>
                                    <h3>{blankError}</h3>

                                    {/* M: This is the 'Set default' button */}
                                    <div className="button-wrapper">
                                        <button className="button" type="submit">
                                            <span>Set default</span>
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

export default Address;