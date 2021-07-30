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
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import useStyles from "./styles/Styles";
import { useForm } from "react-hook-form";
import ControlledInput from "../common/ControlledInput";
import { gql, useQuery, useMutation } from "@apollo/client";
import LoadingButton from "../common/LoadingButton";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import Skeleton from "@material-ui/lab/Skeleton";

const ADD_UNIVERSITY = gql`
  mutation addUniversity(
    $university_id: String
    $name: String
    $major: String!
    $finished: Boolean!
  ) {
    AddUniversity(
      university_id: $university_id
      name: $name
      major: $major
      finished: $finished
    ) {
      id
      university_id
      name
      major
      finished
    }
  }
`;

const DELETE_UNIVERSITY = gql`
  mutation delete($id: ID!) {
    DeleteUniversity(id: $id) {
      id
    }
  }
`;

const EDIT_UNIVERSITY = gql`
  mutation edit(
    $id: ID!
    $university_id: String
    $name: String
    $major: String!
    $finished: Boolean!
  ) {
    EditUniversity(
      id: $id
      university_id: $university_id
      name: $name
      major: $major
      finished: $finished
    ) {
      id
      university_id
      name
      major
      finished
    }
  }
`;

const GET_UNIVERSITIES = gql`
  query getUniversities {
    me {
      name
      profile {
        type_of_education
        universities {
          id
          university_id
          name
          major
          finished
        }
      }
    }
  }
`;

