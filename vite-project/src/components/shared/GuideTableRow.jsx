import { Box, Typography, Chip, Button, Grid } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link } from "react-router-dom";

const GuideTableRow = ({ row, onToggleSave }) => {
  const formattedDate = new Date(row.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Box
      component={Link}
      to={`/know-hub/${row._id}`}
      sx={{
        backgroundColor: "background.paper",
        p: 2,
        borderRadius: 3,
        mb: 1.5,
        textDecoration: "none",
        "&:hover": {
          backgroundColor: "#2A2D3E",
        },
        display: "block",
      }}
    >
      <Grid container alignItems="center" spacing={{ xs: 2, sm: 0 }}>
        {/* Column 1: Title + Category */}
        <Grid size={{ xs: 12, sm: 5 }}>
          <Box>
            <Typography fontWeight={600} color="text.primary" mb={0.5}>
              {row.title}
            </Typography>
            <Chip
              label={row.category}
              size="small"
              sx={{
                backgroundColor: "#334155",
                color: "#A0AEC0",
                fontSize: "0.7rem",
                height: "22px",
              }}
            />
          </Box>
        </Grid>

        {/* Column 2: Author */}
        <Grid size={{ xs: 6, sm: 2 }} sx={{ textAlign: { xs: "left", sm: "center" } }}>
          <Typography variant="body2" color="text.secondary">
            {row.author?.name}
          </Typography>
        </Grid>

        {/* Column 3: Date */}
        <Grid size={{ xs: 6, sm: 3 }} sx={{ textAlign: { xs: "right", sm: "center" } }}>
          <Typography variant="body2" color="text.secondary">
            {formattedDate}
          </Typography>
        </Grid>

        {/* Column 4: Save Button */}
        <Grid
          size={{ xs: 12, sm: 2 }}
          sx={{ display: "flex", justifyContent: { xs: "flex-end", sm: "center" } }}
        >
          <Button
            onClick={(e) => {
              e.preventDefault(); // prevent navigation
              onToggleSave();
            }}
            size="small"
            startIcon={
              row.saved ? (
                <BookmarkIcon sx={{ fontSize: 18, color: "#A259FF" }} />
              ) : (
                <BookmarkBorderIcon sx={{ fontSize: 18, color: "#CBD5E0" }} />
              )
            }
            sx={{
              minWidth: "95px",
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
