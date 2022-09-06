export const getUser = () => {
    const userDetails =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();
  
    return userDetails;
  };
  
  export const getCart = () => {
    const cartDetails =
      localStorage.getItem("cart") !== "undefined"
        ? JSON.parse(localStorage.getItem("cart"))
        : localStorage.clear();
  
    return cartDetails ? cartDetails : [];
  };
  