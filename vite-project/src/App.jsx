// import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
// import { Box, Container, Tabs, Tab, Button } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout, reset } from './store/slices/authSlice';

// // Import all of your pages
// import CreateTicketPage from './pages/CreateTicketPage';
// import MyTicketsPage from './pages/MyTicketsPage';
// import KnowHubPage from "./pages/KnowHubPage"; 
// import TicketDetailsPage from './pages/TicketDetailsPage';
// import HelpCentrePage from './pages/HelpCentrePage';
// import ProfilePage from './pages/ProfilePage';
// import ArticleListPage from './pages/ArticleListPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import CreateArticlePage from './pages/CreateArticlePage';

// // new component to protect admin-only routes
// const AdminRoute = ({ user, children }) => {
//     if (user && user.user.role === 'Admin') {
//         return children;
//     }
//     // Redirect non-admins to the home page
//     return <Navigate to="/" />; 
// };

// // This is the main App component
// function App() {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get the real user state from the Redux store
//   const { user } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     dispatch(reset());
//     navigate('/login');
//   };

//   // This array holds all the valid paths for our navigation tabs
//   const validTabPaths = ['/', '/create', '/help', '/know-hub', '/profile'];
  
//   // This checks if the current URL matches a valid tab. If not, it sets the value to false.
//   const currentTab = validTabPaths.includes(location.pathname) ? location.pathname : false;

//   return (
//     <>
//       {/* We only show the navigation bar if the user is logged in */}
//       {user && (
//         // These new styles make the header "sticky"
//         <Box sx={{ 
//           backgroundColor: 'background.paper', 
//           borderBottom: '1px solid', 
//           borderColor: 'background.default',
//           position: 'sticky', // Makes the header stick
//           top: 0, // Sticks it to the top of the viewport
//           zIndex: 1100, // Ensures it stays on top of other content
//         }}>
//           <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Tabs
//               value={currentTab}
//               variant="scrollable"
//               scrollButtons="auto"
//               allowScrollButtonsMobile
//               sx={{
//                 '& .MuiTabs-indicator': {
//                   backgroundColor: 'primary.main',
//                   height: '3px',
//                 },
//                 '& .MuiTab-root': {
//                   textTransform: 'none',
//                   fontWeight: 600,
//                   color: 'text.secondary',
//                   '&.Mui-selected': {
//                     color: 'primary.main',
//                   },
//                 },
//               }}
//             >
//               <Tab label="My Tickets" value="/" to="/" component={Link} />
//               <Tab label="Create Ticket" value="/create" to="/create" component={Link} />
//               <Tab label="Help Centre" value="/help" to="/help" component={Link} />
//               <Tab label="Know Hub" value="/know-hub" to="/know-hub" component={Link} />
//               <Tab label="Profile" value="/profile" to="/profile" component={Link} />
//               {/* Add a new "Admin" tab that is only visible to admin users */}
//               {user.user.role === 'Admin' && (
//                 <Tab label="Admin" value="/admin/articles" to="/admin/articles" component={Link} />
//               )}
//             </Tabs>
//             <Button onClick={handleLogout} color="primary" sx={{ textTransform: 'none', fontWeight: 600 }}>
//               Logout
//             </Button>
//           </Container>
//         </Box>
//       )}

//       {/* Define all the routes for the application */}
//       <Routes>
//         {/* If the user is logged in, show the protected pages. Otherwise, redirect to /login */}
//         <Route path="/" element={user ? <MyTicketsPage /> : <Navigate to="/login" />} />
//         <Route path="/create" element={user ? <CreateTicketPage /> : <Navigate to="/login" />} />
//         <Route path="/help" element={user ? <HelpCentrePage /> : <Navigate to="/login" />} />
//         <Route path="/know-hub" element={user ? <KnowHubPage /> : <Navigate to="/login" />} />
//         <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
//         <Route path="/ticket/:ticketId" element={user ? <TicketDetailsPage /> : <Navigate to="/login" />} />

//         {/* Add the new protected routes for the admin pages */}
//         <Route path="/admin/articles" element={
//           <AdminRoute user={user}>
//             <ArticleListPage />
//           </AdminRoute>
//         } />
//         <Route path="/admin/articles/create" element={
//           <AdminRoute user={user}>
//             <CreateArticlePage />
//           </AdminRoute>
//         } />

//         {/* Routes for logged-out users */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Routes>
//     </>
//   );
// };

// export default App;


import { Routes, Route, Link, useLocation, Navigate, useNavigate, Outlet } from 'react-router-dom';
import { Box, Container, Tabs, Tab, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from './store/slices/authSlice';

// Import all pages
import CreateTicketPage from './pages/CreateTicketPage';
import MyTicketsPage from './pages/MyTicketsPage';
import KnowHubPage from "./pages/KnowHubPage"; 
import TicketDetailsPage from './pages/TicketDetailsPage';
import HelpCentrePage from './pages/HelpCentrePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArticleListPage from './pages/ArticleListPage';
import CreateArticlePage from './pages/CreateArticlePage';
import AdminLayout from './components/shared/AdminLayout'; // Import the AdminLayout

// 1. Create a Layout for the main user-facing application
const UserLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const validTabPaths = ['/', '/create', '/help', '/know-hub', '/profile'];
  const currentTab = validTabPaths.includes(location.pathname) ? location.pathname : false;

  return (
    <>
      <Box sx={{ 
        backgroundColor: 'background.paper', 
        borderBottom: '1px solid', 
        borderColor: 'background.default',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
      }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="My Tickets" value="/" to="/" component={Link} />
            <Tab label="Create Ticket" value="/create" to="/create" component={Link} />
            <Tab label="Help Centre" value="/help" to="/help" component={Link} />
            <Tab label="Know Hub" value="/know-hub" to="/know-hub" component={Link} />
            <Tab label="Profile" value="/profile" to="/profile" component={Link} />
            {/* Admin link is now in the AdminLayout */}
          </Tabs>
          <Button onClick={handleLogout} color="primary" sx={{ textTransform: 'none', fontWeight: 600 }}>
            Logout
          </Button>
        </Container>
      </Box>
      {/* The Outlet renders the current page (e.g., MyTicketsPage) */}
      <Outlet />
    </>
  );
};

// 2. Create a component to protect admin-only routes
const AdminRoute = () => {
    const { user } = useSelector((state) => state.auth);
    // If user is an admin, show the AdminLayout. Otherwise, redirect.
    return user && user.user.role === 'Admin' ? <AdminLayout /> : <Navigate to="/" />;
};

// 3. The main App component is now much simpler
function App() {
  const { user } = useSelector((state) => state.auth);

  return (
      <Routes>
        {/* Routes for logged-out users */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes for Admin Users */}
        <Route path="/admin/*" element={<AdminRoute />}>
            {/* Nested routes will render inside AdminLayout's Outlet */}
            <Route path="articles" element={<ArticleListPage />} />
            <Route path="articles/create" element={<CreateArticlePage />} />
            {/* Add other admin routes here, e.g., edit article */}
        </Route>

        {/* Protected Routes for All Logged-in Users */}
        <Route path="/*" element={user ? <UserLayout /> : <Navigate to="/login" />}>
            <Route index element={<MyTicketsPage />} />
            <Route path="create" element={<CreateTicketPage />} />
            <Route path="help" element={<HelpCentrePage />} />
            <Route path="know-hub" element={<KnowHubPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="ticket/:ticketId" element={<TicketDetailsPage />} />
        </Route>
      </Routes>
  );
};

export default App;
