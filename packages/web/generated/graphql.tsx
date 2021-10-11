import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export enum BadgeType {
  AlphaUser = 'ALPHA_USER',
  BetaUser = 'BETA_USER',
  OnehundredPosts = 'ONEHUNDRED_POSTS',
  TenPosts = 'TEN_POSTS',
  CodeContributor = 'CODE_CONTRIBUTOR',
  Odradek = 'ODRADEK',
  Necromancer = 'NECROMANCER',
}

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['Int']
  author: User
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  thanks: Array<CommentThanks>
}

export type CommentThanks = {
  __typename?: 'CommentThanks'
  id: Scalars['Int']
  commentId: Scalars['Int']
  author: User
  comment: Comment
}

export type DatedActivityCount = {
  __typename?: 'DatedActivityCount'
  date: Scalars['String']
  postCount: Scalars['Int']
  threadCommentCount: Scalars['Int']
  postCommentCount: Scalars['Int']
}

export type EditorNode = {
  type?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  italic?: Maybe<Scalars['Boolean']>
  bold?: Maybe<Scalars['Boolean']>
  underline?: Maybe<Scalars['Boolean']>
  uploaded?: Maybe<Scalars['Boolean']>
  link?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  hyperlink?: Maybe<Scalars['Boolean']>
  children?: Maybe<Array<EditorNode>>
}

export type HeadlineImage = {
  __typename?: 'HeadlineImage'
  id: Scalars['Int']
  smallSize: Scalars['String']
  largeSize: Scalars['String']
}

export type HeadlineImageInput = {
  smallSize: Scalars['String']
  largeSize: Scalars['String']
}

export type InitiateAvatarImageUploadResponse = {
  __typename?: 'InitiateAvatarImageUploadResponse'
  /** URL for the client to PUT an image to */
  uploadUrl: Scalars['String']
  /** polling goes here */
  checkUrl: Scalars['String']
  /** final url of the transform */
  finalUrl: Scalars['String']
}

export type InitiateInlinePostImageUploadResponse = {
  __typename?: 'InitiateInlinePostImageUploadResponse'
  /** URL for the client to PUT an image to */
  uploadUrl: Scalars['String']
  /** polling goes here */
  checkUrl: Scalars['String']
  /** final url of the transform */
  finalUrl: Scalars['String']
}

export type InitiatePostImageUploadResponse = {
  __typename?: 'InitiatePostImageUploadResponse'
  /** URL for the client to PUT an image to */
  uploadUrl: Scalars['String']
  /** polling goes here */
  checkUrl: Scalars['String']
  /** final url of the large size transform */
  finalUrlLarge: Scalars['String']
  /** final url of the mall size transform */
  finalUrlSmall: Scalars['String']
}

