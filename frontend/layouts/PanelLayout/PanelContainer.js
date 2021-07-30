import React from "react";
import { useSelector } from "react-redux";
import DrawerItems from "./DrawerItems";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { useTheme } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {useStyles} from "./styles/PanelStyles";
import useNotificationsModal from "./useNotificationsModal";
import useMessagesModal from "./useMessagesModal";

function PanelContainer({ children, ...props }) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const userData = useSelector((state) => state.auth.user.data);
  const {renderNotifications, handleNotificationsOpen} = useNotificationsModal()
  const {renderLastMessages, handleLastMessagesOpen, unseenChatsCounter} = useMessagesModal({userData});

  //Using menu button on mobile view
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

export default PanelContainer;
