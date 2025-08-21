// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   CircularProgress,
//   useMediaQuery,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import AddIcon from '@mui/icons-material/Add';
// import { fetchArticles, deleteArticleAPI } from '../store/slices/articleSlice';
// import ArticleListItem from '../components/shared/ArticleListItem';
// import { useTheme } from '@mui/material/styles';

// const ArticleListPage = () => {
//   const dispatch = useDispatch();
//   const { articles, status, error } = useSelector((state) => state.articles);

//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down('sm')); // true if <600px

//   useEffect(() => {
//     dispatch(fetchArticles());
//   }, [dispatch]);

//   const handleEdit = (id) => {
//     console.log('Navigate to edit page for article:', id);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this article?')) {
//       dispatch(deleteArticleAPI(id));
//     }
//   };

//   let content;
//   if (status === 'loading') {
//     content = (
//       <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   } else if (status === 'succeeded') {
//     content = (
//       <Box>
//         {articles.map((article) => (
//           <ArticleListItem
//             key={article._id}
//             article={article}
//             onEdit={() => handleEdit(article._id)}
//             onDelete={() => handleDelete(article._id)}
//           />
//         ))}
//       </Box>
//     );
//   } else if (status === 'failed') {
//     content = (
//       <Typography color="error" align="center" sx={{ my: 4 }}>
//         Error: {error}
//       </Typography>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mb: 3,
//         }}
//       >
//         <Typography variant="h5" fontWeight={600}>
//           Manage Articles
//         </Typography>
//         <Button
//           component={Link}
//           to="/admin/articles/create"
//           variant="contained"
//           startIcon={<AddIcon />}
//           sx={{
//             textTransform: 'none',
//             fontWeight: 600,
//             minWidth: isSmall ? 40 : 120, // shrink button on small screen
//             p: 1,
//             pr: isSmall ? 0 : 2,
//             pl:isSmall ? 1.3 : 2,
//           }}
//         >
//           {isSmall ? '' : 'Create Article'}
//         </Button>
//       </Box>

//       {content}
//     </Container>
//   );
// };

// export default ArticleListPage;


// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   CircularProgress,
//   useMediaQuery,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import AddIcon from '@mui/icons-material/Add';
// import { fetchArticles, deleteArticleAPI } from '../store/slices/articleSlice';
// import ArticleListItem from '../components/shared/ArticleListItem';
// import { useTheme } from '@mui/material/styles';

// const ArticleListPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { articles, status, error } = useSelector((state) => state.articles);

//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     dispatch(fetchArticles());
//   }, [dispatch]);

//   // 2. Create handler functions for edit and delete
//   const handleEdit = (id) => {
//     // We will build the edit page later
//     console.log('Navigate to edit page for article:', id);
//     // navigate(`/admin/articles/edit/${id}`);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this article?')) {
//       dispatch(deleteArticleAPI(id));
//     }
//   };


//   let content;

//   if (status === 'loading') {
//     content = (
//       <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   } else if (status === 'succeeded') {
//     content = (
//       <Box>
//         {/* 3. Map over the articles and render the new component */}
//         {articles.map((article) => (
//           <ArticleListItem 
//             key={article._id}
//             article={article}
//             onEdit={() => handleEdit(article._id)}
//             onDelete={() => handleDelete(article._id)}
//           />
//         ))}
//       </Box>
//     );
//   } else if (status === 'failed') {
//     content = (
//       <Typography color="error" align="center" sx={{ my: 4 }}>
//         Error: {error}
//       </Typography>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mb: 3,
//         }}
//       >
//         <Typography variant="h5" fontWeight={600}>
//           Manage Articles
//         </Typography>
//         <Button
//           component={Link}
//           to="/admin/articles/create"
//           variant="contained"
//           startIcon={<AddIcon />}
//           sx={{
//             textTransform: 'none',
//             fontWeight: 600,
//             minWidth: isSmall ? 40 : 120,
//             p: 1,
//             pr: isSmall ? 1 : 2,
//           }}
//         >
//           {isSmall ? '' : 'Create Article'}
//         </Button>
//       </Box>

//       {content}
//     </Container>
//   );
// };

// export default ArticleListPage;


import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import AddIcon from '@mui/icons-material/Add';
import { fetchArticles, deleteArticleAPI } from '../store/slices/articleSlice';
import ArticleListItem from '../components/shared/ArticleListItem';
import { useTheme } from '@mui/material/styles';

const ArticleListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 2. Get the navigate function
  const { articles, status, error } = useSelector((state) => state.articles);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // 3. Update the handleEdit function to navigate to the edit page
  const handleEdit = (id) => {
    navigate(`/admin/articles/edit/${id}`);
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Manage Articles
        </Typography>
        <Button
          component={Link}
          to="/admin/articles/create"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            minWidth: isSmall ? 40 : 120,
            p: 1,
            pr: isSmall ? 0 : 2,
            pl:isSmall ? 1.3 : 2,
          }}
        >
          {isSmall ? '' : 'Create Article'}
        </Button>
      </Box>

      {content}
    </Container>
  );
};

export default ArticleListPage;
