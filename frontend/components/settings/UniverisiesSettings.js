import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  IconButton,
  Card,
} from "@material-ui/core";
import useStyles from "./styles/Styles";
import DeleteIcon from "@material-ui/icons/Delete";

export default function UniverisiesSettings({
  universities,
  id,
  uid,
  name,
  major,
  other,
  finished,
  handleDeleteInUniversity,
  handleChangeInUniversity,
}) {
  const classes = useStyles();
  const [selectedUniversity, setSelectedUniversity] = React.useState(null);
  React.useEffect(() => {
    if (uid) {
      const newUniversity = universities.filter(
        (university) => university.uid === uid
      )[0];
      if (typeof newUniversity !== "undefined") {
        setSelectedUniversity(newUniversity);
      }
    } else {
      setSelectedUniversity(null);
    }
  }, [universities, uid]);

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 30,
  });
  return (
    <Card className={classes.university}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {other ? (
            <TextField
              variant="outlined"
              placeholder="Nazwa uczelni"
              label="Nazwa uczelni"
              value={name}
              onChange={(e) =>
                handleChangeInUniversity(id, "name", e.target.value)
              }
              fullWidth
            />
          ) : (
            <Autocomplete
              filterOptions={filterOptions}
              id="checkboxes-tags-demo"
              options={universities}
              value={selectedUniversity}
              onChange={(_, v) => {
                if (v) {
                  handleChangeInUniversity(id, "uid", v.uid);
                } else {
                  handleChangeInUniversity(id, "uid", null);
                }
              }}
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
                />
              )}
            />
          )}
        </Grid>

        <Grid item xs={7}>
          <TextField
            variant="outlined"
            placeholder="Kierunek"
            label="Kierunek"
            value={major}
            onChange={(e) =>
              handleChangeInUniversity(id, "major", e.target.value)
            }
            fullWidth
          />
        </Grid>

        <Grid item xs={4} className={classes.schoolItemCheckbox}>
          <FormControlLabel
            control={
              <Checkbox
                checked={finished}
                onChange={(e) =>
                  handleChangeInUniversity(id, "finished", e.target.value)
                }
                name="checkedB"
                color="primary"
              />
            }
            label="Ukończona"
          />
        </Grid>

        <Grid item xs={1}>
          <IconButton
            aria-label="delete school"
            onClick={() => {
              handleDeleteInUniversity(id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
}
