import React from "react";
import {
  Card,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Button,
  ButtonGroup,
} from "@material-ui/core";

import useStyles from "./styles/Styles";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Skeleton from "@material-ui/lab/Skeleton";
import UniverisiesSettings from "./UniverisiesSettings";
import LoadingButton from "./../../LoadingButton";
import EducationSchoolSettings from "./EducationSchoolSettings";
import EducationalUniversitiesSettings from "./EducationalUniversitiesSettings";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../src/actions/auth";

const GET_PROFILE = gql`
  query profile {
    me {
      profile {
        type_of_education
      }
    }
  }
`;

const CREATE_OR_CHANGE_PROFILE = gql`
  mutation CreateOrChangeProfile($type_of_education: String!) {
    CreateOrChangeProfile(type_of_education: $type_of_education) {
      type_of_education
    }
  }
`;

const UNIVERSITIES = [
  {
    id: 1,
    uid: "bsTIibl14j-FXDX1as_pUTA",
    name: "zut",
    major: "Informatyka",
    finished: true,
  },
];

export default function EducationUserSettings() {
  const classes = useStyles();
  const [universities, setUniversities] = React.useState([]);
  const [typeOfEducation, setTypeOfEducation] = React.useState("");
  const [isTypeOfEducation, setIsTypeOfEducation] = React.useState(false);
  const [userUniversities, setUserUniversities] = React.useState(UNIVERSITIES);
  const [loadingForm, setLoadingForm] = React.useState(false);

  const { loading, error, data } = useQuery(GET_PROFILE);
  const [CreateOrChangeProfile] = useMutation(CREATE_OR_CHANGE_PROFILE);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data) {
      if (typeof data.me.profile !== "undefined" && data.me.profile !== null) {
        setTypeOfEducation(data.me.profile.type_of_education);
        setIsTypeOfEducation(true);
      }
    }
  }, [data]);

  const handleCreateOrChangeProfile = async () => {
    await CreateOrChangeProfile({
      variables: { type_of_education: typeOfEducation },
    }).then((res) => {
      setTypeOfEducation(res.data.CreateOrChangeProfile.type_of_education);
      dispatch(setUserInfo({ profile: res.data.CreateOrChangeProfile }));
      setIsTypeOfEducation(true);
    });
  };

  const handleDeleteInUniversity = (id) => {
    setUserUniversities(
      userUniversities.filter((userUniversity) => userUniversity.id !== id)
    );
  };
  const handleChangeInUniversity = (id, field, newValue) => {
    const changedIndex = userUniversities.findIndex(
      (userUniversity) => userUniversity.id === id
    );
    let newUserUniversities = userUniversities;
    if (field === "finished") {
      newUserUniversities[changedIndex][field] = !newUserUniversities[
        changedIndex
      ][field];
    } else {
      newUserUniversities[changedIndex][field] = newValue;
    }

    setUserUniversities([...newUserUniversities]);
  };

  return (
    <Card className={classes.root}>
      <Typography variant="h6" component="h3">
        Wykształcenie
      </Typography>
      <Typography variant="caption">
        Wprowadź informacjie o swojej edukacji, aby pomóc znaleźć dla Ciebie
        odpowiednie osoby.
      </Typography>
      <Divider />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="type-of-education-select-label">
          Wykształcenie
        </InputLabel>
        <Select
          labelId="type-of-education-select-label"
          id="type-of-education-select"
          value={typeOfEducation}
          onChange={(e) => setTypeOfEducation(e.target.value)}
          label="Wykształcenie"
          required
        >
          <MenuItem value={"podstawowe"}>Podstawowe</MenuItem>
          <MenuItem value={"gimnazjalne"}>Gimnazjalne</MenuItem>
          <MenuItem value={"zawodowe"}>Zawodowe</MenuItem>
          <MenuItem value={"średnie"}>Średnie</MenuItem>
          <MenuItem value={"wyższe"}>Wyższe</MenuItem>
        </Select>
      </FormControl>
      <LoadingButton
        loading={loadingForm || false}
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handleCreateOrChangeProfile}
      >
        {isTypeOfEducation ? "Zmień" : "Zatwierdź"}
      </LoadingButton>

      {isTypeOfEducation ? (
        <>
          <EducationSchoolSettings />

          {typeOfEducation === "wyższe" && <EducationalUniversitiesSettings />}
        </>
      ) : null}
    </Card>
  );
}
