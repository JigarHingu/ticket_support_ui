import { useState, useEffect, useMemo } from 'react'; // 1. Import useMemo
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { fetchFaqs } from '../../store/slices/faqSlice';

// 2. The component now accepts searchQuery as a prop
const FaqSection = ({ searchQuery }) => {
  const [tabValue, setTabValue] = useState(0);
  const [expanded, setExpanded] = useState('panel0');

  const dispatch = useDispatch();

  const { faqs, status, error } = useSelector((state) => state.faqs);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFaqs());
    }
  }, [status, dispatch]);

  // 3. Filter the FAQs based on the search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery) {
      return faqs;
    }
    return faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [faqs, searchQuery]);


  // 4. Transform the FILTERED array of FAQs into a grouped object
  const faqData = filteredFaqs.reduce((acc, faq) => {
    const { category } = faq;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setExpanded('panel0'); 
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const tabCategories = Object.keys(faqData);
  const currentFaqs = faqData[tabCategories[tabValue]] || [];

  return (
    <Box>
      {/* Wrapper to center the Tabs */}
      <Box sx={{alignItems: 'center', display:'flex', justifyContent: 'center', width: '100%', mb: 4}}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: '3px',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'text.primary',
              },
            },
          }}
        >
          {tabCategories.map((category) => (
            <Tab key={category} label={category} />
          ))}
        </Tabs>
      </Box>

      {/* FAQ Accordion Section */}
      <Box>
        {status === 'loading' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {status === 'failed' && (
          <Typography color="error" align="center" sx={{ my: 4 }}>
            Error: {error}
          </Typography>
        )}
        {/* 5. Display a message if no results are found */}
        {status === 'succeeded' && currentFaqs.length === 0 && (
            <Typography align="center" sx={{ my: 4, color: 'text.secondary' }}>
                No questions found matching your search.
            </Typography>
        )}
        {status === 'succeeded' && currentFaqs.map((faq, index) => (
          <Accordion
            key={faq._id}
            expanded={expanded === `panel${index}`}
            onChange={handleAccordionChange(`panel${index}`)}
            disableGutters
            sx={{
              backgroundColor: 'transparent',
              color: 'text.primary',
              boxShadow: 'none',
              backgroundImage: 'none',
              borderBottom:
                index === currentFaqs.length - 1 ? 'none' : '1px solid', 
              borderColor: '#334155', 
              '&:before': {
                display: 'none', 
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                expanded === `panel${index}` ? <ExpandMoreIcon /> : <ChevronRightIcon />
              }
              sx={{
                py: 1,
                minHeight: 'auto',
                '& .MuiAccordionSummary-content': {
                  margin: '12px 0 !important',
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  transform: expanded === `panel${index}` ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <Typography fontWeight={500}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0, pb: 2 }}>
              <Typography color="text.secondary" ml={2} mr={5}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FaqSection;
