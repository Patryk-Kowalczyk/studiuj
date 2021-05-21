import {Avatar, Box, Grid, IconButton, InputBase} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import {useStyles} from './styles/SingleAdvertismentStyles';
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {SendOutlined} from "@material-ui/icons";
import {labels} from "./SingleAdvertisment";
import NextLink from "../ButtonLink";
import {
    FormControl,
    AccordionActions,
    AccordionSummary,
    AccordionDetails,
    Accordion,
    Divider,
    Button
} from '@material-ui/core';
import {gql, useMutation} from "@apollo/client";
import {GET_ADV_INFO} from "../../pages/user/advertisement/[id]";

const useStylesCollapse = makeStyles((theme) => ({
    root: {
        width: '100%',
        boxShadow: 'none !important'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        width: "100%",
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));
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

function Comment({comment}) {
    const classes = useStyles();

    return (
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <Avatar aria-label="recipe" className={classes.avatar}
                        src={`${process.env.BACKEND_HOST}/${comment.user.avatar}` || ""}>
                    {`${comment.user.name[0]}`}
                </Avatar>
            </Grid>
            <Grid item xs zeroMinWidth>
                <div style={{display: "flex"}}>
                    <NextLink href={"/"}>
                        <h4 className={classes.h4}>{comment.user.name}</h4>
                    </NextLink>
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
                    {comment.updated_at === comment.created_at ? 'dodano - ' : 'edytowano - '}
                    {comment.updated_at}
                </p>


            </Grid>
        </Grid>
    )

}


export default function SingleComment({comment, meid, advid}) {
    const classesCol = useStylesCollapse();
    const [hover, setHover] = React.useState(-1);
    const [editDesc, setEditDesc] = React.useState(comment.description);
    const [editRating, setEditRating] = React.useState(comment.rating);
    const classes = useStyles();

    const [deleteComment, {loading, error, data}] = useMutation(
        DELETE_COMMENT,
        {
            variables: {
                id: parseInt(comment.id)
            },
            refetchQueries: [{
                query: GET_ADV_INFO, variables: {
                    id: advid
                }
            }],

        },
    );
    const [updateComment, {loading: updateLoading, error: updateError, data: updateData}] = useMutation(
        UPDATE_COMMENT,
        {
            variables: {
                id: parseInt(comment.id),
                description: editDesc,
                rating: editRating
            },
            refetchQueries: [{
                query: GET_ADV_INFO, variables: {
                    id: advid
                }
            }],

        },
    );
    const handleDeleteComment = async (e) => {
        e.preventDefault();
        if (meid !== comment.user.id) {
            console.log("error")
        } else {
            const res = await deleteComment();
        }
    };
    const handleUpdateComment = async (e) => {
        e.preventDefault();
        if (meid !== comment.user.id) {
            console.log("error")
        } else {
            const res = await updateComment();
        }
    };
    if (meid === comment.user.id) {
        return (
            <div className={classesCol.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<EditIcon/>}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                        boxShadow={0}
                    >
                        <Comment comment={comment}/>
                    </AccordionSummary>
                    <AccordionDetails className={classesCol.details}>


                        <Box className={classesCol.root}>
                            <Divider/>
                            <h3>#edytuj</h3>
                            <div className={classes.rating}>
                                <Rating
                                    value={editRating / 2}
                                    precision={0.5}
                                    onChange={(e) => setEditRating(parseInt(e.target.value * 2))}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                />
                                {editRating / 2 !== null &&
                                <Box ml={3}>{labels[hover !== -1 ? hover : editRating / 2]}</Box>}
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
                                    value={editDesc}
                                    onChange={(e) => setEditDesc(e.target.value)}

                                />
                  
                            </Box>
                        </Box>

                    </AccordionDetails>
                    <Divider/>

                    <AccordionActions>
                        <fieldset style={{border: "none"}}>
                            <Box>
                                <Button size="small" color="primary" onClick={handleDeleteComment}
                                        disabled={loading || updateLoading}>Usuń
                                    komentarz</Button>
                                <Button size="small" color={"secondary"} onClick={handleUpdateComment}
                                        disabled={loading || updateLoading}>
                                    Zapisz zmiany
                                </Button>
                            </Box>
                        </fieldset>
                    </AccordionActions>
                </Accordion>
            </div>
        )
    } else {
        return <div>
            <Accordion>
                <AccordionDetails>
                    <Comment comment={comment}/>
                </AccordionDetails>
            </Accordion>
        </div>
    }
}


