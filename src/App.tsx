import { ErrorBoundary } from '@/components/ui';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import Layout from '@/layouts/Layout';
import Routers from '@/routes/Router';
import { darkTheme, lightTheme } from '@/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';

const AppContent = (): ReactNode => {
  const { isDark } = useTheme();

  return (
    <MuiThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <Layout>
          <Routers />
        </Layout>
      </ErrorBoundary>
    </MuiThemeProvider>
  );
};

const App = (): ReactNode => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
