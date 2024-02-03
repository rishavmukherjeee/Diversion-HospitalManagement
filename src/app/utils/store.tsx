import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import LoadingScreen from './loadingscreen'

interface State {
  loading: boolean;
  // Define your other state interfaces here
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  loading: false,
  // Initialize your other states here
};

const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };
    // Handle other actions here
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {state.loading ? <LoadingScreen /> : children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
