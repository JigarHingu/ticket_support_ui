import { Box, Typography, Chip, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ArticleListItem = ({ article, onEdit, onDelete }) => {
  const statusColor = article.status === 'Published' ? 'success' : 'warning';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        mb: 1.5,
      }}
    >
      <Box>
        <Typography fontWeight={600}>{article.title}</Typography>
        <Typography variant="caption" color="text.secondary">
          Category: {article.category}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <Chip label={article.status} color={statusColor} size="small" />
        <Typography variant="body2" color="text.secondary">
          by {article.author.name}
        </Typography>
        <Box >
          <IconButton size="small" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={onDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

// Add the prop validation block
ArticleListItem.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ArticleListItem;
