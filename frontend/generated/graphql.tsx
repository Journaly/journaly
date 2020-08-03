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
  DateTime: any
}

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['Int']
  author: User
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  authorId: Scalars['Int']
}

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
}

export type EditorNode = {
  type?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  italic?: Maybe<Scalars['Boolean']>
  bold?: Maybe<Scalars['Boolean']>
  underline?: Maybe<Scalars['Boolean']>
  children?: Maybe<Array<EditorNode>>
}

export type Image = {
  __typename?: 'Image'
  id: Scalars['Int']
  smallSize: Scalars['String']
}

export type ImageWhereUniqueInput = {
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

export type LanguageLearning = {
  __typename?: 'LanguageLearning'
  id: Scalars['Int']
  language: Language
}

export type LanguageLearningWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
  userId_languageId?: Maybe<UserIdLanguageIdCompoundUniqueInput>
}

export type LanguageNative = {
  __typename?: 'LanguageNative'
  id: Scalars['Int']
  language: Language
}

export type LanguageNativeWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
  userId_languageId?: Maybe<UserIdLanguageIdCompoundUniqueInput>
}

export type Location = {
  __typename?: 'Location'
  id: Scalars['Int']
  country: Scalars['String']
  city: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createThread?: Maybe<Thread>
  createComment?: Maybe<Comment>
  updateComment?: Maybe<Comment>
  deleteComment?: Maybe<Comment>
  createPost?: Maybe<Post>
  updatePost?: Maybe<Post>
  createUser?: Maybe<User>
  loginUser?: Maybe<User>
  logout?: Maybe<User>
  addLanguageLearning?: Maybe<LanguageLearning>
  addLanguageNative?: Maybe<LanguageNative>
  removeLanguageLearning?: Maybe<LanguageLearning>
  removeLanguageNative?: Maybe<LanguageNative>
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

export type MutationUpdateCommentArgs = {
  commentId: Scalars['Int']
  body: Scalars['String']
}

export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int']
}

export type MutationCreatePostArgs = {
  title: Scalars['String']
  body?: Maybe<Array<EditorNode>>
  languageId: Scalars['Int']
  status?: Maybe<PostStatus>
}

export type MutationUpdatePostArgs = {
  postId: Scalars['Int']
  title?: Maybe<Scalars['String']>
  languageId?: Maybe<Scalars['Int']>
  body?: Maybe<Array<EditorNode>>
  status?: Maybe<PostStatus>
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

export type MutationAddLanguageLearningArgs = {
  languageId: Scalars['Int']
}

export type MutationAddLanguageNativeArgs = {
  languageId: Scalars['Int']
}

export type MutationRemoveLanguageLearningArgs = {
  languageId: Scalars['Int']
}

export type MutationRemoveLanguageNativeArgs = {
  languageId: Scalars['Int']
}

export type Post = {
  __typename?: 'Post'
  id: Scalars['Int']
  title: Scalars['String']
  body: Scalars['String']
  excerpt: Scalars['String']
  readTime: Scalars['Int']
  author: User
  status: PostStatus
  images: Array<Image>
  likes: Array<PostLike>
  threads: Array<Thread>
  language: Language
  createdAt: Scalars['DateTime']
  bodySrc: Scalars['String']
}

export type PostImagesArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<ImageWhereUniqueInput>
  before?: Maybe<ImageWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PostLikesArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<PostLikeWhereUniqueInput>
  before?: Maybe<PostLikeWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PostThreadsArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<ThreadWhereUniqueInput>
  before?: Maybe<ThreadWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PostLike = {
  __typename?: 'PostLike'
  id: Scalars['Int']
}

export type PostLikeWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
}

export type PostPage = {
  __typename?: 'PostPage'
  posts?: Maybe<Array<Post>>
  count?: Maybe<Scalars['Int']>
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
  feed?: Maybe<PostPage>
  users?: Maybe<Array<User>>
  currentUser?: Maybe<User>
  languages?: Maybe<Array<Language>>
}

export type QueryPostsArgs = {
  status: PostStatus
  authorId: Scalars['Int']
}

export type QueryPostByIdArgs = {
  id?: Maybe<Scalars['Int']>
}

export type QueryFeedArgs = {
  search?: Maybe<Scalars['String']>
  language?: Maybe<Scalars['Int']>
  topic?: Maybe<Scalars['String']>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
}

