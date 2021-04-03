import {makeStyles} from "@material-ui/core/styles";
import {BiPaperPlane} from "react-icons/bi";
import {
    RiCompasses2Fill,
    RiPencilLine,
    RiScissorsLine,
    RiRulerLine,
    RiBookOpenLine,
    RiArrowDownSLine
} from "react-icons/ri";

const backgroundIcons = makeStyles((theme) => ({
    baseIcon: {
        position: "absolute",
        fontSize: "70px",
        opacity: "0.08",
        zIndex: "1",
    },
    downIcon: {
        position: "absolute",
        fontSize: "80px",
        opacity: "0.6",
        zIndex: "2",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        transition: ".4s",
        cursor: "pointer",
        '&:hover': {
            opacity: "1",
            fontSize: "110px",

        }
    },
}));

export default function BackgroundIcons() {

    const icons = backgroundIcons();
    return (
        <>
            <BiPaperPlane className={icons.baseIcon} style={{bottom: "55%", left: "35%"}}/>
            <RiCompasses2Fill className={icons.baseIcon} style={{top: "50%", right: "10%"}}/>
            <RiPencilLine className={icons.baseIcon} style={{bottom: "5%", right: "10%"}}/>
            <RiRulerLine className={icons.baseIcon} style={{top: "30%", right: "20%"}}/>
            <RiBookOpenLine className={icons.baseIcon} style={{top: "25%", left: "10%"}}/>
            <RiScissorsLine className={icons.baseIcon}
                            style={{bottom: "15%", left: "50%", transform: "rotate(20deg)"}}/>
            <RiArrowDownSLine className={icons.downIcon}/>
        </>
    )
}


