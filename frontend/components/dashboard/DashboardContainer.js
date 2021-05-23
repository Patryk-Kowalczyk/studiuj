import React from "react";
import { useSelector } from "react-redux";
import DrawerItems from "./DrawerItems";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Avatar, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEcho } from "../../lib/pusher";

const GET_LAST_MESSAGES = gql`
  query LastUnseenMessages {
    LastUnseenMessages {
      messages {
        text
        chat {
          id
        }
        sender {
          name
          avatar
        }
      }
      unseenChatsCounter
    }
  }
`;

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  logo: {
    padding: theme.spacing(2),
  },
  appBar: {
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: blueGrey[800],
    color: theme.palette.lightFont.main,
    padding: "0 1rem",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: "100vh",
    maxWidth: "100%",
    backgroundColor: grey[100],
    [theme.breakpoints.up("sm")]: {
      maxWidth: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 1),
    },
  },
  itemButton: {
    color: theme.palette.lightFont.main,
  },
  grow: {
    flexGrow: 1,
  },
  messagesContainer: {
    paper: {
      maxWidth: 500,
      minWidth: 400,
    },
  },
  messagesTitle: {
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  messageItem: {
    margin: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    borderRadius: theme.spacing(1),
    maxWidth: "100%",
    display: "flex",
    alignItems: "center",
  },
  messageTexts: {
    width: "100%",
    marginLeft: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  messageName: {
    fontSize: ".9em",
    fontWeight: 400,
  },
  messageShort: {
    fontSize: ".7em",
    fontWeight: 300,
    color: grey[700],
    textOverflow: "hidden",
  },
  messagesExpandMore: {
    display: "flex",
    justifyContent: "center",
  },
  notificationIcon: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function DashboardContainer({ children, ...props }) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const userData = useSelector((state) => state.auth.user.data);
  const [lastMessages, setLastMessages] = React.useState([]);
  const [unseenChatsCounter, setUnseenChatsCounter] = React.useState(0);
  const Echo = useEcho();

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

  //Using menu button on mobile view
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //
  //Last index
  //
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
        Ostatnie wiadomości
      </Typography>
      <Divider />
      {lastMessages.map((item, index) => (
        <Link href={`/user/messages/${item.chat.id}`} key={index}>
          <MenuItem
            onClick={handleLastMessagesClose}
            className={classes.messageItem}
          >
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={`${process.env.BACKEND_HOST}/${item.sender.avatar}` || ""}
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
      ))}
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
  //End last index

  //
  // Notifications
  //
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
  //End notifictions

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} />
          <IconButton
            aria-label="show 4 new mails"
            onClick={handleLastMessagesOpen}
          >
            <Badge badgeContent={unseenChatsCounter} color="primary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-label="show 17 new notifications"
            onClick={handleNotificationsOpen}
          >
            <Badge badgeContent={17} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerItems userData={userData} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <DrawerItems userData={userData} />
          </Drawer>
        </Hidden>
      </nav>
      {renderLastMessages}
      {renderNotifications}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default DashboardContainer;
