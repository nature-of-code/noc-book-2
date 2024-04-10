import React from 'react';
import { FiAlignLeft } from 'react-icons/fi';

import useActiveId from '../hooks/useActiveId';

const TableOfContents = ({ toc }) => {
  const activeId = useActiveId(
    toc
      .filter(({ level }) => level === 'h1' || level === 'h2')
      .map(({ id }) => id),
  );

  return (
    <div className="py-6">
      <p className="flex items-center gap-2 font-semibold text-gray-600">
        <FiAlignLeft />
        Table of Contents
      </p>
      <ul className="my-4 space-y-1 border-l">
        {toc
          .filter(({ level }) => level === 'h2')
          .map(({ id, title }) => {
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`ml-[-1px] block border-l py-1 pl-3 text-sm text-gray-500 hover:underline ${
                    activeId === id &&
                    'rounded-r border-noc-400 bg-gray-100 text-gray-800'
                  }`}
                >
                  {title}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TableOfContents;
