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
import { gql, useMutation, useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import MessageIcon from "@material-ui/icons/Message";
import DoneIcon from "@material-ui/icons/Done";
import LoadingButton from "../../components/LoadingButton";
import { useDispatch } from "react-redux";
import { setMessage } from "../../src/actions/message";
import CardComponent from "../../components/advertisements/CardComponent";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  primarySection: {},
  avatarSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    fontSize: "4rem",
  },
  actionsSection: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
  categories: {
    marginTop: theme.spacing(2),
  },
  educationCard: {
    padding: theme.spacing(2),
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  statCard: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  educationalTitle: {
    marginTop: theme.spacing(1),
  },
}));

const GET_USER = gql`
  query getUser($uuid: String!) {
    user(uuid: $uuid) {
      id
      uuid
      name
      avatar
      profile {
        universities {
          name
          major
          finished
        }
        schools {
          name
          major
          finished
        }
      }
      advertisements {
        id
        name
        rating
        description
        price
        type
        created_at
        category {
          name
        }
        user {
          id
          uuid
          avatar
          name
        }
      }
    }
  }
`;

const CREATE_OR_GET_CHAT = gql`
  mutation CreateOrGetChat($id: ID!) {
    CreateOrGetChat(id: $id) {
      id
    }
  }
`;

const EducationElement = ({ name, major, finished }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>{name}</Typography>
        {finished && <DoneIcon />}
      </Box>

      <Typography variant="caption">{major}</Typography>
    </Box>
  );
};

const userPage = () => {
  const router = useRouter();
  const classes = useStyles();
  const { id } = router.query;
  const [isMutationLoading, setIsMutationLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: {
      uuid: id,
    },
  });
  const [CreateOrGetChat] = useMutation(CREATE_OR_GET_CHAT);
  const handleClick = async () => {
    setIsMutationLoading(true);
    const isSure = confirm("Czy chcesz przejść do czatu z tym użytkownikiem?");
    if (isSure) {
      await CreateOrGetChat({
        variables: {
          id: data.user.id,
        },
      })
        .then((res) => {
          router.push(`/user/messages/${res.data.CreateOrGetChat.id}`);
          dispatch(setMessage("Przeniesiono do czatu"));
        })
        .catch((err) => console.log(err));
    }
    setIsMutationLoading(false);
  };

  React.useEffect(() => {
    refetch();
  }, []);
  const isUser = !loading && data.user;
  if (!loading && !data.user) {
    router.push("/404");
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent className={classes.card}>
            <Grid item xs={12} className={classes.actionsSection}>
              <LoadingButton
                loading={isMutationLoading}
                onClick={handleClick}
                variant="outlined"
                startIcon={<MessageIcon />}
              >
                Wiadomość
              </LoadingButton>
            </Grid>
            <Grid item xs={12} className={classes.avatarSection}>
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
            </Grid>
            <Box display="flex" mt={3}>
              <Box className={classes.statCard}>
                <Typography variant="h6">Udzielonych korepetycji</Typography>
                <Typography variant="h5" color="primary">
                  4
                </Typography>
              </Box>
              <Box className={classes.statCard}>
                <Typography variant="h6">Otrzymanych korepetycji</Typography>
                <Typography variant="h5" color="primary">
                  2
                </Typography>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography variant="h6" className={classes.categories}>
                Ulubione kategorie
              </Typography>
            </Box>
            <Box>
              <Chip variant="outlined" size="small" label="Matematyka" />
              <Chip variant="outlined" size="small" label="Informatyka" />
              <Chip variant="outlined" size="small" label="Fizyka" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card className={classes.educationCard}>
          <Typography variant="h5" gutterBottom>
            Wykształcenie
          </Typography>
          {loading ? (
            <Skeleton variant="rect" width={200} height={20} />
          ) : (
            <>
              {data.user.profile?.schools.length > 0 ? (
                <>
                  <Typography
                    variant="h5"
                    color="primary"
                    className={classes.educationalTitle}
                  >
                    Szkoły
                  </Typography>
                  {data.user.profile?.schools.map((school, k) => (
                    <EducationElement key={k} {...school} />
                  ))}
                </>
              ) : null}
            </>
          )}
          {loading ? (
            <Skeleton variant="rect" width={200} height={20} />
          ) : (
            <>
              {data.user.profile?.universities.length > 0 ? (
                <>
                  <Typography
                    variant="h5"
                    color="primary"
                    className={classes.educationalTitle}
                  >
                    Uczelnie
                  </Typography>
                  {data.user.profile?.universities.map((university, k) => (
                    <EducationElement key={k} {...university} />
                  ))}
                </>
              ) : null}
            </>
          )}
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <Typography variant="h4" gutterBottom>
            Ogłoszenia użytkownika
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            width="100%"
            justifyContent="space-around"
          >
            {!loading && data?.user?.advertisements.length > 0 ? (
              data.user.advertisements.map((adv) => (
                <CardComponent key={adv.id} data={adv} />
              ))
            ) : (
              <Typography>Obecnie brak ogłoszeń danego użytkownika</Typography>
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

userPage.Layout = DashboardAuth;
export default userPage;
