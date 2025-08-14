// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   TextField,
//   IconButton,
//   Avatar,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import AttachmentIcon from "@mui/icons-material/Attachment";
// import TicketInfoBlock from "../components/shared/TicketInfoBlock";
// import InfoSection from "../components/shared/InfoSection";
// import UploadedFile from "../components/shared/UploadedFile";
// import { updateTicketAPI, fetchTickets, addTicketReplyAPI } from "../store/slices/ticketsSlice";

// // A local component to display a single reply
// // const ReplyCard = ({ reply }) => (
// //   <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
// //     <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
// //       {reply.name.substring(0, 2)}
// //     </Avatar>
// //     <Box sx={{ backgroundColor: 'background.default', p: 2, borderRadius: 2, width: '100%' }}>
// //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
// //         <Typography variant="subtitle2" fontWeight={600}>{reply.name}</Typography>
// //         <Typography variant="caption" color="text.secondary">
// //           {new Date(reply.createdAt).toLocaleString('en-IN')}
// //         </Typography>
// //       </Box>
// //       <Typography variant="body2" color="text.secondary">{reply.text}</Typography>
// //     </Box>
// //   </Box>
// // );

// const ReplyCard = ({ reply }) => {
//   // Helper function to get the correct initials from a name
//   const getInitials = (name) => {
//     if (!name) return '';
//     const nameParts = name.split(' ');
//     if (nameParts.length > 1) {
//       return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
//     }
//     return name.substring(0, 2).toUpperCase();
//   };

//   return (
//     <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//       <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem',fontWeight: '700' }}>
//         {getInitials(reply.name)}
//       </Avatar>
//       <Box sx={{ backgroundColor: 'background.default', p: 2, borderRadius: 2, width: '100%' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//           <Typography variant="subtitle2" fontWeight={600}>{reply.name}</Typography>
//           <Typography variant="caption" color="text.secondary">
//             {new Date(reply.createdAt).toLocaleString('en-IN')}
//           </Typography>
//         </Box>
//         <Typography variant="body2" color="text.secondary">{reply.text}</Typography>
//       </Box>
//     </Box>
//   );
// };

// const TicketDetailsPage = () => {
//   const { ticketId } = useParams();
//   const dispatch = useDispatch();

//   const ticketStatus = useSelector(state => state.tickets.status);
//   const ticketData = useSelector(state =>
//     state.tickets.tickets.find(ticket => ticket._id === ticketId)
//   );

//   const [statusValue, setStatusValue] = useState(ticketData?.status || 'Closed');
//   const [files, setFiles] = useState(ticketData?.uploadedFiles || []);
//   const [replyText, setReplyText] = useState(""); // State for the reply input

//   useEffect(() => {
//     if (ticketStatus === 'idle') {
//       dispatch(fetchTickets());
//     }
//   }, [ticketStatus, dispatch]);

//   useEffect(() => {
//       if (ticketData) {
//           setStatusValue(ticketData.status);
//           setFiles(ticketData.uploadedFiles || []);
//       }
//   }, [ticketData]);

//   const handleStatusChange = (event) => {
//     const newStatus = event.target.value;
//     setStatusValue(newStatus);
//     dispatch(updateTicketAPI({ id: ticketId, newStatus: newStatus }));
//   };

//   const handleFileUpload = (newFiles) => {
//     const newFileNames = newFiles.map(file => file.name);
//     setFiles(prevFiles => [...prevFiles, ...newFileNames]);
//   };

//   const handleReplySubmit = (event) => {
//     event.preventDefault();
//     if (!replyText.trim()) return; // Don't submit empty replies

//     const replyData = { text: replyText };
//     dispatch(addTicketReplyAPI({ ticketId, replyData }));
//     setReplyText(""); // Clear the input field after submitting
//   };

//   if (ticketStatus === 'loading' && !ticketData) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Typography variant="h5" align="center">
//           Loading Ticket...
//         </Typography>
//       </Container>
//     );
//   }

//   if (!ticketData) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Typography variant="h5" align="center">
//           Ticket not found.
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box
//         sx={{
//           backgroundColor: "background.paper",
//           p: { xs: 2, sm: 3 },
//           borderRadius: 3,
//         }}
//       >
//         <Grid
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "repeat(1, 1fr)",
//               sm: "repeat(2, 1fr)",
//             },
//             gap: 2,
//           }}
//         >
//           <Grid size={{ xs: 12, md: 6 }}>
//             <Box
//               sx={{
//                 backgroundColor: "background.paper",
//                 borderRadius: 3,
//                 p: 2,
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//               }}
//             >
//               <TicketInfoBlock
//                 title={ticketData.title}
//                 id={ticketData._id}
//                 date={ticketData.createdAt}
//                 tags={ticketData.tags}
//                 status={ticketData.status}
//               />
//             </Box>
//           </Grid>

//           <Grid size={{ xs: 12, md: 6 }}>
//             <Box
//               sx={{
//                 backgroundColor: "background.default",
//                 borderRadius: 3,
//                 p: 2,
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 boxShadow: 1,
//               }}
//             >
//               <TicketInfoBlock
//                 title="Replay Details"
//                 id={ticketData._id}
//                 date={ticketData.updatedAt}
//               />
//             </Box>
//           </Grid>
//         </Grid>

