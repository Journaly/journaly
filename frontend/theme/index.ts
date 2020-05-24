import { fromEntries } from '../utils'

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
  | 'white'
  | 'gray100'
  | 'gray200'
  | 'gray300'
  | 'gray400'
  | 'gray500'
  | 'gray600'
  | 'gray700'
  | 'gray800'
  | 'blue'
  | 'blueLight'
  | 'red'

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
    white: '#ffffff',
    gray100: '',
    gray200: '',
    gray300: '',
    gray400: '',
    gray500: '',
    gray600: '',
    gray700: '',
    gray800: '',
    blue: '#32567E',
    blueLight: '#4391C9',
    red: '#c42f14',
  },
  breakpoints: fromEntries(
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
  },
}

export default theme
