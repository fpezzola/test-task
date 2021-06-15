import React from 'react';
import useMountedDispatch from './useMountedDispatch';
enum EAsyncStatus {
  Idle,
  Pending,
  Done,
  Errored
}
interface IAsyncState {
  status: EAsyncStatus;
  data: any;
  error: string | null;
}
const defaultInitialState: IAsyncState = { status: EAsyncStatus.Idle, data: null, error: null }
const useAsync = (initialState: IAsyncState | {}) => {
  const [{ status, data, error }, setState] = React.useReducer(
    (s: IAsyncState, a: any) => ({ ...s, ...a }),
    {
      ...defaultInitialState,
      ...initialState,
    },
  )

  const safeSetState = useMountedDispatch(setState)

  const run = React.useCallback(
    promise => {
      safeSetState({ status: EAsyncStatus.Pending })
      return promise.then(
        (data: any) => {
          safeSetState({ data, status: EAsyncStatus.Done })
          return { data, ok: true }
        },
        (error: string) => {
          safeSetState({ status: EAsyncStatus.Errored, error })
          return { error, ok: false }
        },
      )
    },
    [safeSetState],
  );

  const setData = React.useCallback(data => safeSetState({ data }), [
    safeSetState,
  ]);
  const setError = React.useCallback(error => safeSetState({ error }), [
    safeSetState,
  ]);

  return {
    isIdle: status === EAsyncStatus.Idle,
    isLoading: status === EAsyncStatus.Pending,
    isErrored: status === EAsyncStatus.Errored,
    isDone: status === EAsyncStatus.Done,

    setData,
    setError,
    error,
    status,
    data,
    run,
  }
}
export default useAsync;
