import gql from 'graphql-tag'
import * as React from 'react'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactComponents from '@apollo/react-components'
import * as ApolloReactHoc from '@apollo/react-hoc'
export type Maybe<T> = T | null
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
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

export type FeedQueryVariables = {}

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

export const FeedDocument = gql`
  query feed {
    feed(Published: true) {
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
export type FeedComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<FeedQuery, FeedQueryVariables>,
  'query'
>

export const FeedComponent = (props: FeedComponentProps) => (
  <ApolloReactComponents.Query<FeedQuery, FeedQueryVariables>
    query={FeedDocument}
    {...props}
  />
)

export type FeedProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  FeedQuery,
  FeedQueryVariables
> &
  TChildProps
export function withFeed<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FeedQuery,
    FeedQueryVariables,
    FeedProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FeedQuery,
    FeedQueryVariables,
    FeedProps<TChildProps>
  >(FeedDocument, {
    alias: 'feed',
    ...operationOptions,
  })
}
export type FeedQueryResult = ApolloReactCommon.QueryResult<
  FeedQuery,
  FeedQueryVariables
>
