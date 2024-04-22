module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      content: {
        'icon-link':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%23303030' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11'/%3E%3C/svg%3E\")",
      },
      fontWeight: {
        inherit: 'inherit',
      },
      colors: {
        noc: {
          400: '#CE3699',
          500: '#BD2E7F',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: {
              textAlign: 'center',
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
