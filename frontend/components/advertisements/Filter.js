import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";

export default function Filter({data, id, setId, type, updateType}) {
    return (
        <Box>

            <Box>
                <InputLabel htmlFor="age-native-simple">Wybierz kategorię ogłoszenia</InputLabel>
                <Select
                    native
                    value={id}
                    name="category_id"
                    fullWidth
                    onChange={(e) => setId(parseInt(e.target.value))}

                >
                    <option aria-label="None" value="">-</option>
                    {data.categories.map(category => (
                        <option key={`${category.id}_${category.name}`} value={category.id}>{category.name}</option>
                    ))}
                </Select>

            </Box>
            <br/>
            <Box>
                <FormLabel component="legend">Wybierz typ</FormLabel>
                <RadioGroup aria-label="position" row name="position" defaultValue="top"
                            value={type}
                            onChange={(e) => updateType(e.target.value)}>
                    <FormControlLabel
                        value={"all"}
                        control={<Radio color="primary"/>}
                        label="Wszystkie opcje"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="offer"
                        control={<Radio color="primary"/>}
                        label="Oferuję korepetycje"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="looking"
                        control={<Radio color="primary"/>}
                        label="Szukam korepetycji"
                        labelPlacement="start"
                    />

                </RadioGroup>
            </Box>
        </Box>
    );
}
