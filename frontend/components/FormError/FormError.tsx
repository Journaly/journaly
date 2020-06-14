import { ApolloError } from '@apollo/client'
import theme from '../../theme'

type ErrorProps = {
  error: string
}

const ErrorMessage: React.FC<ErrorProps> = ({ error }) => (
  <div className="form-error">
    <p className="form-error-message">{error}</p>

    <style jsx>{`
      .form-error {
        margin: 12px 0;
        border-left: 5px solid ${theme.colors.red};
      }

      .form-error-message {
        padding: 12px;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-left: 0;
      }
    `}</style>
  </div>
)

type Props = {
  error?: ApolloError
}

// Type must be augmented because of https://github.com/apollographql/apollo-link/issues/536
type NetworkError = ApolloError & { result: { errors: Error[] } }

const FormError: React.FC<Props> = ({ error }) => {
  if (!error || !error.message) return null

  const result = (error.networkError as NetworkError)?.result

  if (result?.errors?.length) {
    // TODO catalog network errors, extract them to separate file, translate them
    return (
      <>
        {result.errors.map(({ message }, i) => (
          <ErrorMessage key={i} error={message.replace('GraphQL error: ', '')} />
        ))}
      </>
    )
  }

  return <ErrorMessage error={error.message.replace('GraphQL error: ', '')} />
}

export default FormError
