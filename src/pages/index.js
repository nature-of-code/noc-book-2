import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import SideNavLayout from '../layouts/SideNavLayout';
import PurchaseButtons, {
  PurchaseDirectButton,
} from '../components/PurchaseButtons';

const links = [
  { href: 'https://nostarch.com/nature-code', label: 'No Starch' },
  {
    href: 'https://bookshop.org/p/books/the-nature-of-code-daniel-shiffman/20597363?ean=9781718503700',
    label: 'Bookshop.org',
  },
  {
    href: 'https://amzn.to/3ztc87a',
    label: 'Amazon',
  },
  {
    href: 'https://www.barnesandnoble.com/w/the-nature-of-code-daniel-shiffman/1114086024',
    label: 'Barnes & Noble',
  },
];

export default function IndexPage() {
  return (
    <SideNavLayout>
      <StaticImage
        src="../images/cover.png"
        width={1200}
        alt="nature of code book cover"
      />

      <PurchaseButtons className="my-6 lg:hidden" aligned="left" />

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
        width={200}
        alt="a hand holding a bookmark and a sticker"
      />
      <div className="my-6">
        <PurchaseDirectButton className="mt-4" />
        <p className="text-sm">*includes exclusive bookmark and sticker!</p>
      </div>

      <div className="my-6">
        <b>Also available at: </b>
        <ul className="left-0 my-2 px-0">
          {links.map((link) => (
            <li key={link.href} className=" my-0 list-inside px-0">
              <a
                href={link.href}
                className=" text-sm text-gray-800 hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SideNavLayout>
  );
}
