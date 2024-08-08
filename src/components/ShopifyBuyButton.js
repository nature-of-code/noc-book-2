import React, { useRef, useEffect } from 'react';
import ShopifyBuy from '@shopify/buy-button-js';

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const SHOPIFY_PRODUCT_ID = process.env.SHOPIFY_PRODUCT_ID;

const shopifyClient = ShopifyBuy.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: SHOPIFY_ACCESS_TOKEN,
});

const ui = ShopifyBuy.UI.init(shopifyClient);

const ShopifyBuyButton = ({ id = SHOPIFY_PRODUCT_ID, onLoad }) => {
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
        onLoad && onLoad();
      });
    }

    return () => ui.destroyComponent('product', id);
    // onLoad should not change and can be safely removed from the deps array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return <div ref={buyButtonRef} />;
};

export default ShopifyBuyButton;
