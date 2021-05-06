import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

export default function AddressForm({values, updateValues, categories, info}) {
    return (
        <>
            <Typography variant="subtitle2" color={'error'} gutterBottom>
                {info ? 'Uwaga! Uzupełnij pola danymi ' : null}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Opis ogłoszenia
            </Typography>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Nazwa"
                        fullWidth
                        autoComplete="given-name"
                        name="name"
                        value={values.name}
                        onChange={updateValues}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Opis"
                        multiline
                        rows={8}
                        rowsMax={12}
                        fullWidth
                        name="description"
                        value={values.description}
                        onChange={updateValues}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="age-native-simple">Wybierz kategorię ogłoszenia</InputLabel>
                    <Select
                        native
                        value={values.category_id}
                        name="category_id"
                        fullWidth
                        onChange={updateValues}

                    >
                        <option aria-label="None" value=""/>
                        {categories.map(category => (
                            <option key={`${category.id}_${category.name}`} value={category.id}>{category.name}</option>
                        ))}
                    </Select>
                </Grid>


                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Typ ogłoszenia</FormLabel>
                        <RadioGroup defaultValue="female" aria-label="gender"
                                    name="type"
                                    value={values.type}
                                    onChange={updateValues}>
                            <FormControlLabel value="offer" control={<Radio color="primary"/>}
                                              label="Oferuję korepetycje"/>
                            <FormControlLabel value="looking" control={<Radio color="primary"/>}
                                              label="Poszukuję korepetycji"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
}
