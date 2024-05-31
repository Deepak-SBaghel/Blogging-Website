import React from "react";

// contaoiner is just a box inside which we have components
// used to define height , weidth etc ...
function Container({children}) {
  return <div className="w-full max-w-7xl ma-auto px-4">{children}</div>;
}

export default Container;

