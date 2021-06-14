import { useAppState } from "../context/background/AppState"

const useAccountData = () => {
  const { state } = useAppState();
  return state.accountData;
}

export default useAccountData;
