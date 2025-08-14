// import { useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
// } from "@mui/material";
// import FaqSection from "../components/shared/FaqSection";
// import ContactUsCard from "../components/shared/ContactUsCard";
// import SearchBar from "../components/shared/SearchBar";

// const HelpCentrePage = () => {
//   // Add state to hold the current search query
//   const [searchQuery, setSearchQuery] = useState("");

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box
//         sx={{
//           backgroundColor: "background.paper",
//           p: { xs: 2, sm: 4 },
//           borderRadius: 3,
//         }}
//       >
//         {/* Help Centre Header */}
//         <Box mb={4}>
//             <Typography variant="h5" fontWeight={600} gutterBottom>
//                 Help Centre
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//                 Find answers to common questions or contact our support team for assistance.
//             </Typography>
//         </Box>

//         {/*Add the SearchBar component to the page */}
//         <Box mb={3}>
//           <SearchBar 
//             onSearch={setSearchQuery} 
//             placeholder="Search questions..." 
//           />
//         </Box>

//         {/* The FaqSection now fetches its own data and no longer needs the 'data' prop */}
//         {/* Pass the search query down to the FaqSection */}
//         <FaqSection searchQuery={searchQuery}/>

//         <ContactUsCard />
//       </Box>
//     </Container>
//   );
// };

// export default HelpCentrePage;

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import FaqSection from "../components/shared/FaqSection";
import ContactUsCard from "../components/shared/ContactUsCard";
import SearchBar from "../components/shared/SearchBar";

const HelpCentrePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          backgroundColor: "background.paper",
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
        }}
      >
        {/* This new Box handles the responsive layout for the header and search bar */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, // Stacks on mobile, row on desktop
            justifyContent: 'space-between', 
            alignItems: { md: 'center' }, // Align items center on desktop
            mb: 3, 
          }}
        >
          {/* Help Centre Header */}
          <Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                  Help Centre
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  Find answers to common questions or contact our support team for assistance.
              </Typography>
          </Box>

          {/* SearchBar with a defined width on larger screens */}
          <Box sx={{ width: { xs: '100%', md: '350px' }, mt: { xs: 2, md: 0 } }}>
            <SearchBar 
              onSearch={setSearchQuery} 
              placeholder="Search questions..." 
            />
          </Box>
        </Box>

        {/* Pass the search query down to the FaqSection */}
        <FaqSection searchQuery={searchQuery} />

        <ContactUsCard />
      </Box>
    </Container>
  );
};

export default HelpCentrePage;
