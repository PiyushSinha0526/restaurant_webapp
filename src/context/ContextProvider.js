import React, { useReducer, createContext } from "react";
import {getUser, getCart} from "../utils/localStorage"
const cartf = getCart()
const userf = getUser()
const initialState = {
  user: userf,
  foodItems: null,
  cart: cartf,
};

export const Context = createContext();
export const ContextProvider = ({ reducer, children }) => (
  <Context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </Context.Provider>
);
