import {
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { Box, Container, Tabs, Tab, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "./store/slices/authSlice";

// Import all pages
import CreateTicketPage from "./pages/CreateTicketPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import KnowHubPage from "./pages/KnowHubPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import HelpCentrePage from "./pages/HelpCentrePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ArticleListPage from "./pages/ArticleListPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import EditArticlePage from "./pages/EditArticlePage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import DashboardPage from "./pages/DashboardPage";
import ManageFaqsPage from "./pages/ManageFaqsPage";
import AdminTicketListPage from "./pages/AdminTicketListPage";
import AdminLayout from "./components/shared/AdminLayout";
import ManageUsersPage from "./pages/ManageUsersPage";

// Layout for the main user-facing application
const UserLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const validTabPaths = [
    "/",
    "/create",
    "/help",
    "/know-hub",
    "/profile",
    "/admin/dashboard",
  ];
  const currentTab = validTabPaths.includes(location.pathname)
    ? location.pathname
    : false;

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "background.default",
          position: "sticky",
          top: 0,
          zIndex: 1100,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab
              label="My Tickets"
              value="/"
              to="/"
              component={Link}
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="Create Ticket"
              value="/create"
              to="/create"
              component={Link}
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="Help Centre"
              value="/help"
              to="/help"
              component={Link}
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="Know Hub"
              value="/know-hub"
              to="/know-hub"
              component={Link}
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="Profile"
              value="/profile"
              to="/profile"
              component={Link}
              sx={{ textTransform: "none" }}
            />
            {user && user.user.role === "Admin" && (
              <Tab
                label="Admin"
                value="/admin/dashboard"
                to="/admin/dashboard"
                component={Link}
                sx={{ textTransform: "none" }}
              />
            )}
          </Tabs>
          <Button
            onClick={handleLogout}
            color="primary"
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Logout
          </Button>
        </Container>
      </Box>
      <Outlet />
    </>
  );
};

// Component to protect admin-only routes
const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user && user.user.role === "Admin" ? (
    <AdminLayout />
  ) : (
    <Navigate to="/" />
  );
};

// The main App component
function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Routes for logged-out users */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes for Admin Users, wrapped in the AdminLayout */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<ManageUsersPage />} /> 
        <Route path="articles" element={<ArticleListPage />} />
        <Route path="articles/create" element={<CreateArticlePage />} />
        <Route path="articles/edit/:id" element={<EditArticlePage />} />
        <Route path="faqs" element={<ManageFaqsPage />} />
        <Route path="tickets" element={<AdminTicketListPage />} />
        {/* The default admin route is now the dashboard */}
        <Route index element={<DashboardPage />} />
      </Route>

      {/* Protected Routes for All Logged-in Users, wrapped in the UserLayout */}
      <Route
        path="/"
        element={user ? <UserLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<MyTicketsPage />} />
        <Route path="create" element={<CreateTicketPage />} />
        <Route path="help" element={<HelpCentrePage />} />
        <Route path="know-hub" element={<KnowHubPage />} />
        <Route path="know-hub/:id" element={<ArticleDetailsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="ticket/:ticketId" element={<TicketDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
