import React, { useReducer } from 'react';
import AppContext, { initAppState } from './AppContext';
import AppReducer from './AppReducer';
import Actions from '../contextActions';
import { Transaction } from '../../services/TransactionsService';
import useMountedDispatch from '../../hooks/useMountedDispatch';

interface AccountData {
  name: string;
  publicAddress: string;
  accountBalance: number;
}

export interface IAppState {
  transactions: Array<Transaction>;
  accountData: AccountData;
}

const AppState = (props: any) => {
  const [state, unSafeDispatch] = useReducer(AppReducer, initAppState);
  const dispatch = useMountedDispatch(unSafeDispatch)

  const setState = React.useCallback((newState: IAppState) => {
    dispatch({
      type: Actions.SET_STATE,
      payload: newState,
    });
  }, [dispatch]);

  const setTransactions = React.useCallback((transactions: Array<Transaction>) => {
    dispatch({
      type: Actions.SET_TRANSACTIONS,
      payload: transactions,
    })
  }, [dispatch])

  const addTransaction = React.useCallback((transaction: Transaction) => {
    setTransactions([...state.transactions, transaction])
  }, [setTransactions, state]);

  const substractBalance = React.useCallback((amountToSubstract: number) => {
    dispatch({
      type: Actions.SUB_USER_BALANCE,
      payload: amountToSubstract,
    })

  }, [dispatch])


  return (
    /**
     * If we happen to have performance issues, I would split this context into two providers (So consumers can consume atomic pieces of my general state). 
     * <AppContext.Provider value={memoizedState}>
     *  <AppDispatchContext.Provider value={dispatch}>
     *    {children}
     *  <AppDispatchContext.Provider>
     * </AppContext.Provider> 
     * 
     * Also I would provide the dispatch function to every consumer who must call a helper function to dispatch an action (To avoid the memoization of each function). 
     * For example:
     * const setTransactions = (dispatch,transactions) => dispatch({action:...,transactions})
     */
    <AppContext.Provider
      value={{
        state,
        setState,
        addTransaction,
        setTransactions,
        substractBalance
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppState = () => React.useContext(AppContext)
export default AppState;
