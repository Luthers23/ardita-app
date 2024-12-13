import { Edit } from "@mui/icons-material";
import { IconButton, Box, Tooltip } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import { H6 } from "components/Typography";
import EditUserModal from "./EditUserModal";
import { useState } from "react";
import DeleteDialog from "components/DeleteDialog";
import Delete from "icons/Delete";

const capitalizeFirstLetter = (string) => {
  if (typeof string !== "string") return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const columnShape = [
  {
    Header: "ID",
    accessor: "id",
    Cell: ({ value }) => {
      return (
        <Box>
          <H6>{capitalizeFirstLetter(value)}</H6>
        </Box>
      );
    },
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ value }) => {
      return (
        <Box>
          <H6>{capitalizeFirstLetter(value)}</H6>
        </Box>
      );
    },
  },
  {
    Header: "Authority",
    accessor: "role",
    Cell: ({ value }) => {
      const formattedValue =
        value === "user" ? "User" : value === "admin" ? "Administrator" : value;
      return (
        <Box>
          <H6>{capitalizeFirstLetter(formattedValue)}</H6>
        </Box>
      );
    },
  },
  {
    Header: "",
    accessor: "edit",
    Cell: ({ row }) => {
      const [openDelete, setOpenDelete] = useState(false);
      const [openEdit, setOpenEdit] = useState(false);
      const url = process.env.REACT_APP_URLUSER;
      return (
        <FlexBox>
          <FlexBox>
            <Tooltip title="Delete User">
              <IconButton
                onClick={() => {
                  setOpenDelete(true);
                }}
              >
                <Delete
                  sx={{
                    color: "text.disabled",
                    fontSize: 18,
                  }}
                />
              </IconButton>
            </Tooltip>
            <DeleteDialog
              open={openDelete}
              onClose={() => {
                setOpenDelete(false)
              }}
              itemType={"User"}
              itemName={row.original.email}
              itemId={row.original.id}
              apiUrl={url}
            />
          </FlexBox>
          <FlexBox>
            <Tooltip title="Edit User">
              <IconButton
                onClick={() => {
                  setOpenEdit(true)
                }}
              >
                <Edit
                  sx={{
                    color: "text.disabled",
                    fontSize: 18,
                  }}
                />
              </IconButton>
            </Tooltip>
            <EditUserModal
              openModal={openEdit}
              closeModal={() => {
                setOpenEdit(false);
              }}
              data={row.original}
            />
          </FlexBox>
        </FlexBox>
      );
    },
  },
];
export default columnShape;
