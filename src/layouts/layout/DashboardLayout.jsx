import LayoutBodyWrapper from "layouts/layout-parts/LayoutBodyWrapper";
import { Fragment, useState } from "react";
import { Outlet } from "react-router";
import DashboardHeader from "../layout-parts/DashboardHeader"; // --------------------------------------------

// --------------------------------------------
const DashboardLayout = ({ children }) => {
  const [sidebarCompact, setSidebarCompact] = useState(true);
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);

  const handleCompactToggle = () => setSidebarCompact(!sidebarCompact);

  const handleMobileDrawerToggle = () =>
    setShowMobileSideBar((state) => !state); // dashboard body wrapper custom style

  const customStyle = {
    width: `calc(100% - ${sidebarCompact ? "86px" : "280px"})`,
    marginLeft: sidebarCompact ? "86px" : "280px",
  };
  return (
    <Fragment>
      <LayoutBodyWrapper sx={customStyle}>
        <DashboardHeader
          setShowSideBar={handleCompactToggle}
          setShowMobileSideBar={handleMobileDrawerToggle}
        />

        {children || <Outlet />}
      </LayoutBodyWrapper>
    </Fragment>
  );
};

export default DashboardLayout;
