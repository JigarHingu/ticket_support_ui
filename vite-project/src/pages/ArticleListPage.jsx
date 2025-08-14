import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { fetchArticles, deleteArticleAPI } from '../store/slices/articleSlice';
import ArticleListItem from '../components/shared/ArticleListItem'; // 1. Import the new component

const ArticleListPage = () => {
  const dispatch = useDispatch();
//   const navigate = useNavigate();
  const { articles, status, error } = useSelector((state) => state.articles);

  useEffect(() => {
    // Fetch articles when the component loads
    dispatch(fetchArticles());
  }, [dispatch]);

  // 2. Create handler functions for edit and delete
  const handleEdit = (id) => {
    // We will build the edit page later
    console.log('Navigate to edit page for article:', id);
    // navigate(`/admin/articles/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      dispatch(deleteArticleAPI(id));
    }
  };


  let content;

  if (status === 'loading') {
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  } else if (status === 'succeeded') {
    content = (
      <Box>
        {/* 3. Map over the articles and render the new component */}
        {articles.map((article) => (
          <ArticleListItem 
            key={article._id}
            article={article}
            onEdit={() => handleEdit(article._id)}
            onDelete={() => handleDelete(article._id)}
          />
        ))}
      </Box>
    );
  } else if (status === 'failed') {
    content = (
      <Typography color="error" align="center" sx={{ my: 4 }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Manage Articles
        </Typography>
        <Button
          component={Link}
          to="/admin/articles/create" // We'll create this route later
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          Create Article
        </Button>
      </Box>

      {content}
    </Container>
  );
};

export default ArticleListPage;
