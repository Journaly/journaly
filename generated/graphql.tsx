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

export type AuthorIdCommentIdCompoundUniqueInput = {
  authorId: Scalars['Int']
  commentId: Scalars['Int']
}

export type AuthorIdPostIdCompoundUniqueInput = {
  authorId: Scalars['Int']
  postId: Scalars['Int']
}

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['Int']
  author: User
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  thanks: Array<CommentThanks>
}

export type CommentThanksArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<CommentThanksWhereUniqueInput>
  before?: Maybe<CommentThanksWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type CommentThanks = {
  __typename?: 'CommentThanks'
  id: Scalars['Int']
  commentId: Scalars['Int']
  author: User
  comment: Comment
}

export type CommentThanksWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
  authorId_commentId?: Maybe<AuthorIdCommentIdCompoundUniqueInput>
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
  imageRole: ImageRole
  smallSize: Scalars['String']
  largeSize: Scalars['String']
}

export type ImageInput = {
  smallSize: Scalars['String']
  largeSize: Scalars['String']
  imageRole: ImageRole
}

export enum ImageRole {
  Headline = 'HEADLINE',
  Inline = 'INLINE',
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
  postCount?: Maybe<Scalars['Int']>
}

export type LanguagePostsArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<PostWhereUniqueInput>
  before?: Maybe<PostWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export enum LanguageLevel {
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE',
  Advanced = 'ADVANCED',
  Native = 'NATIVE',
}

export type LanguageRelation = {
  __typename?: 'LanguageRelation'
  id: Scalars['Int']
  language: Language
  level: LanguageLevel
}

export type LanguageRelationWhereUniqueInput = {
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
  deleteThread?: Maybe<Thread>
  createComment?: Maybe<Comment>
  updateComment?: Maybe<Comment>
  deleteComment?: Maybe<Comment>
  createPostComment?: Maybe<PostComment>
  updatePostComment?: Maybe<PostComment>
  deletePostComment?: Maybe<PostComment>
  createPost?: Maybe<Post>
  updatePost?: Maybe<Post>
  createUser?: Maybe<User>
  updateUser?: Maybe<User>
  loginUser?: Maybe<User>
  requestResetPassword?: Maybe<User>
  resetPassword?: Maybe<User>
  logout?: Maybe<User>
  followUser?: Maybe<User>
  unfollowUser?: Maybe<User>
  addLanguageRelation?: Maybe<LanguageRelation>
  removeLanguageRelation?: Maybe<LanguageRelation>
  createCommentThanks?: Maybe<CommentThanks>
  deleteCommentThanks?: Maybe<CommentThanks>
}

export type MutationCreateThreadArgs = {
  postId: Scalars['Int']
  startIndex: Scalars['Int']
  endIndex: Scalars['Int']
  highlightedContent: Scalars['String']
}

export type MutationDeleteThreadArgs = {
  threadId: Scalars['Int']
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

export type MutationCreatePostCommentArgs = {
  postId: Scalars['Int']
  body: Scalars['String']
}

export type MutationUpdatePostCommentArgs = {
  postCommentId: Scalars['Int']
  body: Scalars['String']
}

export type MutationDeletePostCommentArgs = {
  postCommentId: Scalars['Int']
}

export type MutationCreatePostArgs = {
  title: Scalars['String']
  body?: Maybe<Array<EditorNode>>
  languageId: Scalars['Int']
  topicIds?: Maybe<Array<Scalars['Int']>>
  status?: Maybe<PostStatus>
  images?: Maybe<Array<ImageInput>>
}

export type MutationUpdatePostArgs = {
  postId: Scalars['Int']
  title?: Maybe<Scalars['String']>
  languageId?: Maybe<Scalars['Int']>
  topicIds?: Maybe<Array<Scalars['Int']>>
  body?: Maybe<Array<EditorNode>>
  status?: Maybe<PostStatus>
  images?: Maybe<Array<ImageInput>>
}

export type MutationCreateUserArgs = {
  handle: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationUpdateUserArgs = {
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  profileImage?: Maybe<Scalars['String']>
  bio?: Maybe<Scalars['String']>
}

export type MutationLoginUserArgs = {
  identifier: Scalars['String']
  password: Scalars['String']
}

export type MutationRequestResetPasswordArgs = {
  identifier: Scalars['String']
}

export type MutationResetPasswordArgs = {
  resetToken: Scalars['String']
  password: Scalars['String']
  confirmPassword: Scalars['String']
}

export type MutationFollowUserArgs = {
  followedUserId: Scalars['Int']
}

export type MutationUnfollowUserArgs = {
  followedUserId: Scalars['Int']
}

export type MutationAddLanguageRelationArgs = {
  languageId: Scalars['Int']
  level: LanguageLevel
}

export type MutationRemoveLanguageRelationArgs = {
  languageId: Scalars['Int']
}

export type MutationCreateCommentThanksArgs = {
  commentId: Scalars['Int']
}

export type MutationDeleteCommentThanksArgs = {
  commentThanksId: Scalars['Int']
}

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc',
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
  likes: Array<PostLike>
  threads: Array<Thread>
  postTopics: Array<PostTopic>
  postComments: Array<PostComment>
  language: Language
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  bodySrc: Scalars['String']
  images: Array<Image>
  publishedAt?: Maybe<Scalars['DateTime']>
  commentCount?: Maybe<Scalars['Int']>
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

export type PostPostTopicsArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<PostTopicWhereUniqueInput>
  before?: Maybe<PostTopicWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PostPostCommentsArgs = {
  orderBy?: Maybe<PostPostCommentsOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<PostCommentWhereUniqueInput>
  before?: Maybe<PostCommentWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PostImagesArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<ImageWhereUniqueInput>
  before?: Maybe<ImageWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PostComment = {
  __typename?: 'PostComment'
  id: Scalars['Int']
  author: User
  body: Scalars['String']
  createdAt: Scalars['DateTime']
}

export type PostCommentWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
}

export type PostIdTopicIdCompoundUniqueInput = {
  postId: Scalars['Int']
  topicId: Scalars['Int']
}

export type PostLike = {
  __typename?: 'PostLike'
  id: Scalars['Int']
}

export type PostLikeWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
  authorId_postId?: Maybe<AuthorIdPostIdCompoundUniqueInput>
}

export type PostPage = {
  __typename?: 'PostPage'
  posts?: Maybe<Array<Post>>
  count?: Maybe<Scalars['Int']>
}

export type PostPostCommentsOrderByInput = {
  createdAt?: Maybe<OrderByArg>
}

export enum PostStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type PostTopic = {
  __typename?: 'PostTopic'
  id: Scalars['Int']
  post: Post
  topic: Topic
}

export type PostTopicWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
  postId_topicId?: Maybe<PostIdTopicIdCompoundUniqueInput>
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
  userById?: Maybe<User>
  languages?: Maybe<Array<Language>>
  topics?: Maybe<Array<Topic>>
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
  languages?: Maybe<Array<Scalars['Int']>>
  topic?: Maybe<Scalars['Int']>
  skip?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  followedAuthors?: Maybe<Scalars['Boolean']>
}

