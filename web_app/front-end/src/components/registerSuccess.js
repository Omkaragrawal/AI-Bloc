import { Grid, Typography } from '@material-ui/core'

const registerSuccess = (props) => {

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh', fontSize:'50px' }} >
            <Grid item xs={3}>
                    {/* <h1>SUCCESS</h1> */}
                    <Typography variant="h1" component="h1">SUCCESS</Typography>
            </Grid>
        </Grid>
    );
};

export default registerSuccess;