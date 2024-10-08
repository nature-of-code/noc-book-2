import React from 'react';
import { FaYoutube, FaPlay } from 'react-icons/fa';

function getVideoIdFromYoutubeUrl(url) {
  try {
    const parsedUrl = new URL(url);
    if (
      parsedUrl.hostname === 'www.youtube.com' ||
      parsedUrl.hostname === 'youtube.com'
    ) {
      return parsedUrl.searchParams.get('v');
    } else if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1);
    }
    return null;
  } catch (e) {
    return null;
  }
}

const VideoLink = (props) => {
  const videoId = getVideoIdFromYoutubeUrl(props['href']);

  return (
    <div className="inline-block">
      <a
        className="group relative flex items-center gap-2 text-base text-noc-400 no-underline"
        href={props['href']}
        target="_blank"
        rel="noreferrer"
      >
        <FaYoutube />
        {props['data-title']}

        {videoId && (
          <div className="not-prose absolute top-0 z-10 hidden w-80 pt-10 group-hover:block">
            <div className="relative rounded-lg bg-noc-400 bg-opacity-50 p-4">
              <div className="flex aspect-video items-center overflow-hidden rounded object-cover">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`https://img.youtube.com/vi_webp/${videoId}/sddefault.webp`}
                  />
                  <source
                    type="image/jpeg"
                    srcSet={`https://i.ytimg.com/vi/${videoId}/sddefault.jpg`}
                  />
                  <img
                    src={`https://i.ytimg.com/vi/${videoId}/sddefault.jpg`}
                    alt="youtube video thumbnail"
                  />
                </picture>
              </div>

              <FaPlay className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-noc-400" />
            </div>
          </div>
        )}
      </a>
    </div>
  );
};

export default VideoLink;
