import React from 'react';

import Head from './Head';
import Header from './Header';

const Layout = ({ children, title, description }) => {
  return (
    <div>
      <Head title={title} description={description} />

      <Header />

      <div className="px-6">{children}</div>
    </div>
  );
};

export default Layout;
