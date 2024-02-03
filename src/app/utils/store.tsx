import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface State {
  // Define your state interface here
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  // Initialize your state here
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
    case 'ACTION_TYPE':
      return {
        ...state,
        // update state here
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
