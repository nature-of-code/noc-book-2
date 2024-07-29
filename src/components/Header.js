import React from 'react';
import { Link } from 'gatsby';
import { FaGithub, FaRegHeart } from 'react-icons/fa';
import CodingTrainIcon from '../images/codingtrain_logo.png';

import PurchaseButton from './PurchaseButton';

// Animated menu button inspired by https://codepen.io/designcouch/pen/ExvwPY
const MenuButton = (props) => {
  return (
    <button
      className="flex h-9 w-11 cursor-pointer flex-col items-center justify-between p-2 lg:hidden"
      onClick={props.onClick}
      onKeyDown={props.onClick}
      aria-label="Toggle menu"
      title="Toggle menu"
    >
      <span
        className="block h-0.5 w-full rounded bg-noc-200 transition-transform"
        style={{
          transform:
            props.open && 'rotate(45deg) translateY(6.5px) translateX(6.5px)',
        }}
      ></span>
      <span
        className="block h-0.5 w-full rounded bg-noc-200 transition-opacity"
        style={{
          opacity: props.open ? '0' : '1',
        }}
      ></span>
      <span
        className="block h-0.5 w-full rounded bg-noc-200 transition-transform"
        style={{
          transform:
            props.open && 'rotate(-45deg) translateY(-6.5px) translateX(6.5px)',
        }}
      ></span>
    </button>
  );
};

const Header = (props) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 bg-white px-6 lg:px-8">
      <div className="mx-auto flex h-[5em] max-w-6xl items-center justify-between">
        <div className="flex flex-col gap-x-6 lg:flex-row lg:items-center">
          <Link to="/">
            <span className="text-lg font-black tracking-widest text-noc-400">
              THE NATURE OF CODE
            </span>
          </Link>
          <span className="hidden text-sm tracking-widest text-noc-400 xl:block">
            BY DANIEL SHIFFMAN
          </span>
        </div>

        <MenuButton open={props.menuOpen} onClick={props.onToggleMenu} />

        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="https://github.com/sponsors/CodingTrain"
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:underline"
              >
                <FaRegHeart size="1.2em" className="text-noc-200" />
                SUPPORT
              </a>
            </li>
            <li>
              <a
                href="https://github.com/nature-of-code/noc-book-2"
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:underline"
              >
                <FaGithub size="1.2em" className="text-noc-200" />
                GITHUB
              </a>
            </li>
            <li>
              <a
                href="https://thecodingtrain.com/"
                className="flex items-center text-sm text-gray-500 hover:underline"
              >
                <img
                  src={CodingTrainIcon}
                  alt="Coding Train's logo"
                  className="-ml-2 w-8"
                ></img>
                CODING TRAIN
              </a>
            </li>
          </ul>

          <PurchaseButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
