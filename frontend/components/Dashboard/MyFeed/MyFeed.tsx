import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PostCard from '../PostCard'
import Pagination from '../../Pagination'
import theme from '../../../theme'
import { User as UserType, Post as PostType } from '../../../generated/graphql'
import ChevronDownIcon from '../../Icons/ChevronDownIcon'

type Props = {
  posts: PostType[]
  currentUser: UserType
}

const NUM_POSTS_PER_PAGE = 10

const MyFeed: React.FC<Props> = ({ posts, currentUser }) => {
  const { query } = useRouter()
  const total = posts.length
  const currentPage = query.page ? Math.max(1, parseInt(query.page as string, 10)) : 1
  const showPagination = total > NUM_POSTS_PER_PAGE
  const pageTitle = 'My Feed'

  console.log(currentUser)
  return (
    <div className="my-feed-wrapper">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <h1>My Feed</h1>
      <div className="my-feed-search">
        <input type="text" placeholder="Search..." className="search-box" />
        <div className="my-feed-select">
          <div className="search-filter-container">
            <select name="topic" id="topic" className="search-filter">
              <option value="Topic">Topic</option>
            </select>
            <ChevronDownIcon className="select-arrow" />
          </div>
          <div className="search-filter-container">
            <select name="language" id="language" className="search-filter">
              <option value="language">Language</option>
            </select>
            <ChevronDownIcon className="select-arrow" />
          </div>
        </div>
      </div>
      <div className="my-feed-container">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} stacked avatar />)
        ) : (
          <p>Nothing to see yet...</p>
        )}
      </div>

      {showPagination && (
        <Pagination
          currentPage={currentPage}
          total={total}
          numPerPage={NUM_POSTS_PER_PAGE}
          title={pageTitle}
        />
      )}

      <style jsx>{`
        .my-feed-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        h1 {
          margin: 50px auto;
          text-align: center;
          ${theme.typography.headingXL};
        }

        .my-feed-search {
          width: 100%;
          max-width: 700px;
        }

        .my-feed-search input,
        .my-feed-search select {
          border-radius: 5px;
          height: 50px;
          box-shadow: 0px 8px 10px #00000029;
          font-size: 16px;
          background: white;
          padding: 10px;
          width: 100%;
        }

        .search-box {
          margin-bottom: 20px;
          width: 100%;
        }

        .search-filter-container {
          position: relative;
        }

        .search-filter {
          -webkit-appearance: none;
          -moz-appearance: none;
        }

        :global(.select-arrow) {
          position: absolute;
          display: block;
          right: 0;
          bottom: 7px;
          padding: 0;
        }

        .my-feed-select {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .my-feed-container {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          margin-top: 50px;
        }

        :global(.pagination-wrapper) {
          margin: 40px 0;
        }
      `}</style>
    </div>
  )
}

export default MyFeed
