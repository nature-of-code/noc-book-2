import React from 'react';

import Head from './Head';

const Layout = ({ children, title, description }) => {
  return (
    <div>
      <Head title={title} description={description} />
      <div className="px-4">{children}</div>
    </div>
  );
};

export default Layout;
