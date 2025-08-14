// import { Box, Typography, Chip, Button } from "@mui/material";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";

// const GuideTableRow = ({ row, onToggleSave }) => {
//   // Helper function to format the date string from the database
//   const formattedDate = new Date(row.date).toLocaleString('en-IN', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true,
//   });

//   return (
//     <Box
//       display="grid"
//       gridTemplateColumns="30% 25% 35% 10%"
//       alignItems="center"
//       bgcolor="#1C1F2E"
//       px={2}
//       py={2}
//       borderRadius={2}
//       mb={1.5}
//     >
//       {/* Title + Tags */}
//       <Box display="flex" flexDirection="column" alignItems="start">
//         <Typography fontWeight={500} color="#fff" mb={0.5} textAlign="center">
//           {row.title}
//         </Typography>
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "flex-start" }}>
//           {row.tags.map((tag, i) => (
//             <Chip
//               key={i}
//               label={tag}
//               size="small"
//               sx={{
//                 backgroundColor: "#2A2D3E",
//                 color: "#A0AEC0",
//                 fontSize: "0.7rem",
//                 height: "22px",
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Guide by */}
//       <Box display="flex" justifyContent="center">
//         <Typography color="#CBD5E0">{row.guideBy}</Typography>
//       </Box>

//       {/* Date */}
//       <Box display="flex" justifyContent="center">
//         {/* Displaying the newly formatted date */}
//         <Typography color="#CBD5E0">{formattedDate}</Typography>
//       </Box>

//       {/* Save Button */}
//       <Box display="flex" justifyContent="center" >
//         <Button
//           onClick={onToggleSave}
//           size="small"
//           startIcon={
//             row.saved ? (
//               <BookmarkIcon sx={{ fontSize: 18, color: "#A259FF" }} />
//             ) : (
//               <BookmarkBorderIcon sx={{ fontSize: 18, color: "#CBD5E0" }} />
//             )
//           }
//           sx={{
//             minWidth: '95px',
//             textTransform: "none",
//             fontWeight: 500,
//             fontSize: "0.8rem",
//             px: 2.5,
//             py: 0.3,
//             backgroundColor: "rgba(203, 213, 224, 0.2)",
//             color: "#CBD5E0",
//             borderColor: "#CBD5E0",
//             "&:hover": {
//               backgroundColor: "#2A2D3E",
//               borderColor: "#CBD5E0",
//             },
//             "& .MuiButton-startIcon": {
//               marginRight: "3px",
//             },
//           }}
//         >
//           {row.saved ? "Saved" : "Save"}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default GuideTableRow;



// import { Box, Typography, Chip, Button, Grid } from "@mui/material";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";

// const GuideTableRow = ({ row, onToggleSave }) => {
//   const formattedDate = new Date(row.date).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });

//   return (
//     <Box
//       sx={{
//         display: { xs: "block", sm: "grid" },
//         gridTemplateColumns: "30% 25% 35% 10%",
//         alignItems: "center",
//         bgcolor: { xs: "#1C1F2E", sm: "transparent" },
//         p: 2,
//         borderRadius: 2,
//         mb: 1.5,
//         borderBottom: { xs: "none", sm: "1px solid" },
//         borderColor: "background.default",
//       }}
//     >
//       {/* Title + Tags */}
//       <Box>
//         <Typography fontWeight={500} color="text.primary" mb={0.5}>
//           {row.title}
//         </Typography>
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           {row.tags.map((tag, i) => (
//             <Chip
//               key={i}
//               label={tag}
//               size="small"
//               sx={{
//                 backgroundColor: "#2A2D3E",
//                 color: "#A0AEC0",
//                 fontSize: "0.7rem",
//                 height: "22px",
//               }}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Other Info */}
//       <Grid
//         container
//         spacing={2}
//         sx={{ mt: { xs: 2, sm: 0 }, alignItems: "center" }}
//       >
//         {/* Guide by */}
//         <Grid item xs={12} sm={5.5} sx={{ textAlign: { xs: "left", sm: "center" } }}>
//           <Typography variant="body2" color="text.secondary">
//             Guide by: <strong>{row.guideBy}</strong>
//           </Typography>
//         </Grid>

//         {/* Date */}
//         <Grid item xs={12} sm={5.5} sx={{ textAlign: { xs: "right", sm: "center" } }}>
//           <Typography variant="body2" color="text.secondary">
//             {formattedDate}
//           </Typography>
//         </Grid>

//         {/* Save Button */}
//         <Grid
//           item
//           xs={12}
//           sm={12}
//           sx={{
//             display: "flex",
//             justifyContent: { xs: "flex-end", sm: "center" },
//             mt: { xs: 1, sm: 0 },
//           }}
//         >
//           <Button
//             onClick={onToggleSave}
//             size="small"
//             startIcon={
//               row.saved ? (
//                 <BookmarkIcon sx={{ fontSize: 18, color: "#A259FF" }} />
//               ) : (
//                 <BookmarkBorderIcon sx={{ fontSize: 18, color: "#CBD5E0" }} />
//               )
//             }
//             sx={{
//               minWidth: "95px",
//               textTransform: "none",
//               fontWeight: 500,
//               fontSize: "0.8rem",
//               px: 2.5,
//               py: 0.3,
//               backgroundColor: "rgba(203, 213, 224, 0.2)",
//               color: "#CBD5E0",
//               borderRadius: 2,
//               "&:hover": {
//                 backgroundColor: "#2A2D3E",
//               },
//             }}
//           >
//             {row.saved ? "Saved" : "Save"}
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default GuideTableRow;


import { Box, Typography, Chip, Button, Grid } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const GuideTableRow = ({ row, onToggleSave }) => {
  const formattedDate = new Date(row.date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        p: 2,
        borderRadius: 3,
        mb: 1.5,
      }}
    >
      <Grid container alignItems="center" spacing={{ xs: 2, sm: 0 }}>
        {/* Column 1: Title + Tags */}
        <Grid size={{ xs: 12, sm: 5}}>
          <Box>
            <Typography fontWeight={600} color="text.primary" mb={0.5}>
              {row.title}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {row.tags.map((tag, i) => (
                <Chip
                  key={i}
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor: "#334155",
                    color: "#A0AEC0",
                    fontSize: "0.7rem",
                    height: "22px",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Column 2: Guide by */}
        <Grid size={{ xs: 6, sm: 2}} sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
          <Typography variant="body2" color="text.secondary">{row.guideBy}</Typography>
        </Grid>

        {/* Column 3: Date */}
        <Grid size={{ xs: 6, sm: 3}} sx={{ textAlign: { xs: 'right', sm: 'center' } }}>
          <Typography variant="body2" color="text.secondary">{formattedDate}</Typography>
        </Grid>

        {/* Column 4: Save Button */}
        <Grid size={{ xs: 12, sm: 2}} sx={{ display: 'flex', justifyContent: { xs: 'flex-end', sm: 'center' } }}>
          <Button
            onClick={onToggleSave}
            size="small"
            startIcon={
              row.saved ? (
                <BookmarkIcon sx={{ fontSize: 18, color: "#A259FF" }} />
              ) : (
                <BookmarkBorderIcon sx={{ fontSize: 18, color: "#CBD5E0" }} />
              )
            }
            sx={{
              minWidth: '95px',
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.8rem",
              borderRadius: 2,
              backgroundColor: "rgba(203, 213, 224, 0.1)",
              color: row.saved ? "#A259FF" : "#CBD5E0",
              "&:hover": {
                backgroundColor: "rgba(203, 213, 224, 0.2)",
              },
            }}
          >
            {row.saved ? "Saved" : "Save"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GuideTableRow;
