import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createArticleAPI } from '../store/slices/articleSlice';

const CreateArticlePage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('Published'); // Default to published

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const articleData = { title, category, content, status };
    dispatch(createArticleAPI(articleData));
    navigate('/admin/articles'); // Redirect back to the article list after creation
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Create New Article
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Main Content Area */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: 'background.paper' }}>
              <TextField
                fullWidth
                label="Article Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 3 }}
                required
              />
              <TextField
                fullWidth
                label="Article Content"
                variant="outlined"
                multiline
                rows={15} // A large text area for the article body
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Paper>
          </Grid>

          {/* Right Sidebar for Settings */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: 'background.paper' }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Settings
              </Typography>
              <TextField
                fullWidth
                select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ mb: 3 }}
                required
              >
                <MenuItem value="Simulation">Simulation</MenuItem>
                <MenuItem value="Reports">Reports</MenuItem>
                <MenuItem value="Account & Settings">Account & Settings</MenuItem>
              </TextField>
              
              <TextField
                fullWidth
                select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Published">Published</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
              </TextField>

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Publish
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/admin/articles')} // Go back without saving
                  fullWidth
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Cancel
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateArticlePage;