//         <Box mt={3}>
//           <Typography
//             variant="subtitle2"
//             fontWeight="600"
//             sx={{ mb: 1, color: "text.primary" }}
//           >
//             Mark As
//           </Typography>
//           <FormControl>
//             <RadioGroup row value={statusValue} onChange={handleStatusChange}>
//               <FormControlLabel
//                 value="Open"
//                 control={
//                   <Radio
//                     icon={
//                       <Box sx={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff" }} />
//                     }
//                     checkedIcon={
//                       <Box sx={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                         <Box sx={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#34C759" }} />
//                       </Box>
//                     }
//                   />
//                 }
//                 label="Un Resolved"
//               />
//               <FormControlLabel
//                 value="Closed"
//                 control={
//                   <Radio
//                     icon={
//                       <Box sx={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #fff", backgroundColor: "#fff" }} />
//                     }
//                     checkedIcon={
//                       <Box sx={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                         <Box sx={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#34C759" }} />
//                       </Box>
//                     }
//                   />
//                 }
//                 label="Resolved"
//               />
//             </RadioGroup>
//           </FormControl>
//         </Box>

//         <Box mt={2}>
//           <Typography
//             variant="subtitle2"
//             fontWeight="600"
//             sx={{ mb: 1.5, color: "text.primary" }}
//           >
//             Uploaded files ({files.length})
//           </Typography>
//           <UploadedFile onUpload={handleFileUpload} />
//           {files.length > 0 && (
//             <Box mt={1.5} pl={1}>
//               {files.map((fileName, index) => (
//                 <Typography key={index} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
//                   - {fileName}
//                 </Typography>
//               ))}
//             </Box>
//           )}
//         </Box>

//         {/* Displaying the conversation history */}
//         <InfoSection title="Description" content={ticketData.description} />

//         {/* This now maps over ALL replies */}
//         {ticketData.replies && ticketData.replies.map(reply => (
//             <ReplyCard key={reply._id} reply={reply} />
//         ))}

//         {/* Reply Input Field */}
//         <Box component="form" onSubmit={handleReplySubmit} mt={3}>
//           <TextField
//             fullWidth
//             placeholder="Enter your reply here..."
//             variant="outlined"
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 backgroundColor: "background.default",
//                 borderRadius: 2,
//                 "& fieldset": {
//                   borderColor: "#334155",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "primary.main",
//                 },
//               },
//             }}
//             InputProps={{
//               endAdornment: (
//                 <IconButton type="submit" color="primary">
//                   <SendIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default TicketDetailsPage;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import DeleteIcon from "@mui/icons-material/Delete";
import TicketInfoBlock from "../components/shared/TicketInfoBlock";
import InfoSection from "../components/shared/InfoSection";
import UploadedFile from "../components/shared/UploadedFile";
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

  return (
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: "primary.main",
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        {getInitials(reply.name)}
      </Avatar>
      <Box
        sx={{
          backgroundColor: "background.default",
          p: 2,
          borderRadius: 2,
          width: "100%",
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
          <Typography variant="caption" color="text.secondary">
            {new Date(reply.createdAt).toLocaleString("en-IN")}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {reply.text}
        </Typography>
      </Box>
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

  const [statusValue, setStatusValue] = useState(
    ticketData?.status || "Closed"
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

  // 4. Create the handler function for deleting a ticket
  const handleDeleteTicket = () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      dispatch(deleteTicketAPI(ticketId));
      navigate("/"); // Redirect to the main page after deletion
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
      <Box
        sx={{
          backgroundColor: "background.paper",
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
        }}
      >
        {/* Corrected Grid v2 Syntax */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TicketInfoBlock
              title={ticketData.title}
              id={ticketData.ticketId} // Use the user-friendly ticketId for display
              date={ticketData.createdAt}
              tags={ticketData.tags}
              status={ticketData.status}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
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
                id={ticketData.ticketId} // Use the user-friendly ticketId for display
                date={ticketData.updatedAt}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Add the Delete button next to the Mark As section */}
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
            <FormControl>
              <RadioGroup row value={statusValue} onChange={handleStatusChange}>
                <FormControlLabel
                  value="Open"
                  control={
                    <Radio
                      icon={
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            border: "2px solid #fff",
                            backgroundColor: "#fff",
                          }}
                        />
                      }
                      checkedIcon={
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            backgroundColor: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: 11,
                              height: 11,
                              borderRadius: "50%",
                              backgroundColor: "#34C759",
                            }}
                          />
                        </Box>
                      }
                    />
                  }
                  label="Un Resolved"
                />
                <FormControlLabel
                  value="Closed"
                  control={
                    <Radio
                      icon={
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            border: "2px solid #fff",
                            backgroundColor: "#fff",
                          }}
                        />
                      }
                      checkedIcon={
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            backgroundColor: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: 11,
                              height: 11,
                              borderRadius: "50%",
                              backgroundColor: "#34C759",
                            }}
                          />
                        </Box>
                      }
                    />
                  }
                  label="Resolved"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
              {/* Button with text, visible on small screens and up */}
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteTicket}
                sx={{ 
                    display: { xs: 'none', sm: 'inline-flex' },
                    textTransform: 'none', 
                    fontWeight: 550 ,
                    p:1.5,
                    mt:2,
                }}
              >
                Delete Ticket
              </Button>
              {/* Icon-only button, visible only on extra-small screens */}
              <IconButton
                color="error"
                onClick={handleDeleteTicket}
                sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
        </Box>
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

        {/* Corrected Reply Section */}
        <InfoSection title="Description" content={ticketData.description} />

        {/* This now maps over ALL replies without skipping any */}
        {ticketData.replies &&
          ticketData.replies
            .slice(1)
            .map((reply) => <ReplyCard key={reply._id} reply={reply} />)}

        {/* Reply Input Field */}
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
                "& fieldset": {
                  borderColor: "#334155",
                },
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
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
