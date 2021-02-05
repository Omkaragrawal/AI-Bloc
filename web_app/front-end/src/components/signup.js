import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Grid, Button, TextField, Card, CardContent, Divider, FormControl } from '@material-ui/core';

//registerSuccess
// import registerSuccess from './registerSuccess';

function RegistrationForm(props) {
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
                responseType: 'json'
            });
            if (results.data.data && Object.keys(results.data.data).length > 0) {
                props.history.push('/registration-successful');
                // alert("Success");

            } else {
                console.log(results.data);
                alert("Fail");
            }
        } catch (err) {
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
            <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh', minWidth: '100vw', maxWidth: '100vw' }}>
                <Grid item xs={10} md={8}>
                    <Card fullWidth={true}>
                        <CardContent fullWidth={true}>
                            <FormControl focused fullWidth={true} variant="filled">
                                <div style={{ margin: '10px', marginBottom: '20px', marginTop: '20px' }}>
                                    {/* <label htmlFor="email">Email address</label> */}
                                    <TextField autoComplete type="email"
                                        id="email"
                                        label="Email"
                                        variant="outlined"
                                        aria-describedby="email"
                                        value={state.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Divider variant="middle" />
                                <div style={{ margin: '10px', marginBottom: '20px', marginTop: '20px' }}>
                                    {/* <label htmlFor="username">Username</label> */}
                                    <TextField autoComplete type="username"
                                        id="username"
                                        variant="outlined"
                                        aria-describedby="Username"
                                        label="Username"
                                        value={state.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Divider variant="middle" />
                                <div style={{ margin: '10px', marginBottom: '20px', marginTop: '20px' }}>
                                    {/* <label htmlFor="password">Password</label> */}
                                    <TextField autoComplete type="password"
                                        id="password"
                                        label="Password"
                                        variant="outlined"
                                        aria-describedby="password"
                                        value={state.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Divider variant="middle" />
                                <div style={{ margin: '10px', marginBottom: '20px', marginTop: '20px' }}>
                                    {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
                                    <TextField autoComplete type="password"
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        variant="outlined"
                                        aria-describedby="confirm password"
                                        value={state.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Divider variant="middle" />
                                <Button variant="contained" color="primary"
                                    type="submit"
                                    onClick={handleSubmitClick}>
                                    Register
                                </Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(RegistrationForm);