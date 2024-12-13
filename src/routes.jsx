import { lazy, Suspense, useContext } from "react";
import { Navigate } from "react-router-dom";
import useSettings from "hooks/useSettings";
import LoadingScreen from "components/LoadingScreen";
import LayoutV3 from "layouts/layout/DashboardLayout";
import AuthContext from "contexts/JWTAuth";

const Loadable = Component => props => {
  return <Suspense fallback={<LoadingScreen />}>  
      <Component {...props} />
    </Suspense>;
};
const Dashboard = Loadable(lazy(() => import("./pages/dashboards/dashboard")));
const Login = Loadable(lazy(() => import("./pages/authentication/login")));
const Archive = Loadable(lazy(() => import("./pages/archive/archive-management")));
const MyArchive = Loadable(lazy(() => import("./pages/archive/myArchive")));  
const Error = Loadable(lazy(() => import("./pages/404")));
const ArchiveDetail = Loadable(lazy(() => import("./pages/archive/archiveDetail")));
const ManageUser = Loadable(lazy(() => import("./pages/user/userList")));

const ActiveLayout = () => {
  const {
    settings
  } = useSettings();

  switch (settings.activeLayout) {
    default:
      return <LayoutV3 />;
  }
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isInitialized } = useContext(AuthContext);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isInitialized, user } = useContext(AuthContext);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const routes = () => {
  return [...authRoutes, {
    path: "dashboard",
    element: <ActiveLayout />,
    children: dashboardRoutes
  },
  {
    path: "*",
    element: <Error />,
  },
];
};

const authRoutes = [{
  path: "/",
  element: <Navigate to="/dashboard" />
}, {
  path: "login",
  element: <Login />
}];

const dashboardRoutes = [
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "archives",
    element: (
      <ProtectedRoute>
        <Archive />
      </ProtectedRoute>
    ),
  },
  {
    path: "myarchives",
    element: (
      <ProtectedRoute>
        <MyArchive />
      </ProtectedRoute>
    ),
  },{
    path: "archives/:id",
    element: (
      <ProtectedRoute>
        <ArchiveDetail />
      </ProtectedRoute>
    ),
  },{
    path: "manage-user",
    element: (
      <AdminRoute>
        <ManageUser />
      </AdminRoute>
    )
  }
];
export default routes;