import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from "next/link";
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 545,
            justifySelf: "stretch",
            position: "relative",
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            justifyContent: 'space-between',

        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: theme.palette.primary.dark,
            color: "white",
        },
        typeOffer: {
            backgroundColor: theme.palette.primary.dark,
            color: "white",
            fontSize: "15px",
            textAlign: "center",
            padding: "2px 15px",
            position: "absolute",
            right: 0,
            top: 0,
            transform: "translateY(50%) rotate(3deg)",
        },
        typeLooking: {
            backgroundColor: theme.palette.secondary.dark,
            color: "white",
            fontSize: "15px",
            textAlign: "center",
            padding: "2px 15px",
            position: "absolute",
            right: 0,
            top: 0,
            transform: "translateY(50%) rotate(3deg)",
        },
    }))
;

export default function CardComponent({data: {rating, id, description, price, name, created_at, user, category, type}, my}) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}
                            src={`${process.env.BACKEND_HOST}/${user.avatar}` || ""}>
                        {`${user.name[0]}`}
                    </Avatar>
                }

                title={user.name}
                subheader={created_at}
            />
            <div className={type === "offer" ? classes.typeOffer : classes.typeLooking}>
                {type === "offer" ? <span className={classes.offer}> oferuję</span> :
                    <div className={classes.offer}> szukam</div>}
            </div>
            <CardContent>
                <Typography variant="caption" color="textSecondary" component="p">
                    {category.name}
                </Typography>
                <Typography variant="h6" component="p">
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description.substring(0, 70) + "..."}
                </Typography>
                <br/>
                <Typography variant="overline" component="p">
                    Cena - <b>{price}</b> pln
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.expand}>
                <Rating
                    name="hover-feedback"
                    value={rating / 2}
                    precision={0.5}
                    readOnly
                />

                {my ?
                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        <Link href={`/user/advertisement/${id}`}>
                            <Button variant="contained" className={classes.avatar} size="small">
                                Otwórz
                            </Button>
                        </Link>

                        <Link href={`/user/my-advertisement/${id}`}>
                            <Button variant="contained" className={classes.avatar} size="small">
                                Edytuj
                            </Button>
                        </Link>
                    </ButtonGroup>
                    : <Link href={`/user/advertisement/${id}`}>
                        <Button variant="contained" className={classes.avatar} size="small">
                            Otwórz
                        </Button>
                    </Link>}
            </CardActions>

        </Card>
    );
}
