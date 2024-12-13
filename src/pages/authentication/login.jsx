import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import FlexBetween from "components/flexbox/FlexBetween";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import { H1, Paragraph } from "components/Typography";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import { TextFieldWrapper } from "page-sections/authentication/StyledComponents";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const { login } = useAuth();

  const { isAuthenticated, isInitialized } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isInitialized, isAuthenticated, navigate]);

  const initialValues = {
    email: "",
    password: "",
    submit: null,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(50)
      .required("Email is required"),
    password: Yup.string()
      .max(18, "Password can't be longer than 18 characters")
      .required("Password is required"),
  });
  const { errors, values, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      setLoading(true);
      try {
        await login(values.email, values.password);
        setLoading(false);
      } catch {
        const errorMessage =
          error.response?.data?.message || "Failed to log in";
        setError(errorMessage);
        setLoading(false);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <FlexRowAlign
      flexDirection="column"
      sx={{
        height: {
          sm: "100%",
        },
      }}
    >
      <Card
        sx={{
          padding: 4,
          maxWidth: 600,
          boxShadow: 1,
        }}
      >
        <FlexRowAlign flexDirection="column" mb={5}>
          <Box width={38} mb={1}>
            <img src="/static/logo/logo2.svg" width="100%" alt="Logo" />
          </Box>
          <H1 fontSize={24} fontWeight={700}>
            Sign In to Ardita
          </H1>
        </FlexRowAlign>

        <FlexBetween flexWrap="wrap" my="1rem">
          <Box textAlign="center" my={3}>
            <Paragraph fontSize="16px" color="text.secondary">
              "Effortlessly manage and access your archives anytime, anywhere."
            </Paragraph>
          </Box>

          <Divider
            sx={{
              my: 3,
              width: "100%",
              alignItems: "center",
            }}
          ></Divider>

          <form
            noValidate
            onSubmit={handleSubmit}
            style={{
              width: "100%",
            }}
          >
            <FlexBetween>
              <TextFieldWrapper flexDirection="column">
                <AppTextField
                  fullWidth
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <AppTextField
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  onChange={handleChange}
                  value={values.password || ""}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </TextFieldWrapper>
            </FlexBetween>

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

            <Box>
              {loading ? (
                <LoadingButton loading fullWidth variant="contained">
                  Sign In
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  Sign In
                </Button>
              )}
            </Box>
          </form>
        </FlexBetween>
      </Card>
    </FlexRowAlign>
  );
};

export default Login;
