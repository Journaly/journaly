import { fromEntries } from '@/utils'

export const breakpoints = {
  XS: 600,
  SM: 768,
  MD: 1024,
  LG: 1280,
} as const

type BreakpointSize = keyof typeof breakpoints
type Breakpoint = { readonly [key in BreakpointSize]: string }
type Colors =
  | 'black'
  | 'charcoal'
  | 'white'
  | 'gray100'
  | 'gray200'
  | 'gray300'
  | 'gray400'
  | 'gray500'
  | 'gray600'
  | 'gray700'
  | 'gray800'
  | 'copper'
  | 'blue'
  | 'blueLight'
  | 'red'
  | 'greenLight'
  | 'greenDark'
  | 'highlightColor'
  | 'highlightColorHover'
  | 'orangeDark'

type Typography =
  | 'fontFamilySansSerif'
  | 'fontFamilySerif'
  | 'paragraphSM'
  | 'paragraphMD'
  | 'paragraphLG'
  | 'headingOverline'
  | 'headingSM'
  | 'headingMD'
  | 'headingLG'
  | 'headingXL'
  | 'displaySM'
  | 'error'

export type Theme = {
  colors: {
    readonly [key in Colors]: string
  }
  breakpoints: Breakpoint
  typography: {
    readonly [key in Typography]: string
  }
}

const theme: Theme = {
  colors: {
    black: '#393939',
    charcoal: '#313131',
    white: '#ffffff',
    gray100: '#f6f6f6',
    gray200: '#f0eded',
    gray300: '#ebeae7',
    gray400: '#dadada',
    gray500: '#EFEFEF',
    gray600: '#757575',
    gray700: '#95989a',
    gray800: '#444444',
    copper: '#AD8001',
    blue: '#32567E',
    blueLight: '#4391C9',
    highlightColor: '#4391C940',
    highlightColorHover: '#4391C980',
    red: '#c42f14',
    greenLight: '#B0EED3',
    greenDark: '#1AAE6F',
    orangeDark: '#c47429',
  },
  breakpoints: fromEntries(
    // Add px to breakpoint values: { XS: '600px', SM: '768px' }
    Object.entries(breakpoints).map(([key, value]) => [key, `${value}px`]),
  ) as Breakpoint,
  typography: {
    fontFamilySansSerif: `
      font-family: "Source Sans Pro", sans-serif;
    `,
    fontFamilySerif: `
      font-family: "Playfair Display", serif;
    `,
    paragraphSM: `
      font-family: "Source Sans Pro", sans-serif;
      font-size: 12px;
      line-height: 20px;
    `,
    paragraphMD: `
      font-family: "Source Sans Pro", sans-serif;
      font-size: 16px;
      line-height: 24px;
    `,
    paragraphLG: `
      font-family: "Source Sans Pro", sans-serif;
      font-size: 18px;
      line-height: 24px;
    `,
    headingOverline: `
      letter-spacing: 1px;
      font-family: "Playfair Display", serif;
      font-size: 12px;
      line-height: 20px;
      font-weight: 400;
      text-transform: uppercase;
    `,
    headingSM: `
      font-family: "Playfair Display", serif;
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
    `,
    headingMD: `
      font-family: "Playfair Display", serif;
      font-size: 20px;
      line-height: 28px;
      font-weight: 400;
    `,
    headingLG: `
      font-family: "Playfair Display", serif;
      font-size: 24px;
      line-height: 32px;
      font-weight: 400;
    `,
    headingXL: `
      font-family: "Playfair Display", serif;
      font-size: 32px;
      line-height: 40px;
      font-weight: 400;
    `,
    displaySM: `
      font-family: "Playfair Display", serif;
      font-size: 40px;
      line-height: 56px;
      font-weight: 400;
    `,
    error: `
      color: #c42f14;
      font-size: 12px;
    `,
  },
}

export default theme