export type QueryLanguagesArgs = {
  hasPosts?: Maybe<Scalars['Boolean']>
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
  createdAt: Scalars['DateTime']
  languagesNative: Array<LanguageNative>
  languagesLearning: Array<LanguageLearning>
}

export type UserLanguagesNativeArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<LanguageNativeWhereUniqueInput>
  before?: Maybe<LanguageNativeWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserLanguagesLearningArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<LanguageLearningWhereUniqueInput>
  before?: Maybe<LanguageLearningWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserIdLanguageIdCompoundUniqueInput = {
  userId: Scalars['Int']
  languageId: Scalars['Int']
}

export enum UserRole {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  FreeUser = 'FREE_USER',
  ProUser = 'PRO_USER',
}

export type AddLanguageLearningMutationVariables = {
  languageId: Scalars['Int']
}

export type AddLanguageLearningMutation = { __typename?: 'Mutation' } & {
  addLanguageLearning?: Maybe<
    { __typename?: 'LanguageLearning' } & {
      language: { __typename?: 'Language' } & Pick<Language, 'id'>
    }
  >
}

export type AddLanguageNativeMutationVariables = {
  languageId: Scalars['Int']
}

export type AddLanguageNativeMutation = { __typename?: 'Mutation' } & {
  addLanguageNative?: Maybe<
    { __typename?: 'LanguageNative' } & {
      language: { __typename?: 'Language' } & Pick<Language, 'id'>
    }
  >
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

export type CreatePostMutationVariables = {
  title: Scalars['String']
  body?: Maybe<Array<EditorNode>>
  languageId: Scalars['Int']
  status: PostStatus
}

export type CreatePostMutation = { __typename?: 'Mutation' } & {
  createPost?: Maybe<{ __typename?: 'Post' } & Pick<Post, 'id'>>
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
    { __typename?: 'User' } & {
      languagesLearning: Array<
        { __typename?: 'LanguageLearning' } & {
          language: { __typename?: 'Language' } & LanguageFragmentFragment
        }
      >
      languagesNative: Array<
        { __typename?: 'LanguageNative' } & {
          language: { __typename?: 'Language' } & LanguageFragmentFragment
        }
      >
    } & UserFragmentFragment
  >
}

export type DeleteCommentMutationVariables = {
  commentId: Scalars['Int']
}

export type DeleteCommentMutation = { __typename?: 'Mutation' } & {
  deleteComment?: Maybe<{ __typename?: 'Comment' } & Pick<Comment, 'id'>>
}

export type EditPostQueryVariables = {
  id: Scalars['Int']
}

export type EditPostQuery = { __typename?: 'Query' } & {
  postById?: Maybe<
    { __typename?: 'Post' } & Pick<Post, 'title' | 'bodySrc'> & {
        language: { __typename?: 'Language' } & Pick<Language, 'id'>
      }
  >
  currentUser?: Maybe<
    { __typename?: 'User' } & {
      languagesLearning: Array<
        { __typename?: 'LanguageLearning' } & {
          language: { __typename?: 'Language' } & LanguageFragmentFragment
        }
      >
      languagesNative: Array<
        { __typename?: 'LanguageNative' } & {
          language: { __typename?: 'Language' } & LanguageFragmentFragment
        }
      >
    }
  >
}

export type FeedQueryVariables = {
  first: Scalars['Int']
  skip: Scalars['Int']
}

export type FeedQuery = { __typename?: 'Query' } & {
  feed?: Maybe<
    { __typename?: 'PostPage' } & Pick<PostPage, 'count'> & {
        posts?: Maybe<Array<{ __typename?: 'Post' } & PostCardFragmentFragment>>
      }
  >
}

export type UserFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'handle' | 'email' | 'userRole' | 'profileImage'
>

export type AuthorFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'handle' | 'profileImage'
>

export type CommentFragmentFragment = { __typename?: 'Comment' } & Pick<
  Comment,
  'id' | 'body' | 'createdAt'
> & { author: { __typename?: 'User' } & AuthorFragmentFragment }

export type ThreadFragmentFragment = { __typename?: 'Thread' } & Pick<
  Thread,
  'id' | 'startIndex' | 'endIndex' | 'highlightedContent'
> & { comments: Array<{ __typename?: 'Comment' } & CommentFragmentFragment> }

export type PostFragmentFragment = { __typename?: 'Post' } & Pick<
  Post,
  'id' | 'title' | 'body' | 'status' | 'excerpt' | 'readTime' | 'createdAt'
> & {
    author: { __typename?: 'User' } & AuthorFragmentFragment
    threads: Array<{ __typename?: 'Thread' } & ThreadFragmentFragment>
  }

export type PostCardFragmentFragment = { __typename?: 'Post' } & Pick<
  Post,
  'id' | 'title' | 'body' | 'excerpt' | 'readTime' | 'createdAt'
> & {
    images: Array<{ __typename?: 'Image' } & Pick<Image, 'smallSize'>>
    likes: Array<{ __typename?: 'PostLike' } & Pick<PostLike, 'id'>>
    threads: Array<{ __typename?: 'Thread' } & Pick<Thread, 'id'>>
    author: { __typename?: 'User' } & AuthorFragmentFragment
    language: { __typename?: 'Language' } & LanguageFragmentFragment
  }

export type LanguageFragmentFragment = { __typename?: 'Language' } & Pick<
  Language,
  'id' | 'name' | 'dialect'
>

export type LanguagesQueryVariables = {}

export type LanguagesQuery = { __typename?: 'Query' } & {
  languages?: Maybe<Array<{ __typename?: 'Language' } & LanguageFragmentFragment>>
}

export type LanguagesFormDataQueryVariables = {}

export type LanguagesFormDataQuery = { __typename?: 'Query' } & {
  languages?: Maybe<Array<{ __typename?: 'Language' } & LanguageFragmentFragment>>
  currentUser?: Maybe<
    { __typename?: 'User' } & {
      languagesLearning: Array<
        { __typename?: 'LanguageLearning' } & Pick<LanguageLearning, 'id'> & {
            language: { __typename?: 'Language' } & LanguageFragmentFragment
          }
      >
      languagesNative: Array<
        { __typename?: 'LanguageNative' } & Pick<LanguageNative, 'id'> & {
            language: { __typename?: 'Language' } & LanguageFragmentFragment
          }
      >
    }
  >
}

export type LoginUserMutationVariables = {
  identifier: Scalars['String']
  password: Scalars['String']
}

export type LoginUserMutation = { __typename?: 'Mutation' } & {
  loginUser?: Maybe<{ __typename?: 'User' } & UserFragmentFragment>
}

export type LogoutMutationVariables = {}

export type LogoutMutation = { __typename?: 'Mutation' } & {
  logout?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>
}

export type PostByIdQueryVariables = {
  id: Scalars['Int']
}

export type PostByIdQuery = { __typename?: 'Query' } & {
  postById?: Maybe<{ __typename?: 'Post' } & PostFragmentFragment>
}

export type PostsQueryVariables = {
  authorId: Scalars['Int']
  status: PostStatus
}

export type PostsQuery = { __typename?: 'Query' } & {
  posts?: Maybe<Array<{ __typename?: 'Post' } & PostCardFragmentFragment>>
}

export type RemoveLanguageLearningMutationVariables = {
  languageId: Scalars['Int']
}

export type RemoveLanguageLearningMutation = { __typename?: 'Mutation' } & {
  removeLanguageLearning?: Maybe<{ __typename?: 'LanguageLearning' } & Pick<LanguageLearning, 'id'>>
}

export type RemoveLanguageNativeMutationVariables = {
  languageId: Scalars['Int']
}

export type RemoveLanguageNativeMutation = { __typename?: 'Mutation' } & {
  removeLanguageNative?: Maybe<{ __typename?: 'LanguageNative' } & Pick<LanguageNative, 'id'>>
}

export type UpdateCommentMutationVariables = {
  body: Scalars['String']
  commentId: Scalars['Int']
}

export type UpdateCommentMutation = { __typename?: 'Mutation' } & {
  updateComment?: Maybe<{ __typename?: 'Comment' } & CommentFragmentFragment>
}

export type UpdatePostMutationVariables = {
  postId: Scalars['Int']
  title?: Maybe<Scalars['String']>
  languageId?: Maybe<Scalars['Int']>
  body?: Maybe<Array<EditorNode>>
  status?: Maybe<PostStatus>
}

export type UpdatePostMutation = { __typename?: 'Mutation' } & {
  updatePost?: Maybe<{ __typename?: 'Post' } & PostFragmentFragment>
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
    userRole
    profileImage
  }
`
export const AuthorFragmentFragmentDoc = gql`
  fragment AuthorFragment on User {
    id
    name
    handle
    profileImage
  }
`
export const CommentFragmentFragmentDoc = gql`
  fragment CommentFragment on Comment {
    id
    body
    createdAt
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
    excerpt
    readTime
    createdAt
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
export const LanguageFragmentFragmentDoc = gql`
  fragment LanguageFragment on Language {
    id
    name
    dialect
  }
`
export const PostCardFragmentFragmentDoc = gql`
  fragment PostCardFragment on Post {
    id
    title
    body
    excerpt
    readTime
    createdAt
    images {
      smallSize
    }
    likes {
      id
    }
    threads {
      id
    }
    author {
      ...AuthorFragment
    }
    language {
      ...LanguageFragment
    }
  }
  ${AuthorFragmentFragmentDoc}
  ${LanguageFragmentFragmentDoc}
`
export const AddLanguageLearningDocument = gql`
  mutation addLanguageLearning($languageId: Int!) {
    addLanguageLearning(languageId: $languageId) {
      language {
        id
      }
    }
  }
`
export type AddLanguageLearningMutationFn = ApolloReactCommon.MutationFunction<
  AddLanguageLearningMutation,
  AddLanguageLearningMutationVariables
>

/**
 * __useAddLanguageLearningMutation__
 *
 * To run a mutation, you first call `useAddLanguageLearningMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLanguageLearningMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLanguageLearningMutation, { data, loading, error }] = useAddLanguageLearningMutation({
 *   variables: {
 *      languageId: // value for 'languageId'
 *   },
 * });
 */
export function useAddLanguageLearningMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddLanguageLearningMutation,
    AddLanguageLearningMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AddLanguageLearningMutation,
    AddLanguageLearningMutationVariables
  >(AddLanguageLearningDocument, baseOptions)
}
export type AddLanguageLearningMutationHookResult = ReturnType<
  typeof useAddLanguageLearningMutation
>
export type AddLanguageLearningMutationResult = ApolloReactCommon.MutationResult<
  AddLanguageLearningMutation
>
export type AddLanguageLearningMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddLanguageLearningMutation,
  AddLanguageLearningMutationVariables
>
export const AddLanguageNativeDocument = gql`
  mutation addLanguageNative($languageId: Int!) {
    addLanguageNative(languageId: $languageId) {
      language {
        id
      }
    }
  }
`
export type AddLanguageNativeMutationFn = ApolloReactCommon.MutationFunction<
  AddLanguageNativeMutation,
  AddLanguageNativeMutationVariables
>

/**
 * __useAddLanguageNativeMutation__
 *
 * To run a mutation, you first call `useAddLanguageNativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLanguageNativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLanguageNativeMutation, { data, loading, error }] = useAddLanguageNativeMutation({
 *   variables: {
 *      languageId: // value for 'languageId'
 *   },
 * });
 */
export function useAddLanguageNativeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddLanguageNativeMutation,
    AddLanguageNativeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AddLanguageNativeMutation,
    AddLanguageNativeMutationVariables
  >(AddLanguageNativeDocument, baseOptions)
}
export type AddLanguageNativeMutationHookResult = ReturnType<typeof useAddLanguageNativeMutation>
export type AddLanguageNativeMutationResult = ApolloReactCommon.MutationResult<
  AddLanguageNativeMutation
