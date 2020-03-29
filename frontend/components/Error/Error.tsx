import { errorPrimary } from '../../utils'

const Error = ({ children }) => (
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

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
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

// DisplayError.defaultProps = {
//   error: {},
// }

// DisplayError.propTypes = {
//   error: PropTypes.object,
// }

export default DisplayError
