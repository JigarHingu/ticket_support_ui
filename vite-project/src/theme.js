// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: { main: '#a259ff' },
//     secondary: { main: '#00FFAB' },
//     background: {
//       default: '#0F172A',
//       paper: '#1E293B',
//     },
//   },
//   shape: {
//     borderRadius: 12,
//   },
// });

// export default theme;

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#a259ff' },
    secondary: { main: '#00FFAB' },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#E2E8F0',
      secondary: '#94A3B8',
    },
  },
  shape: {
    borderRadius: 10, 
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // This ensures our new border-radius is applied consistently
          borderRadius: 18, 
          backgroundColor: '#0F172A',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#334155',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#a259ff',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#a259ff',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        // highlight-start
        // Change 2: Style the displayed value inside the Select input
        select: {
          // This targets the "--Select--" text when it's displayed.
          // By default, MUI makes it semi-transparent. We are forcing it
          // to use the primary text color so it's bright and visible.
          '&.MuiInputBase-input': {
            color: '#E2E8F0', // Use the primary text color
          }
        },
        // highlight-end
        icon: {
          color: '#94A3B8',
        },
      },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none',
                padding: '10px 0',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: 18,
            }
        }
    }
  },
});

export default theme;