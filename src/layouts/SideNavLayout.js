import React from 'react';

import BaseLayout from './BaseLayout';
import SideNav from '../components/SideNav';

export default function SideNavLayout(props) {
  const { title, toc, description, children } = props;

  return (
    <BaseLayout title={title} description={description}>
      <div className="mx-auto max-w-6xl lg:flex lg:justify-between lg:gap-10 xl:gap-14">
        <aside className="sticky top-[6em] z-10 hidden max-h-[calc(100vh-6em)] min-w-[14em] overflow-y-auto pb-8 lg:block lg:flex-grow">
          <SideNav activeChapter={title && title.split('. ')[0]} toc={toc} />
        </aside>

        <main className="prose mx-auto min-w-0 max-w-[50em] pb-8">
          {children}
        </main>
      </div>
    </BaseLayout>
  );
}
