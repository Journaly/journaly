import React from 'react'
import Link from 'next/link'

interface Props {
  id: string
  title: string
  body: string
  image?: string
  author: string
}

const PostCard: React.FC<Props> = ({ id, title, body, image, author }) => {
  return (
    <div className="post-card-container" key={id}>
      <Link href={`/post/${id}`}>
        <a>
          <img className="post-image" src={image} alt="Sample post image" />
          <div className="post-card-bottom">
            <div className="preview">
              <h4>{title}</h4>
              <p className="preview-text">{body}</p>
            </div>
            <div className="info">
              <img className="avatar" src="/images/author-sample-tiny.jpg" alt="Author" />
              <p className="author">{author}</p>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .post-card-container {
          height: 500px;
          background-color: white;
          width: 100%;
          border-radius: 5px;
          box-shadow: 0px 8px 10px #00000029;
        }

        .post-image {
          border-radius: 5px 5px 0 0;
          width: 100%;
          height: 175px;
          object-fit: cover;
        }

        .post-card-bottom {
          padding: 30px;
        }
        h4.post-card-bottom {
          font-weight: 700;
        }
        .info {
          display: flex;
          align-items: center;
        }
        .author {
          font-size: 14px;
          line-height: 1;
        }

        .avatar {
          width: 27px;
          height: 27px;
          border-radius: 50%;
          margin-right: 10px;
        }
      `}</style>
    </div>
  )
}

export default PostCard
