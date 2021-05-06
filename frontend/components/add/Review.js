import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review({values}) {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Podsumowanie ogłoszenia
            </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Nazwa"} secondary={values.name}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Opis"} secondary={values.description}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Typ"} secondary={values.type}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Cena"} secondary={values.price}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={"ID Kategorii"} secondary={values.category_id}/>
                </ListItem>

            </List>
            <Grid container spacing={9}>
                <Grid item xs={12}>
                    <Typography variant={"subtitle2"}>Zatwierdzając ogłoszenie decydujesz się na akceptację regulaminu i
                        ponosisz odpowiedzialnośc w przypadku rezygnacji z zaplanowanych zajęć.</Typography>
                </Grid>
            </Grid>
        </>
    );
}
