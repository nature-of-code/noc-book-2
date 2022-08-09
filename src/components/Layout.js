import React from 'react';
import { Link } from 'gatsby';

import Head from './Head';

const Layout = ({ children, title, description }) => {
  return (
    <div>
      <Head title={title} description={description} />
      <div className="w-full bg-noc-400 text-center py-8">
        <Link to="/">
          <h1 className="text-3xl text-white tracking-[0.3em]">
            THE <span className="font-bold">NATURE</span> OF CODE
          </h1>
        </Link>
        <h2 className="mt-2 text-xl text-white tracking-[0.2em]">
          DANIEL SHIFFMAN
        </h2>
      </div>
      <div className="px-4">{children}</div>
    </div>
  );
};

export default Layout;
