import { TabContext, TabList } from "@mui/lab";
import {
  Divider,
  styled,
  Tab,
  Box,
  Grid,
  Button,
  CircularProgress,
  MenuItem,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AppModal from "components/AppModal";
import React, { useState } from "react";
import FlexBox from "components/flexbox/FlexBox";
import Scrollbar from "components/ScrollBar";
import AppTextField from "components/input-fields/AppTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 13,
  minHeight: "auto",
  color: theme.palette.text.primary,
}));
const StyledAppModal = styled(AppModal)(({ theme }) => ({
  padding: 0,
  maxWidth: 700,
  minWidth: 370,
})); // ------------------------------------------------------------------

// ------------------------------------------------------------------
const CreateUserModal = ({ openModal, closeModal }) => {
  const [tabValue, setTabValue] = useState("1");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    role: "user",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(50)
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters long")
      .max(18, "Password can't be longer than 18 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  const { errors, values, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        const url = process.env.REACT_APP_BACKEND;
        const token = sessionStorage.getItem("token");

        try {
          const requestData = {
            email: values.email,
            password: values.password,
            role: values.role,
          };

          const response = await axios.post(
            `${url}/api/auth/register`,
            requestData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Success:", response.data.message);
          closeModal();
          window.location.reload();
        } catch (error) {
          console.error("Error:", error.response?.data || error.message);
        } finally {
          setLoading(false); // Set loading state back to false after the request is complete
        }
      },
    });

  React.useEffect(() => {
    if (!openModal) {
      setFieldValue("email", "");
      setFieldValue("password", "");
      setFieldValue("role", "user");
    }
  }, [openModal]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Toggle state untuk menampilkan atau menyembunyikan password
  };

  return (
    <StyledAppModal open={openModal} handleClose={closeModal}>
      <TabContext value={tabValue}>
        <TabList
          sx={{
            minHeight: 25,
            margin: "1.5rem 1rem",
          }}
        >
          <StyledTab label="Create New User" value={"1"} />
        </TabList>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Scrollbar>
            <Box
              padding={3}
              sx={{
                minWidth: 700,
                overflow: "auto",
              }}
            >
              <Box my={2}>
                <Grid container spacing={2}>
                  <Grid item sm={12} xs={12}>
                    <AppTextField
                      fullWidth
                      size="small"
                      name="email"
                      label="Email"
                      placeholder="Enter a valid email"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <AppTextField
                      fullWidth
                      size="small"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      label="Password"
                      placeholder="Enter password"
                      value={values.password}
                      onChange={handleChange}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <AppTextField
                      fullWidth
                      select
                      size="small"
                      name="role"
                      label="Authority"
                      defaultValue={values.role}
                      onChange={handleChange}
                    >
                      <MenuItem key="user" value="user">
                        User
                      </MenuItem>
                      <MenuItem key="admin" value="admin">
                        Administrator
                      </MenuItem>
                    </AppTextField>
                  </Grid>
                  {error && (
                    <FormHelperText
                      error
                      sx={{
                        fontSize: 11,
                        fontWeight: 500,
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </FormHelperText>
                  )}
                </Grid>
              </Box>
            </Box>
          </Scrollbar>
          <Grid container>
            <Grid item xs={12}>
              <FlexBox justifyContent="flex-end" gap="2">
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={
                    loading && <CircularProgress size={20} color="inherit" />
                  }
                  sx={{ maxWidth: 200, margin: 3 }}
                >
                  {loading ? "Uploading..." : "Save"}
                </Button>
              </FlexBox>
            </Grid>
          </Grid>
        </form>
      </TabContext>
    </StyledAppModal>
  );
};

export default CreateUserModal;
