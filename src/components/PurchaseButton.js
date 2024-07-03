import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const links = [
  { href: 'https://nostarch.com/nature-code', label: 'No Starch' },
  {
    href: 'https://bookshop.org/p/books/the-nature-of-code-daniel-shiffman/20597363?ean=9781718503700',
    label: 'Bookshop.org',
  },
  {
    href: 'https://amzn.to/3ztc87a',
    label: 'Amazon',
  },
  {
    href: 'https://www.barnesandnoble.com/w/the-nature-of-code-daniel-shiffman/1114086024',
    label: 'Barnes & Noble',
  },
];

const PurchaseButton = ({ aligned = 'right', className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close menu when click outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // close menu when the 'esc' key is pressed
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`not-prose relative ${className}`} ref={dropdownRef}>
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center rounded-xl bg-noc-400 px-4 py-2 text-sm font-medium text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        Pre-Order
        <FiChevronDown
          className={`-mr-1 ml-1 h-5 w-5 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <ul
          className={`absolute ${aligned === 'right' ? 'right-0' : 'left-0'} z-50 mt-1 w-40 divide-y rounded-xl border border-noc-200 bg-white`}
        >
          {links.map((link) => (
            <li key={link.href} className="border-noc-200">
              <a
                href={link.href}
                className="block px-4 py-2 text-sm text-gray-800 hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchaseButton;