export type Language = {
  __typename?: 'Language'
  id: Scalars['Int']
  name: Scalars['String']
  posts: Array<Post>
  dialect?: Maybe<Scalars['String']>
  postCount: Scalars['Int']
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

export type MembershipSubscription = {
  __typename?: 'MembershipSubscription'
  id: Scalars['Int']
  period: MembershipSubscriptionPeriod
  userId: Scalars['Int']
  expiresAt?: Maybe<Scalars['DateTime']>
  nextBillingDate?: Maybe<Scalars['DateTime']>
  cancelAtPeriodEnd: Scalars['Boolean']
  isActive: Scalars['Boolean']
}

export enum MembershipSubscriptionPeriod {
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Annualy = 'ANNUALY',
  StudentAnnually = 'STUDENT_ANNUALLY',
}

export type Mutation = {
  __typename?: 'Mutation'
  addUserInterest: UserInterest
  removeUserInterest: UserInterest
  createThread: Thread
  deleteThread: Thread
  createComment: Comment
  updateComment: Comment
  deleteComment: Comment
  createPostComment: PostComment
  updatePostComment: PostComment
  deletePostComment: PostComment
  createPost: Post
  updatePost: Post
  deletePost: Post
  initiatePostImageUpload: InitiatePostImageUploadResponse
  initiateInlinePostImageUpload: InitiateInlinePostImageUploadResponse
  bumpPost: Post
  createUser: User
  updateUser: User
  initiateAvatarImageUpload: InitiateAvatarImageUploadResponse
  updatePassword: User
  loginUser: User
  requestResetPassword: User
  resetPassword: User
  logout: User
  followUser: User
  unfollowUser: User
  resendEmailVerificationEmail: User
  addLanguageRelation: LanguageRelation
  removeLanguageRelation: LanguageRelation
  updateSocialMedia: SocialMedia
  createPostClap: PostClap
  deletePostClap: PostClap
  createCommentThanks: CommentThanks
  deleteCommentThanks: CommentThanks
  purchaseMembershipSubscription: MembershipSubscription
  updateSubscriptionRenewal: MembershipSubscription
  updateSubscriptionPlan: MembershipSubscription
  updateSubscriptionPaymentMethod: MembershipSubscription
}

export type MutationAddUserInterestArgs = {
  topicId: Scalars['Int']
}

export type MutationRemoveUserInterestArgs = {
  topicId: Scalars['Int']
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
  body: Array<EditorNode>
  languageId: Scalars['Int']
  topicIds?: Maybe<Array<Scalars['Int']>>
  status: PostStatus
  headlineImage: HeadlineImageInput
}

export type MutationUpdatePostArgs = {
  postId: Scalars['Int']
  title?: Maybe<Scalars['String']>
  languageId?: Maybe<Scalars['Int']>
  topicIds?: Maybe<Array<Scalars['Int']>>
  body?: Maybe<Array<EditorNode>>
  status?: Maybe<PostStatus>
  headlineImage: HeadlineImageInput
}

export type MutationDeletePostArgs = {
  postId: Scalars['Int']
}

export type MutationBumpPostArgs = {
  postId: Scalars['Int']
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
  handle?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
}

export type MutationUpdatePasswordArgs = {
  oldPassword: Scalars['String']
  newPassword: Scalars['String']
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

export type MutationUpdateSocialMediaArgs = {
  facebook?: Maybe<Scalars['String']>
  instagram?: Maybe<Scalars['String']>
  youtube?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
}

export type MutationCreatePostClapArgs = {
  postId: Scalars['Int']
}

export type MutationDeletePostClapArgs = {
  postClapId: Scalars['Int']
}

export type MutationCreateCommentThanksArgs = {
  commentId: Scalars['Int']
}

export type MutationDeleteCommentThanksArgs = {
  commentThanksId: Scalars['Int']
}

export type MutationPurchaseMembershipSubscriptionArgs = {
  period: MembershipSubscriptionPeriod
  paymentMethodId: Scalars['String']
}

export type MutationUpdateSubscriptionRenewalArgs = {
  cancelAtPeriodEnd: Scalars['Boolean']
}

export type MutationUpdateSubscriptionPlanArgs = {
  period: MembershipSubscriptionPeriod
}

export type MutationUpdateSubscriptionPaymentMethodArgs = {
  paymentMethodId: Scalars['String']
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
  claps: Array<PostClap>
  threads: Array<Thread>
  postTopics: Array<PostTopic>
  postComments: Array<PostComment>
  language: Language
  publishedLanguageLevel: LanguageLevel
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  bodySrc: Scalars['String']
  headlineImage: HeadlineImage
  publishedAt?: Maybe<Scalars['DateTime']>
  bumpedAt?: Maybe<Scalars['DateTime']>
  bumpCount: Scalars['Int']
  commentCount: Scalars['Int']
}

export type PostPostCommentsArgs = {
  orderBy: Array<PostPostCommentsOrderByInput>
}

export type PostClap = {
  __typename?: 'PostClap'
  id: Scalars['Int']
  author: User
  post: Post
}

export type PostComment = {
  __typename?: 'PostComment'
  id: Scalars['Int']
  author: User
  body: Scalars['String']
  createdAt: Scalars['DateTime']
}

export type PostPage = {
  __typename?: 'PostPage'
  posts: Array<Post>
  count: Scalars['Int']
}

export type PostPostCommentsOrderByInput = {
  createdAt?: Maybe<SortOrder>
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

export type Query = {
  __typename?: 'Query'
  topics: Array<Topic>
  postById: Post
  posts: PostPage
  users: Array<User>
  currentUser?: Maybe<User>
  userById: User
  languages: Array<Language>
}

export type QueryTopicsArgs = {
  hasPosts?: Maybe<Scalars['Boolean']>
  authoredOnly?: Maybe<Scalars['Boolean']>
}

export type QueryPostByIdArgs = {
  id: Scalars['Int']
}

export type QueryPostsArgs = {
  search?: Maybe<Scalars['String']>
  languages?: Maybe<Array<Scalars['Int']>>
  topics?: Maybe<Array<Scalars['Int']>>
  skip: Scalars['Int']
  first: Scalars['Int']
  followedAuthors?: Maybe<Scalars['Boolean']>
  needsFeedback?: Maybe<Scalars['Boolean']>
  hasInteracted?: Maybe<Scalars['Boolean']>
  status: PostStatus
  authorId?: Maybe<Scalars['Int']>
}

export type QueryUserByIdArgs = {
  id: Scalars['Int']
}

export type QueryLanguagesArgs = {
  hasPosts?: Maybe<Scalars['Boolean']>
  authoredOnly?: Maybe<Scalars['Boolean']>
}

export type SocialMedia = {
  __typename?: 'SocialMedia'
  id: Scalars['Int']
  facebook: Scalars['String']
  youtube: Scalars['String']
  instagram: Scalars['String']
  website: Scalars['String']
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
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
  orderBy: Array<ThreadCommentsOrderByInput>
}

export type ThreadCommentsOrderByInput = {
  createdAt?: Maybe<SortOrder>
}

export type Topic = {
  __typename?: 'Topic'
  id: Scalars['Int']
  name?: Maybe<Scalars['String']>
  postCount: Scalars['Int']
}

export type TopicNameArgs = {
  uiLanguage: UiLanguage
}

export type TopicPostCountArgs = {
  languages?: Maybe<Array<Scalars['Int']>>
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
  Spanish = 'SPANISH',
}

export type User = {
  __typename?: 'User'
  id: Scalars['Int']
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  handle: Scalars['String']
  bio?: Maybe<Scalars['String']>
  userRole: UserRole
  city?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  badges: Array<UserBadge>
  posts: Array<Post>
  profileImage?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  membershipSubscription?: Maybe<MembershipSubscription>
  socialMedia?: Maybe<SocialMedia>
  languages: Array<LanguageRelation>
  following: Array<User>
  followedBy: Array<User>
  lastFourCardNumbers?: Maybe<Scalars['String']>
  cardBrand?: Maybe<Scalars['String']>
  userInterests: Array<UserInterest>
  emailAddressVerified: Scalars['Boolean']
  postsWrittenCount: Scalars['Int']
  languagesPostedInCount: Scalars['Int']
  thanksReceivedCount: Scalars['Int']
  threadCommentsCount: Scalars['Int']
  postCommentsCount: Scalars['Int']
  activityGraphData: Array<DatedActivityCount>
}

export type UserBadge = {
  __typename?: 'UserBadge'
  id: Scalars['Int']
  type: BadgeType
  createdAt: Scalars['DateTime']
}

export type UserInterest = {
  __typename?: 'UserInterest'
  id: Scalars['Int']
  user: User
  topic: Topic
}

export enum UserRole {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER',
}

export type CreatePostClapMutationVariables = Exact<{
  postId: Scalars['Int']
}>

export type CreatePostClapMutation = { __typename?: 'Mutation' } & {
  createPostClap: { __typename?: 'PostClap' } & PostClapFragmentFragment
}

export type DeletePostClapMutationVariables = Exact<{
  postClapId: Scalars['Int']
}>

export type DeletePostClapMutation = { __typename?: 'Mutation' } & {
  deletePostClap: { __typename?: 'PostClap' } & Pick<PostClap, 'id'>
}

export type CreateCommentMutationVariables = Exact<{
  body: Scalars['String']
  threadId: Scalars['Int']
}>

export type CreateCommentMutation = { __typename?: 'Mutation' } & {
  createComment: { __typename?: 'Comment' } & Pick<Comment, 'body'> & {
      author: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'handle'>
    }
}

export type CreatePostCommentMutationVariables = Exact<{
  body: Scalars['String']
  postId: Scalars['Int']
}>

export type CreatePostCommentMutation = { __typename?: 'Mutation' } & {
  createPostComment: { __typename?: 'PostComment' } & PostCommentFragmentFragment
}

export type CreateThreadMutationVariables = Exact<{
  postId: Scalars['Int']
  startIndex: Scalars['Int']
  endIndex: Scalars['Int']
  highlightedContent: Scalars['String']
}>

export type CreateThreadMutation = { __typename?: 'Mutation' } & {
  createThread: { __typename?: 'Thread' } & ThreadFragmentFragment
}

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int']
}>

export type DeleteCommentMutation = { __typename?: 'Mutation' } & {
  deleteComment: { __typename?: 'Comment' } & Pick<Comment, 'id'>
}

export type DeletePostCommentMutationVariables = Exact<{
  postCommentId: Scalars['Int']
}>

export type DeletePostCommentMutation = { __typename?: 'Mutation' } & {
  deletePostComment: { __typename?: 'PostComment' } & Pick<PostComment, 'id'>
}

export type DeleteThreadMutationVariables = Exact<{
  threadId: Scalars['Int']
}>

export type DeleteThreadMutation = { __typename?: 'Mutation' } & {
  deleteThread: { __typename?: 'Thread' } & Pick<Thread, 'id'>
}

export type UpdateCommentMutationVariables = Exact<{
  body: Scalars['String']
  commentId: Scalars['Int']
}>

export type UpdateCommentMutation = { __typename?: 'Mutation' } & {
  updateComment: { __typename?: 'Comment' } & CommentFragmentFragment
}

export type UpdatePostCommentMutationVariables = Exact<{
  body: Scalars['String']
  postCommentId: Scalars['Int']
}>

export type UpdatePostCommentMutation = { __typename?: 'Mutation' } & {
  updatePostComment: { __typename?: 'PostComment' } & PostCommentFragmentFragment
}

export type UserFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  | 'id'
  | 'name'
  | 'handle'
  | 'email'
  | 'bio'
  | 'userRole'
  | 'profileImage'
  | 'city'
  | 'country'
  | 'emailAddressVerified'
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

export type CurrentUserFragmentFragment = { __typename?: 'User' } & {
  membershipSubscription?: Maybe<
    { __typename?: 'MembershipSubscription' } & Pick<MembershipSubscription, 'isActive'>
  >
} & UserWithLanguagesFragmentFragment

export type SocialMediaFragmentFragment = { __typename?: 'User' } & {
  socialMedia?: Maybe<
    { __typename?: 'SocialMedia' } & Pick<
      SocialMedia,
      'id' | 'facebook' | 'youtube' | 'instagram' | 'website'
    >
  >
}

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

export type PostClapFragmentFragment = { __typename?: 'PostClap' } & Pick<PostClap, 'id'> & {
    author: { __typename?: 'User' } & AuthorFragmentFragment
  }

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
  | 'id'
  | 'title'
  | 'body'
  | 'status'
  | 'excerpt'
  | 'readTime'
  | 'createdAt'
  | 'publishedAt'
  | 'bumpedAt'
  | 'bumpCount'
  | 'publishedLanguageLevel'
> & {
    author: { __typename?: 'User' } & AuthorWithLanguagesFragmentFragment
    threads: Array<{ __typename?: 'Thread' } & ThreadFragmentFragment>
    postComments: Array<{ __typename?: 'PostComment' } & PostCommentFragmentFragment>
    headlineImage: { __typename?: 'HeadlineImage' } & Pick<
      HeadlineImage,
      'id' | 'smallSize' | 'largeSize'
    >
    claps: Array<
      { __typename?: 'PostClap' } & Pick<PostClap, 'id'> & {
          author: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'handle'>
        }
    >
  }

export type PostWithTopicsFragmentFragment = { __typename?: 'Post' } & {
  postTopics: Array<{ __typename?: 'PostTopic' } & PostTopicFragmentFragment>
  language: { __typename?: 'Language' } & Pick<Language, 'id' | 'name' | 'dialect'>
} & PostFragmentFragment

export type PostCardFragmentFragment = { __typename?: 'Post' } & Pick<
  Post,
  | 'id'
  | 'title'
  | 'body'
  | 'excerpt'
  | 'readTime'
  | 'createdAt'
  | 'publishedAt'
  | 'publishedLanguageLevel'
  | 'commentCount'
  | 'status'
> & {
    headlineImage: { __typename?: 'HeadlineImage' } & Pick<HeadlineImage, 'id' | 'smallSize'>
    claps: Array<{ __typename?: 'PostClap' } & Pick<PostClap, 'id'>>
    author: { __typename?: 'User' } & AuthorFragmentFragment
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

export type TopicWithPostCountFragmentFragment = { __typename?: 'Topic' } & Pick<
  Topic,
  'postCount'
> &
  TopicFragmentFragment

export type PostTopicFragmentFragment = { __typename?: 'PostTopic' } & {
  topic: { __typename?: 'Topic' } & TopicFragmentFragment
}

export type UserBadgeFragmentFragment = { __typename?: 'UserBadge' } & Pick<
  UserBadge,
  'type' | 'createdAt'
>

export type UserInterestFragmentFragment = { __typename?: 'UserInterest' } & {
  topic: { __typename?: 'Topic' } & TopicFragmentFragment
}

export type AddLanguageRelationMutationVariables = Exact<{
  languageId: Scalars['Int']
  level: LanguageLevel
}>

export type AddLanguageRelationMutation = { __typename?: 'Mutation' } & {
  addLanguageRelation: { __typename?: 'LanguageRelation' } & {
    language: { __typename?: 'Language' } & Pick<Language, 'id'>
  }
}

export type LanguagesQueryVariables = Exact<{
  hasPosts?: Maybe<Scalars['Boolean']>
  authoredOnly?: Maybe<Scalars['Boolean']>
}>

export type LanguagesQuery = { __typename?: 'Query' } & {
  languages: Array<{ __typename?: 'Language' } & LanguageWithPostCountFragmentFragment>
}

export type LanguagesFormDataQueryVariables = Exact<{ [key: string]: never }>

export type LanguagesFormDataQuery = { __typename?: 'Query' } & {
  languages: Array<{ __typename?: 'Language' } & LanguageFragmentFragment>
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

export type RemoveLanguageRelationMutationVariables = Exact<{
  languageId: Scalars['Int']
}>

export type RemoveLanguageRelationMutation = { __typename?: 'Mutation' } & {
  removeLanguageRelation: { __typename?: 'LanguageRelation' } & Pick<LanguageRelation, 'id'>
}

export type PurchaseMembershipSubscriptionMutationVariables = Exact<{
  period: MembershipSubscriptionPeriod
  paymentMethodId: Scalars['String']
}>

export type PurchaseMembershipSubscriptionMutation = { __typename?: 'Mutation' } & {
  purchaseMembershipSubscription: { __typename?: 'MembershipSubscription' } & Pick<
    MembershipSubscription,
    'id'
  >
}

export type UpdateSubscriptionPaymentMethodMutationVariables = Exact<{
  paymentMethodId: Scalars['String']
}>

export type UpdateSubscriptionPaymentMethodMutation = { __typename?: 'Mutation' } & {
  updateSubscriptionPaymentMethod: { __typename?: 'MembershipSubscription' } & Pick<
    MembershipSubscription,
    'id'
  >
}

export type UpdateSubscriptionPlanMutationVariables = Exact<{
  period: MembershipSubscriptionPeriod
}>

export type UpdateSubscriptionPlanMutation = { __typename?: 'Mutation' } & {
  updateSubscriptionPlan: { __typename?: 'MembershipSubscription' } & Pick<
    MembershipSubscription,
    'id' | 'period'
  >
}

export type UpdateSubscriptionRenewalMutationVariables = Exact<{
  cancelAtPeriodEnd: Scalars['Boolean']
}>

export type UpdateSubscriptionRenewalMutation = { __typename?: 'Mutation' } & {
  updateSubscriptionRenewal: { __typename?: 'MembershipSubscription' } & Pick<
    MembershipSubscription,
    'id'
  >
}

export type PostPageQueryVariables = Exact<{
  id: Scalars['Int']
  uiLanguage: UiLanguage
}>

export type PostPageQuery = { __typename?: 'Query' } & {
  postById: { __typename?: 'Post' } & PostWithTopicsFragmentFragment
  currentUser?: Maybe<{ __typename?: 'User' } & CurrentUserFragmentFragment>
}

export type ProfilePageQueryVariables = Exact<{
  userId: Scalars['Int']
  uiLanguage: UiLanguage
}>

export type ProfilePageQuery = { __typename?: 'Query' } & {
  userById: { __typename?: 'User' } & ProfileUserFragmentFragment
  posts: { __typename?: 'PostPage' } & Pick<PostPage, 'count'> & {
      posts: Array<{ __typename?: 'Post' } & PostCardFragmentFragment>
    }
  currentUser?: Maybe<{ __typename?: 'User' } & UserWithLanguagesFragmentFragment>
}

export type ProfileUserFragmentFragment = { __typename?: 'User' } & {
  badges: Array<{ __typename?: 'UserBadge' } & UserBadgeFragmentFragment>
  userInterests: Array<{ __typename?: 'UserInterest' } & UserInterestFragmentFragment>
} & UserWithLanguagesFragmentFragment &
  SocialMediaFragmentFragment

export type SubscriptionSettingsPageQueryVariables = Exact<{ [key: string]: never }>

export type SubscriptionSettingsPageQuery = { __typename?: 'Query' } & {
  currentUser?: Maybe<{ __typename?: 'User' } & UserWithSubscriptionFragmentFragment>
}

export type UserWithSubscriptionFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'email' | 'lastFourCardNumbers' | 'cardBrand'
> & {
    membershipSubscription?: Maybe<
      { __typename?: 'MembershipSubscription' } & Pick<
        MembershipSubscription,
        'id' | 'period' | 'expiresAt' | 'cancelAtPeriodEnd' | 'isActive'
      >
    >
  }

export type BumpPostMutationVariables = Exact<{
  postId: Scalars['Int']
}>

export type BumpPostMutation = { __typename?: 'Mutation' } & {
  bumpPost: { __typename?: 'Post' } & Pick<Post, 'id'>
}

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String']
  body: Array<EditorNode> | EditorNode
  languageId: Scalars['Int']
  topicIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>
  status: PostStatus
  headlineImage: HeadlineImageInput
}>

export type CreatePostMutation = { __typename?: 'Mutation' } & {
  createPost: { __typename?: 'Post' } & PostCardFragmentFragment
}

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Int']
}>

export type DeletePostMutation = { __typename?: 'Mutation' } & {
  deletePost: { __typename?: 'Post' } & Pick<Post, 'id'>
}

export type EditPostQueryVariables = Exact<{
  id: Scalars['Int']
  uiLanguage: UiLanguage
}>

export type EditPostQuery = { __typename?: 'Query' } & {
  postById: { __typename?: 'Post' } & Pick<Post, 'title' | 'bodySrc' | 'updatedAt'> & {
      author: { __typename?: 'User' } & Pick<User, 'id'>
      language: { __typename?: 'Language' } & Pick<Language, 'id'>
      headlineImage: { __typename?: 'HeadlineImage' } & Pick<
        HeadlineImage,
        'id' | 'largeSize' | 'smallSize'
      >
      postTopics: Array<
        { __typename?: 'PostTopic' } & { topic: { __typename?: 'Topic' } & TopicFragmentFragment }
      >
    }
  topics: Array<{ __typename?: 'Topic' } & TopicFragmentFragment>
  currentUser?: Maybe<{ __typename?: 'User' } & CurrentUserFragmentFragment>
}

export type InitiateInlinePostImageUploadMutationVariables = Exact<{ [key: string]: never }>

export type InitiateInlinePostImageUploadMutation = { __typename?: 'Mutation' } & {
  initiateInlinePostImageUpload: { __typename?: 'InitiateInlinePostImageUploadResponse' } & Pick<
    InitiateInlinePostImageUploadResponse,
    'uploadUrl' | 'checkUrl' | 'finalUrl'
  >
}

export type InitiatePostImageUploadMutationVariables = Exact<{ [key: string]: never }>

export type InitiatePostImageUploadMutation = { __typename?: 'Mutation' } & {
  initiatePostImageUpload: { __typename?: 'InitiatePostImageUploadResponse' } & Pick<
    InitiatePostImageUploadResponse,
    'uploadUrl' | 'checkUrl' | 'finalUrlLarge' | 'finalUrlSmall'
  >
}

export type NewPostQueryVariables = Exact<{
  uiLanguage: UiLanguage
}>

export type NewPostQuery = { __typename?: 'Query' } & {
  topics: Array<{ __typename?: 'Topic' } & TopicFragmentFragment>
  currentUser?: Maybe<{ __typename?: 'User' } & CurrentUserFragmentFragment>
}

export type PostByIdQueryVariables = Exact<{
  id: Scalars['Int']
  uiLanguage: UiLanguage
}>

export type PostByIdQuery = { __typename?: 'Query' } & {
  postById: { __typename?: 'Post' } & PostWithTopicsFragmentFragment
}

export type PostsQueryVariables = Exact<{
  first: Scalars['Int']
  skip: Scalars['Int']
  search?: Maybe<Scalars['String']>
  languages?: Maybe<Array<Scalars['Int']> | Scalars['Int']>
  topics?: Maybe<Array<Scalars['Int']> | Scalars['Int']>
  followedAuthors?: Maybe<Scalars['Boolean']>
  needsFeedback?: Maybe<Scalars['Boolean']>
  hasInteracted?: Maybe<Scalars['Boolean']>
  authorId?: Maybe<Scalars['Int']>
  status: PostStatus
}>

export type PostsQuery = { __typename?: 'Query' } & {
  posts: { __typename?: 'PostPage' } & Pick<PostPage, 'count'> & {
      posts: Array<{ __typename?: 'Post' } & PostCardFragmentFragment>
    }
}

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['Int']
  title?: Maybe<Scalars['String']>
  languageId?: Maybe<Scalars['Int']>
  topicIds?: Maybe<Array<Scalars['Int']> | Scalars['Int']>
  body?: Maybe<Array<EditorNode> | EditorNode>
  status?: Maybe<PostStatus>
  headlineImage: HeadlineImageInput
}>

export type UpdatePostMutation = { __typename?: 'Mutation' } & {
  updatePost: { __typename?: 'Post' } & PostFragmentFragment
}

export type CreateCommentThanksMutationVariables = Exact<{
  commentId: Scalars['Int']
}>

export type CreateCommentThanksMutation = { __typename?: 'Mutation' } & {
  createCommentThanks: { __typename?: 'CommentThanks' } & CommentThanksFragmentFragment
}

export type DeleteCommentThanksMutationVariables = Exact<{
  commentThanksId: Scalars['Int']
}>

export type DeleteCommentThanksMutation = { __typename?: 'Mutation' } & {
  deleteCommentThanks: { __typename?: 'CommentThanks' } & Pick<CommentThanks, 'id'>
}

export type AddUserInterestMutationVariables = Exact<{
  topicId: Scalars['Int']
}>

export type AddUserInterestMutation = { __typename?: 'Mutation' } & {
  addUserInterest: { __typename?: 'UserInterest' } & {
    topic: { __typename?: 'Topic' } & Pick<Topic, 'id'>
  }
}

export type RemoveUserInterestMutationVariables = Exact<{
  topicId: Scalars['Int']
}>

export type RemoveUserInterestMutation = { __typename?: 'Mutation' } & {
  removeUserInterest: { __typename?: 'UserInterest' } & Pick<UserInterest, 'id'>
}

export type TopicsQueryVariables = Exact<{
  hasPosts?: Maybe<Scalars['Boolean']>
  authoredOnly?: Maybe<Scalars['Boolean']>
  uiLanguage: UiLanguage
  languages?: Maybe<Array<Scalars['Int']> | Scalars['Int']>
}>

export type TopicsQuery = { __typename?: 'Query' } & {
  topics: Array<{ __typename?: 'Topic' } & TopicWithPostCountFragmentFragment>
}

export type CreateUserMutationVariables = Exact<{
  handle: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}>

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'User' } & Pick<User, 'id' | 'handle' | 'email'>
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser?: Maybe<{ __typename?: 'User' } & CurrentUserFragmentFragment>
}

