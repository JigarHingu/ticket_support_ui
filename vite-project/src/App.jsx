import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Box, Container, Tabs, Tab, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from './store/slices/authSlice';

// Import all of your pages
import CreateTicketPage from './pages/CreateTicketPage';
import MyTicketsPage from './pages/MyTicketsPage';
import KnowHubPage from "./pages/KnowHubPage"; 
import TicketDetailsPage from './pages/TicketDetailsPage';
import HelpCentrePage from './pages/HelpCentrePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// This is the main App component
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the real user state from the Redux store
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  // This array holds all the valid paths for our navigation tabs
  const validTabPaths = ['/', '/create', '/help', '/know-hub', '/profile'];
  
  // This checks if the current URL matches a valid tab. If not, it sets the value to false.
  const currentTab = validTabPaths.includes(location.pathname) ? location.pathname : false;

  return (
    <>
      {/* We only show the navigation bar if the user is logged in */}
      {user && (
        // These new styles make the header "sticky"
        <Box sx={{ 
          backgroundColor: 'background.paper', 
          borderBottom: '1px solid', 
          borderColor: 'background.default',
          position: 'sticky', // Makes the header stick
          top: 0, // Sticks it to the top of the viewport
          zIndex: 1100, // Ensures it stays on top of other content
        }}>
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tabs
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'primary.main',
                  height: '3px',
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <Tab label="My Tickets" value="/" to="/" component={Link} />
              <Tab label="Create Ticket" value="/create" to="/create" component={Link} />
              <Tab label="Help Centre" value="/help" to="/help" component={Link} />
              <Tab label="Know Hub" value="/know-hub" to="/know-hub" component={Link} />
              <Tab label="Profile" value="/profile" to="/profile" component={Link} />
            </Tabs>
            <Button onClick={handleLogout} color="primary" sx={{ textTransform: 'none', fontWeight: 600 }}>
              Logout
            </Button>
          </Container>
        </Box>
      )}

      {/* Define all the routes for the application */}
      <Routes>
        {/* If the user is logged in, show the protected pages. Otherwise, redirect to /login */}
        <Route path="/" element={user ? <MyTicketsPage /> : <Navigate to="/login" />} />
        <Route path="/create" element={user ? <CreateTicketPage /> : <Navigate to="/login" />} />
        <Route path="/help" element={user ? <HelpCentrePage /> : <Navigate to="/login" />} />
        <Route path="/know-hub" element={user ? <KnowHubPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/ticket/:ticketId" element={user ? <TicketDetailsPage /> : <Navigate to="/login" />} />

        {/* Routes for logged-out users */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
