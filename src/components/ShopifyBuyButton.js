import React, { useState, useRef, useEffect } from 'react';
import ShopifyBuy from '@shopify/buy-button-js';
import { LuLoader2 } from 'react-icons/lu';

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const SHOPIFY_PRODUCT_ID = process.env.SHOPIFY_PRODUCT_ID;

const shopifyClient = ShopifyBuy.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: SHOPIFY_ACCESS_TOKEN,
});

const ui = ShopifyBuy.UI.init(shopifyClient);

const ShopifyBuyButton = ({ id = SHOPIFY_PRODUCT_ID, className }) => {
  const [loading, setLoading] = useState(true);
  const buyButtonRef = useRef();

  useEffect(() => {
    if (buyButtonRef.current) {
      ui.createComponent('product', {
        id,
        node: buyButtonRef.current,
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
          product: {
            iframe: false,
            contents: {
              img: false,
              title: false,
              price: false,
            },
            text: {
              button: 'Pre-Order Direct',
            },
          },
          toggle: {
            styles: {
              toggle: {
                background: '#CE3699',
                ':hover': {
                  background: '#BD2E7F',
                },
              },
            },
          },
          cart: {
            styles: {
              button: {
                background: '#CE3699',
                ':hover': {
                  background: '#BD2E7F',
                },
              },
            },
          },
        },
      }).then(() => {
        setLoading(false);
      });
    }

    return () => {
      ui.destroyComponent('product', id);
      buyButtonRef.current = null;
    };
  }, [id]);

  return (
    <div className={`relative h-[36px] w-[142px] ${className}`}>
      {/* Loading Animation */}
      <button
        className={`${loading ? 'flex' : 'hidden'} absolute inset-0 cursor-not-allowed items-center justify-center rounded-xl bg-noc-400 text-white`}
      >
        <LuLoader2 className="h-5 w-5 animate-spin" />
      </button>

      <div ref={buyButtonRef} />
    </div>
  );
};

export default ShopifyBuyButton;
