import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
    let navigate = useNavigate();

    const [street, setStreet] = useState("");
    const [unit, setUnit] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const [streetError, setStreetError] = useState("");
    const [cityError, setCityError] = useState("");
    const [provinceError, setProvinceError] = useState("");
    const [postalCodeError, setPostalCodeError] = useState("");
    const [countryError, setCountryError] = useState("");
    const blankErrorMessage = "cannot be blank"

    const validate = () => {
        let isValid = true;
        if (!street) {
            setStreetError(blankErrorMessage)
            document.getElementById("add_street").style.background = "#f1c7c3";
            isValid = false;
        }
        if (!city) {
            setCityError(blankErrorMessage)
            document.getElementById("add_city").style.background = "#f1c7c3";
            isValid = false;
        }
        if (!province) {
            setProvinceError(blankErrorMessage)
            document.getElementById("add_province").style.background = "#f1c7c3";
            isValid = false;
        }
        if (!postalCode) {
            setPostalCodeError(blankErrorMessage)
            document.getElementById("add_postalcode").style.background = "#f1c7c3";
            isValid = false;
        }
        if (!country) {
            setCountryError(blankErrorMessage)
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
            var axios = require('axios');
            var data = JSON.stringify({
                "address": {
                    "street": street,
                    "unit": unit,
                    "city": city,
                    "province": province,
                    "postalCode": postalCode,
                    "country": country
                }
            });

            var config = {
                method: 'put',
                url: 'http://localhost:5001/api/users/profile',
                headers: {
                    'Authorization': localStorage.getItem("jwtToken"),
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (res) {
                    navigate("/account");
                })
                .catch(function (err) {
                    console.log(err);
                });
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
                                            setStreetError("");
                                        }} />
                                    </div>
                                    <h3 >{streetError}</h3>

                                    <div className="row">
                                        <input className="text-long" type="text" id="add_unit" placeholder="Unit (optional)" value={unit} onChange={e => {
                                            setUnit(e.target.value);
                                            e.target.style.background = "white";
                                        }} />
                                    </div>

                                    <div className="row">
                                        <input className="text-long" type="text" id="add_city" placeholder="City" value={city} onChange={e => {
                                            setCity(e.target.value);
                                            e.target.style.background = "white";
                                            setCityError("");
                                        }} />
                                    </div>
                                    <h3 >{cityError}</h3>

                                    <div className="row">
                                        <input className="text-long" type="text" id="add_province" placeholder="Province" value={province} onChange={e => {
                                            setProvince(e.target.value);
                                            e.target.style.background = "white";
                                            setProvinceError("");

                                        }} />
                                    </div>
                                    <h3>{provinceError}</h3>

                                    <div className="row">
                                        <input className="text-long" type="text" id="add_postalcode" placeholder="Postal Code" value={postalCode} onChange={e => {
                                            setPostalCode(e.target.value);
                                            e.target.style.background = "white";
                                            setPostalCodeError("");

                                        }} />
                                    </div>
                                    <h3>{postalCodeError}</h3>

                                    <div className="row">
                                        <input className="text-long" type="text" id="add_country" placeholder="Country" value={country} onChange={e => {
                                            setCountry(e.target.value);
                                            e.target.style.background = "white";
                                            setCountryError("");

                                        }} />
                                    </div>
                                    <h3>{countryError}</h3>

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