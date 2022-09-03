import React from "react";
import delivery from "../img/delivery.png";
import bulkFood from "../img/bulk_food.png";
function Services() {
  return (
    <div className="py-20 px-20 w-screen h-full md:h-screen flex flex-col justify-center gap-6">
      <h2 className="text-yellow-300 font-bold text-4xl pb-1">Our Services</h2>
      <div className="flex-col flex md:flex-row justify-center items-center gap-6">
        <img src={delivery} alt="" className="h-60" />
        <div>
          <h4 className="text-2xl text-yellow-400">Fast Delivery</h4>
          <p className="pb-20 border-b-2 border-yellow-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit pariatur velit, deserunt totam porro vel, iure officia
            necessitatibus quae aliquid commodi asperiores distinctio labore
            sunt nemo minima rem debitis magni dolor iste? Vero, voluptatibus ab
            libero laboriosam quisquam aut aliquid. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Autem voluptates facilis itaque ipsa
            nemo rerum omnis neque corporis commodi eum.
          </p>
        </div>
      </div>
      <div className="flex-col-reverse flex md:flex-row justify-center items-center gap-6">
        <div>
          <h4 className="text-2xl text-yellow-400">Bulk Order</h4>
          <p className="pb-20 border-b-2 border-yellow-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit pariatur velit, deserunt totam porro vel, iure officia
            necessitatibus quae aliquid commodi asperiores distinctio labore
            sunt nemo minima rem debitis magni dolor iste? Vero, voluptatibus ab
            libero laboriosam quisquam aut aliquid. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Autem voluptates facilis itaque ipsa
            nemo rerum omnis neque corporis commodi eum.
          </p>
        </div>
        <img src={bulkFood} alt="" className="h-60" />
      </div>
    </div>
  );
}

export default Services;
