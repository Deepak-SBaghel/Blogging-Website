import React from "react";
import logo from "../assets/icon.png"
console.log(logo?"sabe":"nothing");
function Logo({ width = "100px" }) {
  return (
    <div>
      <img src={logo} alt="Logo" width={width}/>
    </div>
  );
}

export default Logo;
