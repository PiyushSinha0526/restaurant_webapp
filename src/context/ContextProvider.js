import React, { useReducer, createContext } from "react";

const initialState = {
  user: null,
  foodItems: null,
  cart: [],
};

export const Context = createContext();
export const ContextProvider = ({ reducer, children }) => (
  <Context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </Context.Provider>
);
