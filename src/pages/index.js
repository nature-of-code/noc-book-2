import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import SideNavLayout from '../layouts/SideNavLayout';

export default function IndexPage({ data }) {
  return (
    <SideNavLayout title="Examples">
      <StaticImage
        src="../images/cover.png"
        width={800}
        alt="nature of code book cover"
      />
    </SideNavLayout>
  );
}
