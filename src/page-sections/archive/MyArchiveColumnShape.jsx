import { CloudDownload, Edit } from "@mui/icons-material";
import { Box, Tooltip, IconButton } from "@mui/material";
import { H6, Small } from "components/Typography";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import FlexBox from "components/flexbox/FlexBox";
import { useState } from "react";
import EditArchiveModal from "./EditArchiveModal";
import DeleteDialog from "components/DeleteDialog";
import Delete from "icons/Delete";

const capitalizeFirstLetter = (string) => {
  if (typeof string !== "string") return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const MyArchiveColumnShape = [
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
    Header: "Visibilty",
    accessor: "visibility",
    Cell: ({ value }) => {
      const formattedValue =
        value === "public"
          ? "Public"
          : value === "admin-only"
          ? "Admin Only"
          : value;
      return (
        <Box ml={2}>
          <H6>{capitalizeFirstLetter(formattedValue)}</H6>
        </Box>
      );
    },
  },
  {
    Header: "",
    accessor: "action",
    maxWidth: 50,
    Cell: ({ row }) => {
      const url = process.env.REACT_APP_URLARCHIVE;
      const [openModal, setOpenModal] = useState(false);
      const [openDialog, setOpenDialog] = useState(false);
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
            <Tooltip title="Edit">
              <IconButton onClick={() => setOpenModal(true)}>
                <Edit
                  sx={{
                    fontSize: 18,
                    color: "text.disabled",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip>
              <IconButton
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <Delete
                  sx={{
                    fontSize: 18,
                    color: "text.disabled",
                  }}
                />
              </IconButton>
            </Tooltip>
          </FlexBox>
          <DeleteDialog open={openDialog} onClose={() => {setOpenDialog(false)}} itemType={"Archive"} itemName={row.original.fileName} itemId={row.original.id} apiUrl={url}/>
          <EditArchiveModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            data={row.original}
          />
        </Fragment>
      );
    },
  },
];
export default MyArchiveColumnShape;
