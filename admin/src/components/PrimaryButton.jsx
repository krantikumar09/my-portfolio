import React from "react";

const PrimaryButton = ({ content }) => {
  return (
    <button className="btn cursor-pointer bg-black text-white py-2 px-4 border-none outline-none hover:bg-greenHover">{content}</button>
  );
};

export default PrimaryButton;
