import {useQuery} from "@apollo/client";
import {GET_LAST_MESSAGES} from "../../lib/graphql/queries/messagesQueries";
import React from "react";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Link from "next/link";
import MenuItem from "@material-ui/core/MenuItem";
import {Avatar, Button} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useEcho} from "../../lib/hooks/usePusher";
import {useStyles} from "./styles/PanelStyles";

function useMessagesModal({userData}) {
    const [lastMessages, setLastMessages] = React.useState([]);
    const [unseenChatsCounter, setUnseenChatsCounter] = React.useState(0);
    const Echo = useEcho();
    const classes = useStyles();

    const { loading, error, data, refetch } = useQuery(GET_LAST_MESSAGES);

    React.useEffect(() => {
        if (data) {
            setLastMessages(data.LastUnseenMessages.messages);
            setUnseenChatsCounter(data.LastUnseenMessages.unseenChatsCounter);
        }
    }, [data]);

    const handleChangeInfo = () => {
        refetch();
    };

    React.useEffect(() => {
        Echo.private("user." + userData.id).listen(
            ".changeChatInfo",
            handleChangeInfo
        );

        return () => {
            Echo.leave("user." + userData.id);
        };
    }, []);

    const [anchorMessagesEl, setAnchorMessagesEl] = React.useState(null);
    const areLastMessagesOpen = Boolean(anchorMessagesEl);

    const handleLastMessagesOpen = (event) => {
        setAnchorMessagesEl(event.currentTarget);
    };

    const handleLastMessagesClose = () => {
        setAnchorMessagesEl(null);
    };

    const lastMessagesId = "last-index";
    const renderLastMessages = (
        <Menu
            anchorEl={anchorMessagesEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={lastMessagesId}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={areLastMessagesOpen}
            onClose={handleLastMessagesClose}
            className={classes.messagesContainer}
        >
            <Typography variant="h5" className={classes.messagesTitle}>
                Nowe wiadomości
            </Typography>
            <Divider />
            {lastMessages.length > 0 ? (
                lastMessages.map((item, index) => (
                    <Link href={`/user/messages/${item.chat.id}`} key={index}>
                        <MenuItem
                            onClick={handleLastMessagesClose}
                            className={classes.messageItem}
                        >
                            <Avatar
                                aria-label="recipe"
                                className={classes.avatar}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/${item.sender.avatar}` || ""}
                            >
                                {`${item.sender.name[0]}`}
                            </Avatar>
                            <div className={classes.messageTexts}>
                                <Typography className={classes.messageName}>
                                    {item.sender.name}
                                </Typography>
                                <Typography className={classes.messageShort}>
                                    {item.text}
                                </Typography>
                            </div>
                        </MenuItem>
                    </Link>
                ))
            ) : (
                <Typography component="div" style={{ padding: 8, color: grey[600] }}>
                    {"Obecnie nie posiadasz nowych wiadomości 🤷‍♂️"}
                </Typography>
            )}
            <div className={classes.messagesExpandMore}>
                <Link href="/user/messages">
                    <Button
                        endIcon={
                            <ExpandMoreIcon color="inherit" aria-label="show more index" />
                        }
                    >
                        Pokaż wszystko
                    </Button>
                </Link>
            </div>
        </Menu>
    );

    return {renderLastMessages, handleLastMessagesOpen, unseenChatsCounter}
}

export default useMessagesModal;