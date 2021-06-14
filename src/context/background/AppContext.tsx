import { createContext } from 'react';
import { Transaction } from '../../services/TransactionsService';
import { IAppState } from './AppState';
import constants from '../../utils/constants';

export const initAppState: IAppState = {
  transactions: [],
  accountData: {
    name: constants.accountName,
    publicAddress: constants.publicAddress,
    accountBalance: constants.accountBalance,
  }
};


type ContextType = {
  state: IAppState,
  addTransaction: (transaction: Transaction) => void
  setTransactions: (transactions: Array<Transaction>) => void
  substractBalance: (amount: number) => void
  setState: (state: IAppState) => void
}

const AppContext: React.Context<ContextType> = createContext<ContextType>({
  state: initAppState,
  addTransaction: () => { },
  setTransactions: () => { },
  substractBalance: () => { },
  setState: () => { }
});

export default AppContext;