export type FollowUserMutationVariables = Exact<{
  followedUserId: Scalars['Int']
}>

export type FollowUserMutation = { __typename?: 'Mutation' } & {
  followUser: { __typename?: 'User' } & Pick<User, 'id'>
}

export type FollowingUsersQueryVariables = Exact<{ [key: string]: never }>

export type FollowingUsersQuery = { __typename?: 'Query' } & {
  currentUser?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id'> & {
        following: Array<{ __typename?: 'User' } & Pick<User, 'id'>>
      }
  >
}

export type InitiateAvatarImageUploadMutationVariables = Exact<{ [key: string]: never }>

export type InitiateAvatarImageUploadMutation = { __typename?: 'Mutation' } & {
  initiateAvatarImageUpload: { __typename?: 'InitiateAvatarImageUploadResponse' } & Pick<
    InitiateAvatarImageUploadResponse,
    'uploadUrl' | 'checkUrl' | 'finalUrl'
  >
}

export type LoginUserMutationVariables = Exact<{
  identifier: Scalars['String']
  password: Scalars['String']
}>

export type LoginUserMutation = { __typename?: 'Mutation' } & {
  loginUser: { __typename?: 'User' } & UserFragmentFragment
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation' } & {
  logout: { __typename?: 'User' } & Pick<User, 'id'>
}

