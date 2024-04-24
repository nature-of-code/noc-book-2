import React from 'react';

import Head from '../components/Head';
import Header from '../components/Header';
import OverlayNav from '../components/OverlayNav';

export default function BaseLayout(props) {
  const { title, description, children } = props;

  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const { body } = document;
    const html = document.documentElement;

    if (menuOpen) {
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';

      return () => {
        body.style.overflow = 'initial';
        html.style.overflow = 'initial';
      };
    }
  }, [menuOpen]);

  return (
    <>
      <Head title={title} description={description} />

      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(!menuOpen)} />

      {menuOpen && <OverlayNav />}

      <div className="mt-[6em] px-6 lg:px-8">{children}</div>
    </>
  );
}
