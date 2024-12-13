import { styled, TextField, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import React from "react";
import Visibility from "icons/Visibility";
import VisibilityOff from "icons/VisibilityOff";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    borderColor: theme.palette.action.disabled,
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.action.hover,
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    fontWeight: 600,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.disabled,
  },
}));

const PassTextField = (props) => {
  const [show, setShow] = useState(false);

  return (
    <StyledTextField
      {...props}
      type={show ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShow(!show)}
              edge="end"
              aria-label="toggle password visibility"
            >
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PassTextField;