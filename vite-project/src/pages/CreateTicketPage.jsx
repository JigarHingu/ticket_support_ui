import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import FileUpload from "../components/FileUpload";
import { createTicket } from "../store/slices/ticketsSlice";

const CreateTicketPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the logged-in user's data from the Redux store
  const { user } = useSelector((state) => state.auth);

  // console.log("User object from Redux:", user);

  const handleFileUpload = (files) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTicketData = {
      title: title || "No Title Provided",
      description: description,
      tags: [`@${category}`, `@${subcategory}`],
      // Use the logged-in user's name
      repliedBy: user ? user.name : "Guest", 
    };

    dispatch(createTicket(newTicketData));
    navigate("/");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "background.paper",
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Grid sx={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "text.primary", fontWeight: "500" }}
              >
                Category
              </Typography>
              <TextField
                fullWidth
                select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                SelectProps={{
                  displayEmpty: true,
                }}
                required
                sx={{
                  "& .MuiSelect-select": {
                    opacity: category === "" ? 0.6 : 1,
                  },
                }}
              >
                <MenuItem value="" disabled sx={{ opacity: 0.6 }}>
                  --Select--
                </MenuItem>
                <MenuItem value="Bug Report">Bug Report</MenuItem>
                <MenuItem value="Feature Request">Feature Request</MenuItem>
                <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                <MenuItem value="Billing">Billing</MenuItem>
                <MenuItem value="Technical Support">Technical Support</MenuItem>
                <MenuItem value="Something Else">Something Else</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "text.primary", fontWeight: "500" }}
              >
                Subcategory
              </Typography>
              <TextField
                fullWidth
                select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                SelectProps={{
                  displayEmpty: true,
                }}
                required
                sx={{
                  "& .MuiSelect-select": {
                    opacity: subcategory === "" ? 0.6 : 1,
                  },
                }}
              >
                <MenuItem
                  value=""
                  disabled
                >
                  --Select--
                </MenuItem>
                <MenuItem value="UI/UX">UI/UX</MenuItem>
                <MenuItem value="Performance">Performance</MenuItem>
                <MenuItem value="API">API</MenuItem>
                <MenuItem value="Login Issue">Login Issue</MenuItem>
                <MenuItem value="Payment Failure">Payment Failure</MenuItem>
                <MenuItem value="None of this">None of this</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        <Typography
          variant="subtitle2"
          sx={{ mt: 3, mb: 1, color: "text.primary", fontWeight: "500" }}
        >
          Ticket Title
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter Ticket Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Typography
          variant="subtitle2"
          sx={{ mt: 3, mb: 1, color: "text.primary", fontWeight: "500" }}
        >
          Description
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Enter your complaint here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Typography
          variant="subtitle2"
          sx={{ mt: 3, mb: 1, color: "text.primary", fontWeight: "500" }}
        >
          Upload Images
        </Typography>
        <FileUpload onUpload={handleFileUpload} />

        {uploadedFiles.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Uploaded: {uploadedFiles.map((f) => f.name).join(", ")}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: { xs: "50%", sm: "50%" } }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateTicketPage;
