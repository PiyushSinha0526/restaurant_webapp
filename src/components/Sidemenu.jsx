import React from "react";
import { categories } from "../utils/categories";

function Sidemenu({ gotoSection }) {
  return (
    <div className="pt-16 px-10 md:px-20 flex flex-col justify-center gap-4 border-r-2 sm:pt-0 sm:fixed sm:h-screen sm:flex-col">
      <p className="font-bold text-4xl"> Menu</p>
      <ul className="text-xl flex flex-wrap gap-3 mb-6 justify-around sm:mb-0 sm:flex-col">
        {categories.map((category, idx) => (
          <li
            key={category.id}
            className="p-1 text-center capitalize text-slate-600 cursor-pointer flex  justify-left items-center gap-2 relative rounded-md hover:border-b-4 hover:shadow-xl hover:shadow-slate-400 border-yellow-300 hover:scale-105 z-10"
            onClick={() => gotoSection(idx)}
          >
            {category.name}
            <img
              src={require(`../img/illustrations/${category.imgName}.png`)}
              alt="Img"
              className="w-10 h-10 fit"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidemenu;
