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

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['Int']
  author: User
  body: Scalars['String']
}

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
}

export type Language = {
  __typename?: 'Language'
  id: Scalars['Int']
  name: Scalars['String']
  posts: Array<Post>
  dialect?: Maybe<Scalars['String']>
  learningUsers?: Maybe<Array<User>>
}

export type LanguagePostsArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<PostWhereUniqueInput>
  before?: Maybe<PostWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type Location = {
  __typename?: 'Location'
  id: Scalars['Int']
  country: Scalars['String']
  city: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser?: Maybe<User>
  loginUser?: Maybe<User>
  createPost?: Maybe<Post>
  createThread?: Maybe<Thread>
  createComment?: Maybe<Comment>
}

export type MutationCreateUserArgs = {
  handle: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationLoginUserArgs = {
  identifier: Scalars['String']
  password: Scalars['String']
}

export type MutationCreatePostArgs = {
  title: Scalars['String']
  body: Scalars['String']
  status?: Maybe<Scalars['String']>
  authorEmail: Scalars['String']
}

export type MutationCreateThreadArgs = {
  postId: Scalars['Int']
  startIndex: Scalars['Int']
  endIndex: Scalars['Int']
  highlightedContent: Scalars['String']
}

export type MutationCreateCommentArgs = {
  threadId: Scalars['Int']
  body: Scalars['String']
}

export type Post = {
  __typename?: 'Post'
  id: Scalars['Int']
  title: Scalars['String']
  body: Scalars['String']
  author: User
  status: PostStatus
  threads: Array<Thread>
  language: Language
}

export type PostThreadsArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<ThreadWhereUniqueInput>
  before?: Maybe<ThreadWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export enum PostStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type PostWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  posts?: Maybe<Array<Post>>
  postById?: Maybe<Post>
  feed?: Maybe<Array<Post>>
  users?: Maybe<Array<User>>
  currentUser?: Maybe<User>
}

export type QueryPostByIdArgs = {
  id?: Maybe<Scalars['Int']>
}

export type QueryFeedArgs = {
  status?: Maybe<Scalars['String']>
}

export type Thread = {
  __typename?: 'Thread'
  id: Scalars['Int']
  startIndex: Scalars['Int']
  endIndex: Scalars['Int']
  highlightedContent: Scalars['String']
  comments: Array<Comment>
}

export type ThreadCommentsArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<CommentWhereUniqueInput>
  before?: Maybe<CommentWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type ThreadWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
}

export type User = {
  __typename?: 'User'
  id: Scalars['Int']
  name?: Maybe<Scalars['String']>
  email: Scalars['String']
  handle: Scalars['String']
  bio?: Maybe<Scalars['String']>
  userRole: UserRole
  location?: Maybe<Location>
  posts: Array<Post>
  profileImage?: Maybe<Scalars['String']>
}

export enum UserRole {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  FreeUser = 'FREE_USER',
  ProUser = 'PRO_USER',
}

export type CreateCommentMutationVariables = {
  body: Scalars['String']
  threadId: Scalars['Int']
}

export type CreateCommentMutation = { __typename?: 'Mutation' } & {
  createComment?: Maybe<
    { __typename?: 'Comment' } & Pick<Comment, 'body'> & {
        author: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'handle'>
      }
  >
}

export type CreateThreadMutationVariables = {
  postId: Scalars['Int']
  startIndex: Scalars['Int']
  endIndex: Scalars['Int']
  highlightedContent: Scalars['String']
}

export type CreateThreadMutation = { __typename?: 'Mutation' } & {
  createThread?: Maybe<{ __typename?: 'Thread' } & ThreadFragmentFragment>
}

export type CreateUserMutationVariables = {
  handle: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'handle' | 'email'>>
}

export type CurrentUserQueryVariables = {}

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'handle' | 'email' | 'userRole' | 'profileImage'>
  >
}

export type FeedQueryVariables = {}

