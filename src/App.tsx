import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './components/errorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
});

function App() {
  return (
    <>
      {/*
        MUI provides an optional CssBaseline component. It fixes some
        inconsistencies across browsers and devices while providing slightly
        more opinionated resets to common HTML elements.
        https://mui.com/material-ui/react-css-baseline/
      */}
      <CssBaseline />
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>Timely</QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
