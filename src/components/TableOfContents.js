import React from 'react';

import useActiveId from '../hooks/useActiveId';

const TableOfContents = ({ toc, highlight = true }) => {
  const activeId = useActiveId(
    toc
      .filter(({ level }) => level === 'h1' || level === 'h2')
      .map(({ id }) => id),
  );

  return (
    <ul className="space-y-1 pb-2">
      {toc
        .filter(({ level }) => level === 'h2')
        .map(({ id, title }) => {
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`ml-11 block py-0.5 pr-2 text-sm text-gray-500 hover:underline ${
                  highlight && activeId === id && 'font-bold'
                }`}
              >
                {title}
              </a>
            </li>
          );
        })}
    </ul>
  );
};

export default TableOfContents;
