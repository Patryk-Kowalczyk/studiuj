import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { P24BankElement } from "@stripe/react-stripe-js";
import { gql, useMutation } from "@apollo/client";
import LoadingButton from "../LoadingButton";

const CREATE_PAYMENT_INTENT = gql`
  mutation CREATE_PAYMENT_INTENT($order_id: ID!) {
    CreatePaymentIntent(order_id: $order_id)
  }
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    "& .MuiDialog-paper": {
      overflowY: "visible",
    },
  },
}));

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

const P24_ELEMENT_OPTIONS = {
  // Custom styling can be passed to options when creating an Element
  style: {
    base: {
      padding: "10px 12px",
      color: "#32325d",
      fontSize: "16px",

      "::placeholder": {
        color: "#aab7c4",
      },
    },
  },
};

function P24BankSection() {
  return (
    <label>
      Dostępne banki
      <P24BankElement options={P24_ELEMENT_OPTIONS} />
    </label>
  );
}

function CheckoutForm({ orderId, user, setLoading }) {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const response = await createPaymentIntent({
      variables: {
        order_id: orderId,
      },
    }).then((res) => res);
    const clientSecret = response.data.CreatePaymentIntent;

    const p24Bank = elements.getElement(P24BankElement);

    // For brevity, this example is using uncontrolled components for
    // the accountholder's name. In a real world app you will
    // probably want to use controlled components.
    // https://reactjs.org/docs/uncontrolled-components.html
    // https://reactjs.org/docs/forms.html#controlled-components
    const { error } = await stripe.confirmP24Payment(clientSecret, {
      payment_method: {
        p24: p24Bank,
        billing_details: {
          name: user.name,
          email: user.email,
        },
      },
      payment_method_options: {
        p24: {
          // In order to be able to pass the `tos_shown_and_accepted` parameter, you must
          // ensure that the P24 regulations and information obligation consent
          // text is clearly in the view of the customer. See
          // stripe.com/docs/payments/p24/accept-a-payment#requirements
          // for directions.
          tos_shown_and_accepted: true,
        },
      },
      return_url:
        process.env.NEXT_PUBLIC_BACKEND_HOST + "/api/payments/handle-payment-response",
    });

    if (error) {
      // Show error to your customer.
      console.log(error.message);
    }
    setLoading(false);
    // Otherwise the customer will be redirected away from your
    // page to complete the payment with their bank.
  };

  return (
    <form onSubmit={handleSubmit} id="payment">
      <Typography gutterBottom>
        W celu finalizacji konsultacji zapłać za usługę.
      </Typography>
      <P24BankSection />
    </form>
  );
}

function PaymentDialog({ isOpen, handleClose, orderId, user }) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
      className={classes.paper}
    >
      <DialogTitle>Płatność</DialogTitle>
      <DialogContent style={{ overflowY: "visible" }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm orderId={orderId} user={user} setLoading={setLoading} />
        </Elements>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Anuluj
        </Button>
        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          form="payment"
          loading={loading}
        >
          Zapłać
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentDialog;
