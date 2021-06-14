import Actions, { SetStateAction, SetTransactionAction, SubUserBalanceAction } from '../contextActions';
import { IAppState } from './AppState';

type AppAction = SetTransactionAction | SetStateAction | SubUserBalanceAction;

const appReducer = (
  state: IAppState,
  action: AppAction
): IAppState => {
  switch (action.type) {
    case Actions.SET_STATE:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case Actions.SUB_USER_BALANCE:
      return {
        ...state,
        accountData: {
          ...state.accountData,
          accountBalance: (Number(state.accountData.accountBalance) - Number(action.payload)),
        }
      };
    default:
      return state;
  }
};

export default appReducer;
