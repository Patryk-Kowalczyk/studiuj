import React from "react";
import { Avatar, Box, IconButton, InputBase, Paper } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useEcho } from "../../../lib/pusher";

const useStyles = makeStyles((theme) => ({
  root: {
    gridTemplateRows: "1fr auto",
    height: "100%",
  },
  inputContainer: {
    backgroundColor: grey[100],
    borderRadius: theme.spacing(2),
  },
  input: {
    flexGrow: 1,
  },

  message: {
    backgroundColor: grey[200],
    borderRadius: theme.spacing(2),
  },
  authUserMessage: {
    alignSelf: "flex-end",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white.main,
  },
}));

const GET_MESSAGES = gql`
  query chat($id: ID!) {
    ChatMessages(id: $id) {
      id
      usersInChat {
        user {
          id
          name
          avatar
        }
      }
      messages {
        id
        text
        sender {
          id
        }
      }
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $sender_id: ID!
    $receiver_id: ID!
    $chat_id: ID!
    $text: String!
  ) {
    CreateMessage(
      sender_id: $sender_id
      receiver_id: $receiver_id
      chat_id: $chat_id
      text: $text
    ) {
      id
      text
      sender {
        id
      }
    }
  }
`;

const MARK_MESSAGES_AS_SEEN = gql`
  mutation MarkMessagesAsSeen($chat_id: ID!) {
    MarkMessagesAsSeen(chat_id: $chat_id)
  }
`;

function SingleMessage({ data, user, receiver }) {
  const classes = useStyles();
  const isAuthUser = user.id === data.sender.id;
  return (
    <Box display={"flex"} alignSelf={isAuthUser ? "flex-end" : "flex-start"}>
      <Box display={"flex"} alignItems={"center"}>
        {!isAuthUser ? (
          <Avatar
            alt="User Avatar"
            src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/${receiver.user.avatar}` || ""}
          >
            {receiver.user.name[0]}
          </Avatar>
        ) : null}
        <Box
          className={clsx(
            {
              [classes.authUserMessage]: isAuthUser,
            },
            classes.message
          )}
          p={1}
          ml={1}
        >
          {data.text}
        </Box>
      </Box>
    </Box>
  );
}

function MessagesContent({ messages, receiver, user }) {
  const messagesEl = React.useRef();

  React.useEffect(() => {
    messagesEl.current.scroll({ top: messagesEl.current.scrollHeight });
  }, [messages]);
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width={"100%"}
      height={"100%"}
      overflow="auto"
      ref={messagesEl}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
        minHeight={"100%"}
      >
        {messages.map((message) => (
          <SingleMessage
            user={user}
            receiver={receiver}
            data={message}
            key={message.id}
          />
        ))}
      </Box>
    </Box>
  );
}

function Messages(props) {
  const classes = useStyles();
  const [messages, setMessages] = React.useState([]);
  const [receiver, setReceiver] = React.useState(null);
  const [text, setText] = React.useState("");
  const user = useSelector((state) => state.auth.user.data);
  const Echo = useEcho();

  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data, refetch } = useQuery(GET_MESSAGES, {
    variables: {
      id: Number(id),
    },
  });
  const [CreateMessage] = useMutation(CREATE_MESSAGE);
  const [MarkMessagesAsSeen] = useMutation(MARK_MESSAGES_AS_SEEN);

  const handleClick = () => {
    CreateMessage({
      variables: {
        text,
        receiver_id: Number(receiver.user.id),
        sender_id: Number(user.id),
        chat_id: Number(id),
      },
    })
      .then((res) => {
        setText("");
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    refetch();
  }, [id]);

  React.useEffect(() => {
    MarkMessagesAsSeen({
      variables: {
        chat_id: Number(id),
      },
    });
  }, [messages]);
  React.useEffect(() => {
    if (data) {
      if (data.ChatMessages.messages) {
        setMessages(data.ChatMessages.messages);
      } else {
        setMessages([]);
      }
      const newReceiver = data.ChatMessages.usersInChat.find(
        (chatUser) => chatUser.user.id !== user.id
      );
      setReceiver(newReceiver);
    }
  }, [data]);

  const handleMessageEvent = (e) => {
    setMessages((statemessages) => [...statemessages, e.message]);
  };

  React.useEffect(() => {
    Echo.private("chat." + id).listen(".newMessage", handleMessageEvent);

    return () => {
      Echo.leave("chat." + id);
    };
  }, [id]);

  return (
    <Box display="grid" className={classes.root} mx={2}>
      <Box height="100%" position="relative">
        <MessagesContent messages={messages} receiver={receiver} user={user} />
      </Box>
      <Box
        display="flex"
        width={"100%"}
        justifyContent="space-between"
        className={classes.inputContainer}
        pl={2}
        mt={2}
      >
        <InputBase
          placeholder="Wiadomość"
          className={classes.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IconButton onClick={handleClick}>
          <SendOutlined />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Messages;
