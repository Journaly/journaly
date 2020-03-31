import React from 'react'

import PostCard from '../PostCard'

// import { Post } from '../../../generated/graphql' // TODO (robin-macpherson): See Post[] type todo below

interface Props {
  posts: any[] // TODO (robin-macpherson): should be Post[]
}

const MyFeed: React.FC<Props> = ({ posts }) => {
  return (
    <div className="my-feed-wrapper">
      <h1>My Feed</h1>
      <div className="my-feed-search">
        <input type="text" placeholder="Search..." />
        <div className="my-feed-select">
          <select name="topic" id="topic">
            <option value="Topic">Topic</option>
          </select>
          <select name="language" id="language">
            <option value="language">Language</option>
          </select>
        </div>
      </div>
      <div className="my-feed-container">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard
              key={post.Id}
              id={post.Id}
              title={title}
              body={body}
              image={image}
              author={author.name}
            />
          ))
        ) : (
          <p>Nothing to see yet...</p>
        )}
      </div>
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
        }

        .my-feed-search {
          width: 100%;
          max-width: 700px;
        }

        .my-feed-search input,
        .my-feed-search select {
          border-radius: 5px;
          height: 30px;
          box-shadow: 0px 8px 10px #00000029;
          padding: 10px 0 10px 10px;
          font-size: 16px;
          background: white;
        }

        .my-feed-search select {
          height: 50px;
        }

        .my-feed-search input {
          width: calc(100% - 10px);
          margin-bottom: 20px;
        }

        .my-feed-search .my-feed-select {
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
      `}</style>
    </div>
  )
}

export default MyFeed
