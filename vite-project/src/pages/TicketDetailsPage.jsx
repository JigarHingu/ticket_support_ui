import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import DeleteIcon from "@mui/icons-material/Delete";
import TicketInfoBlock from "../components/shared/TicketInfoBlock";
import InfoSection from "../components/shared/InfoSection";
import UploadedFile from "../components/shared/UploadedFile";
import BackButton from "../components/shared/BackButton";
import {
  updateTicketAPI,
  fetchTickets,
  addTicketReplyAPI,
  deleteTicketAPI,
} from "../store/slices/ticketsSlice";

// A local component to display a single reply
const ReplyCard = ({ reply }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${
        nameParts[nameParts.length - 1][0]
      }`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const isAdminReply = reply.role === "Admin" || reply.role === "Support Team";

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mt: 2,
        flexDirection: isAdminReply ? "row-reverse" : "row",
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: isAdminReply ? "secondary.main" : "primary.main",
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        {getInitials(reply.name)}
      </Avatar>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: 2,
          width: "fit-content",
          maxWidth: "80%",
          backgroundColor: isAdminReply ? "#334155" : "background.default",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600}>
            {reply.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
            {new Date(reply.createdAt).toLocaleString("en-IN")}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: "pre-wrap" }}
        >
          {reply.text}
        </Typography>
      </Paper>
    </Box>
  );
};

const TicketDetailsPage = () => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ticketStatus = useSelector((state) => state.tickets.status);
  const ticketData = useSelector((state) =>
    state.tickets.tickets.find((ticket) => ticket._id === ticketId)
  );
  // Get the logged-in user's data to check their role
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.user?.role === "Admin";

  const [statusValue, setStatusValue] = useState(
    ticketData?.status || "Awaiting Agent"
  );
  const [files, setFiles] = useState(ticketData?.uploadedFiles || []);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    if (ticketStatus === "idle") {
      dispatch(fetchTickets());
    }
  }, [ticketStatus, dispatch]);

  useEffect(() => {
    if (ticketData) {
      setStatusValue(ticketData.status);
      setFiles(ticketData.uploadedFiles || []);
    }
  }, [ticketData]);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatusValue(newStatus);
    dispatch(updateTicketAPI({ id: ticketId, newStatus: newStatus }));
  };

  const handleFileUpload = (newFiles) => {
    const newFileNames = newFiles.map((file) => file.name);
    setFiles((prevFiles) => [...prevFiles, ...newFileNames]);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    if (!replyText.trim()) return;

    const replyData = { text: replyText };
    dispatch(addTicketReplyAPI({ ticketId, replyData }));
    setReplyText("");
  };

  const handleDeleteTicket = () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      dispatch(deleteTicketAPI(ticketId));
      navigate("/");
    }
  };

  if (ticketStatus === "loading" && !ticketData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Loading Ticket...
        </Typography>
      </Container>
    );
  }

  if (!ticketData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Ticket not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton />
      <Box
        sx={{
          backgroundColor: "background.paper",
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <TicketInfoBlock
              title={ticketData.title}
              id={ticketData.ticketId}
              date={ticketData.createdAt}
              tags={ticketData.tags}
              status={ticketData.status}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                backgroundColor: "background.default",
                borderRadius: 2,
                p: 2,
                height: "100%",
              }}
            >
              <TicketInfoBlock
                title="Replay Details"
                id={ticketData.ticketId}
                date={ticketData.updatedAt}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Only show these admin controls if the user is an Admin */}
        {isAdmin && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                sx={{ mb: 1, color: "text.primary" }}
              >
                Mark As
              </Typography>
              <TextField
                select
                value={statusValue}
                onChange={handleStatusChange}
                size="small"
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="Awaiting Agent">Awaiting Agent</MenuItem>
                <MenuItem value="Awaiting User">Awaiting User</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </TextField>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteTicket}
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  textTransform: "none",
                  fontWeight: 550,
                  p: 1.5,
                  mt: 2,
                }}
              >
                Delete Ticket
              </Button>
              <IconButton
                color="error"
                onClick={handleDeleteTicket}
                sx={{ display: { xs: "inline-flex", sm: "none" } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        )}

        <Box mt={2}>
          <Typography
            variant="subtitle2"
            fontWeight="600"
            sx={{ mb: 1.5, color: "text.primary" }}
          >
            Uploaded files ({files.length})
          </Typography>
          <UploadedFile onUpload={handleFileUpload} />
          {files.length > 0 && (
            <Box mt={1.5} pl={1}>
              {files.map((fileName, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  - {fileName}
                </Typography>
              ))}
            </Box>
          )}
        </Box>

        <InfoSection title="Description" content={ticketData.description} />

        {ticketData.replies &&
          ticketData.replies
            .slice(1)
            .map((reply) => <ReplyCard key={reply._id} reply={reply} />)}

        <Box component="form" onSubmit={handleReplySubmit} mt={3}>
          <TextField
            fullWidth
            placeholder="Enter your reply here..."
            variant="outlined"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.default",
                borderRadius: 2,
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton type="submit" color="primary">
                  <SendIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default TicketDetailsPage;
