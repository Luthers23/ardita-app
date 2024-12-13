import { Add } from "@mui/icons-material";
import { Box, Button, CircularProgress, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import SearchInput from "components/input-fields/SearchInput";
import ArchiveColumnShape from "page-sections/archive/ArchiveColumnShape";
import CreateArchiveModal from "page-sections/archive/UploadArchiveModal";
import CustomTable from "page-sections/archive/CustomTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { H4 } from "components/Typography";

export const HeadingWrapper = styled(FlexBox)(({ theme }) => ({
  marginBottom: 20,
  flexWrap: "wrap",
  [theme.breakpoints.down(530)]: {
    "& .MuiButton-root": {
      width: "100%",
    },
    "& .MuiInputBase-root": {
      maxWidth: "100%",
      marginBottom: 15,
    },
  },
}));

const ArchiveManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItem, setFilteredItem] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchives = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        const url = process.env.REACT_APP_BACKEND;
        const response = await axios.get(`${url}/api/archives`);
        setData(response.data);
        setFilteredItem(response.data);
      } catch (error) {
        console.error("Failed to fetch archives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArchives();
  }, []);

  useEffect(() => {
    const result = data.filter((item) =>
      item.fileName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredItem(result);
  }, [searchValue, data]);

  return (
    <Box pt={2} pb={4}>
      <HeadingWrapper justifyContent="space-between" alignItems="center">
        <SearchInput
          bordered={false}
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={() => setOpenModal(true)}
        >
          Upload Archive
        </Button>
      </HeadingWrapper>

      {loading ? (
        <FlexBox justifyContent="center" mt={4}>
          <CircularProgress />
        </FlexBox>
      ) : filteredItem.length > 0 ? (
        <CustomTable columnShape={ArchiveColumnShape} data={filteredItem} />
      ) : (
        <FlexBox justifyContent="center" mt={8}>
          <FlexBox
            sx={{
              padding: 1,
              height: "100%",
              width: "20%",
              justifyContent: "center",
              color: "2499EF",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <H4>No archives found</H4>
          </FlexBox>
        </FlexBox>
      )}

      <CreateArchiveModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};

export default ArchiveManagement;
