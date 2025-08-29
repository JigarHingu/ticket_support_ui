import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  useTheme,
  Button,
} from "@mui/material";
import { NavLink, Outlet, Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import QuizIcon from "@mui/icons-material/Quiz";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import GroupIcon from "@mui/icons-material/Group";

const drawerWidth = 240;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Manage Users", icon: <GroupIcon />, path: "/admin/users" },
    { text: "Manage Articles", icon: <ArticleIcon />, path: "/admin/articles" },
    { text: "Manage FAQs", icon: <QuizIcon />, path: "/admin/faqs" },
    {
      text: "Manage Tickets",
      icon: <ConfirmationNumberIcon />,
      path: "/admin/tickets",
    },
  ];

  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h6" fontWeight={700} noWrap>
          Admin Panel
        </Typography>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                "&.active": {
                  backgroundColor: theme.palette.action.selected,
                  color: theme.palette.primary.main,
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: "background.paper",
          color: "text.primary",
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "divider",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight={600}>
            Dashboard
          </Typography>
          {/* This Box pushes the button to the far right */}
          <Box sx={{ flexGrow: 1 }} />
          {/* Add the "Back to Main Site" button */}
          <Button
            component={Link}
            to="/"
            variant="outlined"
            startIcon={<ExitToAppIcon />}
            sx={{ textTransform: "none", fontWeight: 600, p: "10px" }}
          >
            Back to Main Site
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer Navigation */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "background.paper",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Permanent Drawer (Desktop) */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: "background.paper",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        id="main-content"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
