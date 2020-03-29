import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client'
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser?: Maybe<User>
  createPost?: Maybe<Post>
}

export type MutationCreateUserArgs = {
  Name: Scalars['String']
  Email: Scalars['String']
  Password: Scalars['String']
}

export type MutationCreatePostArgs = {
  Title: Scalars['String']
  Body: Scalars['String']
  Published: Scalars['Boolean']
  authorEmail: Scalars['String']
}

export type Post = {
  __typename?: 'Post'
  Id: Scalars['String']
  Title: Scalars['String']
  Body: Scalars['String']
  author: User
  Published: Scalars['Boolean']
}

export type Query = {
  __typename?: 'Query'
  posts?: Maybe<Array<Post>>
  feed?: Maybe<Array<Post>>
  users?: Maybe<Array<User>>
}

export type QueryFeedArgs = {
  Published?: Maybe<Scalars['Boolean']>
}

export type User = {
  __typename?: 'User'
  Id: Scalars['String']
  Name: Scalars['String']
  Email: Scalars['String']
  Password: Scalars['String']
  posts: Array<Post>
}

export type FeedQueryVariables = {
  published: Scalars['Boolean']
}

export type FeedQuery = { __typename?: 'Query' } & {
  feed?: Maybe<
    Array<
      { __typename?: 'Post' } & Pick<
        Post,
        'Id' | 'Title' | 'Body' | 'Published'
      > & {
          author: { __typename?: 'User' } & Pick<User, 'Id' | 'Name' | 'Email'>
        }
    >
  >
}

export type UsersQueryVariables = {}

export type UsersQuery = { __typename?: 'Query' } & {
  users?: Maybe<
    Array<
      { __typename?: 'User' } & Pick<
        User,
        'Id' | 'Name' | 'Email' | 'Password'
      > & {
          posts: Array<
            { __typename?: 'Post' } & Pick<
              Post,
              'Id' | 'Title' | 'Body' | 'Published'
            >
          >
        }
    >
  >
}

export const FeedDocument = gql`
  query feed($published: Boolean!) {
    feed(Published: $published) {
      Id
      Title
      Body
      Published
      author {
        Id
        Name
        Email
      }
    }
  }
`

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      published: // value for 'published'
 *   },
 * });
 */
export function useFeedQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FeedQuery, FeedQueryVariables>
) {
  return ApolloReactHooks.useQuery<FeedQuery, FeedQueryVariables>(
    FeedDocument,
    baseOptions
  )
}
export function useFeedLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FeedQuery,
    FeedQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<FeedQuery, FeedQueryVariables>(
    FeedDocument,
    baseOptions
  )
}
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>
export type FeedQueryResult = ApolloReactCommon.QueryResult<
  FeedQuery,
  FeedQueryVariables
>
export const UsersDocument = gql`
  query users {
    users {
      Id
      Name
      Email
      Password
      posts {
        Id
        Title
        Body
        Published
      }
    }
  }
`

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  )
}
export function useUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  )
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = ApolloReactCommon.QueryResult<
  UsersQuery,
  UsersQueryVariables
>
