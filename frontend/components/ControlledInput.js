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
  type = "text",
  rules = null,
  id,
  label,
  autoComplete,
  onChange,
  error = false,
  helperText = null,
  clearErrors = null,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={(props) => {
        return (
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
              if (clearErrors !== null) {
                clearErrors();
              }
            }}
            value={props.value}
            error={error}
            type={type}
            helperText={helperText}
          />
        );
      }}
    />
  );
}
