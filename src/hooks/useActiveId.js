import { throttle } from 'lodash-es';
import { useEffect, useState } from 'react';

const useActiveId = (headingIds) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const headingPositions = headingIds
      .map((id) => {
        const elem = document.getElementById(id);
        return elem
          ? {
              id,
              offsetTop: elem.offsetTop,
            }
          : {};
      })
      .filter((elem) => elem.offsetTop)
      .sort((a, b) => a.offsetTop - b.offsetTop);

    // Throttle the scroll event for every 250ms
    const handleScroll = throttle(() => {
      // When the next heading element is over half way up the page, we consider it active
      const windowOffsetTop = window.scrollY + window.innerHeight / 2;

      let currentId = headingIds[0];
      for (let i = 0; i < headingPositions.length; i++) {
        if (windowOffsetTop > headingPositions[i].offsetTop) {
          currentId = headingPositions[i].id;
        }
      }
      setActiveId(currentId);
    }, 250);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headingIds]);

  return activeId;
};

export default useActiveId;
