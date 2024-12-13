import { Add } from "@mui/icons-material";
import { Button, Grid, IconButton, styled, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import PDFViewer from "components/PdfViewer";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import DeleteIcon from "icons/DeleteIcon";
import * as Yup from "yup"; // component props interface

// styled components
const StyledAppModal = styled(AppModal)(({
  theme
}) => ({
  maxWidth: 700,
  minWidth: 300,
  outline: "none",
  padding: "1.5rem",
  maxHeight: 800
}));

const OpenArchiveModal = ({
  open,
  data,
  onClose,
  
}) => {
  const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
  const initialValues = {
    productName: "",
    storeName: "",
    price: "",
    discountPrice: "",
    description: "",
    category: "",
    tags: "",
    stock: "",
    sku: "",
    images: ""
  };
  const validationSchema = Yup.object().shape({
    productName: Yup.string().min(3, "Too Short").required("Product Name is Required!"),
    storeName: Yup.string().required("Store Name is Required!"),
    price: Yup.number().required("Price is Required!"),
    description: Yup.string().required("Description is Required!"),
    category: Yup.string().required("Category is Required!"),
    stock: Yup.number().required("Stock is Required!"),
    sku: Yup.string().required("SKU is Required!")
  });
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      console.log(values);
    }
  });
  return <StyledAppModal open={open} handleClose={onClose}>
      <H2 marginBottom={2}>
        
      </H2>

      <form onSubmit={handleSubmit}>
        <Scrollbar style={{
        maxHeight: downXl ? 500 : "auto"
      }}>
          <Grid container spacing={2}>
            

            <Grid item xs={12}>
              <H6 pb={1}>PDF Viewer</H6>
              <Box sx={{
              padding: 1,
              borderRadius: "8px",
              border: "1px dashed",
              borderColor: "text.disabled",
              backgroundColor: "grey.100"
            }}>
                <Grid container spacing={1}>
                  <Grid item sm={12} xs={12}>
                    <PDFViewer pdfUrl={"/static/abcd.pdf"} />
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
              <Button fullWidth type="submit" variant="contained">
                Save
              </Button>
            </FlexBox>
          </Grid>
        </Grid>
      </form>
    </StyledAppModal>;
};

export default OpenArchiveModal;