export type QueryUserByIdArgs = {
  id: Scalars['Int']
}

export type QueryLanguagesArgs = {
  hasPosts?: Maybe<Scalars['Boolean']>
}

export type QueryTopicsArgs = {
  hasPosts?: Maybe<Scalars['Boolean']>
}

export type Thread = {
  __typename?: 'Thread'
  id: Scalars['Int']
  archived: Scalars['Boolean']
  startIndex: Scalars['Int']
  endIndex: Scalars['Int']
  highlightedContent: Scalars['String']
  comments: Array<Comment>
}

export type ThreadCommentsArgs = {
  orderBy?: Maybe<ThreadCommentsOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<CommentWhereUniqueInput>
  before?: Maybe<CommentWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type ThreadCommentsOrderByInput = {
  createdAt?: Maybe<OrderByArg>
}

export type ThreadWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
}

export type Topic = {
  __typename?: 'Topic'
  id: Scalars['Int']
  name?: Maybe<Scalars['String']>
}

export type TopicNameArgs = {
  uiLanguage: UiLanguage
}

export type TopicTranslation = {
  __typename?: 'TopicTranslation'
  id: Scalars['Int']
  name: Scalars['String']
  uiLanguage: UiLanguage
}

export enum UiLanguage {
  English = 'ENGLISH',
  German = 'GERMAN',
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
  languages: Array<LanguageRelation>
  following: Array<User>
  followedBy: Array<User>
  postsWrittenCount?: Maybe<Scalars['Int']>
  thanksReceivedCount?: Maybe<Scalars['Int']>
}

export type UserLanguagesArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<LanguageRelationWhereUniqueInput>
  before?: Maybe<LanguageRelationWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserFollowingArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<UserWhereUniqueInput>
  before?: Maybe<UserWhereUniqueInput>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type UserFollowedByArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<UserWhereUniqueInput>
  before?: Maybe<UserWhereUniqueInput>
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

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>
  email?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
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

export type CreatePostCommentMutationVariables = {
  body: Scalars['String']
  postId: Scalars['Int']
}

