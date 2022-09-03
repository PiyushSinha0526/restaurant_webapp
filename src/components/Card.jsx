import React, { useContext } from "react";
import { BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";
import { Context } from "../context/ContextProvider";
import { actType } from "../context/reducer";

function Card({ food }) {
  const [{ cart }, dispatch] = useContext(Context);
  const addToCart = (food) => {
    dispatch({
      type: actType.ADD_TO_CART,
      payload: food,
    });
  };
  const removeFromCart = (food) => {
    dispatch({
      type: actType.REMOVE_FROM_CART,
      payload: food,
    });
  };
  
  return (
    <>
      <li
        key={food.id}
        className="p-2 w-[300px] max-w-xs rounded-md flex bg-white flex-col justify-between items-center hover:shadow-xl hover:shadow-slate-400 "
      >
        <img
          src={food.imgCapture}
          alt="90"
          className="w-60 h-56 hover:scale-110 transition-all duration-300 ease-in-out"
        />
        <div className="w-full flex flex-col gap-1 px-4  z-20 relative">
          <div className="w-full flex gap-2 text-slate-500 ">
            <div className="flex flex-col">
              <span className="">Price: {food.price}</span>
              <span>Qty: {food.qty}</span>
            </div>
          </div>
          <p className="text-xl pb-2">{food.title}</p>
          <div className="absolute bottom-2 right-0  flex justify-center items-center hover:scale-105 cursor-pointer">
            {cart.some((c) => c.id === food.id) ? (
              <span className="bg-red-500 rounded-full p-2">
                <BsFillCartXFill
                  size={"20px"}
                  color={"white"}
                  onClick={() => removeFromCart(food)}
                />
              </span>
            ) : (
              <span className="bg-green-500 rounded-full p-2">
                <BsFillCartPlusFill
                  size={"20px"}
                  color={"white"}
                  onClick={() => addToCart(food)}
                />
              </span>
            )}
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;
