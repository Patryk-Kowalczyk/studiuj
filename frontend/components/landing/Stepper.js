import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import {secondContentStyles} from "./styles";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "center",

    },
    button: {
        marginRight: theme.spacing(1),
    },

    completed: {
        display: 'inline-block',

    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    background: {
        background: "red !important",
    },

    /////////////////// STEPPER CONTENT
    content: {
        margin: "30px",
        padding: "50px",
        display: "flex",
        justifyContent: "space-around",
    },
    text: {
        width: "60%",
    },
    h1: {
        fontFamily: theme.fonts.family.content,
        fontWeight: theme.fonts.weight.medium,
    },
    span: {
        color: theme.palette.primary.light,
        fontWeight: theme.fonts.weight.medium,

    },
    pContent: {
        fontFamily: theme.fonts.family.content,
        fontSize: "21px",
        fontWeight: theme.fonts.weight.normal,

    },
    image: {
        maxHeight: "280px",
    },
}));

function getSteps() {
    return ['Wypełnij formularz', 'Udzielaj odpowiedzi', 'Umów się na spotkanie'];
}

const FirstCase = () => {
    const classes = useStyles();
    return (
        <Box className={classes.content}>
            <Box className={classes.text}>
                <h1 className={classes.h1}> Załóż <span className={classes.span}>darmowe</span> konto a następnie...
                </h1>
                <p className={classes.pContent}>
                    Wypełnij nasz formularz osobowy. Będziesz mógł identyfikować się z uczniami w twojej okolicy.
                    Chętnie poznamy twoje zainteresowania oraz słabe i mocne strony. Profil będzie ' <span
                    className={classes.span}>wizytówką</span>', a jak
                    wiadomo wizytówki powinny być dobrze wykonane.


                </p>
            </Box>
            <img src="/images/form_vector.svg" alt="info" className={classes.image}/>
        </Box>
    );
};


function getStepContent(step) {
    switch (step) {
        case 0:
            return <FirstCase/>;
        case 1:
            return 'Step 2: What is an ad group anyways?';
        case 2:
            return 'Step 3: This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

export default function StepperThird() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();


    const handleStep = (step) => () => {
        setActiveStep(step);
    };


    return (
        <div className={classes.root}>
            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const buttonProps = {};


                    return (
                        <Step key={label} {...stepProps}>
                            <StepButton onClick={handleStep(index)}{...buttonProps}>{label}</StepButton>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            </div>
        </div>
    );
}


