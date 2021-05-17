import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import Link from "next/link";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 545,
        justifySelf: "stretch",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        justifyContent: 'flex-end',

    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: theme.palette.primary.dark,
        color: "white",
    },
}));

export default function RecipeReviewCard({data: {description, price, name, created_at, user, category}}) {
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
                    Cena - {price} pln
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.expand}>
                <Link href={`/`}>
                    <Button variant="contained" className={classes.avatar} size="small">
                        Otwórz
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
