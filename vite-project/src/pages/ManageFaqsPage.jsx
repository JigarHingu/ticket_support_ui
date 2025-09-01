import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  useMediaQuery,
  useTheme,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchFaqs,
  createFaqAPI,
  updateFaqAPI,
  deleteFaqAPI,
} from "../store/slices/faqSlice";

// Reusable Create/Edit Dialog
const FaqDialog = ({ open, onClose, faq, dispatch }) => {
  const [formData, setFormData] = useState({
    category: "",
    question: "",
    answer: "",
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm")); // full screen on mobile

  useEffect(() => {
    if (faq) {
      setFormData({
        category: faq.category,
        question: faq.question,
        answer: faq.answer,
      });
    } else {
      setFormData({ category: "General Questions", question: "", answer: "" });
    }
  }, [faq, open]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (faq) {
      dispatch(updateFaqAPI({ id: faq._id, faqData: formData }));
    } else {
      dispatch(createFaqAPI(formData));
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
    >
      <DialogTitle>{faq ? "Edit FAQ" : "Create New FAQ"}</DialogTitle>
      <Box component="form" onSubmit={handleFormSubmit}>
        <DialogContent>
          <TextField
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="General Questions">General Questions</MenuItem>
            <MenuItem value="Pricing">Pricing</MenuItem>
            <MenuItem value="Services">Services</MenuItem>
            <MenuItem value="Account">Account</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>
          <TextField
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Answer"
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" sx={{ p: "10px" }}>
            {faq ? "Save Changes" : "Create"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

const ManageFaqsPage = () => {
  const dispatch = useDispatch();
  const { faqs, status, error } = useSelector((state) => state.faqs);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      dispatch(deleteFaqAPI(id));
    }
  };

  const handleOpenDialog = (faq = null) => {
    setEditingFaq(faq);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingFaq(null);
  };

  let content;
  if (status === "loading") {
    content = (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  } else if (status === "succeeded") {
    content = (
      <Box>
        {faqs.map((faq) => (
          <Box
            key={faq._id}
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row", // stack on mobile
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              p: 3,
              backgroundColor: "background.paper",
              borderRadius: 2,
              mb: 1.5,
            }}
          >
            <Box sx={{ mb: isMobile ? 1 : 0 }}>
              <Typography fontWeight={600}>{faq.question}</Typography>
              <Typography variant="caption" color="text.secondary">
                Category: {faq.category}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <IconButton size="small" onClick={() => handleOpenDialog(faq)}>
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleDelete(faq._id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    );
  } else if (status === "failed") {
    content = (
      <Typography color="error" align="center" sx={{ my: 4 }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ px: { xs: 2, sm: 3, md: 4 } }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Manage FAQs
        </Typography>
        {/* Conditionally render the regular button ONLY on non-mobile screens */}
        {!isMobile && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ textTransform: "none", fontWeight: 600, p: "8px" }}
          >
            Create FAQ
          </Button>
        )}
      </Box>
      {content}

      {/* Add the Floating Action Button (Fab) ONLY on mobile screens */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="create faq"
          onClick={() => handleOpenDialog()}
          sx={{
            position: "fixed", // This makes it float
            bottom: 24, 
            right: 24,
          }}
        >
          <AddIcon />
        </Fab>
      )}

      <FaqDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        faq={editingFaq}
        dispatch={dispatch}
      />
    </Container>
  );
};

export default ManageFaqsPage;
