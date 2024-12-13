import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  Button,
  Box,
} from "@mui/material";
import { H2, H5 } from "./Typography";
import { Divider } from "@mui/material";
import FlexBox from "./flexbox/FlexBox";
import FlexBetween from "./flexbox/FlexBetween";

const DeleteDialog = ({
  open,
  onClose,
  itemType,
  itemId,
  //   onDeleteSuccess,
  itemName,
  apiUrl,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const url = `${apiUrl}/delete/${itemId}`;
  const handleDelete = async () => {
    setIsLoading(true);
    console.log(itemId);
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      console.log("Delete successful:", response.data);

      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box>
        <FlexBox padding={2}>
          <H2>Delete this {itemType}?</H2>
        </FlexBox>
        <Divider />
        <FlexBox
          padding={3}
          flexDirection="column"
          sx={{ background: "paper" }}
        >
          <H5>
            Are you sure you want to delete this {itemType} named "{itemName}"?
          </H5>
          <FlexBox mt={5}>
            <H5>
              This will delete this {itemType} permanently. You cannot undo this
              action!
            </H5>
          </FlexBox>
        </FlexBox>
        <Divider sx={{ mt: 2 }} />
      </Box>
      <Box
        display={"flex"}
        sx={{
          padding: 2,
          flexDirection: "row-reverse",
        }}
      >
        <FlexBetween>
          <Box marginRight={3}>
            <Button variant={"outlined"} onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
          </Box>
          <Button
            variant={"contained"}
            onClick={handleDelete}
            color="error"
            disabled={isLoading}
          >
            <Box></Box>

            {isLoading ? "Deleting..." : "Yes, Delete"}
          </Button>
        </FlexBetween>
      </Box>
    </Dialog>
  );
};

export default DeleteDialog;
