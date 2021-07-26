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
    Button,
} from "@material-ui/core";
import {SendOutlined} from "@material-ui/icons";
import React from "react";
import {useStyles} from "./styles/SingleAdvertismentStyles";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import {gql, useMutation} from "@apollo/client";
import {GET_ADV_INFO} from "../../pages/user/advertisement/[id]";
import SingleComment from "./SingleComment";
import NextLink from "../ButtonLink";
import PaymentDialog from "../common/PaymentDialog";
import LoadingButton from "../LoadingButton";
import useForm from "../../lib/hooks/useForm";

export const labels = {
    0.5: "Słaby",
    1: "Słaby+",
    1.5: "Średni",
    2: "Średni+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Dobry",
    4: "Dobry +",
    4.5: "Super",
    5: "Wybitny",
};

const CREATE_COMMENT_MUTATION = gql`
    mutation CREATE_COMMENT_MUTATION(
        $description: String!
        $user_id: Int!
        $rating: Int
        $advertisement_id: Int!
    ) {
        CreateComment(
            description: $description
            user_id: $user_id
            advertisement_id: $advertisement_id
            rating: $rating
        ) {
            id
        }
    }
`;

const CREATE_ORDER = gql`
    mutation CREATE_ORDER($user_id: ID!, $advertisement_id: ID!) {
        CreateOrder(user_id: $user_id, advertisement_id: $advertisement_id) {
            id
        }
    }
`;

export default function SingleAdvertisement({
                                                data: {
                                                    advertisement: {
                                                        id,
                                                        user,
                                                        type,
                                                        description,
                                                        created_at,
                                                        price,
                                                        category,
                                                        rating,
                                                        name,
                                                        comments,
                                                    },
                                                    me,
                                                },
                                            }) {
    const classes = useStyles();
    const [hover, setHover] = React.useState(-1);
    const [isOpenDialog, setIsOpenDialog] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);

    id = parseInt(id);
    const {values, updateValues} = useForm({
        rating: null,
        description: "",
        user_id: Number(me.id),
        advertisement_id: id,
    });
    const [createComment, {loading, error, data}] = useMutation(
        CREATE_COMMENT_MUTATION,
        {
            variables: values,
            refetchQueries: [
                {
                    query: GET_ADV_INFO,
                    variables: {
                        id: id,
                    },
                },
            ],
        }
    );

    const [createOrder, {loading: loadingOrder}] = useMutation(CREATE_ORDER);

    const handleButtonSubmit = async (e) => {
        e.preventDefault();
        if (values.description === "") {
            console.log("error");
        } else {
            const res = await createComment();
            values.description = "";
            values.rating = null;
        }
    };

    const handlePaymentDialogOpen = async () => {
        const isSure = confirm("Czy na pewno chcesz zamówić tę konsultację?");
        if (isSure) {
            await createOrder({
                variables: {
                    user_id: me.id,
                    advertisement_id: id,
                },
            })
                .then((res) => setOrderId(res.data.CreateOrder.id))
                .catch((err) => console.error(err));
            setIsOpenDialog(true);
        }
    };

    const handlePaymentDialogClose = async () => {
        setIsOpenDialog(false);
    };

    return (
        <div className={classes.rootroot}>
            <div style={{padding: 14}} className={classes.boxx}>
                {type === "offer" ? (
                    <h2 className={classes.typeOffer}>#oferuję</h2>
                ) : (
                    <h2 className={classes.typeLooking}>#szukam</h2>
                )}
                <Paper className={classes.paper}>
                    <Accordion>
                        <AccordionDetails>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item>
                                    <Avatar
                                        aria-label="recipe"
                                        className={classes.avatar}
                                        src={`${process.env.BACKEND_HOST}/${user.avatar}` || ""}
                                    >
                                        {`${user.name[0]}`}
                                    </Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {category.name}
                                    </Typography>
                                    <NextLink href={`/user/${user.uuid}`}>
                                        <h4 className={classes.h4}>{user.name}</h4>
                                    </NextLink>
                                    <h3 className={classes.h3}>{name}</h3>
                                    <p className={classes.description}>{description}</p>
                                    <Typography variant="overline" component="p">
                                        Cena - <b>{price}</b> pln
                                    </Typography>
                                    <Rating
                                        name="hover-feedback"
                                        value={rating / 2}
                                        precision={0.5}
                                        readOnly
                                    />
                                    <Box display="flex" justifyContent="space-between">
                                        <p className={classes.created}>dodano - {created_at}</p>
                                        {console.log(type)}
                                        {type === 'offer' && (
                                            me.id !== user.id && (
                                                <>
                                                    <LoadingButton
                                                        loading={loadingOrder}
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handlePaymentDialogOpen}
                                                    >
                                                        Zamów konsultacje
                                                    </LoadingButton>
                                                    <PaymentDialog
                                                        isOpen={isOpenDialog}
                                                        handleClose={handlePaymentDialogClose}
                                                        orderId={orderId}
                                                        user={user}
                                                    />
                                                </>
                                            )
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Divider variant="middle" style={{margin: "35px 50px"}}/>

                    {comments.map((comment) => {
                        return (
                            <SingleComment
                                key={comment.id}
                                meid={me.id}
                                comment={comment}
                                advid={id}
                            />
                        );
                    })}
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
                    {values.rating / 2 !== null && (
                        <Box ml={3}>{labels[hover !== -1 ? hover : values.rating / 2]}</Box>
                    )}
                </div>
                <Box display="flex" className={classes.inputContainer} pl={2} mt={2}>
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
    );
}
