import React from 'react';

import BaseLayout from './BaseLayout';
import SideNav from '../components/SideNav';

export default function SideNavLayout(props) {
  const { title, children, toc } = props;

  return (
    <BaseLayout title={title}>
      <div className="mx-auto max-w-6xl lg:flex lg:gap-8">
        <aside className="sticky top-[6em] z-10 hidden max-h-[calc(100vh-6em)] max-w-[16em] overflow-y-auto  pb-8 lg:block lg:flex-grow">
          <SideNav activeChapter={title.split('. ')[0]} toc={toc} />
        </aside>

        <main className="prose mx-auto max-w-[48em] pb-8">{children}</main>
      </div>
    </BaseLayout>
  );
}
