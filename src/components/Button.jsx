import React, { Children } from "react";

function Button({
  // this is the text which should be shown
  children,
  type = "button",
  bgColour = "bg-blue-600",
  textColour = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${bgColour} ${textColour}`}
      {...props }
    >
      {children}
    </button>
  );
}

export default Button;
