import { Button, styled } from "@mui/material";
import { Box } from "@mui/system";
import FlexBox from "components/flexbox/FlexBox";
import { H5 } from "components/Typography";
import IconWrapper from "components/IconWrapper";
import Add from "icons/Add";
import GroupSenior from "icons/GroupSenior"; // styled components

const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
}));
// --------------------------------------------------------------------

// --------------------------------------------------------------------
const HeadingArea = ( {setOpen} ) => {
  return (
    <Wrapper gap={1}>
      <FlexBox alignItems="center">
        <IconWrapper>
          <GroupSenior
            sx={{
              color: "primary.main",
            }}
          />
        </IconWrapper>
        <H5>Users</H5>
      </FlexBox>

      <Button variant="contained" startIcon={<Add />} onClick={()=> {setOpen(true)}}>
        Add New User
      </Button>
    </Wrapper>
  );
};

export default HeadingArea;
