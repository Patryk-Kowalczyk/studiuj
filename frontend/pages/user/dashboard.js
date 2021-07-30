import React from "react";
import Image from "next/image";
import DashboardAuth from "../../layouts/PanelLayout/PanelAuth";
import UserCard from "../../components/common/usercard/UserCard";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  helloBox: {
    background: `linear-gradient(170deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    height: "100%",
    padding: theme.spacing(2),
  },
  helloTexts: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  helloTextInfo: {
    fontSize: "0.9rem",
  },
  helloButton: {
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.contrastText,
  },
  addAdvertisement: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    placeItems: "center",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  subtitle: {
    margin: `${theme.spacing(2)}px 0`,
  },
  bestUsers: {
    maxWidth: "100%",
    display: "flex",
    overflowX: "scroll",
  },
}));
export default function dashboard() {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={12} md={8}>
          <Paper className={classes.helloBox}>
            <Grid container>
              <Grid item xs={6} className={classes.helloTexts}>
                <div>
                  <Typography variant="h5" gutterBottom>
                    Witaj na naszej platformie
                  </Typography>
                  <Typography gutterBottom className={classes.helloTextInfo}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam tempus, odio id congue sodales, tortor nulla
                    vestibulum lorem, a facilisis quam sapien vel nunc.
                  </Typography>
                </div>
                <Button variant="outlined" className={classes.helloButton}>
                  Regulamin
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Image
                  src="/images/exams.svg"
                  alt="Students"
                  width={400}
                  height={400}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={12} md={4}>
          <Paper className={classes.addAdvertisement}>
            <Image
              src="/images/professor.svg"
              alt="professor"
              width={250}
              height={250}
            />
            <Typography variant="h5" component="h3" gutterBottom>
              Chcesz zacząć udzielać korepetycje?
            </Typography>
            <Button variant="contained" endIcon={<PlaylistAddCheckIcon />}>
              Utwórz ofertę
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="h4" component="h2" className={classes.subtitle}>
        Nasi korepetytorzy
      </Typography>
      <div className={classes.bestUsers}>
        {[...Array(5)].map((_, index) => (
          <UserCard key={index} />
        ))}
      </div>
    </>
  );
}

dashboard.Layout = DashboardAuth;
