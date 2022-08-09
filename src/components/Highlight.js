import React from 'react';

const Highlight = ({ children }) => {
  return (
    <span className="block p-6 bg-zinc-100 text-center text-lg font-semibold">
      {children}
    </span>
  );
};

export default Highlight;
