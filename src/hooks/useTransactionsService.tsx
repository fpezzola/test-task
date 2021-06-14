import React from 'react';
import { TransactionsService, Transaction } from '../services/TransactionsService';
import Constants from '../utils/constants'

const TransactionsServiceContext = React.createContext<TransactionsService | null>(null);

const intitializeServiceState = () => ({
  transactions: Object.keys(Constants.pastTransactions).map((key: string) => ({
    id: Number(key),
    from: Constants.publicAddress,
    to: Constants.pastTransactions[Number(key)].recipient,
    value: Number(Constants.pastTransactions[Number(key)].amount),
    when: new Date(Constants.pastTransactions[Number(key)].date),
  } as Transaction))
});

export const TransactionServiceProvider = ({ children }: { children: any }) => {
  const [ts] = React.useState<TransactionsService>(
    new TransactionsService(intitializeServiceState())
  )

  return (
    <TransactionsServiceContext.Provider value={ts}>
      {children}
    </TransactionsServiceContext.Provider>
  )
}

const useTransactionsService = (): TransactionsService | null => React.useContext(TransactionsServiceContext);

export default useTransactionsService;
