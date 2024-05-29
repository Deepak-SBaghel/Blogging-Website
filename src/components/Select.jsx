// select btn for dropdown btn for active and not active 
import React, { userId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = userId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >.
      {/* if array is empty , it will crash */}
        {options?.map((option)=>(
            <option key={option} value={option}>
                {option}
            </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);