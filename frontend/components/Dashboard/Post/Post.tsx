import React from 'react'
import Head from 'next/head'
import { Post as PostType } from '../../../generated/graphql'

// TODO: Remove any when Types are fixed with PR #17
interface IPostProps {
  post: PostType | any
}

const Post: React.FC<IPostProps> = ({ post }: IPostProps) => {
  return (
    <div className="post-container">
      <Head>
        <title>
          {post.author.Name} | {post.Title}
        </title>
      </Head>
      <div className="post-content">
        <div className="post-header">
          // TODO (robin-macpherson): update when Post Type updated w/ PR#17
          <img src="/images/samples/sample-post-img.jpg" alt={post.Title} />
          <h1>{post.Title}</h1>
        </div>
        <div className="post-body">
          <p>{post.Body}</p>
        </div>
      </div>
      <style jsx>{`
        .post-container {
          max-width: 1200px;
          margin: 2rem auto;
          box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
        }

        .post-content {
          display: grid;
          grid-column-gap: 10px;
          grid-template-columns: 80px 1fr 80px;
          grid-auto-rows: 350px 1fr;
        }
        .post-content > * {
          grid-column: 2;
          /* Helps to avoid horizontal scroll for this layout */
          min-width: 0;
        }

        .post-header {
          position: relative;
          grid-column: 1 / -1;
          text-align: center;
          color: white;
          margin-bottom: 40px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.3);
        }

        h1 {
          position: absolute;
          font-size: 64px;
          line-height: 1.2;
          text-align: center;
          color: white;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: 0;
        }

        .post-body {
          margin-bottom: 50px;
        }
      `}</style>
    </div>
  )
}

export default Post
