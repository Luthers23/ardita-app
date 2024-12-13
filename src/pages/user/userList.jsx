import {
  Box,
  Card,
  Stack,
  styled,
  Table,
  TableRow,
  useTheme,
  CircularProgress,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import AppPagination from "components/AppPagination";
import Scrollbar from "components/ScrollBar";
import SearchArea from "page-sections/user/search-area";
import columnShape from "page-sections/user/columnShape";
import HeadingArea from "page-sections/user/heading-area";
import FlexBox from "components/flexbox/FlexBox";
import { useEffect, useMemo, useState } from "react";
import {
  useAsyncDebounce,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import axios from "axios";
import CreateUserModal from "page-sections/user/CreateUserModal";

const HeadTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  color: theme.palette.text.secondary,
  "&:first-of-type": {
    paddingLeft: 24,
  },
  "&:last-of-type": {
    paddingRight: 24,
  },
}));
const BodyTableCell = styled(HeadTableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 13,
  fontWeight: 500,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const UserList = () => {
  const theme = useTheme();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        const url = process.env.REACT_APP_BACKEND;
        const response = await axios.get(`${url}/api/users`);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch archives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = useMemo(() => columnShape, []);
  const tableData = useMemo(() => data, [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const handleChange = (_, currentPageNo) => gotoPage(currentPageNo - 1);

  const [searchValue, setSearchValue] = useState(state.globalFilter);
  const handleSearch = useAsyncDebounce(
    (value) => setGlobalFilter(value || undefined),
    200
  );

  const [open, setOpen] = useState(false);

  return (
    <Box pt={2} pb={4}>
      <Card
        sx={{
          py: 2,
        }}
      >
        <Box px={3}>
          <HeadingArea setOpen={setOpen} />
          <SearchArea
            value={searchValue}
            onChange={handleSearch}
            setValue={setSearchValue}
            gridRoute="/dashboards/user-grid"
            listRoute="/dashboards/user-list"
          />

          <CreateUserModal openModal={open} closeModal={()=>{setOpen(false)}}/>
        </Box>

        {loading ? (
          <FlexBox justifyContent="center" mt={4}>
            <CircularProgress />
          </FlexBox>
        ) : (
          <Scrollbar autoHide={false}>
            <Table
              {...getTableProps()}
              sx={{
                minWidth: 900,
              }}
            >
              <TableHead
                sx={{
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                {headerGroups.map((headerGroup, index) => (
                  <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => (
                      <HeadTableCell
                        key={index}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                      </HeadTableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>

              <TableBody {...getTableBodyProps()}>
                {page.map((row, index) => {
                  prepareRow(row);
                  return (
                    <TableRow {...row.getRowProps()} key={index}>
                      {row.cells.map((cell, index) => (
                        <BodyTableCell key={index} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </BodyTableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Scrollbar>
        )}

        <Stack alignItems="center" marginY={4}>
          <AppPagination
            shape="rounded"
            onChange={handleChange}
            count={pageOptions.length}
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default UserList;
