import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { BiShoppingBag, BiLogOut, BiLogIn } from "react-icons/bi";

import { Context } from "../context/ContextProvider";
import { actType } from "../context/reducer";
import logo from "../img/logo.png";
import profile from "../img/profile.png";

function Header({ setShowCart }) {
  const [open, setOpen] = useState(false);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cart }, dispatch] = useContext(Context);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(auth, provider);
      dispatch({
        type: actType.SETTING_USER,
        payload: providerData[0],
      });
    }
  };

  return (
    <header className="fixed z-40 w-screen px-10 md:px-20 py-2 bg-grey-300 text-base bg-white">
      <div className="flex justify-between items-center ">
        <div className="flex justify-center items-center gap-2 py-2">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-12" />
          </Link>
        </div>

        <div className="flex w-full justify-center items-center">
          <div className="ml-6">
            <ul className="hidden md:flex gap-6 ">
              <li className="px-2 cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:hover:bg-yellow-200 relative inline-block before:transition-all before:duration-300 before:ease-in-out">
                <Link to="/" className="relative text-black">
                  Home
                </Link>
              </li>
              <li className="px-2 cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:hover:bg-yellow-200 relative inline-block before:transition-all before:duration-300 before:ease-in-out">
                <Link to="/menu" className="relative text-black">
                  Menu
                </Link>
              </li>
              <li className="px-2 cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:hover:bg-yellow-200 relative inline-block before:transition-all before:duration-300 before:ease-in-out">
                <Link to="/services" className="relative text-black">
                  Services
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex gap-2 ml-auto">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowCart((prev) => !prev)}
            >
              <BiShoppingBag size="30px" />
              <span className="w-5 h-5 bg-yellow-300 rounded-full absolute -top-1 -right-2 flex justify-center items-center text-black font-bold text-[10px]">
                {cart.length}
              </span>
            </div>

            <div className="relative flex justify-center items-center gap-4 ml-6">
              <img
                src={user ? user.photoURL : profile}
                alt=""
                className="w-8 h-8 bg-red-300 outline outline-yellow-100 rounded-full"
                onClick={() => setOpen(!open)}
              />

              {open && (
                <div
                  className="pt-3 absolute top-12 right-1 rounded-md outline w-36 text-end font-bold text-gray-500 bg-slate-300
              flex flex-col justify-center items-end gap-3 "
                >
                  {user && (
                    <div className="w-full pr-4 cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:hover:bg-yellow-200 relative inline-block before:transition-all before:duration-300 before:ease-in-out">
                      <Link to="/addItem" className="relative">
                        + add item
                      </Link>
                      {/* <div className='relative'>+ add item</div> */}
                    </div>
                  )}
                  <ul className="md:hidden flex flex-col justify-center items-end gap-3 w-full">
                    <li className="w-full pr-4 cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:hover:bg-yellow-200 relative inline-block before:transition-all before:duration-300 before:ease-in-out">
                      <Link to="/" className="relative">
                        Home
                      </Link>
                    </li>
                    <li className="w-full pr-4 cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:hover:bg-yellow-200 relative inline-block before:transition-all before:duration-300 before:ease-in-out">
                      <Link to="/menu" className="relative">
                        Menu
                      </Link>
                    </li>
                    <li className="w-full pr-4 cursor-pointer before:block before:absolute before:-inset-1 before:-skew-y-3 before:hover:bg-yellow-200 relative inline-block before:transition-all before:duration-300 before:ease-in-out">
                      <Link to="/services" className="relative">
                        Services
                      </Link>
                    </li>
                  </ul>
                  <p
                    className="bg-gray-500 w-full text-slate-200 py-2 px-4 rounded-b-md hover:bg-yellow-300 hover:text-slate-700 
                "
                    onClick={login}
                  >
                    {user ? (
                      <span className="flex items-center justify-end gap-2">
                        <BiLogOut size={20} />
                        Logout
                      </span>
                    ) : (
                      <span className="flex items-center justify-end gap-2">
                        <BiLogIn size={20} />
                        LogIn
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
