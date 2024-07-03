import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import SideNavLayout from '../layouts/SideNavLayout';
import PurchaseButton from '../components/PurchaseButton';

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
        Hi there! Welcome to The Nature of Code! Ever wondered how the unpredictable evolutionary and emergent properties of nature can be captured in a digital canvas, all through the magic of code? Running right in your browser! That’s exactly what this book is all about! 
        <br/>
        You can read the whole thing right here, thank you to Creative Commons! If this project sparks joy and want to support it, you can <a href="https://github.com/sponsors/CodingTrain">sponsor on GitHub</a> or grab a copy of an artfully bound version of processed cellulose fibers, imprinted with symbolic glyphs via pigment-based transfer particles, available at <a href="https://nostarch.com/nature-code">No Starch Press</a> and <a href="https://amzn.to/3ztc87a">other places where people buy books</a>. Don't forget to touch grass!
      </div>

    </SideNavLayout>
  );
}
