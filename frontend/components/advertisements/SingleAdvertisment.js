import {Divider, Avatar, Grid, Paper, Box, InputBase, IconButton} from "@material-ui/core";
import {SendOutlined} from "@material-ui/icons";
import React from "react";
import {useStyles} from './styles/SingleAdvertismentStyles';
import Rating from '@material-ui/lab/Rating';
import Typography from "@material-ui/core/Typography";
import useForm from "../../utils/useForm";
import {gql, useMutation} from "@apollo/client";
import {GET_ADV_INFO} from "../../pages/user/advertisement/[id]";

const labels = {
    0.5: 'Słaby',
    1: 'Słaby+',
    1.5: 'Średni',
    2: 'Średni+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Dobry',
    4: 'Dobry +',
    4.5: 'Super',
    5: 'Wybitny',
};


const CREATE_COMMENT_MUTATION = gql`
    mutation CREATE_COMMENT_MUTATION(
        $description: String!
        $user_id: Int!
        $rating: Int
        $advertisement_id:Int!
    ) {
        CreateComment(
            description:$description,
            user_id:$user_id,
            advertisement_id:$advertisement_id
            rating:$rating)
        {
            id
        }
    }
`;


export default function SingleAdvertisement({
                                                data: {
                                                    advertisement: {
                                                        id, user, type, description, created_at,
                                                        price, category, rating, name, comments
                                                    },
                                                    me
                                                }
                                            }) {
    const classes = useStyles();
    const [hover, setHover] = React.useState(-1);
    id = parseInt(id)
    const {values, updateValues} = useForm({
        rating: null,
        description: '',
        user_id: Number(me.id),
        advertisement_id: id
    });
    const [createComment, {loading, error, data}] = useMutation(
        CREATE_COMMENT_MUTATION,
        {
            variables: values,
            refetchQueries: [{
                query: GET_ADV_INFO, variables: {
                    id: id
                }
            }],

        },
    );
    const handleButtonSubmit = async (e) => {
        e.preventDefault();
        if (values.description === '') {
            console.log("error")
        } else {
            const res = await createComment();
        }

    };
    return (
        <div className={classes.rootroot}>
            <div style={{padding: 14}} className={classes.boxx}>
                {type === "offer" ? <h2 className={classes.typeOffer}>#oferuję</h2> :
                    <h2 className={classes.typeLooking}>#szukam</h2>}
                <Paper className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar aria-label="recipe" className={classes.avatar}
                                    src={`${process.env.BACKEND_HOST}/${user.avatar}` || ""}>
                                {`${user.name[0]}`}
                            </Avatar>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography variant="caption" color="textSecondary" component="p">
                                {category.name}
                            </Typography>
                            <h4 className={classes.h4}>{user.name}</h4>
                            <h3 className={classes.h3}>{name}</h3>
                            <p className={classes.description}>
                                {description}
                            </p>
                            <Typography variant="overline" component="p">
                                Cena - <b>{price}</b> pln
                            </Typography>
                            <Rating
                                name="hover-feedback"
                                value={rating / 2}
                                precision={0.5}
                                readOnly
                            />
                            <p className={classes.created}>
                                dodano - {created_at}
                            </p>
                        </Grid>
                    </Grid>
                    <Divider variant="fullWidth" style={{margin: "30px 0"}}/>

                    {comments.map((comment) => {
                        return (
                            <>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar aria-label="recipe" className={classes.avatar}
                                                src={`${process.env.BACKEND_HOST}/${comment.user.avatar}` || ""}>
                                            {`${comment.user.name[0]}`}
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <div style={{display: "flex"}}>
                                            <h4 style={{
                                                margin: 0,
                                                textAlign: "left",
                                                marginRight: "10px",
                                                marginTop: "2px",
                                            }}>{comment.user.name}</h4>
                                            <Rating
                                                value={comment.rating / 2}
                                                precision={0.5}
                                                readOnly
                                            />
                                        </div>
                                        <p style={{textAlign: "left"}}>
                                            {comment.description}
                                        </p>

                                        <p style={{textAlign: "left", color: "gray"}}>
                                            dodano - {comment.created_at}
                                        </p>
                                    </Grid>
                                </Grid>
                            </>
                        );
                    })}
                    {/*    do tąd*/}
                </Paper>
            </div>


            <Box display="grid" className={classes.root} mx={2}>
                <h3>#oceń</h3>
                <div className={classes.rating}>
                    <Rating
                        name="rating"
                        value={values.rating / 2}
                        precision={0.5}
                        onChange={updateValues}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                    {values.rating / 2 !== null && <Box ml={3}>{labels[hover !== -1 ? hover : values.rating / 2]}</Box>}
                </div>
                <Box
                    display="flex"
                    className={classes.inputContainer}
                    pl={2}
                    mt={2}
                >
                    <InputBase
                        placeholder="Wiadomość"
                        className={classes.input}
                        name={"description"}
                        value={values.description}
                        onChange={updateValues}

                    />
                    <IconButton onClick={handleButtonSubmit} disabled={loading}>
                        <SendOutlined/>
                    </IconButton>
                </Box>
            </Box>
        </div>
    )
        ;
}