>
export type AddLanguageNativeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddLanguageNativeMutation,
  AddLanguageNativeMutationVariables
>
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
export const CreatePostDocument = gql`
  mutation createPost(
    $title: String!
    $body: [EditorNode!]
    $languageId: Int!
    $status: PostStatus!
  ) {
    createPost(title: $title, body: $body, languageId: $languageId, status: $status) {
      id
    }
  }
`
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      languageId: // value for 'languageId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    baseOptions,
  )
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
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
      ...UserFragment
      languagesLearning {
        language {
          ...LanguageFragment
        }
      }
      languagesNative {
        language {
          ...LanguageFragment
        }
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${LanguageFragmentFragmentDoc}
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
export const DeleteCommentDocument = gql`
  mutation deleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId) {
      id
    }
  }
`
export type DeleteCommentMutationFn = ApolloReactCommon.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
    DeleteCommentDocument,
    baseOptions,
  )
}
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>
export type DeleteCommentMutationResult = ApolloReactCommon.MutationResult<DeleteCommentMutation>
export type DeleteCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>
export const EditPostDocument = gql`
  query editPost($id: Int!) {
    postById(id: $id) {
      title
      bodySrc
      language {
        id
      }
    }
    currentUser {
      languagesLearning {
        language {
          ...LanguageFragment
        }
      }
      languagesNative {
        language {
          ...LanguageFragment
        }
      }
    }
  }
  ${LanguageFragmentFragmentDoc}
`

