import React from "react";
import PanelUserCard from "./PanelUserCard";
import Link from "next/link";
import {useRouter} from "next/router";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import HomeIcon from "@material-ui/icons/Home";
import ChatIcon from "@material-ui/icons/Chat";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DuoIcon from '@material-ui/icons/Duo';
import {useStyles} from "./styles/DrawerStyles";

const data = [
    {
        name: "Strona główna",
        icon: <HomeIcon/>,
        href: "/user/dashboard",
    },
    {
        name: "Ogłoszenia",
        icon: <FolderSharedIcon/>,
        subitems: [
            {
                name: "Dodaj",
                href: "/user/add-advertisement",
            },
            {
                name: "Pokaż wszystkie",
                href: "/user/advertisements",
            },
            {
                name: "Moje ogłoszenia",
                href: "/user/my-advertisements",
            },
        ],
    },
    {
        name: "Zamówienia",
        icon: <ShoppingCartIcon/>,
        href: "/user/orders",
    },
    {
        name: "Spotkania",
        icon: <DuoIcon/>,
        href: "/user/meetings",
    },

    {
        name: "Wiadomości",
        icon: <ChatIcon/>,
        href: "/user/messages",
    },
];

const LinkedSimpleItem = ({data}) => {
    const classes = useStyles();
    const router = useRouter();
    const isSelected = router.pathname.includes(data.href);

    return (
        <Link href={data.href}>
            <ListItem button className={clsx({[classes.selected]: isSelected})}>
                <ListItemIcon className={classes.itemButton}>{data.icon}</ListItemIcon>
                <ListItemText primary={data.name}/>
            </ListItem>
        </Link>
    );
};

const LinkedCollapseItem = ({data}) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const router = useRouter();
    const isSelected = data.subitems.some((item) =>
        router.pathname.includes(item.href)
    );

    const handleClick = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        if (isSelected && !open) {
            setOpen(true);
        }
    }, []);

    return (
        <>
            <ListItem
                button
                onClick={handleClick}
                className={clsx({[classes.selected]: isSelected})}
            >
                <ListItemIcon className={classes.itemButton}>
                    <FolderSharedIcon/>
                </ListItemIcon>
                <ListItemText primary="Ogłoszenia"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {data.subitems.map((itemData) => (
                    <List
                        component="div"
                        disablePadding
                        key={itemData.name}
                        className={clsx(classes.subitem, {
                            [classes.subitemActive]: router.pathname.includes(itemData.href),
                        })}
                    >
                        <Link href={itemData.href}>
                            <ListItem button className={classes.nested}>
                                <ListItemText primary={itemData.name}/>
                            </ListItem>
                        </Link>
                    </List>
                ))}
            </Collapse>
        </>
    );
};

const LinkedItem = ({data, ...props}) => {
    if (!data.subitems && !data.href) {
        throw new Error("Item without childrens must have href param");
    }

    if (!data.subitems) {
        return <LinkedSimpleItem data={data}/>;
    } else {
        return <LinkedCollapseItem data={data}/>;
    }
};

export default function DashboardMenu({userData}) {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h3" component="h2" className={classes.logo}>
                Studiuj
            </Typography>
            <PanelUserCard userData={userData}/>
            <List>
                {data.map((dataItem) => (
                    <LinkedItem data={dataItem} key={dataItem.name}/>
                ))}
            </List>
        </div>
    );
}
