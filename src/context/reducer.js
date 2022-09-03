export const actType = {
  SETTING_USER: "SETTING_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CHANGE_CART_QTY: "CHANGE_CART_QTY",
  EMPTY_CART: "EMPTY_CART",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actType.SETTING_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.payload,
      };
    case actType.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    case actType.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case actType.CHANGE_CART_QTY:
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    case actType.EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default reducer;
