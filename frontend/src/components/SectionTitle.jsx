import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="block sm:hidden">
      <h2 className="relative text-green font-bold text-xl uppercase mb-8">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
