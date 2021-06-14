
import React from "react";
import useTransactionsService from "./useTransactionsService";
import useAsync from "./useAsync";
import { useAppState } from "../context/background/AppState";

export const useTransactionsList = () => {
  const ts = useTransactionsService();
  const { run, ...rest } = useAsync({ data: [] });
  React.useEffect(() => {
    run(ts?.getListOfTransactions())
  }, [run, ts]);

  return {
    ...rest,
    refetch: run
  }
};

export const useAppTransactions = () => {
  const { setTransactions, state } = useAppState();
  const { data, isLoading, isErrored, isDone, refetch } = useTransactionsList();

  React.useEffect(() => {
    if (isDone) {
      setTransactions(data)
    }
  }, [data, isDone, setTransactions]);

  return {
    transactions: state.transactions,
    hasErrors: isErrored,
    isLoading: isLoading,
    refetch
  }
}

export const useSendTransacation = () => {
  const ts = useTransactionsService();
  const appState = useAppState();
  const { run, isLoading } = useAsync({ data: [] });
  const sendTransaction = async ({ to, value }: { to: string, value: number }) => {
    try {
      const transaction = {
        to,
        value,
        when: new Date(),
        from: appState.state.accountData.publicAddress,
      }
      const newTransaction = await run(ts?.addTransaction(transaction));
      appState.addTransaction(newTransaction)
      appState.substractBalance(value);
    } catch (e) {
      return Promise.reject(e);
    }
    return Promise.resolve();
  }

  return {
    sendTransaction,
    isLoading
  };
}

