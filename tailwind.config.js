module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      content: {
        'icon-link':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23303030' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11'/%3E%3C/svg%3E\")",
        'icon-scissors':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 72 72' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_3)'%3E%3Cpath d='M29.7249 35.3959C36.7524 32.6932 44.7837 29.7451 47.1655 28.9855C51.4674 27.6135 58.4254 25.8342 63.9495 29.9383L33.3919 42.5902' stroke='black' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M30.0956 51.8242C31.0937 49.217 30.8098 46.4367 29.5597 44.1695L33.3919 42.5902L29.7249 35.3959C23.9655 37.6124 18.3435 39.8762 17.4521 40.4678C15.9328 41.4761 13.9233 43.1248 13.0856 45.3127C11.2875 50.0098 13.6377 55.2753 18.3347 57.0734C23.0319 58.8716 28.2975 56.5213 30.0956 51.8242ZM24.2365 52.663C22.1072 54.0009 19.2963 53.3592 17.9586 51.2299C16.6207 49.1005 17.2622 46.2898 19.3916 44.9519C21.521 43.614 24.3318 44.2556 25.6696 46.385C27.0075 48.5144 26.3659 51.3251 24.2365 52.663Z' stroke='black' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M28.433 32.1469C29.5234 29.948 29.73 27.3194 28.7835 24.8465C26.9853 20.1495 21.7199 17.7992 17.0226 19.5974C12.3255 21.3955 9.97541 26.661 11.7735 31.3581C12.611 33.5461 14.6207 35.1946 16.1399 36.203C16.3888 36.3682 16.9658 36.6475 17.7937 37.0125M18.0795 31.719C15.95 30.3811 15.3084 27.5703 16.6464 25.4409C17.9842 23.3116 20.7948 22.6699 22.9243 24.0078C25.0537 25.3457 25.6954 28.1564 24.3575 30.2857C23.0195 32.4151 20.2089 33.0568 18.0795 31.719Z' stroke='black' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M48.3334 40.8878L62.6373 46.7325C57.1133 50.8367 50.1552 49.0573 45.8534 47.6853C44.4468 47.2367 42.3146 46.5409 38.3379 45.0673' stroke='black' stroke-width='2' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3C/svg%3E%0A\")",
      },
      fontWeight: {
        inherit: 'inherit',
      },
      colors: {
        noc: {
          200: '#F166C0',
          400: '#CE3699',
          500: '#BD2E7F',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: {
              textAlign: 'center',
              fontWeight: theme('fontWeight.bold'),
              fontSize: theme('fontSize.3xl'),
            },
            p: {
              wordBreak: 'break-word',
            },
            blockquote: {
              quotes: 'none',
              '& > p': {
                marginTop: '0.4em',
                marginBottom: '0.4em',
              },
            },
            td: {
              verticalAlign: 'middle',
              '& > pre': {
                width: '12em', // at least 12em width
                minWidth: '100%', // fill all the space
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                marginTop: 0,
                marginBottom: 0,
                color: theme('colors.black'),
                background: theme('colors.gray[100]'),
              },
            },
            code: {
              background: theme('colors.gray[100]'),
              padding: '0.2em 0.4em',
              borderRadius: '0.2em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
