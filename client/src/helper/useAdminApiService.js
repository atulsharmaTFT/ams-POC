import { useCallback, useReducer } from 'react';
import axios from 'axios';
import get from 'lodash/get';
import makeAdminRequest from '../api/adminRequest';

const initialState = {
  loading: false,
  isSuccess: undefined,
  data: undefined,
  isError: undefined,
  error: undefined
};

const ACTIONS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed',
  RESET: 'reset'
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOADING:
      return { ...state, loading: action.payload.loading };
    case ACTIONS.SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        data: get(action, 'payload.data', null)
      };
    case ACTIONS.FAILED:
      return {
        ...state,
        isSuccess: undefined,
        data: undefined,
        loading: false,
        isError: true,
        error: action.error.data
      };
    case ACTIONS.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

function useAdminApiService(service, { throwErrorOnFailure = false } = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cancelTokenSource = axios.CancelToken.source();

  const onSuccess = useCallback(
    (response) => {
      dispatch({ type: ACTIONS.SUCCESS, payload: response });
    },
    [dispatch]
  );

  const onError = useCallback(
    (error) => {
      dispatch({ type: ACTIONS.FAILED, error });
    },
    [dispatch]
  );

  const resetServiceState = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, [dispatch]);

  const callService = useCallback(
    (inputs, extraInputs) => {
      const reqParams = service(inputs, extraInputs);
      dispatch({ type: ACTIONS.LOADING, payload: { loading: true } });
      return makeAdminRequest(
        { ...reqParams, cancelToken: cancelTokenSource.token },
        {
          onSuccess,
          onError,
          throwErrorOnFailure
        }
      );
    },
    [service, onSuccess, onError, throwErrorOnFailure]
  );

  const cancelService = () => {
    cancelTokenSource?.cancel && cancelTokenSource.cancel();
  };

  return {
    state,
    callService,
    resetServiceState,
    cancelService
  };
}

export default useAdminApiService;
