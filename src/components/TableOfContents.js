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
      <p className="flex items-center text-gray-600 gap-2 font-semibold">
        <FiAlignLeft />
        Table of Contents
      </p>
      <ul className="space-y-1 my-4 border-l">
        {toc
          .filter(({ level }) => level === 'h2')
          .map(({ id, title }) => {
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`py-1 block text-sm text-gray-500 hover:underline ml-[-1px] pl-3 border-l ${
                    activeId === id &&
                    'border-noc-400 text-gray-800 bg-gray-100 rounded-r'
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
