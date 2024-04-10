import React from 'react';
import { Link } from 'gatsby';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-noc-400 px-6">
      <div className="mx-auto flex h-[5em] max-w-7xl items-center justify-between">
        <div>
          <Link to="/">
            <h1 className="font-semibold tracking-[0.3em] text-white">
              THE <span className="font-black">NATURE</span> OF CODE
            </h1>
          </Link>
          <h2 className="mt-0.5 text-sm tracking-[0.2em] text-white">
            DANIEL SHIFFMAN
          </h2>
        </div>

        <a
          href="https://nostarch.com/nature-code"
          className="hidden rounded bg-white px-3 py-1 font-semibold text-noc-600 shadow hover:bg-gray-100 sm:block"
        >
          Buy this book
        </a>
      </div>
    </header>
  );
};

export default Header;
