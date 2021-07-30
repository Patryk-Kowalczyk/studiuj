import React from "react";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import {Avatar, Button} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useStyles} from "./styles/PanelStyles";

function useNotificationsModal() {
    const classes = useStyles();
    const [anchorNotificationsEl, setAnchorNotificationsEl] =
        React.useState(null);
    const areNotificationsOpen = Boolean(anchorNotificationsEl);

    const handleNotificationsOpen = (event) => {
        setAnchorNotificationsEl(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setAnchorNotificationsEl(null);
    };

    const notificationsId = "notifications";
    const renderNotifications = (
        <Menu
            anchorEl={anchorNotificationsEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={notificationsId}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={areNotificationsOpen}
            onClose={handleNotificationsClose}
            className={classes.messagesContainer}
        >
            <Typography variant="h5" className={classes.messagesTitle}>
                Powiadomienia
            </Typography>
            <Divider />
            {[0, 1, 2].map((item) => (
                <MenuItem
                    onClick={handleNotificationsClose}
                    key={item}
                    className={classes.messageItem}
                >
                    <Avatar className={classes.notificationIcon}>
                        <AssignmentIcon />
                    </Avatar>
                    <div className={classes.messageTexts}>
                        <Typography className={classes.messageName}>
                            Odpowiedź na Twój komentarz
                        </Typography>
                        <Typography className={classes.messageShort}>
                            Użytkownik <b>XYZ</b> odpowiedział na Twoje zapytanie
                        </Typography>
                    </div>
                </MenuItem>
            ))}
            <div className={classes.messagesExpandMore}>
                <Button
                    endIcon={
                        <ExpandMoreIcon color="inherit" aria-label="show more index" />
                    }
                >
                    Pokaż wszystko
                </Button>
            </div>
        </Menu>
    );

    return {
            renderNotifications,
            handleNotificationsOpen
    }
}

export default useNotificationsModal;