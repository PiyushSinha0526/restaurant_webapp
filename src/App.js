import { useContext, useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";

import {
  Header,
  Hero,
  BrowseCategories,
  CreateItemContainer,
  Sidemenu,
  Services,
  MainMenu,
} from "./components";
import Cart from "./components/Cart";

import { Context } from "./context/ContextProvider";
import { actType } from "./context/reducer";
import { getAllFoodItems } from "./utils/firestoreSave";

function App() {
  const [{ foodItems, user }, dispatch] = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actType.SET_FOOD_ITEMS,
        payload: data,
      });
    });
    setIsLoading(false);
  };

  const scrollToRef = useRef([]);
  const gotoSection = (idx) =>
    window.scrollTo({
      top: scrollToRef.current[idx].offsetTop - 70,
      behavior: "smooth",
    });

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-slate-100 relative">
      <Header setShowCart={setShowCart} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <BrowseCategories gotoSection={gotoSection} />
            </>
          }
        />
        {user && user.email === "iplay.alone26th@gmail.com" && (
          <Route path="/addItem" element={<CreateItemContainer />} />
        )}
        <Route
          path="/menu"
          element={
            <div className="flex flex-col sm:flex-row">
              <Sidemenu gotoSection={gotoSection} />
              <MainMenu
                foods={foodItems}
                isLoading={isLoading}
                scrollToRef={scrollToRef}
              />
            </div>
          }
        />
        <Route path="/services" element={<Services />} />
      </Routes>
      {showCart && <Cart setShowCart={setShowCart} showCart={showCart} />}
    </div>
  );
}

export default App;
