import { CloudDownload } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { H6, Small } from "components/Typography";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import FlexBox from "components/flexbox/FlexBox";

const capitalizeFirstLetter = (string) => {
  if (typeof string !== "string") return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ArchiveColumnShape = [
  {
    Header: "No.",
    accessor: "no",
    maxWidth: 100,
    Cell: ({ value }) => {
      return (
        <Small
          sx={{
            backgroundColor: "action.hover",
            borderRadius: 10,
            padding: ".2rem 1rem",
            textAlign: "center",
          }}
        >
          {capitalizeFirstLetter(value)}
        </Small>
      );
    },
  },
  {
    Header: "Name",
    accessor: "fileName",
    minWidth: 250,
    Cell: ({ value }) => {
      return (
        <Box ml={2}>
          <H6 color="text.primary">{capitalizeFirstLetter(value)}</H6>
        </Box>
      );
    },
  },
  {
    Header: "Category",
    accessor: "category",
    Cell: ({ value }) => {
      return (
        <Small
          sx={{
            backgroundColor: "action.hover",
            borderRadius: 10,
            padding: ".2rem 1rem",
            textAlign: "center",
          }}
        >
          {capitalizeFirstLetter(value)}
        </Small>
      );
    },
  },
  {
    Header: "Upload Date",
    accessor: "uploadedAt",
    Cell: ({ value }) => {
      if (!value) return "-";
      const date = new Date(value._seconds * 1000);
      return <Small>{format(date, "dd/MM/yyyy HH:mm:ss")}</Small>;
    },
  },
  {
    Header: "Uploader",
    accessor: "uploadedBy",
    Cell: ({ value }) => {
      return (
        <Box ml={2}>
          <H6>{capitalizeFirstLetter(value.split("@")[0])}</H6>
        </Box>
      );
    },
  },
  {
    Header: "",
    accessor: "action",
    maxWidth: 50,
    Cell: ({ row }) => {
      const navigate = useNavigate();
      const handleNavigation = (path) => navigate(path);
      return (
        <Fragment>
          <FlexBox>
            <Tooltip title="Open file">
              <IconButton
                onClick={() =>
                  handleNavigation(`/dashboard/archives/${row.original.id}`)
                }
              >
                <CloudDownload
                  sx={{
                    fontSize: 18,
                    color: "text.disabled",
                  }}
                />
              </IconButton>
            </Tooltip>
          </FlexBox>
        </Fragment>
      );
    },
  },
];
export default ArchiveColumnShape;
