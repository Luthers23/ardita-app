import {
  Badge,
  Box,
  ButtonBase,
  Divider,
  styled,
  useMediaQuery,
} from "@mui/material";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBox from "components/flexbox/FlexBox";
import { H6, Small, Tiny } from "components/Typography";
import useAuth from "hooks/useAuth";
import { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopoverLayout from "./PopoverLayout";

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  padding: 5,
  marginLeft: 4,
  borderRadius: 30,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const StyledSmall = styled(Small)(({ theme }) => ({
  display: "block",
  cursor: "pointer",
  padding: "5px 1rem",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ProfilePopover = () => {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const upSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const handleMenuItem = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const upperCase = (value) => {
    const formattedValue = value?.charAt(0).toUpperCase() + value?.slice(1);
    return formattedValue;
  };

  const email = sessionStorage.getItem("email");
  const cutEmail = email?.split("@")[0];
  const role = sessionStorage.getItem("role");

  const formattedEmail = upperCase(cutEmail);

  const formattedRole =
    role === "user"
      ? "User"
      : role === "admin"
      ? "Administrator"
      : upperCase(role);

  return (
    <Fragment>
      <StyledButtonBase
        disableRipple
        ref={anchorRef}
        onClick={() => setOpen(true)}
      >
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{
            alignItems: "center",
            "& .MuiBadge-badge": {
              width: 11,
              height: 11,
              right: "4%",
              borderRadius: "50%",
              border: "2px solid #fff",
              backgroundColor: "success.main",
            },
          }}
        >
          {upSm && (
            <Small mx={1} color="text.secondary">
              <Small fontWeight="600" display="inline">
                {formattedEmail ? formattedEmail : " "}
              </Small>
            </Small>
          )}
          <AppAvatar
            src={"/static/avatar/001-man.svg"}
            sx={{
              width: 28,
              height: 28,
            }}
          />
        </Badge>
      </StyledButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center" gap={1}>
            <AppAvatar
              src={"/static/avatar/001-man.svg"}
              sx={{
                width: 35,
                height: 35,
              }}
            />

            <Box>
              <H6>{email ? email : " "}</H6>
              <Tiny display="block" fontWeight={500} color="text.disabled">
                {formattedRole ? formattedRole : " "}
              </Tiny>
            </Box>
          </FlexBox>
        }
      >
        <Box pt={1}>
          <StyledSmall onClick={() => handleMenuItem("/dashboard/myarchives")}>
            My Archives
          </StyledSmall>

          {role === "admin" && (
            <>
              <Divider
                sx={{
                  my: 1,
                }}
              />
              <StyledSmall
                onClick={() => handleMenuItem("/dashboard/manage-user")}
              >
                Manage User
              </StyledSmall>
            </>
          )}

          <Divider
            sx={{
              my: 1,
            }}
          />

          <StyledSmall
            onClick={() => {
              handleLogout();
            }}
          >
            Sign Out
          </StyledSmall>
        </Box>
      </PopoverLayout>
    </Fragment>
  );
};

export default ProfilePopover;
