import React, { useState } from 'react';
import { Redirect, useHistory, withRouter } from 'react-router-dom';

//registerSuccess
// import registerSuccess from './registerSuccess';

function RegistrationForm(props) {
    console.log(props);
    const handleSubmitClick = async (event) => {
        event.preventDefault();
        // if (state.password === state.confirmPassword) {
        // sendDetailsToServer()
        // console.log(state);
        // } else {
        // props.showError('Passwords do not match');
        // }
        try {
            let data = {
                email: state.email,
                username: state.username,
                password: state.password
            };
            console.log(data);
        // let results = await props.axios.post('/auth/register/', data);
        let results = await props.axios.post('/auth/register/', data, {
            responseType:'json'
        });
        if (results.data.data && Object.keys(results.data.data).length > 0) {
            props.history.push('/registration-successful');
            // alert("Success");
            
        } else {
            console.log(results.data);
            alert("Fail");
        }
    } catch(err) {
        alert(err);
        console.log(err);
    }

    }
    const [state, setState] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    };
    if (props.authToken[0]) {
        console.log(props.authToken);
        return <Redirect to="/" />;
    } else {
        return (
            <div>
                <form>
                    <div>
                        <label htmlFor="email">Email address</label>
                        <input type="email"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={state.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="username"
                            id="username"
                            aria-describedby="Username"
                            placeholder="Enter username"
                            value={state.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            id="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={state.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmitClick}
                    >
                        Register
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(RegistrationForm);