import { Add, PictureAsPdf } from "@mui/icons-material";
import { Button, Grid, styled, useMediaQuery, MenuItem, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios"; // component props interface

// styled components
const StyledAppModal = styled(AppModal)(({ theme }) => ({
  maxWidth: "80vh",
  minWidth: 300,
  outline: "none",
  padding: "1.5rem",
}));
const ImageUploadWrapper = styled(FlexRowAlign)(({ theme }) => ({
  minHeight: 140,
  cursor: "pointer",
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[200],
  width: "100%",
}));

const UploadArchiveModal = ({ open, onClose }) => {
  const downXl = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const initialValues = {
    no: "",
    name: "",
    category: "Modul",
    visibility: "public"
  };
  const validationSchema = Yup.object().shape({
    no: Yup.string().min(3, "Too Short").required("Archive Number is Required!"),
    name: Yup.string().required("Archive Name is Required!"),
    category: Yup.string().required("Category is Required!"),
  });
  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const email = sessionStorage.getItem("email");
        const token = sessionStorage.getItem("token");
        const url = process.env.REACT_APP_BACKEND;

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("name", values.name);
        formData.append("category", values.category);
        formData.append("email", email);
        formData.append("visibility", values.visibility);
        formData.append("no", values.no);

        const response = await axios.post(`${url}/api/archives/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

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
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setSelectedFile(null);
      setFieldValue("name", "");
      setFieldValue("no", "");
      setFieldValue("category", "Modul");
      setFieldValue("visibility", "public");
    }
  }, [open]);

  return (
    <StyledAppModal open={open} handleClose={onClose}>
      <H2 marginBottom={2}>Upload Archive</H2>

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

            <Grid item xs={12}>
              <H6 pb={1}>Archive File</H6>
              <Box
                sx={{
                  padding: 1,
                  borderRadius: "8px",
                  border: "1px dashed",
                  borderColor: "text.disabled",
                  backgroundColor: "grey.100",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item sm={12} xs={4}>
                    <label htmlFor="archive-upload">
                      <input
                        type="file"
                        accept="application/pdf"
                        id="archive-upload"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <ImageUploadWrapper textAlign="center">
                        {selectedFile ? (
                          <Box>
                            <PictureAsPdf color="disabled" />
                            <Small fontWeight={600} display="block">
                              {selectedFile.name}
                            </Small>
                          </Box>
                        ) : (
                          <Box>
                            <Add color="disabled" />
                            <Small fontWeight={600} display="block">
                            Choose a file
                            </Small>
                          </Box>
                        )}
                      </ImageUploadWrapper>
                    </label>
                  </Grid>
                </Grid>
              </Box>
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

export default UploadArchiveModal;
