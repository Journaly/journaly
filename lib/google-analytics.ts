import ReactGA, { EventArgs } from 'react-ga'

// Using the dummy ID UA-0000000-01 for non-production environments
export const GA_TRACKING_ID =
  process.env.NODE_ENV === 'production' ? 'UA-162783279-1' : 'UA-0000000-01'

export function initializeTracking(): void {
  ReactGA.initialize(GA_TRACKING_ID, {
    testMode: process.env.NODE_ENV === 'test',
  })
}

export function trackPageView(url?: string): void {
  if (!url) url = window.location.pathname + window.location.search

  ReactGA.pageview(url)
}

export function trackEvent(eventArgs: EventArgs): void {
  ReactGA.event({ ...eventArgs })
}
