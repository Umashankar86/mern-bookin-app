import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppcontextProvider } from './context/AppContext';
import { SearchContextProvider } from './context/SearchContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppcontextProvider>
        <SearchContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </SearchContextProvider>
      </AppcontextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
