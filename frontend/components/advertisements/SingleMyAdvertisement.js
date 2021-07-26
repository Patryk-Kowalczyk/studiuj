import {
    Grid,
    Paper,
    Button
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useStyles} from './styles/SingleAdvertismentStyles';
import Typography from "@material-ui/core/Typography";
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
import {MY_ADVERTISEMENTS} from "../../pages/user/my-advertisements";
import {ALL_ADVERTISEMENTS_IN_PAGE_QUERY} from "./Advertisements";
import {perPage} from "../../config";
import useForm from "../../lib/hooks/useForm";

const DELETE_ADVERTISEMENT = gql`
    mutation DELETE_ADVERTISEMENT(
        $id: ID!
    ) {
        DeleteAdvertisement(id:$id)
    }
`;
const UPDATE_ADVERTISEMENT = gql`
    mutation UPDATE_ADVERTISEMENT(
        $id: ID!
        $name:String
        $description:String
        $user_id:Int
        $price:Int
        $type:String
        $category_id:Int
    ) {
        UpdateAdvertisement(id:$id,description:$description,name:$name,user_id:$user_id,price:$price,type:$type,category_id: $category_id){
            id
        }
    }
`;

export default function SingleMyAdvertisement({
                                                  data: {
                                                      categories,
                                                      advertisement,
                                                      me
                                                  }

                                              }) {

    if (advertisement === null) return <p>ooops</p>;

    const {
        id, user, type, description, created_at,
        price, category, name,
    } = advertisement;

    const [delInfo, setDelInfo] = useState(null);
    const classes = useStyles();
    const {values, updateValues} = useForm({
        id: parseInt(id),
        name: name,
        description: description,
        type: type,
        category_id: parseInt(category.id),
        price: parseInt(price),
        user_id: parseInt(me.id),
    });
    const variables = {...values}
    const [updateAdv, {loading, error, data}] = useMutation(
        UPDATE_ADVERTISEMENT,
        {
            variables,
            refetchQueries: [{
                query: GET_ADV_INFO, variables: {
                    id: parseInt(id)
                }
            },
                {
                    query: MY_ADVERTISEMENTS
                }

            ],

        },
    );

    const [deleteAdv, {loading: loadingDelAdv, error: errorDelAdv, data: dataDelADv}] = useMutation(
        DELETE_ADVERTISEMENT,
        {
            variables: {
                id: parseInt(id),
            },
            refetchQueries: [{
                query: GET_ADV_INFO, variables: {
                    id: parseInt(id)
                },
            },
                {
                    query: MY_ADVERTISEMENTS
                },
                {
                    query: ALL_ADVERTISEMENTS_IN_PAGE_QUERY,
                    variables: {
                        perPage: perPage,
                        page: 1
                    },
                }


            ],

        },
    );
    const handleDelete = async (e) => {
        e.preventDefault();
        const res = await deleteAdv();
        setDelInfo('Pomyślnie usunięto');
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await updateAdv();
    };
    console.log(values);
    if (delInfo) return <p>{delInfo}</p>
    return (

        <div className={classes.wrap}>
            <div style={{padding: 14}} className={classes.wrapboxx}>

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
                            <Button onClick={handleDelete} variant="contained" size="small"
                                    disabled={loading || loadingDelAdv}
                                    style={{margin: "10px", backgroundColor: "rgb(178,16,48)", color: "white"}}>
                                Usuń ogłoszenie

                            </Button>
                            <Button onClick={handleUpdate} variant="contained" size="small" color={"secondary"}
                                    disabled={loading || loadingDelAdv}

                                    style={{margin: "10px"}}>
                                Zapisz zmiany
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    )
}