/**
 * __useEditPostQuery__
 *
 * To run a query within a React component, call `useEditPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditPostQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<EditPostQuery, EditPostQueryVariables>,
) {
  return ApolloReactHooks.useQuery<EditPostQuery, EditPostQueryVariables>(
    EditPostDocument,
    baseOptions,
  )
}
export function useEditPostLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EditPostQuery, EditPostQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<EditPostQuery, EditPostQueryVariables>(
    EditPostDocument,
    baseOptions,
  )
}
export type EditPostQueryHookResult = ReturnType<typeof useEditPostQuery>
export type EditPostLazyQueryHookResult = ReturnType<typeof useEditPostLazyQuery>
export type EditPostQueryResult = ApolloReactCommon.QueryResult<
  EditPostQuery,
  EditPostQueryVariables
>
export const FeedDocument = gql`
  query feed($first: Int!, $skip: Int!) {
    feed(first: $first, skip: $skip) {
      posts {
        ...PostCardFragment
      }
      count
    }
  }
  ${PostCardFragmentFragmentDoc}
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
 *      first: // value for 'first'
 *      skip: // value for 'skip'
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
export const LanguagesDocument = gql`
  query languages {
    languages {
      ...LanguageFragment
    }
  }
  ${LanguageFragmentFragmentDoc}
`

/**
 * __useLanguagesQuery__
 *
 * To run a query within a React component, call `useLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useLanguagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<LanguagesQuery, LanguagesQueryVariables>,
) {
  return ApolloReactHooks.useQuery<LanguagesQuery, LanguagesQueryVariables>(
    LanguagesDocument,
    baseOptions,
  )
}
export function useLanguagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LanguagesQuery, LanguagesQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<LanguagesQuery, LanguagesQueryVariables>(
    LanguagesDocument,
    baseOptions,
  )
}
export type LanguagesQueryHookResult = ReturnType<typeof useLanguagesQuery>
export type LanguagesLazyQueryHookResult = ReturnType<typeof useLanguagesLazyQuery>
export type LanguagesQueryResult = ApolloReactCommon.QueryResult<
  LanguagesQuery,
  LanguagesQueryVariables
>
export const LanguagesFormDataDocument = gql`
  query languagesFormData {
    languages {
      ...LanguageFragment
    }
    currentUser {
      languagesLearning {
        id
        language {
          ...LanguageFragment
        }
      }
      languagesNative {
        id
        language {
          ...LanguageFragment
        }
      }
    }
  }
  ${LanguageFragmentFragmentDoc}
`

/**
 * __useLanguagesFormDataQuery__
 *
 * To run a query within a React component, call `useLanguagesFormDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useLanguagesFormDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguagesFormDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useLanguagesFormDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LanguagesFormDataQuery,
    LanguagesFormDataQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<LanguagesFormDataQuery, LanguagesFormDataQueryVariables>(
    LanguagesFormDataDocument,
    baseOptions,
  )
}
export function useLanguagesFormDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LanguagesFormDataQuery,
    LanguagesFormDataQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<LanguagesFormDataQuery, LanguagesFormDataQueryVariables>(
    LanguagesFormDataDocument,
    baseOptions,
  )
}
export type LanguagesFormDataQueryHookResult = ReturnType<typeof useLanguagesFormDataQuery>
export type LanguagesFormDataLazyQueryHookResult = ReturnType<typeof useLanguagesFormDataLazyQuery>
export type LanguagesFormDataQueryResult = ApolloReactCommon.QueryResult<
  LanguagesFormDataQuery,
  LanguagesFormDataQueryVariables
>
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
export const LogoutDocument = gql`
  mutation logout {
    logout {
      id
    }
  }
`
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions,
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
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
export const PostsDocument = gql`
  query posts($authorId: Int!, $status: PostStatus!) {
    posts(authorId: $authorId, status: $status) {
      ...PostCardFragment
    }
  }
  ${PostCardFragmentFragmentDoc}
`

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      authorId: // value for 'authorId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions)
}
export function usePostsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions)
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>
export const RemoveLanguageLearningDocument = gql`
  mutation removeLanguageLearning($languageId: Int!) {
    removeLanguageLearning(languageId: $languageId) {
      id
    }
  }
`
export type RemoveLanguageLearningMutationFn = ApolloReactCommon.MutationFunction<
  RemoveLanguageLearningMutation,
  RemoveLanguageLearningMutationVariables
>

/**
 * __useRemoveLanguageLearningMutation__
 *
 * To run a mutation, you first call `useRemoveLanguageLearningMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLanguageLearningMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLanguageLearningMutation, { data, loading, error }] = useRemoveLanguageLearningMutation({
 *   variables: {
 *      languageId: // value for 'languageId'
 *   },
 * });
 */
export function useRemoveLanguageLearningMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveLanguageLearningMutation,
    RemoveLanguageLearningMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RemoveLanguageLearningMutation,
    RemoveLanguageLearningMutationVariables
  >(RemoveLanguageLearningDocument, baseOptions)
}
export type RemoveLanguageLearningMutationHookResult = ReturnType<
  typeof useRemoveLanguageLearningMutation
>
export type RemoveLanguageLearningMutationResult = ApolloReactCommon.MutationResult<
  RemoveLanguageLearningMutation
>
export type RemoveLanguageLearningMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveLanguageLearningMutation,
  RemoveLanguageLearningMutationVariables
>
export const RemoveLanguageNativeDocument = gql`
  mutation removeLanguageNative($languageId: Int!) {
    removeLanguageNative(languageId: $languageId) {
      id
    }
  }
`
export type RemoveLanguageNativeMutationFn = ApolloReactCommon.MutationFunction<
  RemoveLanguageNativeMutation,
  RemoveLanguageNativeMutationVariables
>

/**
 * __useRemoveLanguageNativeMutation__
 *
 * To run a mutation, you first call `useRemoveLanguageNativeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLanguageNativeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLanguageNativeMutation, { data, loading, error }] = useRemoveLanguageNativeMutation({
 *   variables: {
 *      languageId: // value for 'languageId'
 *   },
 * });
 */
