import { useState } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { Button, TextField, Card, CardContent, Divider, FormControl } from '@material-ui/core';



import CenterElement from "./CenterElement";
const LoginForm = (props) => {
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
                password: state.password
            };
            console.log(data);
            // let results = await props.axios.post('/auth/register/', data);
            let results = await props.axios.post('/auth/login/', data, {
                responseType: 'json'
            });
            if (results.data.data && Object.keys(results.data.data).length > 0) {
                // props.history.push('/registration-successful');
                // alert("Success");
                console.groupCollapsed('After Success Login');
                results.data.data.tokens = results.data.data.tokens.replaceAll("'", '"');
                const {refresh: refreshToken, access: accessToken} = JSON.parse(results.data.data.tokens)
                props.accessToken[1](accessToken);
                props.axios.defaults.headers.common.Authorization = `Bearer ${accessToken[0]}`;
                props.refreshToken[1](refreshToken);
                // console.table(props.accessToken[0], props.refreshToken[0]);
                // console.log(props.axios.defaults.headers.common.Authorization);
                alert("Success");
                let { data } = await props.axios.get('/expenses/');
                console.log(data);
                console.groupEnd('After Success Login');
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
        password: ""
    });
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    };
    if (props.accessToken[0] ) {
        console.log(props.accessToken);
        return <Redirect to="/" />;
    } else {
        return (
            <CenterElement>
                <Card>
                    <CardContent>
                        <FormControl focused fullWidth={true} variant="filled">
                            <div style={{ margin: '10px', marginBottom: '20px', marginTop: '20px' }}>
                                {/* <label htmlFor="email">Email address</label> */}
                                <TextField type="email"
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
                                {/* <label htmlFor="password">Password</label> */}
                                <TextField type="password"
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    aria-describedby="password"
                                    value={state.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Button variant="contained" color="primary"
                                type="submit"
                                onClick={handleSubmitClick}>
                                Login
                                </Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </CenterElement>
        );
    }

}

export default withRouter(LoginForm);