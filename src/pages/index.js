import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import SideNavLayout from '../layouts/SideNavLayout';
import PurchaseButton from '../components/PurchaseButton';

export default function IndexPage() {
  return (
    <SideNavLayout>
      <StaticImage
        src="../images/cover-2.jpg"
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
    </SideNavLayout>
  );
}
