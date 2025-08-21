import { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { updateArticleAPI } from '../store/slices/articleSlice';

const EditArticlePage = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Find the specific article from the Redux store
  const article = useSelector((state) =>
    state.articles.articles.find((a) => a._id === id)
  );

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('Published');

  // This useEffect hook pre-fills the form when the article data is loaded
  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setCategory(article.category);
      setContent(article.content);
      setStatus(article.status);
    }
  }, [article]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const articleData = { title, category, content, status };
    dispatch(updateArticleAPI({ id, articleData }));
    navigate('/admin/articles');
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  if (!article) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading article...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Edit Article
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Main Content Area */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: '#c5aae7' }}>
              <TextField
                fullWidth
                label="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 3 }}
                required
              />
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent}
                modules={quillModules}
                style={{ height: '400px', marginBottom: '50px' }}
              />
            </Paper>
          </Grid>

          {/* Right Sidebar for Settings */}
          <Grid size={{ xs: 12, md: 4 }}>
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
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/admin/articles')}
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

export default EditArticlePage;
