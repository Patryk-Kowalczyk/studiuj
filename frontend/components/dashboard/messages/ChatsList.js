import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { Avatar, Box, Hidden, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  chatItem: {
    borderRadius: theme.spacing(1),
    "&:hover": {
      backgroundColor: grey[100],
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  chatItemCurrent: {
    backgroundColor: grey[200],
  },
  chatItemName: {
    marginLeft: theme.spacing(1),
  },
}));

const GET_CHATS = gql`
  query chats {
    UserChats {
      chat {
        id
        usersInChat {
          id
          user {
            id
            name
            avatar
          }
        }
      }
    }
  }
`;

const ChatItem = ({ info }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const isCurrent = id === info.id;
  return (
    <Link href={`/user/messages/${info.id}`}>
      <Box
        display="flex"
        alignItems="center"
        mt={2}
        mb={1}
        p={1}
        className={clsx(classes.chatItem, {
          [classes.chatItemCurrent]: isCurrent,
        })}
      >
        <Avatar
          src={`${process.env.BACKEND_HOST}/${info.user.user.avatar}` || ""}
        >
          {info.user.user.name[0]}
        </Avatar>
        <Hidden only={["xs", "sm"]}>
          <Typography variant="h6" className={classes.chatItemName}>
            {info.user.user.name}
          </Typography>
        </Hidden>
      </Box>
    </Link>
  );
};

const ChatsList = () => {
  const { loading, error, data, refetch } = useQuery(GET_CHATS);
  const user = useSelector((state) => state.auth.user.data);
  const [chats, setChats] = React.useState([]);

  React.useEffect(() => {
    refetch();
  }, []);

  React.useEffect(() => {
    if (data) {
      const newChats = data.UserChats.map((chat) => {
        const chatUser = chat.chat.usersInChat.find(
          (oneOf) => oneOf.user.id !== user.id
        );
        return {
          id: chat.chat.id,
          user: chatUser,
        };
      });
      setChats(newChats);
    }
  }, [data]);
  return (
    <Box display="flex" flexDirection="column">
      {loading ? (
        <>
          {[...new Array(5)].map((_, i) => (
            <Box display="flex" alignItems="center" mt={2} mb={1} p={1} key={i}>
              <Skeleton variant="circle" width={40} height={40} />
              <Hidden only={["xs", "sm"]}>
                <Skeleton
                  variant="rect"
                  width={Math.floor(Math.random() * (200 - 50)) + 50}
                  height={30}
                />
              </Hidden>
            </Box>
          ))}
        </>
      ) : (
        <>
          {chats.map((chat, i) => (
            <ChatItem info={chat} key={i} />
          ))}
        </>
      )}
    </Box>
  );
};

export default ChatsList;
