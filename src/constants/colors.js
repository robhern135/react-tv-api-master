import { createMuiTheme } from '@material-ui/core/styles';


export const COLORS = {
  background: '#1a1a2e',
  primary: '#0f3460',
  secondary: '#e94560',
  white: '#ffffff'
}

const { primary, secondary, white, background } = COLORS

export const theme = createMuiTheme({
  palette: {
    contained: {
      "&:hover": {
        color: white
      }
    },
    type: "dark",
    primary: {
      light: primary[100],
      main: primary,
      dark: primary[500],
      contrastText: white,
    },
    secondary: {
      light: secondary[100],
      main: secondary,
      dark: secondary[500],
      contrastText: white,
    },
    background: {
      default: background,
      contrastText: white
    }
  },
});