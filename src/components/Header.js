import React from 'react';
import { Link } from 'gatsby';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-noc-400 px-6">
      <div className="h-[5em] max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <Link to="https://nostarch.com/nature-code">
            <h1 className="font-semibold tracking-[0.3em] text-white">
              THE <span className="font-black">NATURE</span> OF CODE
            </h1>
          </Link>
          <h2 className="mt-0.5 text-white text-sm tracking-[0.2em]">
            DANIEL SHIFFMAN
          </h2>
        </div>

        <button className="hidden sm:block bg-white hover:bg-gray-100 text-noc-600 rounded font-semibold px-3 py-1 shadow">
          Buy this book
        </button>
      </div>
    </header>
  );
};

export default Header;
