import React from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import useStyles from "./styles/Styles";
import { useForm, Controller } from "react-hook-form";
import ControlledInput from "../../ControlledInput";
import { gql, useQuery, useMutation } from "@apollo/client";
import LoadingButton from "../../LoadingButton";
import Skeleton from "@material-ui/lab/Skeleton";

const ADD_SCHOOL = gql`
  mutation addSchool($name: String!, $major: String!, $finished: Boolean!) {
    AddSchool(name: $name, major: $major, finished: $finished) {
      id
      name
      major
      finished
    }
  }
`;

const DELETE_SCHOOL = gql`
  mutation delete($id: ID!) {
    DeleteSchool(id: $id) {
      id
    }
  }
`;

const EDIT_SCHOOL = gql`
  mutation edit(
    $id: ID!
    $name: String!
    $major: String!
    $finished: Boolean!
  ) {
    EditSchool(id: $id, name: $name, major: $major, finished: $finished) {
      id
      name
      major
      finished
    }
  }
`;

const GET_SCHOOLS = gql`
  query getSchools {
    me {
      name
      profile {
        type_of_education
        schools {
          id
          name
          major
          finished
        }
      }
    }
  }
`;

function SchoolEditDialog({ data, open, setOpen, setSchools, schools }) {
  const classes = useStyles();
  const [finished, setFinished] = React.useState(false);
  const [EditSchool] = useMutation(EDIT_SCHOOL);

  const [loadingForm, setLoadingForm] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    errors,
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (form_data) => {
    setLoadingForm(true);
    await EditSchool({
      variables: {
        id: data.id,
        name: form_data.name,
        major: form_data.major,
        finished,
      },
    }).then((res) => {
      setSchools(() => {
        let newSchools = [...schools];
        const indexToChange = newSchools.findIndex(
          (school) => school.id === data.id
        );
        newSchools[indexToChange] = res.data.EditSchool;
        return newSchools;
      });
      setOpen(false);
    });
    setLoadingForm(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="edit-school-info-modal"
      aria-describedby="simple-modal-description"
      fullWidth
      maxWidth="md"
      onEnter={() => setFinished(data.finished)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="simple-dialog-title">
          Edytuj informacje o szkole
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={5}>
              <ControlledInput
                name="name"
                control={control}
                variant="outlined"
                placeholder="Szkoła"
                label="Nazwa szkoły"
                defaultValue={data.name}
                required
                onChange={(e) => setName(e.target.name)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <ControlledInput
                name="major"
                control={control}
                variant="outlined"
                placeholder="Kierunek"
                label="Kierunek"
                defaultValue={data.major}
                required
                onChange={(e) => setMajor(e.target.vaule)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={2} className={classes.schoolItemCheckbox}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={finished}
                    onChange={(_) => {
                      setFinished((prev) => !prev);
                    }}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Ukończona"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Anuluj
          </Button>
          <LoadingButton
            loading={loadingForm}
            variant="contained"
            color="primary"
            type="submit"
          >
            Zatwierdź
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

function SchoolAddDialog({ open, setOpen, setSchools }) {
  const classes = useStyles();
  const [finished, setFinished] = React.useState(false);
  const [AddSchool] = useMutation(ADD_SCHOOL);

  const [loadingForm, setLoadingForm] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    errors,
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (data) => {
    setLoadingForm(true);
    await AddSchool({
      variables: { name: data.name, major: data.major, finished },
    }).then((res) => {
      setSchools((prevState) => [...prevState, res.data.AddSchool]);
      setOpen(false);
    });
    setLoadingForm(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="edit-school-info-modal"
      aria-describedby="simple-modal-description"
      fullWidth
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="simple-dialog-title">
          Dodaj informacje o szkole, do ktorej uczęszczałeś/ uczęszczasz.
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={5}>
              <ControlledInput
                name="name"
                control={control}
                variant="outlined"
                placeholder="Szkoła"
                label="Nazwa szkoły"
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <ControlledInput
                name="major"
                control={control}
                variant="outlined"
                placeholder="Kierunek"
                label="Kierunek"
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={2} className={classes.schoolItemCheckbox}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={finished}
                    onChange={(e) => setFinished(!finished)}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Ukończona"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Anuluj
          </Button>
          <LoadingButton
            loading={loadingForm}
            variant="contained"
            color="primary"
            type="submit"
          >
            Zatwierdź
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function EducationSchoolSettings() {
  const classes = useStyles();
  const [schools, setSchools] = React.useState([]);
  const [openEditSchoolModal, setOpenEditSchoolModal] = React.useState(false);
  const [dataEditSchoolModal, setDataEditSchoolModal] = React.useState({});
  const [openAddSchoolModal, setOpenAddSchoolModal] = React.useState(false);
  const { loading, error, data, refetch } = useQuery(GET_SCHOOLS);
  const [DeleteSchool] = useMutation(DELETE_SCHOOL);

  const handleDeleteInSchool = async (id) => {
    await DeleteSchool({ variables: { id: id } }).then((res) =>
      setSchools(schools.filter((school) => school.id !== id))
    );
  };

  React.useEffect(() => {
    refetch();
  }, []);

  React.useEffect(() => {
    if (data) {
      if (data.me.profile !== null) {
        setSchools(data.me.profile.schools);
      } else {
        setSchools([]);
      }
    }
  }, [data]);

  return (
    <>
      <Typography variant="h6" component="h3">
        Szkoły
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nazwa</TableCell>
              <TableCell align="right">Kierunek</TableCell>
              <TableCell align="right">Ukończony</TableCell>
              <TableCell align="right">Edytuj</TableCell>
              <TableCell align="right">Usuń</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell component="th" scope="row">
                  <Skeleton value="text" />
                </TableCell>
                <TableCell align="right">
                  <Skeleton value="text" />
                </TableCell>
                <TableCell align="center">
                  <Skeleton value="text" />
                </TableCell>
                <TableCell align="right">
                  <Skeleton value="text" />
                </TableCell>
                <TableCell align="center">
                  <Skeleton value="text" />
                </TableCell>
              </TableRow>
            ) : (
              schools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell component="th" scope="row">
                    {school.name}
                  </TableCell>
                  <TableCell align="right">{school.major}</TableCell>
                  <TableCell align="center">
                    <Checkbox checked={school.finished} color="primary" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit school"
                      onClick={() => {
                        setDataEditSchoolModal(school);
                        setOpenEditSchoolModal(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete school"
                      onClick={() => handleDeleteInSchool(school.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <SchoolEditDialog
        data={dataEditSchoolModal}
        open={openEditSchoolModal}
        setOpen={setOpenEditSchoolModal}
        setSchools={setSchools}
        schools={schools}
      />

      <Box display="flex" justifyContent="flex-end" marginY={1}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpenAddSchoolModal(true)}
        >
          Dodaj szkołę
        </Button>

        <SchoolAddDialog
          open={openAddSchoolModal}
          setOpen={setOpenAddSchoolModal}
          setSchools={setSchools}
        />
      </Box>
    </>
  );
}
