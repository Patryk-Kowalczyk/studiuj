import React from "react";
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridPagination,
} from "@material-ui/data-grid";
import {
    Box,
    Button,
    InputBase,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import GridLocaleText from "./GridLocaleText";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import LoadingButton from "../../common/buttons/LoadingButton";
import {useDispatch} from "react-redux";
import {setMessage} from "../../../src/actions/message";

const useStyles = makeStyles((theme) => ({
    input: {
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: theme.spacing(1),
        width: "100%",
        flexGrow: 1,
        maxWidth: 350,
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
        },
    },
    inputBase: {
        flexGrow: 1,
        padding: theme.spacing(0, 2),
    },
    container: {
        flexDirection: "row",

        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    button: {
        width: "100%",
    },
}));

function DeleteButton({params, setRows}) {
    const dispatch = useDispatch();
    const handleClick = () => {
        const isSure = confirm("Jesteś pewny, że chcesz usunąć te miejsce?");
        if (isSure) {
            axios
                .delete(process.env.BACKEND_HOST + "/places/" + params.id)
                .then((res) => {
                    setRows((state) => state.filter((row) => row.id !== params.id));
                    dispatch(setMessage("Pomyślnie usunięto miejsce", "success"));
                })
                .catch((err) => {
                    console.error(err);
                    dispatch(setMessage("Nie udało się usunąć tego miejsca", "error"));
                });
        }
    };
    return (
        <Button variant="contained" color="secondary" onClick={handleClick}>
            Usuń
        </Button>
    );
}

function CustomToolbar({setRows}) {
    const [name, setName] = React.useState < string > ("");
    const [loading, setLoading] = React.useState < boolean > (false);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleAdd = () => {
        setLoading(true);
        axios
            .post(process.env.BACKEND_HOST + "/places", {
                name,
            })
            .then((res) => {
                const data = res.data.data;
                setRows((state) => [...state, {id: data.id, name: data.name}]);
                dispatch(setMessage("Pomyślnie dodano nowe miejsce", "success"));
            })
            .catch((err) => console.error(err));
        setLoading(false);
    };

    return (
        <GridToolbarContainer>
            <Box
                width="100%"
                display="flex"
                px={1}
                py={1}
                mb={1}
                justifyContent="space-between"
                flexGrow={1}
                className={classes.container}
            >
                <Typography variant="h6">Dodaj miejsce</Typography>
                <Box className={classes.input} display="flex">
                    <InputBase
                        placeholder="Nazwa"
                        className={classes.inputBase}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <LoadingButton
                        loading={loading}
                        startIcon={<AddIcon/>}
                        variant="outlined"
                        onClick={handleAdd}
                    >
                        Dodaj
                    </LoadingButton>
                </Box>
            </Box>
        </GridToolbarContainer>
    );
}

function CustomPagination() {
    const customDiplayedRowText = ({from, to, count}) =>
        `${from}-${to} z ${count}`;
    return (
        <GridPagination
            labelDisplayedRows={customDiplayedRowText}
            nextIconButtonText={"Następna strona"}
        />
    );
}

function Places() {
    const [rows, setRows] = React.useState([]);

    const dispatch = useDispatch();
    const handleEditCellChangeCommited = (props) => {
        const currentRow = rows.find((row) => row.id === props.id);
        if (currentRow && currentRow.name !== props.props.value) {
            axios
                .put(process.env.BACKEND_HOST + "/places/" + props.id, {
                    name: props.props.value,
                })
                .then((res) => {
                    setRows((state) =>
                        state.map((row) => {
                            if (row.id === props.id) {
                                row.name = props.props.value;
                            }
                            return row;
                        })
                    );
                    dispatch(setMessage("Pomyślnie zmodyfikowano rekord", "success"));
                })
                .catch((err) => console.error(err));
        }
    };

    React.useEffect(() => {
        axios
            .get(process.env.BACKEND_HOST + "/places")
            .then((res) => setRows(res.data.data))
            .catch((err) => console.error(err));
    }, []);

    const columns = [
        {
            field: "id",
            headerName: "Id",
        },
        {
            field: "name",
            headerName: "Miejsce",
            flex: 1,
            editable: true,
            description: "Naciśnij dwa razy, aby edytować nazwę.",
        },
        {
            field: "delete",
            headerName: "Usuń",
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params) => (
                <DeleteButton params={params} setRows={setRows}/>
            ),
        },
    ];

    return (
        <Paper style={{width: "100%", height: 450}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                onEditCellChangeCommitted={handleEditCellChangeCommited}
                components={{
                    Toolbar: () => <CustomToolbar setRows={setRows}/>,
                    Pagination: CustomPagination,
                }}
                localeText={GridLocaleText}
                disableColumnMenu={true}
            />
        </Paper>
    );
}

export default Places;
