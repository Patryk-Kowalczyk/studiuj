import {useState} from 'react';
import ReactCardFlip from 'react-card-flip';
import {makeStyles} from "@material-ui/core/styles";
import {FaMoneyBillWaveAlt} from "react-icons/fa";

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
            transform: "translateY(-20px)",
            color: theme.palette.primary.light,
            webkitBoxShadow: "0px 0px 15px 1px rgb(119,137,222)",
            boxShadow: "0px 0px 15px 1px rgb(119,137,222)",
        }
    },
    small: {
        fontSize: "25px",
        color: "black",

    },
}))
const containerStyle = {
    width: "26%",
    height: "30%",
}
const FlipCard = () => {
    const classes = flipStyles()
    const [isFlipped, setIsFlipped] = useState(false)
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal"
                       containerStyle={containerStyle}>
            <div
                onClick={() => setIsFlipped(!isFlipped)}>
                <div className={classes.front}>
                    <FaMoneyBillWaveAlt/>
                    <p className={classes.small}>Czy serwis jest płatny?</p>
                </div>
            </div>

            <div className={classes.front}
                 onClick={() => setIsFlipped(!isFlipped)}>
                This
            </div>
        </ReactCardFlip>
    );
};

export default FlipCard;