export type RequestResetPasswordMutationVariables = Exact<{
  identifier: Scalars['String']
}>

export type RequestResetPasswordMutation = { __typename?: 'Mutation' } & {
  requestResetPassword: { __typename?: 'User' } & Pick<User, 'id'>
}

export type ResendEmailVerificationEmailMutationVariables = Exact<{ [key: string]: never }>

export type ResendEmailVerificationEmailMutation = { __typename?: 'Mutation' } & {
  resendEmailVerificationEmail: { __typename?: 'User' } & Pick<User, 'id'>
}

export type ResetPasswordMutationVariables = Exact<{
  resetToken: Scalars['String']
  password: Scalars['String']
  confirmPassword: Scalars['String']
}>

export type ResetPasswordMutation = { __typename?: 'Mutation' } & {
  resetPassword: { __typename?: 'User' } & Pick<User, 'id'>
}

export type SettingsFormDataQueryVariables = Exact<{
  uiLanguage: UiLanguage
}>

export type SettingsFormDataQuery = { __typename?: 'Query' } & {
  languages: Array<{ __typename?: 'Language' } & LanguageFragmentFragment>
  topics: Array<{ __typename?: 'Topic' } & TopicFragmentFragment>
  currentUser?: Maybe<
    { __typename?: 'User' } & Pick<User, 'bio'> & {
        languages: Array<
          { __typename?: 'LanguageRelation' } & Pick<LanguageRelation, 'id' | 'level'> & {
              language: { __typename?: 'Language' } & LanguageFragmentFragment
            }
        >
        userInterests: Array<{ __typename?: 'UserInterest' } & UserInterestFragmentFragment>
      } & SocialMediaFragmentFragment
  >
}

export type UnfollowUserMutationVariables = Exact<{
  followedUserId: Scalars['Int']
}>

export type UnfollowUserMutation = { __typename?: 'Mutation' } & {
  unfollowUser: { __typename?: 'User' } & Pick<User, 'id'>
}

export type UpdatePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']
  newPassword: Scalars['String']
}>

export type UpdatePasswordMutation = { __typename?: 'Mutation' } & {
  updatePassword: { __typename?: 'User' } & Pick<User, 'id'>
}

export type UpdateSocialMediaMutationVariables = Exact<{
  facebook?: Maybe<Scalars['String']>
  instagram?: Maybe<Scalars['String']>
  youtube?: Maybe<Scalars['String']>
  website?: Maybe<Scalars['String']>
}>

export type UpdateSocialMediaMutation = { __typename?: 'Mutation' } & {
  updateSocialMedia: { __typename?: 'SocialMedia' } & Pick<SocialMedia, 'id'>
}

export type UpdateUserMutationVariables = Exact<{
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  profileImage?: Maybe<Scalars['String']>
  bio?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
}>

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser: { __typename?: 'User' } & UserFragmentFragment
}

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type UserByIdQuery = { __typename?: 'Query' } & {
  userById: { __typename?: 'User' } & UserWithLanguagesFragmentFragment
}

