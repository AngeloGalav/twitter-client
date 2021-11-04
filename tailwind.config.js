module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'light': {
          'primary' : '#1DA1F2',           /* Primary color */
          'primary-focus' : '#0798EE',     /* Primary color - focused */
          'primary-content' : '#ffffff',   /* Foreground content color to use on primary color */

          'secondary' : '#14171A',         /* Secondary color */
          'secondary-focus' : '#0E1319',   /* Secondary color - focused */
          'secondary-content' : '#ffffff', /* Foreground content color to use on secondary color */

          'accent' : '#e13960',            /* Accent color */
          'accent-focus' : '#CF103D',      /* Accent color - focused */
          'accent-content' : '#ffffff',    /* Foreground content color to use on accent color */

          'neutral' : '#3d4451',           /* Neutral color */
          'neutral-focus' : '#2a2e37',     /* Neutral color - focused */
          'neutral-content' : '#ffffff',   /* Foreground content color to use on neutral color */

          'base-100' : '#ffffff',          /* Base color of page, used for blank backgrounds */
          'base-200' : '#f9fafb',          /* Base color, a little darker */
          'base-300' : '#d1d5db',          /* Base color, even more darker */
          'base-content' : '#1f2937',      /* Foreground content color to use on base color */

          'info' : '#2094f3',              /* Info */
          'success' : '#009485',           /* Success */
          'warning' : '#ff9900',           /* Warning */
          'error' : '#ff5724',             /* Error */
        }
      },
      {
        'dark': {
          'primary' : '#1DA1F2',           /* Primary color */
          'primary-focus' : '#0798EE',     /* Primary color - focused */
          'primary-content' : '#ffffff',   /* Foreground content color to use on primary color */

          'secondary' : '#ffffff',         /* Secondary color */
          'secondary-focus' : '#EFEFEF',   /* Secondary color - focused */
          'secondary-content' : '#14171A', /* Foreground content color to use on secondary color */

          'accent' : '#e13960',            /* Accent color */
          'accent-focus' : '#CF103D',      /* Accent color - focused */
          'accent-content' : '#ffffff',    /* Foreground content color to use on accent color */

          'neutral' : '#16181d',           /* Neutral color */
          'neutral-focus' : '#34373E',     /* Neutral color - focused */
          'neutral-content' : '#ffffff',   /* Foreground content color to use on neutral color */

          'base-100' : '#3d4451',          /* Base color of page, used for blank backgrounds */
          'base-200' : '#222832',          /* Base color, a little darker */
          'base-300' : '#162030',          /* Base color, even more darker */
          'base-content' : '#ffffff',      /* Foreground content color to use on base color */

          'info' : '#2094f3',              /* Info */
          'success' : '#009485',           /* Success */
          'warning' : '#ff9900',           /* Warning */
          'error' : '#ff5724',             /* Error */
        }
      },
    ],
  },
}