export type CreatePostCommentMutation = { __typename?: 'Mutation' } & {
  createPostComment?: Maybe<
    { __typename?: 'PostComment' } & Pick<PostComment, 'body'> & {
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

export type DeleteCommentMutationVariables = {
  commentId: Scalars['Int']
}

export type DeleteCommentMutation = { __typename?: 'Mutation' } & {
  deleteComment?: Maybe<{ __typename?: 'Comment' } & Pick<Comment, 'id'>>
}

export type DeletePostCommentMutationVariables = {
  postCommentId: Scalars['Int']
}

export type DeletePostCommentMutation = { __typename?: 'Mutation' } & {
  deletePostComment?: Maybe<{ __typename?: 'PostComment' } & Pick<PostComment, 'id'>>
}

export type DeleteThreadMutationVariables = {
  threadId: Scalars['Int']
}

export type DeleteThreadMutation = { __typename?: 'Mutation' } & {
  deleteThread?: Maybe<{ __typename?: 'Thread' } & Pick<Thread, 'id'>>
}

export type UpdateCommentMutationVariables = {
  body: Scalars['String']
  commentId: Scalars['Int']
}

export type UpdateCommentMutation = { __typename?: 'Mutation' } & {
  updateComment?: Maybe<{ __typename?: 'Comment' } & CommentFragmentFragment>
}

export type UpdatePostCommentMutationVariables = {
  body: Scalars['String']
  postCommentId: Scalars['Int']
}

export type UpdatePostCommentMutation = { __typename?: 'Mutation' } & {
  updatePostComment?: Maybe<{ __typename?: 'PostComment' } & PostCommentFragmentFragment>
}

export type UserFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'handle' | 'email' | 'bio' | 'userRole' | 'profileImage'
>

export type UserWithStatsFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  'postsWrittenCount' | 'thanksReceivedCount'
> &
  UserFragmentFragment

export type UserWithLanguagesFragmentFragment = { __typename?: 'User' } & {
  languages: Array<
    { __typename?: 'LanguageRelation' } & Pick<LanguageRelation, 'id' | 'level'> & {
        language: { __typename?: 'Language' } & LanguageFragmentFragment
      }
  >
} & UserFragmentFragment

export type AuthorFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'name' | 'handle' | 'profileImage'
>

export type AuthorWithStatsFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  'postsWrittenCount' | 'thanksReceivedCount'
> &
  AuthorFragmentFragment

export type AuthorWithLanguagesFragmentFragment = { __typename?: 'User' } & {
  languages: Array<
    { __typename?: 'LanguageRelation' } & Pick<LanguageRelation, 'level'> & {
        language: { __typename?: 'Language' } & LanguageFragmentFragment
      }
  >
} & AuthorWithStatsFragmentFragment

export type CommentFragmentFragment = { __typename?: 'Comment' } & Pick<
  Comment,
  'id' | 'body' | 'createdAt'
> & {
    author: { __typename?: 'User' } & AuthorFragmentFragment
    thanks: Array<
      { __typename?: 'CommentThanks' } & Pick<CommentThanks, 'id'> & {
          author: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'handle'>
        }
    >
  }

export type CommentThanksFragmentFragment = { __typename?: 'CommentThanks' } & Pick<
  CommentThanks,
  'id'
> & { author: { __typename?: 'User' } & AuthorFragmentFragment }

export type PostCommentFragmentFragment = { __typename?: 'PostComment' } & Pick<
  PostComment,
  'id' | 'body' | 'createdAt'
> & { author: { __typename?: 'User' } & AuthorFragmentFragment }

export type ThreadFragmentFragment = { __typename?: 'Thread' } & Pick<
  Thread,
  'id' | 'startIndex' | 'endIndex' | 'highlightedContent' | 'archived'
> & { comments: Array<{ __typename?: 'Comment' } & CommentFragmentFragment> }

export type PostFragmentFragment = { __typename?: 'Post' } & Pick<
  Post,
  'id' | 'title' | 'body' | 'status' | 'excerpt' | 'readTime' | 'createdAt' | 'publishedAt'
> & {
    author: { __typename?: 'User' } & AuthorWithLanguagesFragmentFragment
    threads: Array<{ __typename?: 'Thread' } & ThreadFragmentFragment>
    postComments: Array<{ __typename?: 'PostComment' } & PostCommentFragmentFragment>
    images: Array<
      { __typename?: 'Image' } & Pick<Image, 'id' | 'smallSize' | 'largeSize' | 'imageRole'>
    >
  }

export type PostWithTopicsFragmentFragment = { __typename?: 'Post' } & {
  postTopics: Array<{ __typename?: 'PostTopic' } & PostTopicFragmentFragment>
  language: { __typename?: 'Language' } & Pick<Language, 'id' | 'name' | 'dialect'>
} & PostFragmentFragment

export type PostCardFragmentFragment = { __typename?: 'Post' } & Pick<
  Post,
  'id' | 'title' | 'body' | 'excerpt' | 'readTime' | 'createdAt' | 'publishedAt' | 'commentCount'
> & {
    images: Array<{ __typename?: 'Image' } & Pick<Image, 'smallSize'>>
    likes: Array<{ __typename?: 'PostLike' } & Pick<PostLike, 'id'>>
    author: { __typename?: 'User' } & AuthorWithLanguagesFragmentFragment
    language: { __typename?: 'Language' } & LanguageFragmentFragment
  }

export type LanguageFragmentFragment = { __typename?: 'Language' } & Pick<
  Language,
  'id' | 'name' | 'dialect'
>

export type LanguageWithPostCountFragmentFragment = { __typename?: 'Language' } & Pick<
  Language,
  'postCount'
> &
  LanguageFragmentFragment

export type TopicFragmentFragment = { __typename?: 'Topic' } & Pick<Topic, 'id' | 'name'>

export type PostTopicFragmentFragment = { __typename?: 'PostTopic' } & {
  topic: { __typename?: 'Topic' } & TopicFragmentFragment
}

export type AddLanguageRelationMutationVariables = {
  languageId: Scalars['Int']
}

export type AddLanguageRelationMutation = { __typename?: 'Mutation' } & {
  addLanguageRelation?: Maybe<
    { __typename?: 'LanguageRelation' } & {
      language: { __typename?: 'Language' } & Pick<Language, 'id'>
    }
  >
}

export type LanguagesQueryVariables = {
  hasPosts?: Maybe<Scalars['Boolean']>
}

export type LanguagesQuery = { __typename?: 'Query' } & {
  languages?: Maybe<Array<{ __typename?: 'Language' } & LanguageWithPostCountFragmentFragment>>
}

export type LanguagesFormDataQueryVariables = {}

export type LanguagesFormDataQuery = { __typename?: 'Query' } & {
  languages?: Maybe<Array<{ __typename?: 'Language' } & LanguageFragmentFragment>>
  currentUser?: Maybe<
    { __typename?: 'User' } & {
      languages: Array<
        { __typename?: 'LanguageRelation' } & Pick<LanguageRelation, 'id' | 'level'> & {
            language: { __typename?: 'Language' } & LanguageFragmentFragment
          }
      >
    }
  >
}

export type RemoveLanguageRelationMutationVariables = {
  languageId: Scalars['Int']
}

export type RemoveLanguageRelationMutation = { __typename?: 'Mutation' } & {
  removeLanguageRelation?: Maybe<{ __typename?: 'LanguageRelation' } & Pick<LanguageRelation, 'id'>>
}

export type CreatePostMutationVariables = {
  title: Scalars['String']
  body?: Maybe<Array<EditorNode>>
  languageId: Scalars['Int']
  topicIds?: Maybe<Array<Scalars['Int']>>
  status: PostStatus
  images?: Maybe<Array<ImageInput>>
}

export type CreatePostMutation = { __typename?: 'Mutation' } & {
  createPost?: Maybe<{ __typename?: 'Post' } & Pick<Post, 'id'>>
}

export type EditPostQueryVariables = {
  id: Scalars['Int']
  uiLanguage: UiLanguage
}

export type EditPostQuery = { __typename?: 'Query' } & {
  postById?: Maybe<
    { __typename?: 'Post' } & Pick<Post, 'title' | 'bodySrc' | 'updatedAt'> & {
        language: { __typename?: 'Language' } & Pick<Language, 'id'>
        images: Array<
          { __typename?: 'Image' } & Pick<Image, 'id' | 'largeSize' | 'smallSize' | 'imageRole'>
        >
        postTopics: Array<
          { __typename?: 'PostTopic' } & { topic: { __typename?: 'Topic' } & TopicFragmentFragment }
        >
      }
  >
  topics?: Maybe<Array<{ __typename?: 'Topic' } & TopicFragmentFragment>>
  currentUser?: Maybe<{ __typename?: 'User' } & UserWithLanguagesFragmentFragment>
}

export type FeedQueryVariables = {
  first: Scalars['Int']
  skip: Scalars['Int']
  search?: Maybe<Scalars['String']>
  languages?: Maybe<Array<Scalars['Int']>>
  topic?: Maybe<Scalars['Int']>
  followedAuthors?: Maybe<Scalars['Boolean']>
}

export type FeedQuery = { __typename?: 'Query' } & {
  feed?: Maybe<
    { __typename?: 'PostPage' } & Pick<PostPage, 'count'> & {
        posts?: Maybe<Array<{ __typename?: 'Post' } & PostCardFragmentFragment>>
      }
  >
}

export type NewPostQueryVariables = {
  uiLanguage: UiLanguage
}

export type NewPostQuery = { __typename?: 'Query' } & {
  topics?: Maybe<Array<{ __typename?: 'Topic' } & TopicFragmentFragment>>
  currentUser?: Maybe<{ __typename?: 'User' } & UserWithLanguagesFragmentFragment>
}

export type PostByIdQueryVariables = {
  id: Scalars['Int']
  uiLanguage: UiLanguage
}

export type PostByIdQuery = { __typename?: 'Query' } & {
  postById?: Maybe<{ __typename?: 'Post' } & PostWithTopicsFragmentFragment>
}

export type PostsQueryVariables = {
  authorId: Scalars['Int']
  status: PostStatus
}

export type PostsQuery = { __typename?: 'Query' } & {
  posts?: Maybe<Array<{ __typename?: 'Post' } & PostCardFragmentFragment>>
}

export type UpdatePostMutationVariables = {
  postId: Scalars['Int']
  title?: Maybe<Scalars['String']>
  languageId?: Maybe<Scalars['Int']>
  topicIds?: Maybe<Array<Scalars['Int']>>
  body?: Maybe<Array<EditorNode>>
  status?: Maybe<PostStatus>
  images?: Maybe<Array<ImageInput>>
}

export type UpdatePostMutation = { __typename?: 'Mutation' } & {
  updatePost?: Maybe<{ __typename?: 'Post' } & PostFragmentFragment>
}

export type ProfileQueryVariables = {
  userId: Scalars['Int']
}

export type ProfileQuery = { __typename?: 'Query' } & {
  userById?: Maybe<{ __typename?: 'User' } & UserWithLanguagesFragmentFragment>
  posts?: Maybe<Array<{ __typename?: 'Post' } & PostCardFragmentFragment>>
  currentUser?: Maybe<{ __typename?: 'User' } & UserWithLanguagesFragmentFragment>
}

export type CreateCommentThanksMutationVariables = {
  commentId: Scalars['Int']
}

export type CreateCommentThanksMutation = { __typename?: 'Mutation' } & {
  createCommentThanks?: Maybe<{ __typename?: 'CommentThanks' } & CommentThanksFragmentFragment>
}

export type DeleteCommentThanksMutationVariables = {
  commentThanksId: Scalars['Int']
}

export type DeleteCommentThanksMutation = { __typename?: 'Mutation' } & {
  deleteCommentThanks?: Maybe<{ __typename?: 'CommentThanks' } & Pick<CommentThanks, 'id'>>
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
  currentUser?: Maybe<{ __typename?: 'User' } & UserWithLanguagesFragmentFragment>
}

export type FollowUserMutationVariables = {
  followedUserId: Scalars['Int']
}

export type FollowUserMutation = { __typename?: 'Mutation' } & {
  followUser?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>
}

export type FollowingUsersQueryVariables = {}

export type FollowingUsersQuery = { __typename?: 'Query' } & {
  currentUser?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id'> & {
        following: Array<{ __typename?: 'User' } & Pick<User, 'id'>>
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

export type RequestResetPasswordMutationVariables = {
  identifier: Scalars['String']
}

export type RequestResetPasswordMutation = { __typename?: 'Mutation' } & {
  requestResetPassword?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>
}

export type ResetPasswordMutationVariables = {
  resetToken: Scalars['String']
  password: Scalars['String']
  confirmPassword: Scalars['String']
}

export type ResetPasswordMutation = { __typename?: 'Mutation' } & {
  resetPassword?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>
}

export type SettingsFormDataQueryVariables = {}

export type SettingsFormDataQuery = { __typename?: 'Query' } & {
  languages?: Maybe<Array<{ __typename?: 'Language' } & LanguageFragmentFragment>>
  currentUser?: Maybe<
    { __typename?: 'User' } & Pick<User, 'bio'> & {
        languages: Array<
          { __typename?: 'LanguageRelation' } & Pick<LanguageRelation, 'id' | 'level'> & {
              language: { __typename?: 'Language' } & LanguageFragmentFragment
            }
        >
      }
  >
}

export type UnfollowUserMutationVariables = {
  followedUserId: Scalars['Int']
}

export type UnfollowUserMutation = { __typename?: 'Mutation' } & {
  unfollowUser?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>
}

export type UpdateUserMutationVariables = {
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  profileImage?: Maybe<Scalars['String']>
  bio?: Maybe<Scalars['String']>
}

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser?: Maybe<{ __typename?: 'User' } & UserFragmentFragment>
}

export type UserByIdQueryVariables = {
  id: Scalars['Int']
}

export type UserByIdQuery = { __typename?: 'Query' } & {
  userById?: Maybe<{ __typename?: 'User' } & UserWithLanguagesFragmentFragment>
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
    bio
    userRole
    profileImage
  }
`
export const UserWithStatsFragmentFragmentDoc = gql`
  fragment UserWithStatsFragment on User {
    ...UserFragment
    postsWrittenCount
    thanksReceivedCount
  }
  ${UserFragmentFragmentDoc}
`
export const LanguageFragmentFragmentDoc = gql`
  fragment LanguageFragment on Language {
    id
    name
    dialect
  }
`
export const UserWithLanguagesFragmentFragmentDoc = gql`
  fragment UserWithLanguagesFragment on User {
    ...UserFragment
    languages {
      id
      level
      language {
        ...LanguageFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${LanguageFragmentFragmentDoc}
`
export const AuthorFragmentFragmentDoc = gql`
  fragment AuthorFragment on User {
    id
    name
    handle
    profileImage
  }
`
export const CommentThanksFragmentFragmentDoc = gql`
  fragment CommentThanksFragment on CommentThanks {
    id
    author {
      ...AuthorFragment
    }
  }
  ${AuthorFragmentFragmentDoc}
`
export const AuthorWithStatsFragmentFragmentDoc = gql`
  fragment AuthorWithStatsFragment on User {
    ...AuthorFragment
    postsWrittenCount
    thanksReceivedCount
  }
  ${AuthorFragmentFragmentDoc}
`
export const AuthorWithLanguagesFragmentFragmentDoc = gql`
  fragment AuthorWithLanguagesFragment on User {
    ...AuthorWithStatsFragment
    languages {
      language {
        ...LanguageFragment
      }
      level
    }
  }
  ${AuthorWithStatsFragmentFragmentDoc}
  ${LanguageFragmentFragmentDoc}
`
export const CommentFragmentFragmentDoc = gql`
  fragment CommentFragment on Comment {
    id
    body
    createdAt
    author {
      ...AuthorFragment
    }
    thanks {
      id
      author {
        id
        name
        handle
      }
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
    archived
    comments(orderBy: { createdAt: asc }) {
      ...CommentFragment
    }
  }
  ${CommentFragmentFragmentDoc}
`
export const PostCommentFragmentFragmentDoc = gql`
  fragment PostCommentFragment on PostComment {
    id
    body
    createdAt
    author {
      ...AuthorFragment
    }
  }
  ${AuthorFragmentFragmentDoc}
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
    publishedAt
    author {
      ...AuthorWithLanguagesFragment
    }
    threads {
      ...ThreadFragment
    }
    postComments(orderBy: { createdAt: asc }) {
      ...PostCommentFragment
    }
    images {
      id
      smallSize
      largeSize
      imageRole
    }
  }
  ${AuthorWithLanguagesFragmentFragmentDoc}
  ${ThreadFragmentFragmentDoc}
  ${PostCommentFragmentFragmentDoc}
`
export const TopicFragmentFragmentDoc = gql`
  fragment TopicFragment on Topic {
    id
    name(uiLanguage: $uiLanguage)
  }
`
export const PostTopicFragmentFragmentDoc = gql`
  fragment PostTopicFragment on PostTopic {
    topic {
      ...TopicFragment
    }
  }
  ${TopicFragmentFragmentDoc}
`
export const PostWithTopicsFragmentFragmentDoc = gql`
  fragment PostWithTopicsFragment on Post {
    ...PostFragment
    postTopics {
      ...PostTopicFragment
    }
    language {
      id
      name
      dialect
    }
  }
  ${PostFragmentFragmentDoc}
  ${PostTopicFragmentFragmentDoc}
`
export const PostCardFragmentFragmentDoc = gql`
  fragment PostCardFragment on Post {
    id
    title
    body
    excerpt
    readTime
    createdAt
    publishedAt
    commentCount
    images {
      smallSize
    }
    likes {
      id
    }
    author {
      ...AuthorWithLanguagesFragment
    }
    language {
      ...LanguageFragment
    }
  }
  ${AuthorWithLanguagesFragmentFragmentDoc}
  ${LanguageFragmentFragmentDoc}
`
export const LanguageWithPostCountFragmentFragmentDoc = gql`
  fragment LanguageWithPostCountFragment on Language {
    ...LanguageFragment
    postCount
  }
  ${LanguageFragmentFragmentDoc}
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
export const CreatePostCommentDocument = gql`
  mutation createPostComment($body: String!, $postId: Int!) {
    createPostComment(body: $body, postId: $postId) {
      body
      author {
        id
        name
        handle
      }
    }
  }
`
export type CreatePostCommentMutationFn = ApolloReactCommon.MutationFunction<
  CreatePostCommentMutation,
  CreatePostCommentMutationVariables
>

/**
 * __useCreatePostCommentMutation__
 *
 * To run a mutation, you first call `useCreatePostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostCommentMutation, { data, loading, error }] = useCreatePostCommentMutation({
 *   variables: {
 *      body: // value for 'body'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreatePostCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePostCommentMutation,
    CreatePostCommentMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreatePostCommentMutation,
    CreatePostCommentMutationVariables
  >(CreatePostCommentDocument, baseOptions)
}
export type CreatePostCommentMutationHookResult = ReturnType<typeof useCreatePostCommentMutation>
export type CreatePostCommentMutationResult = ApolloReactCommon.MutationResult<
  CreatePostCommentMutation
>
export type CreatePostCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePostCommentMutation,
  CreatePostCommentMutationVariables
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
export const DeletePostCommentDocument = gql`
  mutation deletePostComment($postCommentId: Int!) {
    deletePostComment(postCommentId: $postCommentId) {
      id
    }
  }
`
export type DeletePostCommentMutationFn = ApolloReactCommon.MutationFunction<
  DeletePostCommentMutation,
  DeletePostCommentMutationVariables
>

/**
 * __useDeletePostCommentMutation__
 *
 * To run a mutation, you first call `useDeletePostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostCommentMutation, { data, loading, error }] = useDeletePostCommentMutation({
 *   variables: {
 *      postCommentId: // value for 'postCommentId'
 *   },
 * });
 */
export function useDeletePostCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeletePostCommentMutation,
    DeletePostCommentMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeletePostCommentMutation,
    DeletePostCommentMutationVariables
  >(DeletePostCommentDocument, baseOptions)
}
export type DeletePostCommentMutationHookResult = ReturnType<typeof useDeletePostCommentMutation>
export type DeletePostCommentMutationResult = ApolloReactCommon.MutationResult<
  DeletePostCommentMutation
>
export type DeletePostCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeletePostCommentMutation,
  DeletePostCommentMutationVariables
>
export const DeleteThreadDocument = gql`
  mutation deleteThread($threadId: Int!) {
    deleteThread(threadId: $threadId) {
      id
    }
  }
`
export type DeleteThreadMutationFn = ApolloReactCommon.MutationFunction<
  DeleteThreadMutation,
  DeleteThreadMutationVariables
>

/**
 * __useDeleteThreadMutation__
 *
 * To run a mutation, you first call `useDeleteThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteThreadMutation, { data, loading, error }] = useDeleteThreadMutation({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useDeleteThreadMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteThreadMutation,
    DeleteThreadMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<DeleteThreadMutation, DeleteThreadMutationVariables>(
    DeleteThreadDocument,
    baseOptions,
  )
}
export type DeleteThreadMutationHookResult = ReturnType<typeof useDeleteThreadMutation>
export type DeleteThreadMutationResult = ApolloReactCommon.MutationResult<DeleteThreadMutation>
export type DeleteThreadMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteThreadMutation,
  DeleteThreadMutationVariables
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
export const UpdatePostCommentDocument = gql`
  mutation updatePostComment($body: String!, $postCommentId: Int!) {
    updatePostComment(body: $body, postCommentId: $postCommentId) {
      ...PostCommentFragment
    }
  }
  ${PostCommentFragmentFragmentDoc}
`
export type UpdatePostCommentMutationFn = ApolloReactCommon.MutationFunction<
  UpdatePostCommentMutation,
  UpdatePostCommentMutationVariables
>

/**
 * __useUpdatePostCommentMutation__
 *
 * To run a mutation, you first call `useUpdatePostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostCommentMutation, { data, loading, error }] = useUpdatePostCommentMutation({
 *   variables: {
 *      body: // value for 'body'
 *      postCommentId: // value for 'postCommentId'
 *   },
 * });
 */
export function useUpdatePostCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdatePostCommentMutation,
    UpdatePostCommentMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdatePostCommentMutation,
    UpdatePostCommentMutationVariables
  >(UpdatePostCommentDocument, baseOptions)
}
export type UpdatePostCommentMutationHookResult = ReturnType<typeof useUpdatePostCommentMutation>
export type UpdatePostCommentMutationResult = ApolloReactCommon.MutationResult<
  UpdatePostCommentMutation
>
export type UpdatePostCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePostCommentMutation,
  UpdatePostCommentMutationVariables
>
export const AddLanguageRelationDocument = gql`
  mutation addLanguageRelation($languageId: Int!) {
    addLanguageRelation(languageId: $languageId, level: BEGINNER) {
      language {
        id
      }
    }
  }
`
export type AddLanguageRelationMutationFn = ApolloReactCommon.MutationFunction<
  AddLanguageRelationMutation,
  AddLanguageRelationMutationVariables
>

/**
 * __useAddLanguageRelationMutation__
 *
 * To run a mutation, you first call `useAddLanguageRelationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLanguageRelationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLanguageRelationMutation, { data, loading, error }] = useAddLanguageRelationMutation({
 *   variables: {
 *      languageId: // value for 'languageId'
 *   },
 * });
 */
export function useAddLanguageRelationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddLanguageRelationMutation,
    AddLanguageRelationMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AddLanguageRelationMutation,
    AddLanguageRelationMutationVariables
  >(AddLanguageRelationDocument, baseOptions)
}
export type AddLanguageRelationMutationHookResult = ReturnType<
  typeof useAddLanguageRelationMutation
>
export type AddLanguageRelationMutationResult = ApolloReactCommon.MutationResult<
  AddLanguageRelationMutation
>
export type AddLanguageRelationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddLanguageRelationMutation,
  AddLanguageRelationMutationVariables
>
export const LanguagesDocument = gql`
  query languages($hasPosts: Boolean) {
    languages(hasPosts: $hasPosts) {
      ...LanguageWithPostCountFragment
    }
  }
  ${LanguageWithPostCountFragmentFragmentDoc}
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
 *      hasPosts: // value for 'hasPosts'
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
      languages {
        id
        level
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
export const RemoveLanguageRelationDocument = gql`
  mutation removeLanguageRelation($languageId: Int!) {
    removeLanguageRelation(languageId: $languageId) {
      id
    }
  }
`
export type RemoveLanguageRelationMutationFn = ApolloReactCommon.MutationFunction<
  RemoveLanguageRelationMutation,
  RemoveLanguageRelationMutationVariables
>

/**
 * __useRemoveLanguageRelationMutation__
 *
 * To run a mutation, you first call `useRemoveLanguageRelationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLanguageRelationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLanguageRelationMutation, { data, loading, error }] = useRemoveLanguageRelationMutation({
 *   variables: {
 *      languageId: // value for 'languageId'
 *   },
 * });
 */
export function useRemoveLanguageRelationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveLanguageRelationMutation,
    RemoveLanguageRelationMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RemoveLanguageRelationMutation,
    RemoveLanguageRelationMutationVariables
  >(RemoveLanguageRelationDocument, baseOptions)
}
export type RemoveLanguageRelationMutationHookResult = ReturnType<
  typeof useRemoveLanguageRelationMutation