export type UserStatsQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type UserStatsQuery = { __typename?: 'Query' } & {
  userById: { __typename?: 'User' } & Pick<
    User,
    | 'id'
    | 'name'
    | 'handle'
    | 'postsWrittenCount'
    | 'languagesPostedInCount'
    | 'threadCommentsCount'
    | 'postCommentsCount'
    | 'thanksReceivedCount'
    | 'createdAt'
  > & {
      activityGraphData: Array<
        { __typename?: 'DatedActivityCount' } & Pick<
          DatedActivityCount,
          'date' | 'postCount' | 'threadCommentCount' | 'postCommentCount'
        >
      >
    }
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = { __typename?: 'Query' } & {
  users: Array<
    { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email'> & {
        posts: Array<{ __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'body'>>
      }
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
    city
    country
    emailAddressVerified
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
export const CurrentUserFragmentFragmentDoc = gql`
  fragment CurrentUserFragment on User {
    ...UserWithLanguagesFragment
    membershipSubscription {
      isActive
    }
  }
  ${UserWithLanguagesFragmentFragmentDoc}
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
export const PostClapFragmentFragmentDoc = gql`
  fragment PostClapFragment on PostClap {
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
    bumpedAt
    bumpCount
    publishedLanguageLevel
    author {
      ...AuthorWithLanguagesFragment
    }
    threads {
      ...ThreadFragment
    }
    postComments(orderBy: { createdAt: asc }) {
      ...PostCommentFragment
    }
    headlineImage {
      id
      smallSize
      largeSize
    }
    claps {
      id
      author {
        id
        name
        handle
      }
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
    publishedLanguageLevel
    commentCount
    status
    headlineImage {
      id
      smallSize
    }
    claps {
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
export const LanguageWithPostCountFragmentFragmentDoc = gql`
  fragment LanguageWithPostCountFragment on Language {
    ...LanguageFragment
    postCount
  }
  ${LanguageFragmentFragmentDoc}
`
export const TopicWithPostCountFragmentFragmentDoc = gql`
  fragment TopicWithPostCountFragment on Topic {
    ...TopicFragment
    postCount(languages: $languages)
  }
  ${TopicFragmentFragmentDoc}
`
export const UserBadgeFragmentFragmentDoc = gql`
  fragment UserBadgeFragment on UserBadge {
    type
    createdAt
  }
`
export const UserInterestFragmentFragmentDoc = gql`
  fragment UserInterestFragment on UserInterest {
    topic {
      ...TopicFragment
    }
  }
  ${TopicFragmentFragmentDoc}
`
export const SocialMediaFragmentFragmentDoc = gql`
  fragment SocialMediaFragment on User {
    socialMedia {
      id
      facebook
      youtube
      instagram
      website
    }
  }
`
export const ProfileUserFragmentFragmentDoc = gql`
  fragment ProfileUserFragment on User {
    ...UserWithLanguagesFragment
    badges {
      ...UserBadgeFragment
    }
    userInterests {
      ...UserInterestFragment
    }
    ...SocialMediaFragment
  }
  ${UserWithLanguagesFragmentFragmentDoc}
  ${UserBadgeFragmentFragmentDoc}
  ${UserInterestFragmentFragmentDoc}
  ${SocialMediaFragmentFragmentDoc}
`
export const UserWithSubscriptionFragmentFragmentDoc = gql`
  fragment UserWithSubscriptionFragment on User {
    id
    email
    lastFourCardNumbers
    cardBrand
    membershipSubscription {
      id
      period
      expiresAt
      cancelAtPeriodEnd
      isActive
    }
  }
`
export const CreatePostClapDocument = gql`
  mutation createPostClap($postId: Int!) {
    createPostClap(postId: $postId) {
      ...PostClapFragment
    }
  }
  ${PostClapFragmentFragmentDoc}
`
export type CreatePostClapMutationFn = ApolloReactCommon.MutationFunction<
  CreatePostClapMutation,
  CreatePostClapMutationVariables
>

/**
 * __useCreatePostClapMutation__
 *
 * To run a mutation, you first call `useCreatePostClapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostClapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostClapMutation, { data, loading, error }] = useCreatePostClapMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreatePostClapMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePostClapMutation,
    CreatePostClapMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<CreatePostClapMutation, CreatePostClapMutationVariables>(
    CreatePostClapDocument,
    baseOptions,
  )
}
export type CreatePostClapMutationHookResult = ReturnType<typeof useCreatePostClapMutation>
export type CreatePostClapMutationResult = ApolloReactCommon.MutationResult<CreatePostClapMutation>
export type CreatePostClapMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePostClapMutation,
  CreatePostClapMutationVariables
>
export const DeletePostClapDocument = gql`
  mutation deletePostClap($postClapId: Int!) {
    deletePostClap(postClapId: $postClapId) {
      id
    }
  }
`
export type DeletePostClapMutationFn = ApolloReactCommon.MutationFunction<
  DeletePostClapMutation,
  DeletePostClapMutationVariables
>

/**
 * __useDeletePostClapMutation__
 *
 * To run a mutation, you first call `useDeletePostClapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostClapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostClapMutation, { data, loading, error }] = useDeletePostClapMutation({
 *   variables: {
 *      postClapId: // value for 'postClapId'
 *   },
 * });
 */
export function useDeletePostClapMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeletePostClapMutation,
    DeletePostClapMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<DeletePostClapMutation, DeletePostClapMutationVariables>(
    DeletePostClapDocument,
    baseOptions,
  )
}
export type DeletePostClapMutationHookResult = ReturnType<typeof useDeletePostClapMutation>
export type DeletePostClapMutationResult = ApolloReactCommon.MutationResult<DeletePostClapMutation>
export type DeletePostClapMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeletePostClapMutation,
  DeletePostClapMutationVariables
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
export const CreatePostCommentDocument = gql`
  mutation createPostComment($body: String!, $postId: Int!) {
    createPostComment(body: $body, postId: $postId) {
      ...PostCommentFragment
    }
  }
  ${PostCommentFragmentFragmentDoc}
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
export type CreatePostCommentMutationResult =
  ApolloReactCommon.MutationResult<CreatePostCommentMutation>
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
export type DeletePostCommentMutationResult =
  ApolloReactCommon.MutationResult<DeletePostCommentMutation>
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
export type UpdatePostCommentMutationResult =
  ApolloReactCommon.MutationResult<UpdatePostCommentMutation>
export type UpdatePostCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePostCommentMutation,
  UpdatePostCommentMutationVariables
>
export const AddLanguageRelationDocument = gql`
  mutation addLanguageRelation($languageId: Int!, $level: LanguageLevel!) {
    addLanguageRelation(languageId: $languageId, level: $level) {
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
 *      level: // value for 'level'
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
export type AddLanguageRelationMutationResult =
  ApolloReactCommon.MutationResult<AddLanguageRelationMutation>
export type AddLanguageRelationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddLanguageRelationMutation,
  AddLanguageRelationMutationVariables
>
export const LanguagesDocument = gql`
  query languages($hasPosts: Boolean, $authoredOnly: Boolean) {
    languages(hasPosts: $hasPosts, authoredOnly: $authoredOnly) {
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
 *      authoredOnly: // value for 'authoredOnly'
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
export type RemoveLanguageRelationMutationResult =
  ApolloReactCommon.MutationResult<RemoveLanguageRelationMutation>
export type RemoveLanguageRelationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveLanguageRelationMutation,
  RemoveLanguageRelationMutationVariables
>
export const PurchaseMembershipSubscriptionDocument = gql`
  mutation purchaseMembershipSubscription(
    $period: MembershipSubscriptionPeriod!
    $paymentMethodId: String!
  ) {
    purchaseMembershipSubscription(period: $period, paymentMethodId: $paymentMethodId) {
      id
    }
  }
`
export type PurchaseMembershipSubscriptionMutationFn = ApolloReactCommon.MutationFunction<
  PurchaseMembershipSubscriptionMutation,
  PurchaseMembershipSubscriptionMutationVariables
>

/**
 * __usePurchaseMembershipSubscriptionMutation__
 *
 * To run a mutation, you first call `usePurchaseMembershipSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePurchaseMembershipSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [purchaseMembershipSubscriptionMutation, { data, loading, error }] = usePurchaseMembershipSubscriptionMutation({
 *   variables: {
 *      period: // value for 'period'
 *      paymentMethodId: // value for 'paymentMethodId'
 *   },
 * });
 */
export function usePurchaseMembershipSubscriptionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    PurchaseMembershipSubscriptionMutation,
    PurchaseMembershipSubscriptionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    PurchaseMembershipSubscriptionMutation,
    PurchaseMembershipSubscriptionMutationVariables
  >(PurchaseMembershipSubscriptionDocument, baseOptions)
}
export type PurchaseMembershipSubscriptionMutationHookResult = ReturnType<
  typeof usePurchaseMembershipSubscriptionMutation
>
export type PurchaseMembershipSubscriptionMutationResult =
  ApolloReactCommon.MutationResult<PurchaseMembershipSubscriptionMutation>
export type PurchaseMembershipSubscriptionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  PurchaseMembershipSubscriptionMutation,
  PurchaseMembershipSubscriptionMutationVariables
>
export const UpdateSubscriptionPaymentMethodDocument = gql`
  mutation updateSubscriptionPaymentMethod($paymentMethodId: String!) {
    updateSubscriptionPaymentMethod(paymentMethodId: $paymentMethodId) {
      id
    }
  }
`
export type UpdateSubscriptionPaymentMethodMutationFn = ApolloReactCommon.MutationFunction<
  UpdateSubscriptionPaymentMethodMutation,
  UpdateSubscriptionPaymentMethodMutationVariables
>

/**
 * __useUpdateSubscriptionPaymentMethodMutation__
 *
 * To run a mutation, you first call `useUpdateSubscriptionPaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubscriptionPaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubscriptionPaymentMethodMutation, { data, loading, error }] = useUpdateSubscriptionPaymentMethodMutation({
 *   variables: {
 *      paymentMethodId: // value for 'paymentMethodId'
 *   },
 * });
 */
export function useUpdateSubscriptionPaymentMethodMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateSubscriptionPaymentMethodMutation,
    UpdateSubscriptionPaymentMethodMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateSubscriptionPaymentMethodMutation,
    UpdateSubscriptionPaymentMethodMutationVariables
  >(UpdateSubscriptionPaymentMethodDocument, baseOptions)
}
export type UpdateSubscriptionPaymentMethodMutationHookResult = ReturnType<
  typeof useUpdateSubscriptionPaymentMethodMutation
>
export type UpdateSubscriptionPaymentMethodMutationResult =
  ApolloReactCommon.MutationResult<UpdateSubscriptionPaymentMethodMutation>
export type UpdateSubscriptionPaymentMethodMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateSubscriptionPaymentMethodMutation,
  UpdateSubscriptionPaymentMethodMutationVariables
>
export const UpdateSubscriptionPlanDocument = gql`
  mutation updateSubscriptionPlan($period: MembershipSubscriptionPeriod!) {
    updateSubscriptionPlan(period: $period) {
      id
      period
    }
  }
`
export type UpdateSubscriptionPlanMutationFn = ApolloReactCommon.MutationFunction<
  UpdateSubscriptionPlanMutation,
  UpdateSubscriptionPlanMutationVariables
>

/**
 * __useUpdateSubscriptionPlanMutation__
 *
 * To run a mutation, you first call `useUpdateSubscriptionPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubscriptionPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubscriptionPlanMutation, { data, loading, error }] = useUpdateSubscriptionPlanMutation({
 *   variables: {
 *      period: // value for 'period'
 *   },
 * });
 */
export function useUpdateSubscriptionPlanMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateSubscriptionPlanMutation,
    UpdateSubscriptionPlanMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateSubscriptionPlanMutation,
    UpdateSubscriptionPlanMutationVariables
  >(UpdateSubscriptionPlanDocument, baseOptions)
}
export type UpdateSubscriptionPlanMutationHookResult = ReturnType<
  typeof useUpdateSubscriptionPlanMutation
>
export type UpdateSubscriptionPlanMutationResult =
  ApolloReactCommon.MutationResult<UpdateSubscriptionPlanMutation>
export type UpdateSubscriptionPlanMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateSubscriptionPlanMutation,
  UpdateSubscriptionPlanMutationVariables
>
export const UpdateSubscriptionRenewalDocument = gql`
  mutation updateSubscriptionRenewal($cancelAtPeriodEnd: Boolean!) {
    updateSubscriptionRenewal(cancelAtPeriodEnd: $cancelAtPeriodEnd) {
      id
    }
  }
`
export type UpdateSubscriptionRenewalMutationFn = ApolloReactCommon.MutationFunction<
  UpdateSubscriptionRenewalMutation,
  UpdateSubscriptionRenewalMutationVariables
>

/**
 * __useUpdateSubscriptionRenewalMutation__
 *
 * To run a mutation, you first call `useUpdateSubscriptionRenewalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubscriptionRenewalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubscriptionRenewalMutation, { data, loading, error }] = useUpdateSubscriptionRenewalMutation({
 *   variables: {
 *      cancelAtPeriodEnd: // value for 'cancelAtPeriodEnd'
 *   },
 * });
 */
export function useUpdateSubscriptionRenewalMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateSubscriptionRenewalMutation,
    UpdateSubscriptionRenewalMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateSubscriptionRenewalMutation,
    UpdateSubscriptionRenewalMutationVariables
  >(UpdateSubscriptionRenewalDocument, baseOptions)
}
export type UpdateSubscriptionRenewalMutationHookResult = ReturnType<
  typeof useUpdateSubscriptionRenewalMutation
>
export type UpdateSubscriptionRenewalMutationResult =
  ApolloReactCommon.MutationResult<UpdateSubscriptionRenewalMutation>
export type UpdateSubscriptionRenewalMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateSubscriptionRenewalMutation,
  UpdateSubscriptionRenewalMutationVariables
>
export const PostPageDocument = gql`
  query postPage($id: Int!, $uiLanguage: UILanguage!) {
    postById(id: $id) {
      ...PostWithTopicsFragment
    }
    currentUser {
      ...CurrentUserFragment
    }
  }
  ${PostWithTopicsFragmentFragmentDoc}
  ${CurrentUserFragmentFragmentDoc}
`

/**
 * __usePostPageQuery__
 *
 * To run a query within a React component, call `usePostPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *      uiLanguage: // value for 'uiLanguage'
 *   },
 * });
 */
export function usePostPageQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<PostPageQuery, PostPageQueryVariables>,
) {
  return ApolloReactHooks.useQuery<PostPageQuery, PostPageQueryVariables>(
    PostPageDocument,
    baseOptions,
  )
}
export function usePostPageLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostPageQuery, PostPageQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<PostPageQuery, PostPageQueryVariables>(
    PostPageDocument,
    baseOptions,
  )
}
export type PostPageQueryHookResult = ReturnType<typeof usePostPageQuery>
export type PostPageLazyQueryHookResult = ReturnType<typeof usePostPageLazyQuery>
export type PostPageQueryResult = ApolloReactCommon.QueryResult<
  PostPageQuery,
  PostPageQueryVariables
>
export const ProfilePageDocument = gql`
  query profilePage($userId: Int!, $uiLanguage: UILanguage!) {
    userById(id: $userId) {
      ...ProfileUserFragment
    }
    posts(first: 20, skip: 0, status: PUBLISHED, authorId: $userId) {
      posts {
        ...PostCardFragment
      }
      count
    }
    currentUser {
      ...UserWithLanguagesFragment
    }
  }
  ${ProfileUserFragmentFragmentDoc}
  ${PostCardFragmentFragmentDoc}
  ${UserWithLanguagesFragmentFragmentDoc}
`

/**
 * __useProfilePageQuery__
 *
 * To run a query within a React component, call `useProfilePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfilePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilePageQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      uiLanguage: // value for 'uiLanguage'
 *   },
 * });
 */
export function useProfilePageQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ProfilePageQuery, ProfilePageQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ProfilePageQuery, ProfilePageQueryVariables>(
    ProfilePageDocument,
    baseOptions,
  )
}
export function useProfilePageLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProfilePageQuery, ProfilePageQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ProfilePageQuery, ProfilePageQueryVariables>(
    ProfilePageDocument,
    baseOptions,
  )
}
export type ProfilePageQueryHookResult = ReturnType<typeof useProfilePageQuery>
export type ProfilePageLazyQueryHookResult = ReturnType<typeof useProfilePageLazyQuery>
export type ProfilePageQueryResult = ApolloReactCommon.QueryResult<
  ProfilePageQuery,
  ProfilePageQueryVariables
