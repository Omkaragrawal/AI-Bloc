import { Grid } from '@material-ui/core';
const CenterElement = ({children}) => {
    return (
    <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh', minWidth: '100vw', maxWidth: '100vw' }}>
        <Grid item xs={10} md={8}>
            {children}
        </Grid>
    </Grid>
    );
}

export default CenterElement;