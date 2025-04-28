import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00897b', // Teal - representing recycling/sustainability
      dark: '#005f56',
      light: '#4ebaaa',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ffb300', // Amber - representing electronics/energy
      dark: '#c68400',
      light: '#ffc246',
      contrastText: '#000000'
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
      light: '#e0f2f1',
      lighter: '#f5f5f5'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 8
  }
});

export default theme;