>
export const SubscriptionSettingsPageDocument = gql`
  query subscriptionSettingsPage {
    currentUser {
      ...UserWithSubscriptionFragment
    }
  }
  ${UserWithSubscriptionFragmentFragmentDoc}
`

/**
 * __useSubscriptionSettingsPageQuery__
 *
 * To run a query within a React component, call `useSubscriptionSettingsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptionSettingsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptionSettingsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubscriptionSettingsPageQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SubscriptionSettingsPageQuery,
    SubscriptionSettingsPageQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    SubscriptionSettingsPageQuery,
    SubscriptionSettingsPageQueryVariables
  >(SubscriptionSettingsPageDocument, baseOptions)
}
export function useSubscriptionSettingsPageLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SubscriptionSettingsPageQuery,
    SubscriptionSettingsPageQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    SubscriptionSettingsPageQuery,
    SubscriptionSettingsPageQueryVariables
  >(SubscriptionSettingsPageDocument, baseOptions)
}
export type SubscriptionSettingsPageQueryHookResult = ReturnType<
  typeof useSubscriptionSettingsPageQuery
>
export type SubscriptionSettingsPageLazyQueryHookResult = ReturnType<
  typeof useSubscriptionSettingsPageLazyQuery
>
export type SubscriptionSettingsPageQueryResult = ApolloReactCommon.QueryResult<
  SubscriptionSettingsPageQuery,
  SubscriptionSettingsPageQueryVariables
>
export const BumpPostDocument = gql`
  mutation bumpPost($postId: Int!) {
    bumpPost(postId: $postId) {
      id
    }
  }
`
export type BumpPostMutationFn = ApolloReactCommon.MutationFunction<
  BumpPostMutation,
  BumpPostMutationVariables
>

/**
 * __useBumpPostMutation__
 *
 * To run a mutation, you first call `useBumpPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBumpPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bumpPostMutation, { data, loading, error }] = useBumpPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useBumpPostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<BumpPostMutation, BumpPostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<BumpPostMutation, BumpPostMutationVariables>(
    BumpPostDocument,
    baseOptions,
  )
}
export type BumpPostMutationHookResult = ReturnType<typeof useBumpPostMutation>
export type BumpPostMutationResult = ApolloReactCommon.MutationResult<BumpPostMutation>
export type BumpPostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  BumpPostMutation,
  BumpPostMutationVariables
>
export const CreatePostDocument = gql`
  mutation createPost(
    $title: String!
    $body: [EditorNode!]!
    $languageId: Int!
    $topicIds: [Int!]
    $status: PostStatus!
    $headlineImage: HeadlineImageInput!
  ) {
    createPost(
      title: $title
      body: $body
      languageId: $languageId
      topicIds: $topicIds
      status: $status
      headlineImage: $headlineImage
    ) {
      ...PostCardFragment
    }
  }
  ${PostCardFragmentFragmentDoc}
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
 *      headlineImage: // value for 'headlineImage'
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
export const DeletePostDocument = gql`
  mutation deletePost($postId: Int!) {
    deletePost(postId: $postId) {
      id
    }
  }
`
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<
  DeletePostMutation,
  DeletePostMutationVariables
>

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeletePostMutation,
    DeletePostMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    baseOptions,
  )
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>
export type DeletePostMutationResult = ApolloReactCommon.MutationResult<DeletePostMutation>
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeletePostMutation,
  DeletePostMutationVariables
>
export const EditPostDocument = gql`
  query editPost($id: Int!, $uiLanguage: UILanguage!) {
    postById(id: $id) {
      title
      bodySrc
      updatedAt
      author {
        id
      }
      language {
        id
      }
      headlineImage {
        id
        largeSize
        smallSize
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
      ...CurrentUserFragment
    }
  }
  ${TopicFragmentFragmentDoc}
  ${CurrentUserFragmentFragmentDoc}
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
export const InitiateInlinePostImageUploadDocument = gql`
  mutation initiateInlinePostImageUpload {
    initiateInlinePostImageUpload {
      uploadUrl
      checkUrl
      finalUrl
    }
  }
`
export type InitiateInlinePostImageUploadMutationFn = ApolloReactCommon.MutationFunction<
  InitiateInlinePostImageUploadMutation,
  InitiateInlinePostImageUploadMutationVariables
>

/**
 * __useInitiateInlinePostImageUploadMutation__
 *
 * To run a mutation, you first call `useInitiateInlinePostImageUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiateInlinePostImageUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiateInlinePostImageUploadMutation, { data, loading, error }] = useInitiateInlinePostImageUploadMutation({
 *   variables: {
 *   },
 * });
 */
export function useInitiateInlinePostImageUploadMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    InitiateInlinePostImageUploadMutation,
    InitiateInlinePostImageUploadMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    InitiateInlinePostImageUploadMutation,
    InitiateInlinePostImageUploadMutationVariables
  >(InitiateInlinePostImageUploadDocument, baseOptions)
}
export type InitiateInlinePostImageUploadMutationHookResult = ReturnType<
  typeof useInitiateInlinePostImageUploadMutation
>
export type InitiateInlinePostImageUploadMutationResult =
  ApolloReactCommon.MutationResult<InitiateInlinePostImageUploadMutation>
export type InitiateInlinePostImageUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InitiateInlinePostImageUploadMutation,
  InitiateInlinePostImageUploadMutationVariables
>
export const InitiatePostImageUploadDocument = gql`
  mutation initiatePostImageUpload {
    initiatePostImageUpload {
      uploadUrl
      checkUrl
      finalUrlLarge
      finalUrlSmall
    }
  }
`
export type InitiatePostImageUploadMutationFn = ApolloReactCommon.MutationFunction<
  InitiatePostImageUploadMutation,
  InitiatePostImageUploadMutationVariables
>

/**
 * __useInitiatePostImageUploadMutation__
 *
 * To run a mutation, you first call `useInitiatePostImageUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiatePostImageUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiatePostImageUploadMutation, { data, loading, error }] = useInitiatePostImageUploadMutation({
 *   variables: {
 *   },
 * });
 */
export function useInitiatePostImageUploadMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    InitiatePostImageUploadMutation,
    InitiatePostImageUploadMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    InitiatePostImageUploadMutation,
    InitiatePostImageUploadMutationVariables
  >(InitiatePostImageUploadDocument, baseOptions)
}
export type InitiatePostImageUploadMutationHookResult = ReturnType<
  typeof useInitiatePostImageUploadMutation
>
export type InitiatePostImageUploadMutationResult =
  ApolloReactCommon.MutationResult<InitiatePostImageUploadMutation>
export type InitiatePostImageUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InitiatePostImageUploadMutation,
  InitiatePostImageUploadMutationVariables
>
export const NewPostDocument = gql`
  query newPost($uiLanguage: UILanguage!) {
    topics {
      ...TopicFragment
    }
    currentUser {
      ...CurrentUserFragment
    }
  }
  ${TopicFragmentFragmentDoc}
  ${CurrentUserFragmentFragmentDoc}
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
  query posts(
    $first: Int!
    $skip: Int!
    $search: String
    $languages: [Int!]
    $topics: [Int!]
    $followedAuthors: Boolean
    $needsFeedback: Boolean
    $hasInteracted: Boolean
    $authorId: Int
    $status: PostStatus!
  ) {
    posts(
      first: $first
      skip: $skip
      search: $search
      languages: $languages
      topics: $topics
      followedAuthors: $followedAuthors
      needsFeedback: $needsFeedback
      hasInteracted: $hasInteracted
      authorId: $authorId
      status: $status
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
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *      search: // value for 'search'
 *      languages: // value for 'languages'
 *      topics: // value for 'topics'
 *      followedAuthors: // value for 'followedAuthors'
 *      needsFeedback: // value for 'needsFeedback'
 *      hasInteracted: // value for 'hasInteracted'
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
    $headlineImage: HeadlineImageInput!
  ) {
    updatePost(
      postId: $postId
      body: $body
      title: $title
      languageId: $languageId
      status: $status
      headlineImage: $headlineImage
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
 *      headlineImage: // value for 'headlineImage'
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
export type CreateCommentThanksMutationResult =
  ApolloReactCommon.MutationResult<CreateCommentThanksMutation>
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
export type DeleteCommentThanksMutationResult =
  ApolloReactCommon.MutationResult<DeleteCommentThanksMutation>
export type DeleteCommentThanksMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteCommentThanksMutation,
  DeleteCommentThanksMutationVariables
>
export const AddUserInterestDocument = gql`
  mutation addUserInterest($topicId: Int!) {
    addUserInterest(topicId: $topicId) {
      topic {
        id
      }
    }
  }
`
export type AddUserInterestMutationFn = ApolloReactCommon.MutationFunction<
  AddUserInterestMutation,
  AddUserInterestMutationVariables
>

/**
 * __useAddUserInterestMutation__
 *
 * To run a mutation, you first call `useAddUserInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserInterestMutation, { data, loading, error }] = useAddUserInterestMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useAddUserInterestMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddUserInterestMutation,
    AddUserInterestMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<AddUserInterestMutation, AddUserInterestMutationVariables>(
    AddUserInterestDocument,
    baseOptions,
  )
}
export type AddUserInterestMutationHookResult = ReturnType<typeof useAddUserInterestMutation>
export type AddUserInterestMutationResult =
  ApolloReactCommon.MutationResult<AddUserInterestMutation>
export type AddUserInterestMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddUserInterestMutation,
  AddUserInterestMutationVariables
>
export const RemoveUserInterestDocument = gql`
  mutation removeUserInterest($topicId: Int!) {
    removeUserInterest(topicId: $topicId) {
      id
    }
  }
`
export type RemoveUserInterestMutationFn = ApolloReactCommon.MutationFunction<
  RemoveUserInterestMutation,
  RemoveUserInterestMutationVariables
>

/**
 * __useRemoveUserInterestMutation__
 *
 * To run a mutation, you first call `useRemoveUserInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserInterestMutation, { data, loading, error }] = useRemoveUserInterestMutation({
 *   variables: {
 *      topicId: // value for 'topicId'
 *   },
 * });
 */
export function useRemoveUserInterestMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveUserInterestMutation,
    RemoveUserInterestMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RemoveUserInterestMutation,
    RemoveUserInterestMutationVariables
  >(RemoveUserInterestDocument, baseOptions)
}
export type RemoveUserInterestMutationHookResult = ReturnType<typeof useRemoveUserInterestMutation>
export type RemoveUserInterestMutationResult =
  ApolloReactCommon.MutationResult<RemoveUserInterestMutation>
