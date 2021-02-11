import { format, parseISO } from 'date-fns'
import distanceInWordsToNow from 'date-fns/formatDistanceToNow'

type DateString = string | number

export const getUTCDate = (dateString: DateString = Date.now()): Date => {
  const date = new Date(dateString)

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  )
}

export const formatShortDate = (date: string): string => {
  return format(parseISO(date), 'MMM d')
}

export const formatLongDate = (date: string): string => {
  return format(parseISO(date), 'MMMM d, yyyy')
}

/**
 * Format a date in relative time
 * @param date the date
 * @param baseDate the date to compare with
 */

export const formatDateRelativeToNow = (date: string): string => {
  return distanceInWordsToNow(parseISO(date))
}
