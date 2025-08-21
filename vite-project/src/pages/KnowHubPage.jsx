// import { useState, useEffect, useMemo } from "react";
// import {
//   Container,
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import PageHeader from "../components/shared/PageHeader";
// import GuideTable from "../components/shared/GuideTable";
// import GuideTableRow from "../components/shared/GuideTableRow";
// import SearchBar from "../components/shared/SearchBar";
// import { fetchGuides } from "../store/slices/guideSlice";
// import { toggleSaveGuideAPI } from "../store/slices/authSlice"; 

// const KnowHubPage = () => {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");

//   const { guides, status, error } = useSelector((state) => state.guides);
//   const { user } = useSelector((state) => state.auth);

//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchGuides());
//     }
//   }, [status, dispatch]);

//   const filteredGuides = useMemo(() => {
//     if (!searchQuery) {
//         return guides;
//     }
//     return guides.filter(guide => 
//         guide.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [guides, searchQuery]);

//   useEffect(() => {
//     if (filteredGuides && user) {
//       const initialRows = filteredGuides.map(guide => ({
//         ...guide,
//         saved: (user.user.savedGuides || []).includes(guide._id)
//       }));
//       setRows(initialRows);
//     }
//   }, [filteredGuides, user]);

//   const handleToggleSave = (guideId) => {
//     dispatch(toggleSaveGuideAPI(guideId));
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* This new Box handles the responsive layout for the header and search bar */}
//       <Box 
//         sx={{ 
//           display: 'flex', 
//           flexDirection: { xs: 'column', md: 'row' }, // Stacks on mobile, row on desktop
//           justifyContent: 'space-between', 
//           alignItems: { md: 'center' }, // Align items center on desktop
//           mb: 2 
//         }}
//       >
//         <PageHeader
//           title="Know Hub"
//           subtitle="Find answers, complete knowledge of tool by view documents and video guide"
//         />
//         <Box sx={{ width: { xs: '100%', md: '350px' }, mt: { xs: 2, md: 0 } }}>
//           <SearchBar 
//               onSearch={setSearchQuery}
//               placeholder="Search guides by title..."
//           />
//         </Box>
//       </Box>

//       <GuideTable />

//       {status === 'loading' && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//           <CircularProgress />
//         </Box>
//       )}
//       {status === 'failed' && (
//         <Typography color="error" align="center" sx={{ my: 4 }}>
//           Error: {error}
//         </Typography>
//       )}
//       {status === 'succeeded' && rows.map((row) => (
//         <GuideTableRow
//           key={row._id}
//           row={row}
//           onToggleSave={() => handleToggleSave(row._id)}
//         />
//       ))}
//     </Container>
//   );
// };

// export default KnowHubPage;


import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import PageHeader from "../components/shared/PageHeader";
import GuideTable from "../components/shared/GuideTable";
import GuideTableRow from "../components/shared/GuideTableRow";
import SearchBar from "../components/shared/SearchBar";
import { fetchArticles } from "../store/slices/articleSlice"; // 1. Import from the correct slice
import { toggleSaveGuideAPI } from "../store/slices/authSlice"; 

const KnowHubPage = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Get the articles data from the correct part of the Redux store
  const { articles, status, error } = useSelector((state) => state.articles);
  const { user } = useSelector((state) => state.auth);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    // 3. Dispatch the correct fetch action
    if (status === 'idle') {
      dispatch(fetchArticles());
    }
  }, [status, dispatch]);

  // 4. Filter articles based on the search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery) {
        return articles;
    }
    return articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [articles, searchQuery]);

  useEffect(() => {
    if (filteredArticles && user) {
      const initialRows = filteredArticles.map(article => ({
        ...article,
        saved: (user.user.savedGuides || []).includes(article._id)
      }));
      setRows(initialRows);
    }
  }, [filteredArticles, user]);

  const handleToggleSave = (guideId) => {
    dispatch(toggleSaveGuideAPI(guideId));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between', 
          alignItems: { md: 'center' },
          mb: 2 
        }}
      >
        <PageHeader
          title="Know Hub"
          subtitle="Find answers, complete knowledge of tool by view documents and video guide"
        />
        <Box sx={{ width: { xs: '100%', md: '350px' }, mt: { xs: 2, md: 0 } }}>
          <SearchBar 
            onSearch={setSearchQuery}
            placeholder="Search articles by title..."
          />
        </Box>
      </Box>

      <GuideTable />

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
      {status === 'succeeded' && rows.map((row) => (
        <GuideTableRow
          key={row._id}
          row={row}
          onToggleSave={() => handleToggleSave(row._id)}
        />
      ))}
    </Container>
  );
};

export default KnowHubPage;
