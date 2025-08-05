import localFont from 'next/font/local';

export const aaStetica = localFont({
  src: [
    {
      path: '../font/AA Stetica/AA Stetica Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/AA Stetica/AA Stetica Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../font/AA Stetica/AA Stetica Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../font/AA Stetica/AA Stetica Bold Italic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../font/AA Stetica/AA Stetica Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../font/AA Stetica/AA Stetica Light Italic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../font/AA Stetica/AA Stetica Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../font/AA Stetica/AA Stetica Medium Italic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../font/AA Stetica/AA Stetica Black_0.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-aa-stetica',
  display: 'swap',
});
