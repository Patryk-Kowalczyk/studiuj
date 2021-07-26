import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import useForm from "../../lib/hooks/useForm"
import {gql, useMutation} from "@apollo/client";
import {ALL_ADVERTISEMENTS_IN_PAGE_QUERY} from "../advertisements/Advertisements";
import {perPage} from "../../config";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {'Studiuj.pl '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const steps = ['Dodaj opis', 'Finanse', 'Podsumowanie'];


const CREATE_ADVERTISMENT_MUTATION = gql`
    mutation CREATE_ADVERTISMENT_MUTATION(
        $name: String!
        $description: String!
        $price: Int!
        $user_id: Int!
        $type: String!
        $category_id:Int!
    ) {
        CreateAdvertisement(
            name: $name
            description: $description
            price: $price
            user_id:$user_id
            type:$type
            category_id:$category_id
        ){
            id
        }
    }
`;


export default function Checkout({data}) {
    const [validInfo, setValidInfo] = useState(false)
    const {values, updateValues} = useForm({
        name: '',
        description: '',
        type: '',
        category_id: '',
        price: 0,
        user_id: Number(data.me.id),
    });

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm info={validInfo} values={values} updateValues={updateValues}
                                    categories={data.categories}/>;
            case 1:
                return <PaymentForm values={values} updateValues={updateValues}/>;
            case 2:
                return <Review values={values}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const [createAdvertisment, {loading: createLoading, error: createError, data: createData}] = useMutation(
        CREATE_ADVERTISMENT_MUTATION,
        {
            variables: values,
            refetchQueries: [
                {
                    query: ALL_ADVERTISEMENTS_IN_PAGE_QUERY,
                    variables: {
                        perPage: perPage,
                        page: 1
                    },
                },
            ],
        }
        )
    ;

    const handleButtonSubmit = async (e) => {
        e.preventDefault();
        if (values.name === '' ||
            values.description === '' ||
            values.price === '' ||
            values.type === '' ||
            values.category_id === ''
        ) {
            setValidInfo(true)
            setActiveStep(activeStep - 2);

        } else {
            const res = await createAdvertisment();
            setActiveStep(activeStep + 1);
        }

    };
    return (
        <>
            <CssBaseline/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Stwórz ogłoszenie
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Dziękujemy za dodanie ogłoszenia.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Twoje ogłoszenie ma numer
                                    #{createData?.createAdvertisement?.id}.
                                </Typography>
                            </>
                        ) : (
                            <>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={() => setActiveStep(activeStep - 1)}
                                                className={classes.button}>
                                            powrót
                                        </Button>
                                    )}
                                    {activeStep === steps.length - 1 ? (<Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleButtonSubmit}
                                        className={classes.button}
                                        disabled={createLoading}
                                    >
                                        Zatwierdź
                                    </Button>) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setActiveStep(activeStep + 1)}
                                            className={classes.button}
                                        >
                                            Dalej
                                        </Button>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                </Paper>
                <Copyright/>
            </main>
        </>
    );
}
