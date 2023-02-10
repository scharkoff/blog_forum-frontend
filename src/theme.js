import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none"
        }
      }
    }
  }


});



