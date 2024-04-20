import React from 'react';
import { Link } from 'gatsby';

const PrevNextButtons = ({ previous, next }) => {
  return (
    <section className="not-prose flex w-full justify-between">
      <div>
        {previous && (
          <Link to={`/${previous.slug}/`} className="group block">
            <p className="text-gray-500">Previous Chapter</p>
            <span className="text-lg font-semibold group-hover:underline">
              ← {previous.title}
            </span>
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link to={`/${next.slug}/`} className="group block text-right">
            <p className="text-gray-500">Next Chapter</p>
            <span className="text-lg font-semibold group-hover:underline">
              {next.title} →
            </span>
          </Link>
        )}
      </div>
    </section>
  );
};

export default PrevNextButtons;