export function useRemoveLanguageNativeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveLanguageNativeMutation,
    RemoveLanguageNativeMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RemoveLanguageNativeMutation,
    RemoveLanguageNativeMutationVariables
  >(RemoveLanguageNativeDocument, baseOptions)
}
export type RemoveLanguageNativeMutationHookResult = ReturnType<
  typeof useRemoveLanguageNativeMutation
>
export type RemoveLanguageNativeMutationResult = ApolloReactCommon.MutationResult<
  RemoveLanguageNativeMutation
>
export type RemoveLanguageNativeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveLanguageNativeMutation,
  RemoveLanguageNativeMutationVariables
>
export const UpdateCommentDocument = gql`
  mutation updateComment($body: String!, $commentId: Int!) {
    updateComment(body: $body, commentId: $commentId) {
      ...CommentFragment
    }
  }
  ${CommentFragmentFragmentDoc}
`
export type UpdateCommentMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      body: // value for 'body'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useUpdateCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(
    UpdateCommentDocument,
    baseOptions,
  )
}
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>
export type UpdateCommentMutationResult = ApolloReactCommon.MutationResult<UpdateCommentMutation>
export type UpdateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>
export const UpdatePostDocument = gql`
  mutation updatePost(
    $postId: Int!
    $title: String
    $languageId: Int
    $body: [EditorNode!]
    $status: PostStatus
  ) {
    updatePost(
      body: $body
      title: $title
      languageId: $languageId
      status: $status
      postId: $postId
    ) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`
export type UpdatePostMutationFn = ApolloReactCommon.MutationFunction<
  UpdatePostMutation,
  UpdatePostMutationVariables
>

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      title: // value for 'title'
 *      languageId: // value for 'languageId'
 *      body: // value for 'body'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    baseOptions,
  )
}
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>
export type UpdatePostMutationResult = ApolloReactCommon.MutationResult<UpdatePostMutation>
export type UpdatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePostMutation,
  UpdatePostMutationVariables
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
