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
          {post.author.name} | {post.title}
        </title>
      </Head>
      <div className="post-content">
        <div className="post-header">
          // TODO (robin-macpherson): update when Post Type updated w/ PR#17
          <img src="/images/samples/sample-post-img.jpg" alt={post.title} />
          <h1>{post.title}</h1>
        </div>
        <div className="post-body">
          <p>{post.body}</p>
          <h2>Clickity Clack -- A Delightful Sound</h2>
          <p>
            Netus natoque dis imperdiet dictum elementum urna pellentesque
            penatibus vulputate sollicitudin orci duis curae aliquam eleifend
            arcu lectus volutpat ad Senectus consequat adipiscing habitant curae
            diam eleifend egestas lacus nullam urna praesent pharetra mauris
            tortor dapibus lobortis lectus fusce quis eros erat risus maecenas
            consectetur interdum inceptos ultrices neque integer.
          </p>
          <p>
            Netus natoque dis imperdiet dictum elementum urna pellentesque
            penatibus vulputate sollicitudin orci duis curae aliquam eleifend
            arcu lectus volutpat ad Senectus consequat adipiscing habitant curae
            diam eleifend egestas lacus nullam urna praesent pharetra mauris
            tortor dapibus lobortis lectus fusce quis eros erat risus maecenas
            consectetur interdum inceptos ultrices neque integer.
          </p>
          <h2>Love At First Clack</h2>
          <p>
            Amet leo senectus varius natoque luctus vulputate praesent metus,
            sollicitudin mus congue venenatis diam ante ultrices, mattis dolor
            eleifend condimentum penatibus ipsum auctor. Sem dui fringilla
            pellentesque urna pharetra congue arcu erat felis vestibulum nec, ut
            primis in platea cubilia posuere natoque commodo varius tempor.
            Nullam porttitor maecenas consequat elementum erat iaculis, tempor
            metus amet malesuada est, fringilla magna sem semper euismod.
            Pretium nam magna suspendisse vehicula mollis viverra at nascetur,
            augue imperdiet mauris vestibulum erat elementum nec, condimentum
            venenatis leo curae euismod nisl urna. Penatibus iaculis rutrum
            cursus ullamcorper condimentum sagittis senectus tempor dolor
            faucibus, volutpat fames natoque per ante fringilla sodales lacinia
            vehicula mollis, malesuada ut mattis a semper class parturient
            egestas ac.
          </p>
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

        h2 {
          margin: 20px 0;
        }

        .post-body {
          margin-bottom: 50px;
        }

        .post-body p {
          margin: 20px 0;
        }
      `}</style>
    </div>
  )
}

export default Post
