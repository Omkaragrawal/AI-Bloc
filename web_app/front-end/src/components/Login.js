import { useState, useRef } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { Avatar, Button, TextField, Checkbox, Container, CssBaseline, FormControlLabel } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



import CenterElement from "./CenterElement";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
function LoginForm(props) {
    const classes = useStyles();


    const [state, setState] = useState({
        email: "",
        password: ""
    });
    const [errorState, setErrorState] = useState({
        email: null,
        password: null
    });
    const validateInput = (e) => {
        if (state.email && state.password) {
            setErrorState(_ => ({
                email: null,
                password: null
            }));
        return true;
    } else {
            setErrorState(prevState => ({
                ...prevState,
                email: "ERROR",
                password: "ERROR"
            }));
        return false;
    }
    }
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    };
    const handleSubmitClick = async (event) => {
        event.preventDefault();
        validateInput();
        if(errorState.email || errorState.password) {
            alert("ERR");
            return false;
        }
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
                const { refresh: refreshToken, access: accessToken } = JSON.parse(results.data.data.tokens)
                props.accessToken[1](accessToken);
                props.axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                props.refreshToken[1](refreshToken);
                console.log(props.accessToken[0]);
                console.log(props.refreshToken[0]);
                // console.table(props.accessToken[0], props.refreshToken[0]);
                // console.log(props.axios.defaults.headers.common.Authorization);
                alert("Success");
                let { data } = await props.axios.get('/expenses/');
                console.log(data);
                console.groupEnd('After Success Login');
            } else {
                console.log(results);
                alert("Fail");
            }
        } catch (err) {
            if (err.response.status === 400) {
                console.log(err.response.data);
                if (err.response.data.errors.email) {
                    setErrorState(prevState => ({
                        ...prevState,
                        email: err.response.data.errors.email[0]
                    }));
                    // alert(err.response.data.errors.email[0]);
                } else {
                    alert(err.response.data.errors);
                }
            } else if (err.response.status === 401) {
                setErrorState(prevState => ({
                    ...prevState,
                    password: err.response.data.errors.detail
                }));
                // alert(err.response.data.errors.detail);
            }
        }

    }

    if (props.accessToken[0]) {
        console.log(props.accessToken);
        return <Redirect to="/" />;
    } else {
        return (
            <CenterElement>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                    </Typography>
                        <form className={classes.form} noValidate>
                            <Typography component="span" variant = "h6" hidden = {(errorState.email)? false: true} style={{color: "red"}}>
                                {errorState.email}
                            </Typography>
                            <TextField
                                type="email"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={state.email}
                                onChange={handleChange}
                                onFocus={validateInput}
                                onBlur={validateInput}
                                autoFocus
                                aria-describedby="email"
                            />
                            <Typography component="span" variant = "h6" hidden = {(errorState.password)? false: true} style={{color: "red"}}>
                                {errorState.password}
                            </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                aria-describedby="password"
                                value={state.password}
                                onFocus={validateInput}
                                onBlur={validateInput}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmitClick}
                            >
                                Sign In
                        </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </CenterElement>
        );
    }
}
export default withRouter(LoginForm);