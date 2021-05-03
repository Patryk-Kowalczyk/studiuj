import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function PaymentForm({values, updateValues}) {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Cena
            </Typography>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        name="price"
                        type={"number"}
                        value={values.price}
                        onChange={updateValues}
                        label="Cena w pln"
                        helperText="Zaoferuj cenę dla swojego ogłoszenia"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </>
    );
}