function UniversityEditDialog({
  data,
  open,
  setOpen,
  setUniversities,
  universities,
  institutions,
}) {
  const classes = useStyles();
  const [finished, setFinished] = React.useState(false);
  const [EditUniversity] = useMutation(EDIT_UNIVERSITY);
  const [selectedUniversity, setSelectedUniversity] = React.useState(null);

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
    let variables = {
      id: data.id,
      major: form_data.major,
      finished,
    };
    if (!data.university_id) {
      variables.name = form_data.name;
    } else {
      variables.university_id = selectedUniversity.uid;
      variables.name = selectedUniversity.name;
    }
    console.log("variables", variables);
    await EditUniversity({
      variables,
    }).then((res) => {
      setUniversities(() => {
        let newUniversities = [...universities];
        const indexToChange = newUniversities.findIndex(
          (university) => university.id === data.id
        );
        newUniversities[indexToChange] = res.data.EditUniversity;
        return newUniversities;
      });
    });
    setOpen(false);
    setLoadingForm(false);
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 30,
  });

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="edit-university-info-modal"
      aria-describedby="simple-modal-description"
      fullWidth
      maxWidth="md"
      onEnter={() => {
        setSelectedUniversity(
          institutions.find(
            (institution) => institution.uid === data.university_id
          ) || null
        );
        setFinished(data.finished);
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="simple-dialog-title">
          Edytuj informacje o uczelni
        </DialogTitle>

        <DialogContent>
          <Grid container className={classes.centeredFields} spacing={1}>
            <Grid item xs={12} md={5}>
              {data.university_id ? (
                <Autocomplete
                  filterOptions={filterOptions}
                  id="checkboxes-tags-demo"
                  options={institutions}
                  value={selectedUniversity}
                  onChange={(_, v) => {
                    setSelectedUniversity(v);
                  }}
                  getOptionLabel={(option) => option.name || ""}
                  getOptionSelected={(o, v) => o.uid === v.uid}
                  fullWidth
                  renderOption={(option, { inputValue }) => {
                    const matches = match(option.name, inputValue);
                    const parts = parse(option.name, matches);
                    return (
                      <div>
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            style={{ fontWeight: part.highlight ? 700 : 400 }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Uczelnia"
                      placeholder="Uczelnia"
                      fullWidth
                      className={classes.autocomplete}
                    />
                  )}
                />
              ) : (
                <ControlledInput
                  name="name"
                  control={control}
                  variant="outlined"
                  placeholder="Uczelnia"
                  label="Nazwa uczelni"
                  defaultValue={data.name}
                  required
                  onChange={(e) => setName(e.target.name)}
                  fullWidth
                />
              )}
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

            <Grid
              item
              xs={12}
              md={2}
              className={classes.universityItemCheckbox}
            >
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

function UniversityAddDialog({ open, setOpen, setUniversities, institutions }) {
  const classes = useStyles();
  const [finished, setFinished] = React.useState(false);
  const [AddUniversity] = useMutation(ADD_UNIVERSITY);
  const [selectedUniversity, setSelectedUniversity] = React.useState(null);
  const [isOther, setIsOther] = React.useState(false);

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
    let variables = {
      major: data.major,
      finished,
    };
    if (isOther) {
      variables.name = data.name;
    } else {
      variables.university_id = selectedUniversity.uid;
      variables.name = selectedUniversity.name;
    }
    await AddUniversity({
      variables,
    }).then((res) => {
      setUniversities((prevState) => [...prevState, res.data.AddUniversity]);
      setOpen(false);
    });
    setLoadingForm(false);
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 30,
  });

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="edit-university-info-modal"
      aria-describedby="simple-modal-description"
      fullWidth
      maxWidth="md"
      onEnter={() => {
        setIsOther(false);
        setFinished(false);
        setSelectedUniversity(null);
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="simple-dialog-title">
          Dodaj informacje o uczelni, na której studiujesz bądź studiowałeś.
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={1} className={classes.centeredFields}>
            <Grid item xs={12} md={5}>
              {!isOther ? (
                <Autocomplete
                  filterOptions={filterOptions}
                  id="checkboxes-tags-demo"
                  options={institutions}
                  value={selectedUniversity}
                  onChange={(_, v) => {
                    setSelectedUniversity(v);
                  }}
                  fullWidth
                  required
                  getOptionLabel={(option) => option.name || ""}
                  getOptionSelected={(o, v) => o.uid === v.uid}
                  renderOption={(option, { inputValue }) => {
                    const matches = match(option.name, inputValue);
                    const parts = parse(option.name, matches);
                    return (
                      <div>
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            style={{ fontWeight: part.highlight ? 700 : 400 }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Uczelnia"
                      placeholder="Uczelnia"
                      className={classes.autocomplete}
                      fullWidth
                    />
                  )}
                />
              ) : (
                <ControlledInput
                  name="name"
                  control={control}
                  variant="outlined"
                  placeholder="Uczelnia"
                  label="Nazwa uczelni"
                  fullWidth
                />
              )}
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

            <Grid
              item
              xs={12}
              md={2}
              className={classes.universityItemCheckbox}
            >
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

            <Grid item xs={12} style={{ justifyContent: "flex-start" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isOther}
                    onChange={(e) => {
                      setIsOther(!isOther);
                    }}
                    color="primary"
                  />
                }
                label="Inna uczelnia"
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

export default function EducationUniversitiesSettings() {
  const classes = useStyles();
  const [universities, setUniversities] = React.useState([]);
  const [institutions, setInstitutions] = React.useState([]);
  const [openEditUniversityModal, setOpenEditUniversityModal] = React.useState(
    false
  );
  const [dataEditUniversityModal, setDataEditUniversityModal] = React.useState(
    {}
  );
  const [openAddUniversityModal, setOpenAddUniversityModal] = React.useState(
    false
  );
  const { loading, error, data, refetch } = useQuery(GET_UNIVERSITIES);
  const [DeleteUniversity] = useMutation(DELETE_UNIVERSITY);

  const handleDeleteInUniversity = async (id) => {
    await DeleteUniversity({ variables: { id: id } }).then((res) =>
      setUniversities(universities.filter((university) => university.id !== id))
    );
  };

  React.useEffect(async () => {
    await fetch("https://polon.nauka.gov.pl/opi-ws/api/academicInstitutions")
      .then((res) => res.json())
      .then((data) => setInstitutions(data.institutions))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    refetch();
  }, []);

  React.useEffect(() => {
    if (data) {
      if (data.me.profile !== null) {
        setUniversities(data.me.profile.universities);
      } else {
        setUniversities([]);
      }
    }
  }, [data]);

  return (
    <>
      <Typography variant="h6" component="h3">
        Uczelnie
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nazwa uczelni</TableCell>
              <TableCell align="right">Kierunek strudiów</TableCell>
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
              universities.map((university) => (
                <TableRow key={university.id}>
                  <TableCell component="th" scope="row">
                    {university.name}
                  </TableCell>
                  <TableCell align="right">{university.major}</TableCell>
                  <TableCell align="center">
                    <Checkbox checked={university.finished} color="primary" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit university"
                      onClick={() => {
                        setDataEditUniversityModal(university);
                        setOpenEditUniversityModal(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete university"
                      onClick={() => handleDeleteInUniversity(university.id)}
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

      <UniversityEditDialog
        data={dataEditUniversityModal}
        open={openEditUniversityModal}
        setOpen={setOpenEditUniversityModal}
        setUniversities={setUniversities}
        universities={universities}
        institutions={institutions}
      />

      <Box display="flex" justifyContent="flex-end" marginY={1}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpenAddUniversityModal(true)}
        >
          Dodaj uczelnię
        </Button>

        <UniversityAddDialog
          open={openAddUniversityModal}
          setOpen={setOpenAddUniversityModal}
          setUniversities={setUniversities}
          institutions={institutions}
        />
      </Box>
    </>
  );
}
