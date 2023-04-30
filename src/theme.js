import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#5393ff',
      main: '#2979ff',
      dark: '#1c54b2',
    },
    secondary: {
      light: '#6573c3',
      main: '#3f51b5',
      dark: '#2c387e',
    },
  },
  typography: {
    button: {
      boxShadow: 'none',
      textTransform: 'none',
      fontWeight: 400,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});