>
export type RemoveLanguageRelationMutationResult = ApolloReactCommon.MutationResult<
  RemoveLanguageRelationMutation
>
export type RemoveLanguageRelationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveLanguageRelationMutation,
  RemoveLanguageRelationMutationVariables
>
export const CreatePostDocument = gql`
  mutation createPost(
    $title: String!
    $body: [EditorNode!]
    $languageId: Int!
    $topicIds: [Int!]
    $status: PostStatus!
    $images: [ImageInput!]
  ) {
    createPost(
      title: $title
      body: $body
      languageId: $languageId
      topicIds: $topicIds
      status: $status
      images: $images
    ) {
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
 *      topicIds: // value for 'topicIds'
 *      status: // value for 'status'
 *      images: // value for 'images'
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
export const EditPostDocument = gql`
  query editPost($id: Int!, $uiLanguage: UILanguage!) {
    postById(id: $id) {
      title
      bodySrc
      updatedAt
      language {
        id
      }
      images {
        id
        largeSize
        smallSize
        imageRole
      }
      postTopics {
        topic {
          ...TopicFragment
        }
      }
    }
    topics {
      ...TopicFragment
    }
    currentUser {
      ...UserWithLanguagesFragment
    }
  }
  ${TopicFragmentFragmentDoc}
  ${UserWithLanguagesFragmentFragmentDoc}
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
 *      uiLanguage: // value for 'uiLanguage'
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
  query feed(
    $first: Int!
    $skip: Int!
    $search: String
    $languages: [Int!]
    $topic: Int
    $followedAuthors: Boolean
  ) {
    feed(
      first: $first
      skip: $skip
      search: $search
      languages: $languages
      topic: $topic
      followedAuthors: $followedAuthors
    ) {
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
 *      search: // value for 'search'
 *      languages: // value for 'languages'
 *      topic: // value for 'topic'
 *      followedAuthors: // value for 'followedAuthors'
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
export const NewPostDocument = gql`
  query newPost($uiLanguage: UILanguage!) {
    topics {
      ...TopicFragment
    }
    currentUser {
      ...UserWithLanguagesFragment
    }
  }
  ${TopicFragmentFragmentDoc}
  ${UserWithLanguagesFragmentFragmentDoc}
`

/**
 * __useNewPostQuery__
 *
 * To run a query within a React component, call `useNewPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewPostQuery({
 *   variables: {
 *      uiLanguage: // value for 'uiLanguage'
 *   },
 * });
 */
export function useNewPostQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<NewPostQuery, NewPostQueryVariables>,
) {
  return ApolloReactHooks.useQuery<NewPostQuery, NewPostQueryVariables>(
    NewPostDocument,
    baseOptions,
  )
}
export function useNewPostLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NewPostQuery, NewPostQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<NewPostQuery, NewPostQueryVariables>(
    NewPostDocument,
    baseOptions,
  )
}
export type NewPostQueryHookResult = ReturnType<typeof useNewPostQuery>
export type NewPostLazyQueryHookResult = ReturnType<typeof useNewPostLazyQuery>
export type NewPostQueryResult = ApolloReactCommon.QueryResult<NewPostQuery, NewPostQueryVariables>
export const PostByIdDocument = gql`
  query postById($id: Int!, $uiLanguage: UILanguage!) {
    postById(id: $id) {
      ...PostWithTopicsFragment
    }
  }
  ${PostWithTopicsFragmentFragmentDoc}
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
 *      uiLanguage: // value for 'uiLanguage'
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
export const UpdatePostDocument = gql`
  mutation updatePost(
    $postId: Int!
    $title: String
    $languageId: Int
    $topicIds: [Int!]
    $body: [EditorNode!]
    $status: PostStatus
    $images: [ImageInput!]
  ) {
    updatePost(
      postId: $postId
      body: $body
      title: $title
      languageId: $languageId
      status: $status
      images: $images
      topicIds: $topicIds
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
 *      topicIds: // value for 'topicIds'
 *      body: // value for 'body'
 *      status: // value for 'status'
 *      images: // value for 'images'
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
export const ProfileDocument = gql`
  query profile($userId: Int!) {
    userById(id: $userId) {
      ...UserWithLanguagesFragment
    }
    posts(authorId: $userId, status: PUBLISHED) {
      ...PostCardFragment
    }
    currentUser {
      ...UserWithLanguagesFragment
    }
  }
  ${UserWithLanguagesFragmentFragmentDoc}
  ${PostCardFragmentFragmentDoc}
`

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useProfileQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ProfileQuery, ProfileQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ProfileQuery, ProfileQueryVariables>(
    ProfileDocument,
    baseOptions,
  )
}
export function useProfileLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ProfileQuery, ProfileQueryVariables>(
    ProfileDocument,
    baseOptions,
  )
}
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>
export type ProfileQueryResult = ApolloReactCommon.QueryResult<ProfileQuery, ProfileQueryVariables>
export const CreateCommentThanksDocument = gql`
  mutation createCommentThanks($commentId: Int!) {
    createCommentThanks(commentId: $commentId) {
      ...CommentThanksFragment
    }
  }
  ${CommentThanksFragmentFragmentDoc}
`
export type CreateCommentThanksMutationFn = ApolloReactCommon.MutationFunction<
  CreateCommentThanksMutation,
  CreateCommentThanksMutationVariables
