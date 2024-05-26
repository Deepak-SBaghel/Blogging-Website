import React, { useId } from "react";
//  useref is used to create ref;
// ref is == state , which is not re-rendered on change

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      ></input>
    </div>
  );
});

export default Input;

//forward ref : used to pass prop as well as ref ;
// it is used when a specfic comp is selected from the whole , element
// thus we pass the whole component
