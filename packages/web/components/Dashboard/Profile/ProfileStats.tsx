import React, { useMemo } from 'react'
import chroma from 'chroma-js'
import differenceInCalendarWeeks from 'date-fns/differenceInCalendarWeeks'
import addWeeks from 'date-fns/addWeeks'
import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import getDay from 'date-fns/getDay'
import getMonth from 'date-fns/getMonth'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval'
import { zonedTimeToUtc } from 'date-fns-tz'

import theme from '@/theme'
import { useUserStatsQuery } from '@/generated/graphql'

type ProfileStatsProps = {
  userId: number
}

const CELL_WIDTH = 8
const CELL_PADDING = 2
const NUM_WEEKS = 18
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_SHORT_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const ProfileStats = ({ userId }: ProfileStatsProps) => {
  const { data, loading } = useUserStatsQuery({
    variables: {
      id: userId
    }
  })

  const [start, end] = useMemo(() => {
    const end = zonedTimeToUtc(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone)
    const start = addWeeks(end, -NUM_WEEKS)
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

    let max = 0
    const rightEdge = NUM_WEEKS * (CELL_WIDTH + CELL_PADDING)
    const days = eachDayOfInterval({ start, end }).map(date => {
      const x = (
        rightEdge
        - (CELL_WIDTH + CELL_PADDING)
        * differenceInCalendarWeeks(end, date))
      const y = (CELL_WIDTH + CELL_PADDING) * getDay(date)
      const count = indexable[formatISO(date, { representation: 'date' })] || 0

      max = Math.max(max, count)

      return { x, y, count, date }
    })

    const months = eachMonthOfInterval({ start, end }).map(date => {
      const x = (
        rightEdge
        - (CELL_WIDTH + CELL_PADDING)
        * differenceInCalendarWeeks(end, date))
      return {
        name: MONTH_SHORT_NAMES[getMonth(date)],
        x,
      }
    })

    // Remove first month since it would be off screen.
    months.shift()

    return {
      max: Math.max(max, 1),
      months,
      days,
    }
  }, [data, start, end])

  const colorScale = chroma
    .scale([theme.colors.white, theme.colors.blueLight])
    .mode('lab')
    .domain([0, denseData.max])

  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <>
      <h2>Summary</h2>
      <div>
        <div className="summary-stat-item">
          <span className="label">Total Posts: </span>
          <span className="value">{data.userById.postsWrittenCount}</span>
        </div>
        <div className="summary-stat-item">
          <span className="label">Thanks Received: </span>
          <span className="value">{data.userById.thanksReceivedCount}</span>
        </div>
        <div className="summary-stat-item">
          <span className="label">Registered: </span>
          <span className="value">
            {formatISO(parseISO(data.userById.createdAt), { representation: 'date'})}
          </span>
        </div>

      </div>

      <h2>Posting History</h2>
      <svg
        className="activityChart"
        viewBox={`0 0 ${(NUM_WEEKS + 1) * (CELL_WIDTH + CELL_PADDING) + 20} 100`}
      >
        <g transform="translate(20, 10)">
          {denseData.days.map(d => (
            <rect
              key={d.date}
              fill={colorScale(d.count).hex()}
              stroke={theme.colors.gray300}
              strokeWidth={0.5}
              x={d.x}
              y={d.y}
              rx={1}
              ry={1}
              height={CELL_WIDTH} 
              width={CELL_WIDTH}
            />
          ))}
        </g>
        <g transform="translate(20, 7)">
          {denseData.months.map((d, ind) => (
            <text
              key={ind}
              x={d.x}
              y="0"
              fontSize={CELL_WIDTH - 1}
            >
              {d.name}
            </text>
          ))}
        </g>
        <g transform="translate(0, 6)">
          {DAYS_OF_WEEK.map((name, ind) => (
            <text
              key={ind}
              x="0"
              y={(ind + 1) * (CELL_WIDTH + CELL_PADDING)}
              fontSize={CELL_WIDTH - 1}
            >
              {name}
            </text>
          ))}
        </g>
      </svg>
      <style jsx>{`
        h2 {
          text-align: center;
          ${theme.typography.headingLG}
          margin-bottom: 15px;
        }

        .activityChart {
          max-height: 300px;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default ProfileStats
