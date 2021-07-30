import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { Avatar, Badge, Box, Hidden, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useEcho } from "../../lib/hooks/usePusher";

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
    marginLeft: theme.spacing(2),
  },
}));

const GET_CHATS = gql`
  query chats {
    UserChats {
      userChat {
        chat {
          id
        }
      }
      sender {
        id
        name
        avatar
      }
      unseenMessagesCounter
      lastMessageDate
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
        <Badge color="primary" badgeContent={info.counter}>
          <Avatar src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/${info.user.avatar}` || ""}>
            {info.user.name[0]}
          </Avatar>
        </Badge>

        <Hidden only={["xs", "sm"]}>
          <Typography variant="h6" className={classes.chatItemName}>
            {info.user.name}
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
  const Echo = useEcho();

  React.useEffect(() => {
    refetch();
  }, []);

  const handleChangeInfo = () => {
    refetch();
  };

  React.useEffect(() => {
    Echo.private("user." + user.id).listen(".changeChatInfo", handleChangeInfo);
  }, []);

  React.useEffect(() => {
    if (data) {
      let newChats = data.UserChats.map((chat) => {
        const chatSender = chat.sender;
        return {
          id: chat.userChat.chat.id,
          user: chatSender,
          counter: chat.unseenMessagesCounter,
          lastDate: chat.lastMessageDate,
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
