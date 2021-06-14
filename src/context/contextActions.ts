import { Transaction } from "../services/TransactionsService";
import { IAppState } from "./background/AppState";

enum Actions {
  SET_TRANSACTIONS = 'SET_TRANSACTIONS',
  SET_STATE = 'SET_STATE',
  SUB_USER_BALANCE = 'SUB_USER_BALANCE',
}

export interface SetTransactionAction {
  type: Actions.SET_TRANSACTIONS
  payload: Transaction[]
}

export interface SetStateAction {
  type: Actions.SET_STATE
  payload: Partial<IAppState>
}

export interface SubUserBalanceAction {
  type: Actions.SUB_USER_BALANCE
  payload: number
}

export default Actions;
