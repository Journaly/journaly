import { trackEvent } from '../lib/google-analytics'
import { EventArgs } from 'react-ga'

const USER_CATEGORY = 'Users'
const CREATE_ACCOUNT_ACTION = 'Create Account'
const LOG_IN_ACTION = 'Log in'

const baseEvent = {
  category: USER_CATEGORY,
}

interface OptionalEventArgs {
  label?: string
  value?: number
  nonInteraction?: boolean
}

function trackUserEvent(action: string, optionalArgs: OptionalEventArgs = {}): void {
  const event: EventArgs = { ...baseEvent, action, ...optionalArgs }
  trackEvent(event)
}

export function trackCreateAccount(optionalArgs: OptionalEventArgs = {}): void {
  trackUserEvent(CREATE_ACCOUNT_ACTION, optionalArgs)
}

export function trackLogIn(optionalArgs: OptionalEventArgs = {}): void {
  trackUserEvent(LOG_IN_ACTION, optionalArgs)
}
