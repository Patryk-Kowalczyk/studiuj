import {
    Divider,
    Avatar,
    Grid,
    Paper,
    Box,
    InputBase,
    IconButton,
    Accordion,
    AccordionDetails,
    Button
} from "@material-ui/core";
import React from "react";
import {useStyles} from './styles/SingleAdvertismentStyles';
import Typography from "@material-ui/core/Typography";
import useForm from "../../utils/useForm";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {gql, useMutation} from "@apollo/client";
import {GET_ADV_INFO} from "../../pages/user/advertisement/[id]";
// const [deleteComment, {loading, error, data}] = useMutation(
//     DELETE_COMMENT,
//     {
//         variables: {
//             id: parseInt(comment.id)
//         },
//         refetchQueries: [{
//             query: GET_ADV_INFO, variables: {
//                 id: advid
//             }
//         }],
//
//     },
// );
const DELETE_COMMENT = gql`
    mutation DELETE_COMMENT(
        $id: Int!
    ) {
        DeleteComment(id:$id)
    }
`;
const UPDATE_COMMENT = gql`
    mutation UPDATE_COMMENT(
        $id: Int!
        $description:String
        $rating:Int
    ) {
        UpdateComment(id:$id,description:$description,rating:$rating)
    }
`;

export default function SingleAdvertisement({
                                                data: {
                                                    categories,
                                                    advertisement: {
                                                        id, user, type, description, created_at,
                                                        price, category, name,
                                                    },
                                                    me
                                                }
                                            }) {
    const classes = useStyles();
    id = parseInt(id)

    const {values, updateValues} = useForm({
        name: name,
        description: description,
        type: type,
        category_id: category.id,
        price: price,
        user_id: Number(me.id),
    });
    return (

        <div className={classes.wrap}>
            <div style={{padding: 14}} className={classes.boxx}>

                <h2 className={classes.typeEdit}>#edycja</h2>
                <Paper className={classes.paper}>
                    <Typography variant="subtitle2" color={'error'} gutterBottom>
                        {/*{info ? 'Uwaga! Uzupełnij pola danymi ' : null}*/}
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
                                    <option key={`${category.id}_${category.name}`}
                                            value={category.id}>{category.name}</option>
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
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
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
                            </FormControl>
                        </Grid>
                        <Grid style={{margin: "0 auto"}}>
                            <Button variant="contained" size="small" style={{margin: "10px"}}>
                                Wróć</Button>
                            <Button variant="contained" size="small"
                                    style={{margin: "10px", backgroundColor: "rgb(178,16,48)", color: "white"}}>
                                Usuń ogłoszenie

                            </Button>
                            <Button variant="contained" size="small" color={"secondary"} style={{margin: "10px"}}>
                                Zapisz zmiany
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    )
}



