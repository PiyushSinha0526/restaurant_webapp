import React from "react";
import { categories } from "../utils/categories";
import Card from "./Card";

function MainMenu({ foods, isLoading, scrollToRef }) {
  return (
    <div className="w-full sm:pt-[65px] sm:ml-[300px] mb-4">
      {!isLoading && (
        <ul className="px-6 w-full flex flex-col">
          {categories.map((category, idx) => {
            return (
              <li
                key={category.id}
                className="flex flex-col gap-2 font-bold py-4 pb-8 border-b-2 border-slate-600"
              >
                <p className="text-3xl capitalize  mb-4" ref={el => scrollToRef.current[idx] = el} >
                  <span className="pb-2 border-b-4 border-yellow-200 flex w-fit">
                  {category.name}
                  <span className="w-32 h-1"></span>
                    </span>
                </p>
                <ul className="flex gap-6 w-full flex-wrap justify-center items-center md:justify-center">
                  {foods.map((food) => {
                    return (
                      food.category === category.name && <Card key={food.id} food={food} />
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MainMenu;
