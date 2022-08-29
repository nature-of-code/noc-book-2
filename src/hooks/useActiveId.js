import { useEffect, useState } from 'react';

/**
 * Modified from
 * https://nickymeuleman.netlify.app/blog/table-of-contents
 */

const useActiveId = (itemIds) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` },
    );

    itemIds.forEach((id) => {
      const elem = document.getElementById(id);
      if (elem) {
        observer.observe(elem);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [itemIds]);

  return activeId;
};

export default useActiveId;
