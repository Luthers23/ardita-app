import { AppBar, styled, Toolbar, ButtonBase, alpha } from "@mui/material";
import { Span } from "components/Typography";
import ProfilePopover from "./popovers/ProfilePopover";
import FlexBox from "components/flexbox/FlexBox";
import { useNavigate, useLocation } from "react-router-dom";

// ------------------------------------------------
// custom styled components
const DashboardHeaderRoot = styled(AppBar)(({ theme }) => ({
  zIndex: 11,
  boxShadow: "none",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  backdropFilter: "blur(6px)",
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
}));

const StyledToolBar = styled(Toolbar)(() => ({
  "@media (min-width: 0px)": {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: "auto",
  },
}));

const NavItemButton = styled(ButtonBase)(({ theme, active }) => ({
  height: 48,
  width: 150,
  padding: "0 12px",
  borderRadius: 8,
  marginBottom: 5,
  justifyContent: "center",
  backgroundColor: active
    ? alpha(theme.palette.primary.main, 0.06)
    : "transparent",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledText = styled(Span)(({ theme, active }) => ({
  whiteSpace: "nowrap",
  paddingLeft: "0.8rem",
  transition: "all 0.15s ease",
  fontSize: "14px",
  fontWeight: 600,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
}));

const DashboardHeader = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => navigate(path);

  return (
    <DashboardHeaderRoot position="sticky">
      <StyledToolBar>
        <NavItemButton
          onClick={() => handleNavigation("/dashboard")}
          active={isActive("/dashboard")}
        >
          <StyledText active={isActive("/dashboard")}>Home</StyledText>
        </NavItemButton>
        <NavItemButton
          onClick={() => handleNavigation("/dashboard/archives")}
          active={isActive("/dashboard/archives")}
        >
          <StyledText active={isActive("/dashboard/archives")}>
            Archive Center
          </StyledText>
        </NavItemButton>
        <FlexBox
          flexGrow={1}
          ml={1}
          alignItems="center"
          justifyContent="space-between"
        />
        <ProfilePopover />
      </StyledToolBar>
    </DashboardHeaderRoot>
  );
};

export default DashboardHeader;
