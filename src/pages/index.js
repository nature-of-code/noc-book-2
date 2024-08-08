import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import SideNavLayout from '../layouts/SideNavLayout';
import ShopifyBuyButton from '../components/ShopifyBuyButton';
import PurchaseButton from '../components/PurchaseButton';

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

      <PurchaseButton className="my-6 lg:hidden" aligned="left" />

      <div className="my-6">
        Hi hi hi! Welcome to The Nature of Code book! You can read the whole
        thing right here, thank you Creative Commons! If this project sparks joy
        and want to support it, you can{' '}
        <a href="https://github.com/sponsors/CodingTrain">sponsor on GitHub</a>{' '}
        or grab a copy of an artfully bound collection of processed cellulose
        fibers, imprinted with symbolic glyphs via pigment-based transfer
        particles. The best way to purchase is direct from me at{' '}
        <a href="https://store.natureofcode.com/products/the-nature-of-code">
          store.natureofcode.com
        </a>{' '}
        (it even comes with a special bookmark and sticker!) but you can also
        find it at{' '}
        <a href="https://amzn.to/3ztc87a">
          other places where people buy books
        </a>
        . Don't forget to touch grass!
      </div>


      <StaticImage
        className='float-right'
        src="../images/bookmark-pink-bg.png"
        width={200}
        alt="a hand holding a bookmark and a sticker"
      />
      <div className="my-6">
        <b>Order options:</b>
        <ShopifyBuyButton className="mt-4" />
        <p className="text-sm">
          *includes bookmark and sticker!
        </p>


      </div>

      <div className="my-6">
        <b>Also available at: </b>
        <ul
          className="left-0 px-0 my-2"
        >
          {links.map((link) => (
            <li key={link.href} className=" list-inside px-0 my-0">
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
