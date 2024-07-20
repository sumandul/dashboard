import React, { useState } from "react";
import { StarSvg } from "@/svgicon";

const RatingStar = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <div>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={
                index <= (hover || rating)
                  ? " text-zapp-primary"
                  : " text-zapp-black"
              }
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star text-[2rem] scale-90">&#9733;</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RatingStar;
