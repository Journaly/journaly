import React, { useMemo } from 'react'
import differenceInCalendarWeeks from 'date-fns/differenceInCalendarWeeks'
import addYears from 'date-fns/addYears'
import formatISO from 'date-fns/formatISO'
import getDay from 'date-fns/getDay'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'

import { useUserStatsQuery } from '@/generated/graphql'

type ProfileStatsProps = {
  userId: number
}

const CELL_WIDTH = 5
const CELL_PADDING = 1

/*
const dateToPos = (anchorDate, date) => {
  const weekDiff = differenceInCalendarWeeks(anchorDate, date)
  const x = 
    CELL_PADDING +
    (CELL_WIDTH * CELL_PADDING) * 
*/

const ProfileStats = ({ userId }: ProfileStatsProps) => {
  const { data, loading } = useUserStatsQuery({
    variables: {
      id: userId
    }
  })

  const [start, end] = useMemo(() => {
    const end = new Date()
    const start = addYears(end, -1)
    return [start, end]
  }, [data])

  const denseData = useMemo(() => {
    const indexable = {}
    if (data?.userById?.postActivity) {
      const { postActivity } = data.userById
      for (var i=0; i < postActivity.length; i++) {
        indexable[postActivity[i].date] = postActivity[i].count
      }
    }

    return eachDayOfInterval({ start, end }).map(date => {
      return {
        x: (CELL_WIDTH + CELL_PADDING) * differenceInCalendarWeeks(end, date),
        y: (CELL_WIDTH + CELL_PADDING) * getDay(date),
        count: indexable[formatISO(date, { representation: 'date' })] || 0,
        date,
      }
    })
  }, [data, start, end])

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <>
      <svg viewBox="0 0 600 200">
        {denseData.map(d => (
          <rect
            key={d.date}
            fill="red"
            x={d.x}
            y={d.y}
            height={CELL_WIDTH} 
            width={CELL_WIDTH}
          />
        ))}
      </svg>
      {/*
      <pre>
        {JSON.stringify(denseData, undefined, 2)}
        {JSON.stringify(data, undefined, 2)}
      </pre>
        */}
    </>
  )
}

export default ProfileStats
