
import React from "react";
import useTransactionsService from "./useTransactionsService";
import useAsync from "./useAsync";
import { useAppState } from "../context/background/AppState";

export const useTransactionsList = () => {
  const ts = useTransactionsService();
  const { run, ...rest } = useAsync({ data: [] });
  const fetch = React.useCallback(() => {
    run(ts?.getListOfTransactions());
  }, [run, ts])
  React.useEffect(() => {
    fetch()
  }, [fetch]);

  return {
    ...rest,
    refetch: fetch
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
    isErrored,
    isLoading,
    refetch
  }
}

export const useSendTransacation = () => {
  const ts = useTransactionsService();
  const appState = useAppState();
  const { run, isLoading, isErrored, error, isDone } = useAsync({ data: [] });
  const sendTransaction = async ({ to, value }: { to: string, value: number }) => {
    const transaction = {
      to,
      value,
      when: new Date(),
      from: appState.state.accountData.publicAddress,
    }
    const { data } = await run(ts?.addTransaction(transaction));

    if (data) {
      appState.addTransaction(data)
      appState.substractBalance(value);
    }
  }

  return {
    sendTransaction,
    isLoading,
    isErrored,
    error,
    isDone
  };
}

