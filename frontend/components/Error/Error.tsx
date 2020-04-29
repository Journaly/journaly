// @ts-nocheck
import { errorPrimary } from '../../utils'
import { ApolloError } from '@apollo/client'

const Error: React.FC = ({ children }) => (
  <div>
    {children}
    <style jsx>
      {`
        padding: 2rem;
        background: white;
        margin: 2rem 0;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-left: 5px solid ${errorPrimary};
        p {
          margin: 0;
          font-weight: 100;
        }
        strong {
          margin-right: 1rem;
        }
      `}
    </style>
  </div>
)

type Props = {
  error?: ApolloError
}

const DisplayError: React.FC<Props> = ({ error }) => {
  if (!error || !error.message) return null
  if (error.networkError?.result?.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <Error key={i}>
        <p data-test="graphql-error">
          <strong>Whoops!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </Error>
    ))
  }
  return (
    <Error>
      <p data-test="graphql-error">
        <strong>Whoops!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </Error>
  )
}

export default DisplayError
