import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import SideNavLayout from '../layouts/SideNavLayout';

export default function IndexPage() {
  return (
    <SideNavLayout>
      <StaticImage
        src="../images/cover.png"
        width={1200}
        alt="nature of code book cover"
      />
    </SideNavLayout>
  );
}
