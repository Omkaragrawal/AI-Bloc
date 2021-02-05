import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline bgColor="text.secondary"/>
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
