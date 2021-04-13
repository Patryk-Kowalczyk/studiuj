import React from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

export default function ControlledInput({
  name,
  control,
  defaultValue = "",
  variant = "outlined",
  margin = "normal",
  required = true,
  fullWidth = true,
  id,
  label,
  autoComplete,
  onChange,
  error = false,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      {...props}
      render={(props) => (
        <TextField
          variant={variant}
          margin={margin}
          required={required}
          fullWidth={fullWidth}
          id={id}
          label={label}
          autoComplete={autoComplete}
          onChange={(e) => {
            props.onChange(e.target.value);
          }}
          value={props.value}
          error={error}
        />
      )}
    />
  );
}
