import React, { useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import chroma from 'chroma-js'

import differenceInCalendarWeeks from 'date-fns/differenceInCalendarWeeks'
import addDays from 'date-fns/addDays'
import addWeeks from 'date-fns/addWeeks'
import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import getDay from 'date-fns/getDay'
import getMonth from 'date-fns/getMonth'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval'
import formatDuration from 'date-fns/formatDuration'
import intervalToDuration from 'date-fns/intervalToDuration'

import theme from '@/theme'
import { formatLongDate } from '@/utils'
import { useUserStatsQuery } from '@/generated/graphql'

type ProfileStatsProps = {
  userId: number
}

type ActivityCounts = {
  postCount: number
  postCommentCount: number
  threadCommentCount: number
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
  const { t } = useTranslation('profile')
  const { data, loading } = useUserStatsQuery({
    variables: {
      id: userId
    }
  })

  const [includePosts, setIncludePosts] = useState(true)
  const [includePostComments, setIncludePostComments] = useState(true)
  const [includeThreadComments, setIncludeThreadComments] = useState(true)

  const getCount = useCallback((d: ActivityCounts) => {
    return (0
      + (includePosts ? d.postCount : 0)
      + (includePostComments ? d.postCommentCount : 0)
      + (includeThreadComments ? d.threadCommentCount : 0))
  }, [includePosts, includePostComments, includeThreadComments])

  const [start, end] = useMemo(() => {
    const end = addDays(new Date(), 1)
    const start = addWeeks(end, -NUM_WEEKS)
    return [start, end]
  }, [data])

  const denseData = useMemo(() => {
    const indexable: { [key: string]: ActivityCounts } = {}
    if (data?.userByIdentifier?.activityGraphData) {
      const { activityGraphData } = data.userByIdentifier
      for (var i = 0; i < activityGraphData.length; i++) {
        const { date, postCount, postCommentCount, threadCommentCount } = activityGraphData[i]
        indexable[date] = {
          postCount,
          postCommentCount,
          threadCommentCount,
        }
      }
    }

    const rightEdge = NUM_WEEKS * (CELL_WIDTH + CELL_PADDING)
    const days = eachDayOfInterval({ start, end }).map((date) => {
      const x = rightEdge - (CELL_WIDTH + CELL_PADDING) * differenceInCalendarWeeks(end, date)
      const y = (CELL_WIDTH + CELL_PADDING) * getDay(date)
      const { postCount, postCommentCount, threadCommentCount } =
        indexable[formatISO(date, { representation: 'date' })] || {}

      return {
        x,
        y,
        date,
        postCount: postCount || 0,
        postCommentCount: postCommentCount || 0,
        threadCommentCount: threadCommentCount || 0,
      }
    })

    const months = eachMonthOfInterval({ start, end }).map((date) => {
      const x = rightEdge - (CELL_WIDTH + CELL_PADDING) * differenceInCalendarWeeks(end, date)
      return {
        name: MONTH_SHORT_NAMES[getMonth(date)],
        x,
      }
    })

    // Remove first month since it would be off screen.
    months.shift()

    return {
      months,
      days,
    }
  }, [data, start, end])

  const { maxValue, days } = useMemo(() => {
    let max = 0
    const days = denseData.days.map((d) => {
      const count = getCount(d)
      max = Math.max(max, count)

      return { ...d, count }
    })

    return { days, maxValue: Math.max(max, 1) }
  }, [denseData, getCount])

  const colorScale = chroma
    .scale([theme.colors.white, theme.colors.blueLight])
    .mode('lab')
    .domain([0, maxValue])

  if (loading || !data) {
    return <span>Loading...</span>
  }

  const user = data.userByIdentifier
  const joinDate = parseISO(user.createdAt)
  const age = formatDuration(intervalToDuration({ start: joinDate, end: new Date()}), { format: ['years', 'months', 'days'] })

  return (
    <>
      <h2>{t('stats.summary.title')}</h2>
      <div className="summary-copy">
        <span>
          {t('stats.summary.userAge', {
            name: user.name || user.handle,
            joinDate: formatLongDate(user.createdAt),
            age,
          })}
          {' '}
        </span>
        <span>
          { user.postsWrittenCount
            ? t('stats.summary.postCount', {
                postCount: user.postsWrittenCount,
                languageCount: user.languagesPostedInCount,
              })
            : t('stats.summary.noPosts')
          }
          {' '}
        </span>
        <span>
          { (user.threadCommentsCount || user.postCommentsCount)
            ? t('stats.summary.commentCounts', {
                postCommentCount: user.postCommentsCount,
                threadCommentCount: user.threadCommentsCount,
              })
            : t('stats.summary.noComments')
          }
          {' '}
        </span>
        <span>
          { user.thanksReceivedCount
            ? t('stats.summary.thanksCount', {
                thanksCount: user.thanksReceivedCount
              })
            : null
          }
        </span>
      </div>

      <h2>{t('stats.activity.title')}</h2>
      <div className="activity-type-toggles">
        <label>
          <input
            type="checkbox"
            checked={includePosts}
            onChange={() => setIncludePosts(!includePosts)}
          />
          <span>{t('stats.activity.types.posts')}</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={includePostComments}
            onChange={() => setIncludePostComments(!includePostComments)}
          />
          <span>{t('stats.activity.types.postComments')}</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeThreadComments}
            onChange={() => setIncludeThreadComments(!includeThreadComments)}
          />
          <span>{t('stats.activity.types.threadComments')}</span>
        </label>
      </div>
      <svg
        className="activityChart"
        viewBox={`0 0 ${(NUM_WEEKS + 1) * (CELL_WIDTH + CELL_PADDING) + 20} 100`}
      >
        <g transform="translate(20, 10)">
          {days.map(d => (
            <rect
              key={formatISO(d.date)}
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

        .summary-copy {
          max-width: 600px;
          align-self: center;
          margin-bottom: 20px;
        }

        .activity-type-toggles {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
          padding-bottom: 10px;
        }

        .activity-type-toggles > label > input {
          margin-right: 5px;
        }
      `}</style>
    </>
  )
}

export default ProfileStats
