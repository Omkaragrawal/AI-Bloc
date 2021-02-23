import { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Avatar, Button, TextField, Link, Grid, Container, CssBaseline } from '@material-ui/core';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
function RegistrationForm(props) {
    const classes = useStyles();

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
                props.history.push('/login');
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
                            Sign up
                        </Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <TextField
                                        type="text"
                                        id="username"
                                        aria-describedby="Username"
                                        label="Username"
                                        autoComplete="fname"
                                        name="userName"
                                        variant="outlined"
                                        value={state.username}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="email"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        aria-describedby="email"
                                        value={state.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                    aria-describedby="password"
                                    value={state.password}
                                    onChange={handleChange}
                                        autoComplete="current-password"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                    aria-describedby="confirm password"
                                    value={state.confirmPassword}
                                    onChange={handleChange}
                                        autoComplete="current-password"
                                    />
                                </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmitClick}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
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
export default withRouter(RegistrationForm);