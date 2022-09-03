import React from "react";
import { categories } from "../utils/categories";
import { Link } from "react-router-dom";

function BrowseCategories({ gotoSection }) {
  return (
    <div className="mx-20 pt-16 bg-transparent">
      <p className=" font-bold text-4xl mb-8 border-b-4 pb-4 w-fit text-yellow-400">
        Browse Categories
      </p>
      <div className="my-10 flex gap-8 flex-wrap justify-center">
        {categories.map((category, idx) => (
          <Link
            to="/menu"
            key={category.id}
            className="w-48 bg-white py-1 text-center capitalize text-slate-600 cursor-pointer rounded-md flex flex-col justify-center items-center relative hover:shadow-xl hover:shadow-slate-400 z-10 border-b-2 border-yellow-200 "
            onClick={() =>
              setTimeout(() => {
                gotoSection(idx);
              }, 0)
            }
          >
            <img
              src={require(`../img/illustrations/${category.imgName}.png`)}
              alt="Img"
              className="w-36 h-24"
            />
            <div className="bg-white w-full rounded-lg py-1">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BrowseCategories;
