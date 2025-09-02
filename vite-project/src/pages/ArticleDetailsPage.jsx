import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Container,
    Typography,
    Chip,
    CircularProgress,
    Paper,
} from '@mui/material';
import { fetchArticles } from '../store/slices/articleSlice';

const ArticleDetailsPage = () => {
    const { id } = useParams(); // Get the article ID from the URL
    const dispatch = useDispatch();

    const { articles, status, error } = useSelector((state) => state.articles);
    const article = articles.find((a) => a._id === id);

    // Fetch articles if they aren't already in the store
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchArticles());
        }
    }, [status, dispatch]);

    if (status === 'loading' || !article) {
        return (
            <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!article) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h5" align="center">Article not found.</Typography>
            </Container>
        );
    }
    
    if (status === 'failed') {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>        
                <Typography variant="h5" align="center" color="error">
                    {error || 'Failed to load article.'}
                </Typography>
            </Container>
        );
    }

    const formattedDate = new Date(article.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, backgroundColor: '#E2E8F0' }}>
                {/* Article Header */}
                <Box mb={3} sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 3 }}>
                    <Chip label={article.category} color="primary" size="small" sx={{ mb: 1.5, fontWeight: 600 }} />
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        gutterBottom
                        sx={{ color: "#47a1fe" }}
                    >
                        {article.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Published by <strong>{article.author.name}</strong> on {formattedDate}
                    </Typography>
                </Box>

                {/* Article Content */}
                <Box
                    className="ql-editor" // Use Quill's class to get nice default styling
                    dangerouslySetInnerHTML={{ __html: article.content }}
                    sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        '& h1, & h2, & h3': { color: 'text.primary', fontWeight: 600, mt: 1, mb: 1 },
                        '& p': { mb: 2 },
                        '& a': { color: 'primary.main', textDecoration: 'none' },
                        '& ol, & ul': { pl: 3, mb: 2 },
                        '& blockquote': {
                            borderLeft: '4px solid',
                            borderColor: 'primary.main',
                            pl: 2,
                            my: 2,
                            fontStyle: 'italic',
                            color: 'text.secondary'
                        },
                        // This new style will control the size of images
                        '& img': {
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '12px',
                            my: 2,
                        }
                    }}
                />
            </Paper>
        </Container>
    );
};

export default ArticleDetailsPage;
