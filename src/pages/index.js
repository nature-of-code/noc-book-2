import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import Carousel from '../components/Carousel';
import SideNavLayout from '../layouts/SideNavLayout';
import { PurchaseDirectButton } from '../components/PurchaseButtons';

const links = [
  { href: 'https://nostarch.com/nature-code', label: 'No Starch' },
  {
    href: 'https://bookshop.org/p/books/the-nature-of-code-daniel-shiffman/20597363?ean=9781718503700',
    label: 'Bookshop.org',
  },
  {
    href: 'https://amzn.to/4e3243y',
    label: 'Amazon',
  },
  {
    href: 'https://www.barnesandnoble.com/w/the-nature-of-code-daniel-shiffman/1114086024',
    label: 'Barnes & Noble',
  },
  {
    href: 'https://github.com/nature-of-code/buyers-guide',
    label: 'Global Retailers'
  }
];

export default function IndexPage() {
  return (
    <SideNavLayout>
      <Carousel>
        <StaticImage
          src="../images/gallery/0.jpg"
          width={1600}
          alt="nature of code book cover on the front"
        />
        <StaticImage
          src="../images/gallery/1.jpg"
          width={1600}
          alt="a bright pink cover with white text and subtle wavy patterns."
        />
        <StaticImage
          src="../images/gallery/2.jpg"
          width={1600}
          alt="nature of code book cover on the back"
        />
        <StaticImage
          src="../images/gallery/3.jpg"
          width={1600}
          alt="an open book being held by both hands, displaying pages from “The Nature of Code.”"
        />
        <StaticImage
          src="../images/gallery/4.jpg"
          width={1600}
          alt="an open book with a coding example titled “Including Friction,” featuring code in JavaScript (p5.js) and an screenshot of the sketch in motion."
        />
        <video playsInline muted className="m-0 aspect-video">
          <source src="/flipping.mp4" type="video/mp4" />
        </video>
      </Carousel>

      <div className="my-6">
        Hi! Welcome! You can read the whole book here, thank you Creative
        Commons! If this project sparks joy and you want to support it, you can{' '}
        <a href="https://github.com/sponsors/CodingTrain">sponsor on GitHub</a>{' '}
        or grab a copy of a bound collection of processed cellulose fibers,
        imprinted with symbolic glyphs via pigment-based transfer particles{' '}
        <a href="https://store.natureofcode.com/products/the-nature-of-code">
          direct from me
        </a>
        !
      </div>

      <StaticImage
        className="float-right"
        src="../images/bookmark-pink-bg.png"
        width={150}
        alt="a hand holding a bookmark and a sticker"
      />
      <div className="my-6">
        <b>Buying options</b>

        {/* Order Direct */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <PurchaseDirectButton />
          <p className="my-0 text-sm">
            *includes exclusive bookmark and sticker!
          </p>
        </div>

        {/* Other Options */}
        <div className="mt-4 flex flex-wrap gap-2">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              <button
                key={link.href}
                className="rounded-xl border border-noc-200 px-3 py-[7px] text-sm text-noc-500"
              >
                {link.label}
              </button>
            </a>
          ))}
        </div>
      </div>
    </SideNavLayout>
  );
}
