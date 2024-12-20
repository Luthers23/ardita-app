import { Box, Button, styled, TextField } from "@mui/material"; // styled components

export const SocialIconButton = styled(Button)(({
  theme
}) => ({
  width: "48%",
  height: 48,
  fontSize: 13,
  borderRadius: "6px",
  border: "2px solid",
  borderColor: theme.palette.divider,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: "0.5rem"
  }
}));
export const TextFieldWrapper = styled(Box)(({
  theme
}) => ({
  width: "48%",
  minHeight: "100px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: "0.5rem"
  }
}));
export const StyledTextField = styled(TextField)(({
  theme
}) => ({
  // "&:hover, & .MuiOutlinedInput-root:hover": {
  //   "& .MuiOutlinedInput-notchedOutline": {
  //     borderColor: theme.palette.primary.main,
  //   },
  // },
  "& .MuiOutlinedInput-input": {//   fontSize: 12,
    //   minHeight: 48,
    //   fontWeight: 500,
    // //   borderRadius: '6px',
    //   padding: '0px 1rem',
    //   color: theme.palette.text.primary,
    //   backgroundColor: theme.palette.secondary[100],
  },
  "& .MuiOutlinedInput-notchedOutline": {//   borderRadius: '8px',
    //   borderColor:
    //     theme.palette.mode === 'light'
    //       ? theme.palette.secondary[300]
    //       : theme.palette.divider,
    //   borderWidth: '1px !important',
  }
}));