import React from 'react';

import Head from '../components/Head';
import Header from '../components/Header';

export default function BaseLayout(props) {
  const { title, children } = props;

  return (
    <>
      <Head title={title} />

      <Header />

      <div className="mt-[6em] px-6 lg:px-8">{children}</div>
    </>
  );
}
