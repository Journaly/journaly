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
  | 'fontFamily'
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
    fontFamily: '"Source Sans Pro", sans-serif',
    paragraphSM: `
      font-size: 12px,
      line-height: 20px,
    `,
    paragraphMD: `
      font-size: 14px,
      line-height: 24px,
    `,
    paragraphLG: `
      font-size: 16px,
      line-height: 24px,
    `,
    headingOverline: `
      letter-spacing: 1px,
      font-size: 12px,
      line-height: 20px,
      font-weight: 600,
      text-transform: uppercase,
    `,
    headingSM: `
      font-size: 16px,
      line-height: 24px,
      font-weight: 600,
    `,
    headingMD: `
      font-size: 20px,
      line-height: 28px,
      font-weight: 600,
    `,
    headingLG: `
      font-size: 24px,
      line-height: 32px,
      font-weight: 600,
    `,
    headingXL: `
      font-size: 30px,
      line-height: 36px,
      font-weight: 600,
    `,
    displaySM: `
      font-size: 44px,
      line-height: 48px,
      font-weight: 600,
    `,
  },
}

export default theme
