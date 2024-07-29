import React, { useRef, useEffect } from 'react';
import ShopifyBuy from '@shopify/buy-button-js';

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

const shopifyClient = ShopifyBuy.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: SHOPIFY_ACCESS_TOKEN,
});

const ui = ShopifyBuy.UI.init(shopifyClient);

const ShopifyBuyButton = ({ id, onLoaded }) => {
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
      }).then((res) => {
        console.log(res);
        onLoaded();
      });
    }

    return () => ui.destroyComponent('product', id);
  }, [id, onLoaded]);

  return <div ref={buyButtonRef} />;
};

export default ShopifyBuyButton;