>

/**
 * __useCreateCommentThanksMutation__
 *
 * To run a mutation, you first call `useCreateCommentThanksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentThanksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentThanksMutation, { data, loading, error }] = useCreateCommentThanksMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useCreateCommentThanksMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateCommentThanksMutation,
    CreateCommentThanksMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateCommentThanksMutation,
    CreateCommentThanksMutationVariables
  >(CreateCommentThanksDocument, baseOptions)
}
export type CreateCommentThanksMutationHookResult = ReturnType<
  typeof useCreateCommentThanksMutation
>
export type CreateCommentThanksMutationResult = ApolloReactCommon.MutationResult<
  CreateCommentThanksMutation
>
export type CreateCommentThanksMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCommentThanksMutation,
  CreateCommentThanksMutationVariables
>
export const DeleteCommentThanksDocument = gql`
  mutation deleteCommentThanks($commentThanksId: Int!) {
    deleteCommentThanks(commentThanksId: $commentThanksId) {
      id
    }
  }
`
export type DeleteCommentThanksMutationFn = ApolloReactCommon.MutationFunction<
  DeleteCommentThanksMutation,
  DeleteCommentThanksMutationVariables
>

/**
 * __useDeleteCommentThanksMutation__
 *
 * To run a mutation, you first call `useDeleteCommentThanksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentThanksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentThanksMutation, { data, loading, error }] = useDeleteCommentThanksMutation({
 *   variables: {
 *      commentThanksId: // value for 'commentThanksId'
 *   },
 * });
 */
