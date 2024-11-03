import React, { useState, useRef, useEffect } from 'react';
import Loadable from '@loadable/component';
import { LuLoader2 } from 'react-icons/lu';
import { FiChevronDown } from 'react-icons/fi';

const ShopifyBuyButton = Loadable(() => import('./ShopifyBuyButton'));

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
];

export const PurchaseDirectButton = ({ id, className }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative h-[36px] w-[120px] ${className}`}>
      {/* Loading Animation */}
      <button
        className={`${loading ? 'flex' : 'hidden'} absolute inset-0 cursor-not-allowed items-center justify-center rounded-xl bg-noc-400 text-white uppercase`}
      >
        <LuLoader2 className="h-5 w-5 animate-spin" />
      </button>

      <ShopifyBuyButton id={id} onLoad={() => setLoading(false)} />
    </div>
  );
};

const PurchaseButtons = ({ aligned = 'right', className }) => {
  return (
    <div className={`not-prose flex items-center gap-4 ${className}`}>
      {/* Shopify Buy Button */}
      <PurchaseDirectButton />

      <div className="relative">
        <a href="https://github.com/nature-of-code/buyers-guide/blob/main/README.md"><button
          className="flex items-center rounded-xl border border-noc-200 px-4 py-[7px] text-sm text-noc-500 uppercase"
        > Buyers Guide

        </button></a>
      </div>
    </div>
  );
};

export default PurchaseButtons;
