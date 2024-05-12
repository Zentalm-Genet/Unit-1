import React from "react";

const Square = ({ value, onClick }) => {
  return (
    <div className="input" onClick={onClick}>
      {value}
    </div>
  );
};

export default Square;



