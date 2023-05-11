import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from '@/config/i18n'

type Props = {
  currentPage: number
  total: number
  numPerPage: number
  title?: string
}

const Pagination: React.FC<Props> = ({ currentPage, total, numPerPage, title }) => {
  const { t } = useTranslation('my-feed')
  const { pathname } = useRouter()
  const pages = Math.ceil(total / numPerPage)

  const adjacentPageUrl = (direction: 1 | -1) => {
    return {
      pathname,
      query: { page: currentPage + direction },
    }
  }

  return (
    <div className="pagination-wrapper">
      {title && pages > 1 && (
        <Head>
          <title>{`${title} | Page ${currentPage} of ${pages}`}</title>
        </Head>
      )}

      <Link href={adjacentPageUrl(-1)} legacyBehavior>
        <a className="adjacent-page-link" aria-disabled={currentPage <= 1}>
          &larr; {t('pagination.previous')}
        </a>
      </Link>
      <p>
        {t('pagination.page')} {currentPage} {t('pagination.of')} {pages}
      </p>
      <Link href={adjacentPageUrl(1)} legacyBehavior>
        <a className="adjacent-page-link" aria-disabled={currentPage >= pages}>
          {t('pagination.next')} &rarr;
        </a>
      </Link>

      <style jsx>{`
        .pagination-wrapper {
          display: inline-grid;
          grid-template-columns: repeat(4, auto);
          align-items: stretch;
          justify-content: center;
          align-content: center;
          border: 1px solid #e1e1e1;
          border-radius: 10px;
          text-align: center;
        }

        .pagination-wrapper > * {
          margin: 0;
          padding: 15px 30px;
          border-right: 1px solid #e1e1e1;
        }

        .pagination-wrapper > *:last-child {
          border-right: 0;
        }

        .pagination-wrapper a[aria-disabled='true'] {
          color: #808080;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

export default Pagination
