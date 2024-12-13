import { Box, styled } from "@mui/material";
import FlexBetween from "components/flexbox/FlexBetween";
import FlexBox from "components/flexbox/FlexBox";
import SearchInput from "components/input-fields/SearchInput";
import { lightTheme } from "../../constants";
const SecondaryWrapper = styled(FlexBetween)(({
  theme
}) => ({
  gap: 8,
  flexWrap: "wrap",
  margin: "24px 0",
  [theme.breakpoints.down(550)]: {
    "& .MuiInputBase-root": {
      maxWidth: "calc(100% - 90px)"
    }
  }
})); // --------------------------------------------------------------------

// --------------------------------------------------------------------
const SearchArea = ({
  value,
  onChange,
  setValue,
}) => {
  return <SecondaryWrapper>
      <SearchInput placeholder="Search..." value={value || ""} onChange={e => {
      if (onChange && setValue) {
        setValue(e.target.value);
        onChange(e.target.value);
      }

      onChange(e.target.value);
    }} />

      <FlexBox alignItems="center" gap={1}>
        

        <Box sx={{
        backgroundColor: theme => lightTheme(theme) ? "white" : "background.paper"
      }}>
        </Box>
      </FlexBox>
    </SecondaryWrapper>;
};

export default SearchArea;