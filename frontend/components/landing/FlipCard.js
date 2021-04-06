import {useState} from 'react';
import ReactCardFlip from 'react-card-flip';
import {makeStyles} from "@material-ui/core/styles";

export const flipStyles = makeStyles((theme) => ({
    front: {
        paddingTop: "40px",
        fontSize: "84px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",

        margin: "40px 0",

        fontFamily: "Montserrat, sans-serif",
        background: "rgb(248,239,224)",
        webkitBoxShadow: "0px 0px 8px 2px rgb(248,239,224) ",
        boxShadow: "0px 0px 8px 2px rgb(248,239,224)",
        transition: ".3s",

        //HOVER
        ['&:hover']: {
            transform: "translateY(-15px)",
            color: theme.palette.primary.light,
            webkitBoxShadow: "0px 0px 15px 1px rgb(119,137,222)",
            boxShadow: "0px 0px 15px 1px rgb(119,137,222)",
        }
    },
    back: {
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        cursor: "pointer",

        margin: "40px 0",

        fontFamily: "Montserrat, sans-serif",
        background: "rgb(248,239,224)",
        webkitBoxShadow: "0px 0px 8px 2px rgb(248,239,224) ",
        boxShadow: "0px 0px 8px 2px rgb(248,239,224)",
        transition: ".3s",

        //HOVER
        ['&:hover']: {
            color: theme.palette.primary.light,
            webkitBoxShadow: "0px 0px 15px 1px rgb(119,137,222)",
            boxShadow: "0px 0px 15px 1px rgb(119,137,222)",
        }
    },
    small: {
        fontSize: "25px",
        color: "black",
    },
    pBool: {
        fontSize: "25px",
        fontWeight: theme.fonts.weight.medium,
        color: theme.palette.primary.light,

    },
    pText: {
        fontWeight: theme.fonts.weight.normal,
        fontSize: "14px",
        color: "black",

    }
}))
const containerStyle = {
    width: "26%",
    height: "30%",
}
const FlipCard = ({component}) => {
    const classes = flipStyles()
    const [isFlipped, setIsFlipped] = useState(false)
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal"
                       containerStyle={containerStyle}>
            <div
                onClick={() => setIsFlipped(!isFlipped)}>
                <div className={classes.front}>
                    {component.icon()}
                    <p className={classes.small}>{component.text}</p>
                </div>
            </div>
            <div className={classes.back} onClick={() => setIsFlipped(!isFlipped)}>
                <p className={classes.pBool}>{component.bool}</p>
                <p className={classes.pText}>{component.backText}</p>
            </div>
        </ReactCardFlip>
    );
};

export default FlipCard;
