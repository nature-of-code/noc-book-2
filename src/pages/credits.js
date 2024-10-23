import * as React from 'react';
import SideNavLayout from '../layouts/SideNavLayout';

export default function ExercisesPage() {
  return (
    <SideNavLayout title="Exercises">
      <section data-type="page" id="section-credits">
        <h1 id="credits">Credits</h1>
        <h2 id="the-nature-of-code">
          <strong>THE NATURE OF CODE.</strong>
        </h2>
        <p>Copyright © 2024 by Daniel Shiffman.</p>
        <p>
          This work is licensed under the Creative Commons
          Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA
          4.0) license. To view a copy of this license, visit{' '}
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
            <em>https://creativecommons.org/licenses/by-nc-sa/4.0/</em>
          </a>
          <em> </em>or send a letter to Creative Commons, PO Box 1866, Mountain
          View, CA 94042, USA.
        </p>
        <p>Some rights reserved.</p>
        <p>
          When attributing this work, you must credit the author as follows:
          “Daniel Shiffman, published by No Starch Press® Inc.,” provide a link
          to the license, and indicate if changes were made. You may not use the
          material for commercial purposes. For ShareAlike purposes, if you
          transform or build upon the material, you must distribute your
          contributions under the same license as the original.
        </p>
        <p>
          Translations of this work are not covered under this license; all
          translation rights are reserved by the publisher. For permission to
          translate this work, please contact rights@nostarch.com.
        </p>
        <p>Moral rights of the author have been asserted.</p>
        <p>Printed in China</p>
        <p>First printing</p>
        <p>28 27 26 25 24 1 2 3 4 5</p>
        <p>
          ISBN-13: 978-1-7185-0370-0 (print)
          <br />
          ISBN-13: 978-1-7185-0371-7 (ebook)
        </p>
        <p>
          ® Published by No Starch Press®, Inc.
          <br />
          245 8th Street, San Francisco, CA 94103
          <br />
          phone: +1.415.863.9900
          <br />
          <a href="http://www.nostarch.com/">www.nostarch.com</a>;{' '}
          <a href="mailto:info@nostarch.com">info@nostarch.com</a>
        </p>
        <p>
          Publisher: William Pollock
          <br />
          Managing Editor: Jill Franklin
          <br />
          Production Manager: Sabrina Plomitallo-González
          <br />
          Production Editor: Jennifer Kepler
          <br />
          Developmental Editor: Nathan Heidelberger
          <br />
          Illustrator: Zannah Marsh
          <br />
          Cover Design: Tuan Huang
          <br />
          Interior Design: Tuan Huang and Jason Gao
          <br />
          Technical Reviewer: Jasper Palfree
          <br />
          Copyeditor: Sharon Wilkey
          <br />
          Proofreader: Audrey Doyle
          <br />
          Indexer: BIM Creatives, LLC
        </p>
        <p>Library of Congress Control Number: 2023053620</p>
        <p>
          For permissions beyond the scope of this license or customer service
          inquiries, please contact{' '}
          <a href="mailto:info@nostarch.com">info@nostarch.com</a>. For
          information on distribution, bulk sales, or corporate sales:{' '}
          <a href="mailto:sales@nostarch.com">sales@nostarch.com</a>. To report
          counterfeit copies or piracy:{' '}
          <a href="mailto:counterfeit@nostarch.com">counterfeit@nostarch.com</a>
          .
        </p>
        <p>
          No Starch Press and the No Starch Press logo are registered trademarks
          of No Starch Press, Inc. Other product and company names mentioned
          herein may be the trademarks of their respective owners. Rather than
          use a trademark symbol with every occurrence of a trademarked name, we
          are using the names only in an editorial fashion and to the benefit of
          the trademark owner, with no intention of infringement of the
          trademark.
        </p>
        <p>
          The information in this book is distributed on an “As Is” basis,
          without warranty. While every precaution has been taken in the
          preparation of this work, neither the author nor No Starch Press, Inc.
          shall have any liability to any person or entity with respect to any
          loss or damage caused or alleged to be caused directly or indirectly
          by the information contained in it.
        </p>
        <h2 id="image-credits">Image Credits</h2>
        <p>
          All emojis in the book are from OpenMoji, the open source emoji and
          icon project, and licensed under CC BY-SA 4.0.
        </p>
        <p>
          <strong>Chapter 0: </strong>
          <a href="https://www.rand.org/pubs/monograph_reports/MR1418.html">
            Pages 314–315 from{' '}
            <em>A Million Random Digits with 100,000 Normal Deviates</em>, RAND
            Corporation, MR-1418-RC, 2001. As of October 17, 2023.
          </a>
        </p>
        <p>
          <strong>Chapter 1: </strong>
          <a href="https://commons.wikimedia.org/wiki/File:Micronesian_navigational_chart.jpg">
            Courtesy of Jim Heaphy, used under CC BY-SA 3.0
          </a>
          .
        </p>
        <p>
          <strong>Chapter 2: </strong>© Ezra Stoller/Esto, used with
          permission.
        </p>
        <p>
          <strong>Chapter 3: </strong>© Bridget Riley 2023, all rights
          reserved.
        </p>
        <p>
          <strong>Chapter 4: </strong>
          <a href="https://commons.wikimedia.org/wiki/File:PositronDiscovery.png">
            Courtesy of Carl D. Anderson, public domain
          </a>
          .
        </p>
        <p>
          <strong>Chapter 5: </strong>
          <a href="https://en.m.wikipedia.org/wiki/File:Sixfinger_threadfin_school.jpg">
            Courtesy of the US National Oceanic and Atmospheric Administration
            photo library, public domain
          </a>
          .
        </p>
        <p>
          <strong>Chapter 6: </strong>
          <a href="https://en.wikipedia.org/wiki/Living_root_bridge#/media/File:Living_root_bridges,_Nongriat_village,_Meghalaya2.jpg">
            Courtesy of Arshiya Urveeja Bose, used under CC BY 2.0
          </a>
          <em>.</em>
        </p>
        <p>
          <strong>Chapter 7: </strong>
          <a href="https://commons.wikimedia.org/wiki/File:Ewe_kente_stripes,_Ghana.jpg">
            Courtesy of ZSM, used under CC BY-SA 3.0
          </a>
          <em>.</em>
        </p>
        <p>
          <strong>Chapter 7, Figure 7.18: </strong>
          <a href="https://commons.wikimedia.org/wiki/File:Textile_cone.JPG">
            Courtesy of Richard Ling, used under CC BY-SA 3.0
          </a>
          .
        </p>
        <p>
          <strong>Chapter 8: </strong>
          <a href="https://commons.wikimedia.org/wiki/File:Bangkok-SA5.jpg">
            Courtesy of Saad Akhtar, used under CC BY 2.0
          </a>
          .
        </p>
        <p>
          <strong>Chapter 9: </strong>
          <a href="https://commons.wikimedia.org/wiki/File:Bowl_Chaco_Culture_NM_USA.jpg">
            Courtesy of the National Park Service, public domain
          </a>
          .
        </p>
        <p>
          <strong>Chapter 10: </strong>
          <a href="https://commons.wikimedia.org/wiki/File:MnistExamplesModified.png">
            Courtesy of Pi3.124, used under CC BY-SA 4.0
          </a>
          .
        </p>
        <p>
          <strong>Chapter 10, Figure 10.15: </strong>
          <a href="https://commons.wikimedia.org/wiki/File:MnistExamplesModified.png">
            Courtesy of Suvanjanprasai, used under CC BY-SA 4.0
          </a>
          .
        </p>
        <p>
          <strong>Chapter 11: </strong>
          <a href="https://nypl.getarchive.net/media/the-star-nose-mole-end-of-the-nose-magnified-05cbe6">
            Courtesy of the New York Public Library, public domain
          </a>
          .
        </p>
      </section>
    </SideNavLayout>
  );
}
