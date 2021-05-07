import React from "react";
import DashboardAuth from "../../components/dashboard/DashboardAuth";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import MessageIcon from "@material-ui/icons/Message";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    fontSize: "4rem",
  },
  categories: {
    marginTop: theme.spacing(2),
  },
  statsCard: {
    padding: theme.spacing(2),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  statCard: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&:not(:first-of-type)": {
      marginTop: theme.spacing(2),
    },
  },
}));

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      avatar
    }
  }
`;

const userPage = () => {
  const router = useRouter();
  const classes = useStyles();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id: Number(id),
    },
  });
  const isUser = !loading && data.user;
  if (!loading && !data.user) {
    router.push("/404");
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent className={classes.card}>
            {isUser ? (
              <Avatar
                className={classes.avatar}
                src={`${process.env.BACKEND_HOST}/${data.user.avatar}` || ""}
              >{`${data.user.name[0]}`}</Avatar>
            ) : (
              <Skeleton variant="circle" width={150} height={150}></Skeleton>
            )}
            {isUser ? (
              <Typography variant="h4" component="h3">
                {data.user.name}
              </Typography>
            ) : (
              <Skeleton variant="rect" width={200} height={30}></Skeleton>
            )}
            <Typography variant="h6" className={classes.categories}>
              Ulubione kategorie
            </Typography>
            <Box mb={3}>
              <Chip variant="outlined" size="small" label="Matematyka" />
              <Chip variant="outlined" size="small" label="Informatyka" />
              <Chip variant="outlined" size="small" label="Fizyka" />
            </Box>
            <Button variant="outlined" startIcon={<MessageIcon />}>
              Wyślij wiadomość
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card className={classes.statsCard}>
          <Box className={classes.statCard}>
            <Typography variant="h6">Udzielonych korepetycji</Typography>
            <Typography variant="h4" color="primary">
              4
            </Typography>
          </Box>
          <Box className={classes.statCard}>
            <Typography variant="h6">Otrzymanych korepetycji</Typography>
            <Typography variant="h4" color="primary">
              2
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <Typography variant="h4">Ogłoszenia użytkownika</Typography>
          <Typography>Obecnie brak ogłoszeń danego użytkownika</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

userPage.Layout = DashboardAuth;
export default userPage;
