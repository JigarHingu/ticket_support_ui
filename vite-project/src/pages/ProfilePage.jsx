import { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Badge,
  IconButton,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfileAPI, reset } from "../store/slices/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  // 1. Initialize form state with empty strings to prevent the error
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    userId: "",
    role: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const fileInputRef = useRef(null);

  // 2. This useEffect hook will now safely populate the form AFTER the user data has loaded
  useEffect(() => {
    if (user && user.user) {
      // Check that user and user.user exist
      setProfileData({
        name: user.user.name || "",
        email: user.user.email || "",
        phone: user.user.phone || "+91 9876543210", // Placeholder
        company: user.user.company || "Vervali Solutions Inc.", // Placeholder
        userId: user.user.userId || "",
        role: user.user.role || "Developer",
      });
    }
  }, [user]); // This effect runs only when the user object changes

  useEffect(() => {
    if (isSuccess) {
      setSnackbarOpen(true);
    }
    // Reset the state after the action is done
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const handleSaveChanges = () => {
    const userDataToUpdate = {
      name: profileData.name,
      email: profileData.email,
      role: profileData.role,
      phone: profileData.phone,
      company: profileData.company,
    };
    dispatch(updateUserProfileAPI(userDataToUpdate));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          backgroundColor: "background.paper",
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Box display="flex" justifyContent="center">
          <Typography
            variant="h5"
            color="primary"
            fontWeight={600}
            m={6}
            mt={0}
            sx={{
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: -10,
                width: "80%",
                height: "3px",
                backgroundColor: "primary.main",
                borderRadius: "2px",
              },
            }}
          >
            {" "}
            My Profile{" "}
          </Typography>{" "}
        </Box>

        <Grid container spacing={5}>
          {/* Left Column: Profile Picture */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  onClick={handleImageUploadClick}
                  sx={{
                    backgroundColor: "primary.main",
                    "&:hover": { backgroundColor: "primary.dark" },
                    border: "2px solid",
                    borderColor: "background.paper",
                  }}
                >
                  <EditIcon sx={{ fontSize: "1rem", color: "white" }} />
                </IconButton>
              }
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  border: "3px solid",
                  borderColor: "primary.main",
                }}
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${profileData.name}`}
              />
            </Badge>
            <Typography variant="h6" fontWeight={600}>
              {profileData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profileData.role}
            </Typography>
          </Grid>

          {/* Right Column: Form Fields */}
          <Grid size={{ xs: 12, sm: 8 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.primary", fontWeight: "500" }}
                >
                  Full Name
                </Typography>
                <TextField
                  fullWidth
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.primary", fontWeight: "500" }}
                >
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.primary", fontWeight: "500" }}
                >
                  Phone Number
                </Typography>
                <TextField
                  fullWidth
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.primary", fontWeight: "500" }}
                >
                  Company
                </Typography>
                <TextField
                  fullWidth
                  name="company"
                  value={profileData.company}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.primary", fontWeight: "500" }}
                >
                  User ID
                </Typography>
                <TextField
                  fullWidth
                  name="userId"
                  value={profileData.userId}
                  disabled
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.primary", fontWeight: "500" }}
                >
                  Role
                </Typography>
                <TextField
                  fullWidth
                  select
                  name="role"
                  value={profileData.role}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Support Team">Support Team</MenuItem>
                  <MenuItem value="Partner">Partner</MenuItem>
                  <MenuItem value="Developer">Developer</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  borderColor: "#334155",
                  color: "text.primary",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", fontWeight: 600, px: 3 }}
                onClick={handleSaveChanges}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={isError ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isError ? message : "Profile saved successfully!"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;
