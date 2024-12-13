import { Button, Grid, styled, useMediaQuery, MenuItem, CircularProgress } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6 } from "components/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";

const StyledAppModal = styled(AppModal)(({ theme }) => ({
  maxWidth: "80vh",
  minWidth: 300,
  outline: "none",
  padding: "1.5rem",
}));

const EditArchiveModal = ({ open, onClose, data }) => {
  const downXl = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const initialValues = {
    no: data.no,
    name: data.fileName,
    category: data.category,
    visibility: data.visibility
  };
  const validationSchema = Yup.object().shape({
    no: Yup.string().min(3, "Too Short").required("Archive Number is Required!"),
    name: Yup.string().required("Archive Name is Required!"),
  });
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const token = sessionStorage.getItem("token");
        const url = process.env.REACT_APP_BACKEND;

        const formData = {
          "no": values.no,
          "fileName": values.name,
          "category": values.category,
          "visibility": values.visibility
        }

        const response = await axios.put(`${url}/api/archives/edit/${data.id}`, formData, {
          headers: {
            "Content-Type": "application/json",   
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(formData);

        console.log("Success:", response.data.message);
        onClose()
        window.location.reload();
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <StyledAppModal open={open} handleClose={onClose}>
      <H2 marginBottom={2}>Edit Archive</H2>

      <form onSubmit={handleSubmit}>
        <Scrollbar
          style={{
            maxHeight: downXl ? 500 : "auto",
          }}
        >
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <H6 mb={1}>Archive Number</H6>
              <AppTextField
                fullWidth
                size="small"
                name="no"
                placeholder="Enter archive number"
                value={values.no}
                onChange={handleChange}
                error={Boolean(touched.no && errors.no)}
                helperText={touched.no && errors.no}
              />
            </Grid>

            <Grid item xs={12}>
              <H6 mb={1}>Archive Name</H6>
              <AppTextField
                fullWidth
                size="small"
                name="name"
                placeholder="Enter archive name"
                value={values.name}
                onChange={handleChange}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <H6 mb={1}>Category</H6>
              <AppTextField
                fullWidth
                select
                size="small"
                name="category"
                defaultValue={values.category}
                onChange={handleChange}
              >
                <MenuItem key="Modul" value="Modul">
                  Modul
                </MenuItem>
                <MenuItem key="Surat" value="Surat">
                  Surat
                </MenuItem>
                <MenuItem key="Peraturan" value="Peraturan">
                  Peraturan
                </MenuItem>
              </AppTextField>
            </Grid>

            <Grid item sm={6} xs={12}>
              <H6 mb={1}>Archive Visibility</H6>
              <AppTextField
                fullWidth
                select
                size="small"
                name="visibility"
                defaultValue={values.visibility}
                onChange={handleChange}
              >
                <MenuItem key="public" value="public">
                  Public
                </MenuItem>
                <MenuItem key="admin-only" value="admin-only">
                  Admin Only
                </MenuItem>
              </AppTextField>
            </Grid>
          </Grid>
        </Scrollbar>

        <Grid container>
          <Grid item xs={12}>
            <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
              <Button fullWidth variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button fullWidth type="submit" variant="contained" disabled={isLoading} startIcon={isLoading && <CircularProgress size={20} color="inherit" />}>
              {isLoading ? "Uploading..." : "Save"}
              </Button>
            </FlexBox>
          </Grid>
        </Grid>
      </form>
    </StyledAppModal>
  );
};

export default EditArchiveModal;
