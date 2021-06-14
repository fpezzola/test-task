import React from 'react';
import AppState from './context/background/AppState';
import { TransactionServiceProvider } from './hooks/useTransactionsService';
import AppRouter from './AppRouter';

const App = () => {
  return (
    <TransactionServiceProvider>
      <AppState>
        <AppRouter />
      </AppState>
    </TransactionServiceProvider>
  );
};

export default App;