export type FeedQuery = { __typename?: 'Query' } & {
  feed?: Maybe<
    Array<
      { __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'body'> & {
          author: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email'>
        }
    >
  >
}

export type UserFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'handle' | 'email'
>

export type AuthorFragmentFragment = { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'handle'>

export type CommentFragmentFragment = { __typename?: 'Comment' } & Pick<Comment, 'body'> & {
    author: { __typename?: 'User' } & AuthorFragmentFragment
  }

export type ThreadFragmentFragment = { __typename?: 'Thread' } & Pick<
  Thread,
  'id' | 'startIndex' | 'endIndex' | 'highlightedContent'
> & { comments: Array<{ __typename?: 'Comment' } & CommentFragmentFragment> }

export type PostFragmentFragment = { __typename?: 'Post' } & Pick<
  Post,
  'id' | 'title' | 'body' | 'status'
> & {
    author: { __typename?: 'User' } & AuthorFragmentFragment
    threads: Array<{ __typename?: 'Thread' } & ThreadFragmentFragment>
  }

export type LoginUserMutationVariables = {
  identifier: Scalars['String']
  password: Scalars['String']
}

export type LoginUserMutation = { __typename?: 'Mutation' } & {
  loginUser?: Maybe<{ __typename?: 'User' } & UserFragmentFragment>
}

export type PostByIdQueryVariables = {
  id: Scalars['Int']
}

export type PostByIdQuery = { __typename?: 'Query' } & {
  postById?: Maybe<{ __typename?: 'Post' } & PostFragmentFragment>
}

export type UsersQueryVariables = {}

export type UsersQuery = { __typename?: 'Query' } & {
  users?: Maybe<
    Array<
      { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email'> & {
          posts: Array<{ __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'body'>>
        }
    >
  >
}

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    name
    handle
    email
  }
`
export const AuthorFragmentFragmentDoc = gql`
  fragment AuthorFragment on User {
    id
    name
    handle
  }
`
export const CommentFragmentFragmentDoc = gql`
  fragment CommentFragment on Comment {
    body
    author {
      ...AuthorFragment
    }
  }
  ${AuthorFragmentFragmentDoc}
`
export const ThreadFragmentFragmentDoc = gql`
  fragment ThreadFragment on Thread {
    id
    startIndex
    endIndex
    highlightedContent
    comments {
      ...CommentFragment
    }
  }
  ${CommentFragmentFragmentDoc}
`
export const PostFragmentFragmentDoc = gql`
  fragment PostFragment on Post {
    id
    title
    body
    status
    author {
      ...AuthorFragment
    }
    threads {
      ...ThreadFragment
    }
  }
  ${AuthorFragmentFragmentDoc}
  ${ThreadFragmentFragmentDoc}
`
export const CreateCommentDocument = gql`
  mutation createComment($body: String!, $threadId: Int!) {
    createComment(body: $body, threadId: $threadId) {
      body
      author {
        id
        name
        handle
      }
    }
  }
`
export type CreateCommentMutationFn = ApolloReactCommon.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      body: // value for 'body'
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument,
    baseOptions,
  )
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>
export type CreateCommentMutationResult = ApolloReactCommon.MutationResult<CreateCommentMutation>
export type CreateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>
export const CreateThreadDocument = gql`
  mutation createThread(
    $postId: Int!
    $startIndex: Int!
    $endIndex: Int!
    $highlightedContent: String!
  ) {
    createThread(
      postId: $postId
      startIndex: $startIndex
      endIndex: $endIndex
      highlightedContent: $highlightedContent
    ) {
      ...ThreadFragment
    }
  }
  ${ThreadFragmentFragmentDoc}
`
export type CreateThreadMutationFn = ApolloReactCommon.MutationFunction<
  CreateThreadMutation,
  CreateThreadMutationVariables
>

/**
 * __useCreateThreadMutation__
 *
 * To run a mutation, you first call `useCreateThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadMutation, { data, loading, error }] = useCreateThreadMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      startIndex: // value for 'startIndex'
 *      endIndex: // value for 'endIndex'
 *      highlightedContent: // value for 'highlightedContent'
 *   },
 * });
 */
export function useCreateThreadMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateThreadMutation,
    CreateThreadMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateThreadMutation, CreateThreadMutationVariables>(
    CreateThreadDocument,
    baseOptions,
  )
}
export type CreateThreadMutationHookResult = ReturnType<typeof useCreateThreadMutation>
export type CreateThreadMutationResult = ApolloReactCommon.MutationResult<CreateThreadMutation>
export type CreateThreadMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateThreadMutation,
  CreateThreadMutationVariables
>
export const CreateUserDocument = gql`
  mutation createUser($handle: String!, $email: String!, $password: String!) {
    createUser(handle: $handle, email: $email, password: $password) {
      id
      handle
      email
    }
  }
`
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      handle: // value for 'handle'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    baseOptions,
  )
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>
export const CurrentUserDocument = gql`
  query currentUser {
    currentUser {
      id
      handle
      email
      userRole
      profileImage
    }
  }
`

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>,
) {
  return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions,
  )
}
export function useCurrentUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions,
  )
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>
export const FeedDocument = gql`
  query feed {
    feed {
      id
      title
      body
      author {
        id
        name
        email
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
 *   },
 * });
 */
export function useFeedQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FeedQuery, FeedQueryVariables>,
) {
  return ApolloReactHooks.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions)
}
export function useFeedLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions)
}
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>
export type FeedQueryResult = ApolloReactCommon.QueryResult<FeedQuery, FeedQueryVariables>
export const LoginUserDocument = gql`
  mutation loginUser($identifier: String!, $password: String!) {
    loginUser(identifier: $identifier, password: $password) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<
  LoginUserMutation,
  LoginUserMutationVariables
>

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument,
    baseOptions,
  )
}
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginUserMutation,
  LoginUserMutationVariables
>
export const PostByIdDocument = gql`
  query postById($id: Int!) {
    postById(id: $id) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`

/**
 * __usePostByIdQuery__
 *
 * To run a query within a React component, call `usePostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<PostByIdQuery, PostByIdQueryVariables>,
) {
  return ApolloReactHooks.useQuery<PostByIdQuery, PostByIdQueryVariables>(
    PostByIdDocument,
    baseOptions,
  )
}
export function usePostByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostByIdQuery, PostByIdQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<PostByIdQuery, PostByIdQueryVariables>(
    PostByIdDocument,
    baseOptions,
  )
}
export type PostByIdQueryHookResult = ReturnType<typeof usePostByIdQuery>
export type PostByIdLazyQueryHookResult = ReturnType<typeof usePostByIdLazyQuery>
export type PostByIdQueryResult = ApolloReactCommon.QueryResult<
  PostByIdQuery,
  PostByIdQueryVariables
>
export const UsersDocument = gql`
  query users {
    users {
      id
      name
      email
      posts {
        id
        title
        body
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions)
}
export function useUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions)
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>
