import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Blog Generator</h1>
        <p className="text-gray-500">
          Analyze sales trends to make data-driven decisions
        </p>
      </div>
    </div>
  );
};

export default Header;