export function useDeleteCommentThanksMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteCommentThanksMutation,
    DeleteCommentThanksMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteCommentThanksMutation,
    DeleteCommentThanksMutationVariables
  >(DeleteCommentThanksDocument, baseOptions)
}
export type DeleteCommentThanksMutationHookResult = ReturnType<
  typeof useDeleteCommentThanksMutation
>
export type DeleteCommentThanksMutationResult = ApolloReactCommon.MutationResult<
  DeleteCommentThanksMutation
>
export type DeleteCommentThanksMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteCommentThanksMutation,
  DeleteCommentThanksMutationVariables
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
      ...UserWithLanguagesFragment
    }
  }
  ${UserWithLanguagesFragmentFragmentDoc}
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
export const FollowUserDocument = gql`
  mutation followUser($followedUserId: Int!) {
    followUser(followedUserId: $followedUserId) {
      id
    }
  }
`
export type FollowUserMutationFn = ApolloReactCommon.MutationFunction<
  FollowUserMutation,
  FollowUserMutationVariables
>

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      followedUserId: // value for 'followedUserId'
 *   },
 * });
 */
export function useFollowUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    FollowUserMutation,
    FollowUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<FollowUserMutation, FollowUserMutationVariables>(
    FollowUserDocument,
    baseOptions,
  )
}
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>
export type FollowUserMutationResult = ApolloReactCommon.MutationResult<FollowUserMutation>
export type FollowUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  FollowUserMutation,
  FollowUserMutationVariables