export type RemoveUserInterestMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveUserInterestMutation,
  RemoveUserInterestMutationVariables
>
export const TopicsDocument = gql`
  query topics(
    $hasPosts: Boolean
    $authoredOnly: Boolean
    $uiLanguage: UILanguage!
    $languages: [Int!]
  ) {
    topics(hasPosts: $hasPosts, authoredOnly: $authoredOnly) {
      ...TopicWithPostCountFragment
    }
  }
  ${TopicWithPostCountFragmentFragmentDoc}
`

/**
 * __useTopicsQuery__
 *
 * To run a query within a React component, call `useTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicsQuery({
 *   variables: {
 *      hasPosts: // value for 'hasPosts'
 *      authoredOnly: // value for 'authoredOnly'
 *      uiLanguage: // value for 'uiLanguage'
 *      languages: // value for 'languages'
 *   },
 * });
 */
export function useTopicsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<TopicsQuery, TopicsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, baseOptions)
}
export function useTopicsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TopicsQuery, TopicsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<TopicsQuery, TopicsQueryVariables>(
    TopicsDocument,
    baseOptions,
  )
}
export type TopicsQueryHookResult = ReturnType<typeof useTopicsQuery>
export type TopicsLazyQueryHookResult = ReturnType<typeof useTopicsLazyQuery>
export type TopicsQueryResult = ApolloReactCommon.QueryResult<TopicsQuery, TopicsQueryVariables>
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
      ...CurrentUserFragment
    }
  }
  ${CurrentUserFragmentFragmentDoc}
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
export const InitiateAvatarImageUploadDocument = gql`
  mutation initiateAvatarImageUpload {
    initiateAvatarImageUpload {
      uploadUrl
      checkUrl
      finalUrl
    }
  }
`
export type InitiateAvatarImageUploadMutationFn = ApolloReactCommon.MutationFunction<
  InitiateAvatarImageUploadMutation,
  InitiateAvatarImageUploadMutationVariables
>

/**
 * __useInitiateAvatarImageUploadMutation__
 *
 * To run a mutation, you first call `useInitiateAvatarImageUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiateAvatarImageUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiateAvatarImageUploadMutation, { data, loading, error }] = useInitiateAvatarImageUploadMutation({
 *   variables: {
 *   },
 * });
 */
export function useInitiateAvatarImageUploadMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    InitiateAvatarImageUploadMutation,
    InitiateAvatarImageUploadMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    InitiateAvatarImageUploadMutation,
    InitiateAvatarImageUploadMutationVariables
  >(InitiateAvatarImageUploadDocument, baseOptions)
}
export type InitiateAvatarImageUploadMutationHookResult = ReturnType<
  typeof useInitiateAvatarImageUploadMutation
>
export type InitiateAvatarImageUploadMutationResult =
  ApolloReactCommon.MutationResult<InitiateAvatarImageUploadMutation>
export type InitiateAvatarImageUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InitiateAvatarImageUploadMutation,
  InitiateAvatarImageUploadMutationVariables
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
export type RequestResetPasswordMutationResult =
  ApolloReactCommon.MutationResult<RequestResetPasswordMutation>
export type RequestResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RequestResetPasswordMutation,
  RequestResetPasswordMutationVariables
>
export const ResendEmailVerificationEmailDocument = gql`
  mutation resendEmailVerificationEmail {
    resendEmailVerificationEmail {
      id
    }
  }
`
export type ResendEmailVerificationEmailMutationFn = ApolloReactCommon.MutationFunction<
  ResendEmailVerificationEmailMutation,
  ResendEmailVerificationEmailMutationVariables
>

/**
 * __useResendEmailVerificationEmailMutation__
 *
 * To run a mutation, you first call `useResendEmailVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendEmailVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendEmailVerificationEmailMutation, { data, loading, error }] = useResendEmailVerificationEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useResendEmailVerificationEmailMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResendEmailVerificationEmailMutation,
    ResendEmailVerificationEmailMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ResendEmailVerificationEmailMutation,
    ResendEmailVerificationEmailMutationVariables
  >(ResendEmailVerificationEmailDocument, baseOptions)
}
export type ResendEmailVerificationEmailMutationHookResult = ReturnType<
  typeof useResendEmailVerificationEmailMutation
>
export type ResendEmailVerificationEmailMutationResult =
  ApolloReactCommon.MutationResult<ResendEmailVerificationEmailMutation>
export type ResendEmailVerificationEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResendEmailVerificationEmailMutation,
  ResendEmailVerificationEmailMutationVariables
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
  query settingsFormData($uiLanguage: UILanguage!) {
    languages {
      ...LanguageFragment
    }
    topics {
      ...TopicFragment
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
      userInterests {
        ...UserInterestFragment
      }
      ...SocialMediaFragment
    }
  }
  ${LanguageFragmentFragmentDoc}
  ${TopicFragmentFragmentDoc}
  ${UserInterestFragmentFragmentDoc}
  ${SocialMediaFragmentFragmentDoc}
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
 *      uiLanguage: // value for 'uiLanguage'
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
export const UpdatePasswordDocument = gql`
  mutation updatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`
export type UpdatePasswordMutationFn = ApolloReactCommon.MutationFunction<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdatePasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(
    UpdatePasswordDocument,
    baseOptions,
  )
}
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>
export type UpdatePasswordMutationResult = ApolloReactCommon.MutationResult<UpdatePasswordMutation>
export type UpdatePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>
export const UpdateSocialMediaDocument = gql`
  mutation updateSocialMedia(
    $facebook: String
    $instagram: String
    $youtube: String
    $website: String
  ) {
    updateSocialMedia(
      facebook: $facebook
      instagram: $instagram
      youtube: $youtube
      website: $website
    ) {
      id
    }
  }
`
export type UpdateSocialMediaMutationFn = ApolloReactCommon.MutationFunction<
  UpdateSocialMediaMutation,
  UpdateSocialMediaMutationVariables
>

/**
 * __useUpdateSocialMediaMutation__
 *
 * To run a mutation, you first call `useUpdateSocialMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSocialMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSocialMediaMutation, { data, loading, error }] = useUpdateSocialMediaMutation({
 *   variables: {
 *      facebook: // value for 'facebook'
 *      instagram: // value for 'instagram'
 *      youtube: // value for 'youtube'
 *      website: // value for 'website'
 *   },
 * });
 */
export function useUpdateSocialMediaMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateSocialMediaMutation,
    UpdateSocialMediaMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateSocialMediaMutation,
    UpdateSocialMediaMutationVariables
  >(UpdateSocialMediaDocument, baseOptions)
}
export type UpdateSocialMediaMutationHookResult = ReturnType<typeof useUpdateSocialMediaMutation>
export type UpdateSocialMediaMutationResult =
  ApolloReactCommon.MutationResult<UpdateSocialMediaMutation>
export type UpdateSocialMediaMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateSocialMediaMutation,
  UpdateSocialMediaMutationVariables
>
export const UpdateUserDocument = gql`
  mutation updateUser(
    $email: String
    $name: String
    $profileImage: String
    $bio: String
    $handle: String
    $city: String
    $country: String
  ) {
    updateUser(
      handle: $handle
      email: $email
      name: $name
      profileImage: $profileImage
      bio: $bio
      city: $city
      country: $country
    ) {
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
 *      handle: // value for 'handle'
 *      city: // value for 'city'
 *      country: // value for 'country'
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
export const UserStatsDocument = gql`
  query userStats($id: Int!) {
    userById(id: $id) {
      id
      name
      handle
      postsWrittenCount
      languagesPostedInCount
      threadCommentsCount
      postCommentsCount
      thanksReceivedCount
      createdAt
      activityGraphData {
        date
        postCount
        threadCommentCount
        postCommentCount
      }
    }
  }
`

/**
 * __useUserStatsQuery__
 *
 * To run a query within a React component, call `useUserStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStatsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserStatsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserStatsQuery, UserStatsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<UserStatsQuery, UserStatsQueryVariables>(
    UserStatsDocument,
    baseOptions,
  )
}
export function useUserStatsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserStatsQuery, UserStatsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<UserStatsQuery, UserStatsQueryVariables>(
    UserStatsDocument,
    baseOptions,
  )
}
export type UserStatsQueryHookResult = ReturnType<typeof useUserStatsQuery>
export type UserStatsLazyQueryHookResult = ReturnType<typeof useUserStatsLazyQuery>
export type UserStatsQueryResult = ApolloReactCommon.QueryResult<
  UserStatsQuery,
  UserStatsQueryVariables
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
