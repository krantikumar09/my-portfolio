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

// sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0

export default SectionTitle;