>
export const FollowingUsersDocument = gql`
  query followingUsers {
    currentUser {
      id
      following {
        id
      }
    }
  }
`

/**
 * __useFollowingUsersQuery__
 *
 * To run a query within a React component, call `useFollowingUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowingUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowingUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFollowingUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FollowingUsersQuery,
    FollowingUsersQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<FollowingUsersQuery, FollowingUsersQueryVariables>(
    FollowingUsersDocument,
    baseOptions,
  )
}
export function useFollowingUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FollowingUsersQuery,
    FollowingUsersQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<FollowingUsersQuery, FollowingUsersQueryVariables>(
    FollowingUsersDocument,
    baseOptions,
  )
}
export type FollowingUsersQueryHookResult = ReturnType<typeof useFollowingUsersQuery>
export type FollowingUsersLazyQueryHookResult = ReturnType<typeof useFollowingUsersLazyQuery>
export type FollowingUsersQueryResult = ApolloReactCommon.QueryResult<
  FollowingUsersQuery,
  FollowingUsersQueryVariables
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
export const RequestResetPasswordDocument = gql`
  mutation requestResetPassword($identifier: String!) {
    requestResetPassword(identifier: $identifier) {
      id
    }
  }
`
export type RequestResetPasswordMutationFn = ApolloReactCommon.MutationFunction<
  RequestResetPasswordMutation,
  RequestResetPasswordMutationVariables
>

/**
 * __useRequestResetPasswordMutation__
 *
 * To run a mutation, you first call `useRequestResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestResetPasswordMutation, { data, loading, error }] = useRequestResetPasswordMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *   },
 * });
 */
