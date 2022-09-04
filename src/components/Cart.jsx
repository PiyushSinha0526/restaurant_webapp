import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Context } from "../context/ContextProvider";
import { actType } from "../context/reducer";
import emptyCart from "../img/empty_cart.png";

import { ImCross } from "react-icons/im";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

function Cart({ setShowCart, showCart }) {
  const [{ cart }, dispatch] = useContext(Context);
  const [total, setTotal] = useState(0);

  const qtyChangeHandler = (id, value) => {
    dispatch({
      type: actType.CHANGE_CART_QTY,
      payload: {
        id: id,
        qty: value,
      },
    });
  };
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="fixed w-full sm:w-[400px] p-2 pb-4 bg-slate-100 h-screen top-0 right-0 z-50 rounded-l-md border-l-2">
      <div className="p-2 py-0 flex justify-between items-center">
        <ImCross size={"18px"} onClick={() => setShowCart((prev) => !prev)} />
        <span
          className="cursor-pointer font-bold text-slate-200 bg-red-400 py-2 px-4 rounded-xl shadow-lg active:scale-90 transition-all ease-in-out duration-500 text-center"
          onClick={() =>
            dispatch({
              type: actType.EMPTY_CART,
            })
          }
        >
          Clear all
        </span>
      </div>
      {cart.length >= 1 ? (
        <>
          <div className="p-2 h-[90%] flex flex-col gap-2 justify-between ">
            <div className=" pb-4 flex flex-col gap-2 overflow-auto no-scrollbar">
              {cart?.map((c) => {
                return (
                  <div
                    className="p-1 px-2 h-16 flex gap-2 items-center bg-white border-2 rounded-md shadow-md shadow-slate-400"
                    key={c.id}
                  >
                    <img
                      src={c.imgCapture}
                      alt=""
                      className="w-16 object-contain"
                    />
                    <div className="h-full flex flex-col">
                      {c.title}{" "}
                      <span className="text-slate-400">
                        Total:{" "}
                        <span className="text-green-400">
                          {c.price * c.qty} &#8377;
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-center items-center gap-1 ml-auto">
                      <span>Qty : </span>
                      <div className="flex justify-center items-center">
                        <span
                          className=" cursor-pointer active:scale-95 rounded-md p-1"
                          onClick={() => qtyChangeHandler(c.id, c.qty - 1)}
                        >
                          <AiOutlineMinusCircle
                            size={"20px"}
                            className="hover:bg-red-300 rounded-full"
                          />
                        </span>
                        <span>{c.qty}</span>
                        <span
                          className=" cursor-pointer active:scale-95 rounded-full px-2"
                          onClick={() => qtyChangeHandler(c.id, c.qty + 1)}
                        >
                          <AiOutlinePlusCircle
                            size={"20px"}
                            className="hover:bg-green-300 rounded-full"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full bg-white py-4 px-2 mt-auto flex flex-col justify-center items-end text-xl font-bold text-slate-600 rounded-md">
              <span>
                Total : <span className="text-green-400">{total} &#8377;</span>{" "}
              </span>
              <span>Total Items : {cart.length} </span>
            </div>
          </div>
          <div className="w-full font-bold text-slate-600 bg-yellow-200 py-2 px-4 rounded-xl shadow-lg hover:bg-slate-500 hover:text-yellow-200 active:scale-90 transition-all ease-in-out duration-500 text-center">
            Proceed to Checkout
          </div>
        </>
      ) : (
        <div className="w-full h-full p-3 flex flex-col justify-center items-center ">
          <img src={emptyCart} alt="empty cart" />
          <p className="text-2xl text-red-400 font-bold ">Cart is Empty!</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