export function useRequestResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RequestResetPasswordMutation,
    RequestResetPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RequestResetPasswordMutation,
    RequestResetPasswordMutationVariables
  >(RequestResetPasswordDocument, baseOptions)
}
export type RequestResetPasswordMutationHookResult = ReturnType<
  typeof useRequestResetPasswordMutation
>
export type RequestResetPasswordMutationResult = ApolloReactCommon.MutationResult<
  RequestResetPasswordMutation
>
export type RequestResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RequestResetPasswordMutation,
  RequestResetPasswordMutationVariables
>
export const ResetPasswordDocument = gql`
  mutation resetPassword($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
    }
  }
`
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      resetToken: // value for 'resetToken'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    ResetPasswordDocument,
    baseOptions,
  )
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>
export const SettingsFormDataDocument = gql`
  query settingsFormData {
    languages {
      ...LanguageFragment
    }
    currentUser {
      bio
      languages {
        id
        level
        language {
          ...LanguageFragment
        }
      }
    }
  }
  ${LanguageFragmentFragmentDoc}
`

/**
 * __useSettingsFormDataQuery__
 *
 * To run a query within a React component, call `useSettingsFormDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsFormDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsFormDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useSettingsFormDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SettingsFormDataQuery,
    SettingsFormDataQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<SettingsFormDataQuery, SettingsFormDataQueryVariables>(
    SettingsFormDataDocument,
    baseOptions,
  )
}
export function useSettingsFormDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SettingsFormDataQuery,
    SettingsFormDataQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<SettingsFormDataQuery, SettingsFormDataQueryVariables>(
    SettingsFormDataDocument,
    baseOptions,
  )
}
export type SettingsFormDataQueryHookResult = ReturnType<typeof useSettingsFormDataQuery>
export type SettingsFormDataLazyQueryHookResult = ReturnType<typeof useSettingsFormDataLazyQuery>
export type SettingsFormDataQueryResult = ApolloReactCommon.QueryResult<
  SettingsFormDataQuery,
  SettingsFormDataQueryVariables
>
export const UnfollowUserDocument = gql`
  mutation unfollowUser($followedUserId: Int!) {
    unfollowUser(followedUserId: $followedUserId) {
      id
    }
  }
`
export type UnfollowUserMutationFn = ApolloReactCommon.MutationFunction<
  UnfollowUserMutation,
  UnfollowUserMutationVariables
>

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      followedUserId: // value for 'followedUserId'
 *   },
 * });
 */
export function useUnfollowUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UnfollowUserMutation,
    UnfollowUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(
    UnfollowUserDocument,
    baseOptions,
  )
}
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>
export type UnfollowUserMutationResult = ApolloReactCommon.MutationResult<UnfollowUserMutation>
export type UnfollowUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UnfollowUserMutation,
  UnfollowUserMutationVariables
>
export const UpdateUserDocument = gql`
  mutation updateUser($email: String, $name: String, $profileImage: String, $bio: String) {
    updateUser(email: $email, name: $name, profileImage: $profileImage, bio: $bio) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      profileImage: // value for 'profileImage'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    baseOptions,
  )
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const UserByIdDocument = gql`
  query userById($id: Int!) {
    userById(id: $id) {
      ...UserWithLanguagesFragment
    }
  }
  ${UserWithLanguagesFragmentFragmentDoc}
`

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>,
) {
  return ApolloReactHooks.useQuery<UserByIdQuery, UserByIdQueryVariables>(
    UserByIdDocument,
    baseOptions,
  )
}
export function useUserByIdLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(
    UserByIdDocument,
    baseOptions,
  )
}
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>
export type UserByIdQueryResult = ApolloReactCommon.QueryResult<
  UserByIdQuery,
  UserByIdQueryVariables
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
