import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
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
  BugHunter = 'BUG_HUNTER',
  CodeContributor = 'CODE_CONTRIBUTOR',
  CorrectFiftyPosts = 'CORRECT_FIFTY_POSTS',
  CorrectFivehundredPosts = 'CORRECT_FIVEHUNDRED_POSTS',
  CorrectOnehundredfiftyPosts = 'CORRECT_ONEHUNDREDFIFTY_POSTS',
  CorrectOnehundredPosts = 'CORRECT_ONEHUNDRED_POSTS',
  CorrectOnethousandPosts = 'CORRECT_ONETHOUSAND_POSTS',
  CorrectTenPosts = 'CORRECT_TEN_POSTS',
  CorrectTwentyfivePosts = 'CORRECT_TWENTYFIVE_POSTS',
  CorrectTwohundredfiftyPosts = 'CORRECT_TWOHUNDREDFIFTY_POSTS',
  Default = 'DEFAULT',
  FiftyComments = 'FIFTY_COMMENTS',
  FiftyPosts = 'FIFTY_POSTS',
  FiftyPostComments = 'FIFTY_POST_COMMENTS',
  FiftyThanks = 'FIFTY_THANKS',
  FiftyThanksGiven = 'FIFTY_THANKS_GIVEN',
  FivehundredComments = 'FIVEHUNDRED_COMMENTS',
  FivehundredPosts = 'FIVEHUNDRED_POSTS',
  FivehundredThanks = 'FIVEHUNDRED_THANKS',
  FivehundredThanksGiven = 'FIVEHUNDRED_THANKS_GIVEN',
  FivethousandComments = 'FIVETHOUSAND_COMMENTS',
  FivethousandThanks = 'FIVETHOUSAND_THANKS',
  FivethousandThanksGiven = 'FIVETHOUSAND_THANKS_GIVEN',
  Helper = 'HELPER',
  Hiker = 'HIKER',
  MountainClimber = 'MOUNTAIN_CLIMBER',
  Multilingual = 'MULTILINGUAL',
  Necromancer = 'NECROMANCER',
  Novelist = 'NOVELIST',
  Odradek = 'ODRADEK',
  OnehundredfiftyPosts = 'ONEHUNDREDFIFTY_POSTS',
  OnehundredComments = 'ONEHUNDRED_COMMENTS',
  OnehundredPosts = 'ONEHUNDRED_POSTS',
  OnehundredPostComments = 'ONEHUNDRED_POST_COMMENTS',
  OnehundredThanks = 'ONEHUNDRED_THANKS',
  OnehundredThanksGiven = 'ONEHUNDRED_THANKS_GIVEN',
  OnethousandfivehundredComments = 'ONETHOUSANDFIVEHUNDRED_COMMENTS',
  OnethousandfivehundredThanks = 'ONETHOUSANDFIVEHUNDRED_THANKS',
  OnethousandtwohundredfiftyThanks = 'ONETHOUSANDTWOHUNDREDFIFTY_THANKS',
  OnethousandComments = 'ONETHOUSAND_COMMENTS',
  OnethousandThanks = 'ONETHOUSAND_THANKS',
  OnethousandThanksGiven = 'ONETHOUSAND_THANKS_GIVEN',
  Polyglot = 'POLYGLOT',
  SeventyfivePosts = 'SEVENTYFIVE_POSTS',
  SpamReporter = 'SPAM_REPORTER',
  TenthousandThanks = 'TENTHOUSAND_THANKS',
  TenthousandThanksGiven = 'TENTHOUSAND_THANKS_GIVEN',
  TenComments = 'TEN_COMMENTS',
  TenPosts = 'TEN_POSTS',
  TenPostComments = 'TEN_POST_COMMENTS',
  TenThanks = 'TEN_THANKS',
  TenThanksGiven = 'TEN_THANKS_GIVEN',
  ThreehundredfiftyPosts = 'THREEHUNDREDFIFTY_POSTS',
  ThreehundredPostComments = 'THREEHUNDRED_POST_COMMENTS',
  TrailRunner = 'TRAIL_RUNNER',
  TwentyPosts = 'TWENTY_POSTS',
  TwohundredfiftyComments = 'TWOHUNDREDFIFTY_COMMENTS',
  TwohundredfiftyPosts = 'TWOHUNDREDFIFTY_POSTS',
  TwohundredfiftyThanks = 'TWOHUNDREDFIFTY_THANKS',
  TwohundredfiftyThanksGiven = 'TWOHUNDREDFIFTY_THANKS_GIVEN',
  TwohundredPosts = 'TWOHUNDRED_POSTS',
  TwohundredPostComments = 'TWOHUNDRED_POST_COMMENTS',
  TwothousandfivehundredComments = 'TWOTHOUSANDFIVEHUNDRED_COMMENTS',
  TwothousandfivehundredThanks = 'TWOTHOUSANDFIVEHUNDRED_THANKS',
  TwothousandfivehundredThanksGiven = 'TWOTHOUSANDFIVEHUNDRED_THANKS_GIVEN',
  TwothousandtwohundredfiftyThanks = 'TWOTHOUSANDTWOHUNDREDFIFTY_THANKS',
  TwothousandtwohundredfiftyThanksGiven = 'TWOTHOUSANDTWOHUNDREDFIFTY_THANKS_GIVEN',
  TwothousandComments = 'TWOTHOUSAND_COMMENTS',
}

export type Comment = {
  __typename?: 'Comment'
  author: User
  authorLanguageLevel: LanguageLevel
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  thanks: Array<CommentThanks>
  thread: Thread
}

export type CommentThanks = {
  __typename?: 'CommentThanks'
  author: User
  comment: Comment
  commentId: Scalars['Int']
  id: Scalars['Int']
}

export type DatedActivityCount = {
  __typename?: 'DatedActivityCount'
  date: Scalars['String']
  postCommentCount: Scalars['Int']
  postCount: Scalars['Int']
  threadCommentCount: Scalars['Int']
}

export enum DigestEmailConfiguration {
  Daily = 'DAILY',
  Off = 'OFF',
  Weekly = 'WEEKLY',
}

export type EditorNode = {
  bold?: InputMaybe<Scalars['Boolean']>
  children?: InputMaybe<Array<EditorNode>>
  colSizes?: InputMaybe<Array<Scalars['Int']>>
  hyperlink?: InputMaybe<Scalars['Boolean']>
  italic?: InputMaybe<Scalars['Boolean']>
  link?: InputMaybe<Scalars['String']>
  size?: InputMaybe<Scalars['Int']>
  text?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  underline?: InputMaybe<Scalars['Boolean']>
  uploaded?: InputMaybe<Scalars['Boolean']>
  url?: InputMaybe<Scalars['String']>
}

export type HeadlineImage = {
  __typename?: 'HeadlineImage'
  id: Scalars['Int']
  largeSize: Scalars['String']
  smallSize: Scalars['String']
  unsplashPhotographer?: Maybe<Scalars['String']>
}

export type HeadlineImageInput = {
  largeSize: Scalars['String']
  smallSize: Scalars['String']
  unsplashPhotographer?: InputMaybe<Scalars['String']>
}

export type InAppNotification = {
  __typename?: 'InAppNotification'
  bumpedAt?: Maybe<Scalars['DateTime']>
  id: Scalars['Int']
  mentionNotifications: Array<MentionNotification>
  newFollowerNotifications: Array<NewFollowerNotification>
  newPostNotifications: Array<NewPostNotification>
  post?: Maybe<Post>
  postClapNotifications: Array<PostClapNotification>
  postCommentNotifications: Array<PostCommentNotification>
  readStatus: NotificationReadStatus
  threadCommentNotifications: Array<ThreadCommentNotification>
  threadCommentThanksNotifications: Array<ThreadCommentThanksNotification>
  triggeringUser?: Maybe<User>
  type: InAppNotificationType
  userId: Scalars['Int']
}

export enum InAppNotificationType {
  Mention = 'MENTION',
  NewFollower = 'NEW_FOLLOWER',
  NewPost = 'NEW_POST',
  PostClap = 'POST_CLAP',
  PostComment = 'POST_COMMENT',
  ThreadComment = 'THREAD_COMMENT',
  ThreadCommentThanks = 'THREAD_COMMENT_THANKS',
}

export type InitiateAvatarImageUploadResponse = {
  __typename?: 'InitiateAvatarImageUploadResponse'
  /** polling goes here */
  checkUrl: Scalars['String']
  /** final url of the transform */
  finalUrl: Scalars['String']
  /** URL for the client to PUT an image to */
  uploadUrl: Scalars['String']
}

export type InitiateInlinePostImageUploadResponse = {
  __typename?: 'InitiateInlinePostImageUploadResponse'
  /** polling goes here */
  checkUrl: Scalars['String']
  /** final url of the transform */
  finalUrl: Scalars['String']
  /** URL for the client to PUT an image to */
  uploadUrl: Scalars['String']
}

export type InitiatePostImageUploadResponse = {
  __typename?: 'InitiatePostImageUploadResponse'
  /** polling goes here */
  checkUrl: Scalars['String']
  /** final url of the large size transform */
  finalUrlLarge: Scalars['String']
  /** final url of the mall size transform */
  finalUrlSmall: Scalars['String']
  /** Unsplash username of the photographer who originally uploaded the image on Unsplash */
  unsplashPhotographer?: Maybe<Scalars['String']>
  /** URL for the client to PUT an image to */
  uploadUrl: Scalars['String']
}

export type Language = {
  __typename?: 'Language'
  devName?: Maybe<Scalars['String']>
  dialect?: Maybe<Scalars['String']>
  id: Scalars['Int']
  name: Scalars['String']
  postCount: Scalars['Int']
  posts: Array<Post>
}

export enum LanguageLevel {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE',
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
  cancelAtPeriodEnd: Scalars['Boolean']
  expiresAt?: Maybe<Scalars['DateTime']>
  id: Scalars['Int']
  isActive: Scalars['Boolean']
  nextBillingDate?: Maybe<Scalars['DateTime']>
  period: MembershipSubscriptionPeriod
  userId: Scalars['Int']
}

export enum MembershipSubscriptionPeriod {
  Annualy = 'ANNUALY',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  StudentAnnually = 'STUDENT_ANNUALLY',
}

export type MentionNotification = {
  __typename?: 'MentionNotification'
  comment?: Maybe<Comment>
  id: Scalars['Int']
  postComment?: Maybe<PostComment>
}

export type Mutation = {
  __typename?: 'Mutation'
  addLanguageRelation: LanguageRelation
  addUserInterest: UserInterest
  applySuggestion: Post
  bumpPost: Post
  createComment: Comment
  createCommentThanks: CommentThanks
  createPost: Post
  createPostClap: PostClap
  createPostComment: PostComment
  createThread: Thread
  createUser: User
  deleteComment: Comment
  deleteCommentThanks: CommentThanks
  deleteInAppNotification: InAppNotification
  deletePost: Post
  deletePostClap: PostClap
  deletePostComment: PostComment
  deleteThread: Thread
  followUser: User
  initiateAvatarImageUpload: InitiateAvatarImageUploadResponse
  initiateInlinePostImageUpload: InitiateInlinePostImageUploadResponse
  initiatePostImageUpload: InitiatePostImageUploadResponse
  loginUser: User
  logout: User
  purchaseMembershipSubscription: MembershipSubscription
  removeLanguageRelation: LanguageRelation
  removeUserInterest: UserInterest
  reportSpamPost: Post
  requestResetPassword: User
  resendEmailVerificationEmail: User
  resetPassword: User
  savePost: User
  unfollowUser: User
  unsavePost: User
  updateComment: Comment
  updateInAppNotification: InAppNotification
  updatePassword: User
  updatePost: Post
  updatePostComment: PostComment
  updateSocialMedia: SocialMedia
  updateSubscriptionPaymentMethod: MembershipSubscription
  updateSubscriptionPlan: MembershipSubscription
  updateSubscriptionRenewal: MembershipSubscription
  updateUser: User
  updateUserConfiguration: UserConfiguration
}

export type MutationAddLanguageRelationArgs = {
  languageId: Scalars['Int']
  level: LanguageLevel
}

export type MutationAddUserInterestArgs = {
  topicId: Scalars['Int']
}

export type MutationApplySuggestionArgs = {
  commentId: Scalars['Int']
  currentContentInPost: Scalars['String']
  suggestedContent: Scalars['String']
}

export type MutationBumpPostArgs = {
  postId: Scalars['Int']
}

export type MutationCreateCommentArgs = {
  body: Scalars['String']
  threadId: Scalars['Int']
}

export type MutationCreateCommentThanksArgs = {
  commentId: Scalars['Int']
}

export type MutationCreatePostArgs = {
  body: Array<EditorNode>
  headlineImage: HeadlineImageInput
  languageId: Scalars['Int']
  status: PostStatus
  title: Scalars['String']
  topicIds?: InputMaybe<Array<Scalars['Int']>>
}

export type MutationCreatePostClapArgs = {
  postId: Scalars['Int']
}

export type MutationCreatePostCommentArgs = {
  body: Scalars['String']
  postId: Scalars['Int']
}

export type MutationCreateThreadArgs = {
  body: Scalars['String']
  endIndex: Scalars['Int']
  highlightedContent: Scalars['String']
  postId: Scalars['Int']
  startIndex: Scalars['Int']
}

export type MutationCreateUserArgs = {
  email: Scalars['String']
  handle: Scalars['String']
  password: Scalars['String']
}

export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int']
}

export type MutationDeleteCommentThanksArgs = {
  commentThanksId: Scalars['Int']
}

export type MutationDeleteInAppNotificationArgs = {
  notificationId: Scalars['Int']
}

export type MutationDeletePostArgs = {
  postId: Scalars['Int']
}

export type MutationDeletePostClapArgs = {
  postClapId: Scalars['Int']
}

export type MutationDeletePostCommentArgs = {
  postCommentId: Scalars['Int']
}

export type MutationDeleteThreadArgs = {
  threadId: Scalars['Int']
}

export type MutationFollowUserArgs = {
  followedUserId: Scalars['Int']
}

export type MutationLoginUserArgs = {
  identifier: Scalars['String']
  password: Scalars['String']
}

export type MutationPurchaseMembershipSubscriptionArgs = {
  paymentMethodId: Scalars['String']
  period: MembershipSubscriptionPeriod
}

export type MutationRemoveLanguageRelationArgs = {
  languageId: Scalars['Int']
}

export type MutationRemoveUserInterestArgs = {
  topicId: Scalars['Int']
}

export type MutationReportSpamPostArgs = {
  postAuthorId: Scalars['Int']
  postId: Scalars['Int']
}

export type MutationRequestResetPasswordArgs = {
  identifier: Scalars['String']
}

export type MutationResetPasswordArgs = {
  confirmPassword: Scalars['String']
  password: Scalars['String']
  resetToken: Scalars['String']
}

export type MutationSavePostArgs = {
  postId: Scalars['Int']
}

export type MutationUnfollowUserArgs = {
  followedUserId: Scalars['Int']
}

export type MutationUnsavePostArgs = {
  postId: Scalars['Int']
}

export type MutationUpdateCommentArgs = {
  body: Scalars['String']
  commentId: Scalars['Int']
}

export type MutationUpdateInAppNotificationArgs = {
  notificationId: Scalars['Int']
  readStatus?: InputMaybe<NotificationReadStatus>
}

export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String']
  oldPassword: Scalars['String']
}

export type MutationUpdatePostArgs = {
  body?: InputMaybe<Array<EditorNode>>
  headlineImage: HeadlineImageInput
  languageId?: InputMaybe<Scalars['Int']>
  postId: Scalars['Int']
  status?: InputMaybe<PostStatus>
  title?: InputMaybe<Scalars['String']>
  topicIds?: InputMaybe<Array<Scalars['Int']>>
}

export type MutationUpdatePostCommentArgs = {
  body: Scalars['String']
  postCommentId: Scalars['Int']
}

export type MutationUpdateSocialMediaArgs = {
  facebook?: InputMaybe<Scalars['String']>
  instagram?: InputMaybe<Scalars['String']>
  website?: InputMaybe<Scalars['String']>
  youtube?: InputMaybe<Scalars['String']>
}

export type MutationUpdateSubscriptionPaymentMethodArgs = {
  paymentMethodId: Scalars['String']
}

export type MutationUpdateSubscriptionPlanArgs = {
  period: MembershipSubscriptionPeriod
}

export type MutationUpdateSubscriptionRenewalArgs = {
  cancelAtPeriodEnd: Scalars['Boolean']
}

export type MutationUpdateUserArgs = {
  bio?: InputMaybe<Scalars['String']>
  city?: InputMaybe<Scalars['String']>
  country?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  handle?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  profileImage?: InputMaybe<Scalars['String']>
}

export type MutationUpdateUserConfigurationArgs = {
  digestEmailConfig?: InputMaybe<DigestEmailConfiguration>
}

export type NewFollowerNotification = {
  __typename?: 'NewFollowerNotification'
  followingUser: User
  id: Scalars['Int']
}

export type NewPostNotification = {
  __typename?: 'NewPostNotification'
  id: Scalars['Int']
  post: Post
}

export enum NotificationReadStatus {
  Read = 'READ',
  Unread = 'UNREAD',
}

export type Post = {
  __typename?: 'Post'
  author: User
  authorId: Scalars['Int']
  body: Scalars['String']
  bodySrc: Scalars['String']
  bumpCount: Scalars['Int']
  bumpedAt?: Maybe<Scalars['DateTime']>
  claps: Array<PostClap>
  commentCount: Scalars['Int']
  createdAt: Scalars['DateTime']
  excerpt: Scalars['String']
  headlineImage: HeadlineImage
  id: Scalars['Int']
  language: Language
  postComments: Array<PostComment>
  postTopics: Array<PostTopic>
  privateShareId?: Maybe<Scalars['String']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedLanguageLevel: LanguageLevel
  readTime: Scalars['Int']
  status: PostStatus
  threads: Array<Thread>
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type PostPostCommentsArgs = {
  orderBy: Array<PostPostCommentsOrderByInput>
}

export type PostClap = {
  __typename?: 'PostClap'
  author: User
  id: Scalars['Int']
  post: Post
}

export type PostClapNotification = {
  __typename?: 'PostClapNotification'
  id: Scalars['Int']
  postClap: PostClap
}

export type PostComment = {
  __typename?: 'PostComment'
  author: User
  authorLanguageLevel: LanguageLevel
  body: Scalars['String']
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  post: Post
}

export type PostCommentNotification = {
  __typename?: 'PostCommentNotification'
  id: Scalars['Int']
  postComment: PostComment
}

export type PostPage = {
  __typename?: 'PostPage'
  count: Scalars['Int']
  posts: Array<Post>
}

export type PostPostCommentsOrderByInput = {
  createdAt?: InputMaybe<SortOrder>
}

export enum PostStatus {
  Draft = 'DRAFT',
  Private = 'PRIVATE',
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
  currentUser?: Maybe<User>
  languages: Array<Language>
  postById: Post
  posts: PostPage
  topics: Array<Topic>
  userByIdentifier: User
  users: Array<User>
}

export type QueryLanguagesArgs = {
  authoredOnly?: InputMaybe<Scalars['Boolean']>
  hasPosts?: InputMaybe<Scalars['Boolean']>
}

export type QueryPostByIdArgs = {
  id?: InputMaybe<Scalars['Int']>
  privateShareId?: InputMaybe<Scalars['String']>
}

export type QueryPostsArgs = {
  authorHandle?: InputMaybe<Scalars['String']>
  authorId?: InputMaybe<Scalars['Int']>
  first: Scalars['Int']
  followedAuthors?: InputMaybe<Scalars['Boolean']>
  hasInteracted?: InputMaybe<Scalars['Boolean']>
  languages?: InputMaybe<Array<Scalars['Int']>>
  needsFeedback?: InputMaybe<Scalars['Boolean']>
  savedPosts?: InputMaybe<Scalars['Boolean']>
  search?: InputMaybe<Scalars['String']>
  skip: Scalars['Int']
  status: PostStatus
  topics?: InputMaybe<Array<Scalars['Int']>>
}

export type QueryTopicsArgs = {
  authoredOnly?: InputMaybe<Scalars['Boolean']>
  hasPosts?: InputMaybe<Scalars['Boolean']>
}

export type QueryUserByIdentifierArgs = {
  handle?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
}

export type QueryUsersArgs = {
  search?: InputMaybe<Scalars['String']>
}

export type SocialMedia = {
  __typename?: 'SocialMedia'
  facebook: Scalars['String']
  id: Scalars['Int']
  instagram: Scalars['String']
  website: Scalars['String']
  youtube: Scalars['String']
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type Thread = {
  __typename?: 'Thread'
  archived: Scalars['Boolean']
  comments: Array<Comment>
  endIndex: Scalars['Int']
  highlightedContent: Scalars['String']
  id: Scalars['Int']
  post: Post
  postId: Scalars['Int']
  startIndex: Scalars['Int']
}

export type ThreadCommentsArgs = {
  orderBy: Array<ThreadCommentsOrderByInput>
}

export type ThreadCommentNotification = {
  __typename?: 'ThreadCommentNotification'
  comment: Comment
  id: Scalars['Int']
}

export type ThreadCommentThanksNotification = {
  __typename?: 'ThreadCommentThanksNotification'
  id: Scalars['Int']
  thanks: CommentThanks
}

export type ThreadCommentsOrderByInput = {
  createdAt?: InputMaybe<SortOrder>
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
  languages?: InputMaybe<Array<Scalars['Int']>>
}

export type TopicTranslation = {
  __typename?: 'TopicTranslation'
  id: Scalars['Int']
  name: Scalars['String']
  uiLanguage: UiLanguage
}

export enum UiLanguage {
  ChineseSimplified = 'CHINESE_SIMPLIFIED',
  ChineseTraditional = 'CHINESE_TRADITIONAL',
  English = 'ENGLISH',
  German = 'GERMAN',
  Italian = 'ITALIAN',
  PortugueseBrazilian = 'PORTUGUESE_BRAZILIAN',
  Spanish = 'SPANISH',
}

export type User = {
  __typename?: 'User'
  activityGraphData: Array<DatedActivityCount>
  badges: Array<UserBadge>
  bio?: Maybe<Scalars['String']>
  cardBrand?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  configuration?: Maybe<UserConfiguration>
  country?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  email?: Maybe<Scalars['String']>
  emailAddressVerified: Scalars['Boolean']
  followedBy: Array<User>
  following: Array<User>
  handle: Scalars['String']
  id: Scalars['Int']
  isStudent: Scalars['Boolean']
  languages: Array<LanguageRelation>
  languagesPostedInCount: Scalars['Int']
  lastFourCardNumbers?: Maybe<Scalars['String']>
  membershipSubscription?: Maybe<MembershipSubscription>
  name?: Maybe<Scalars['String']>
  notifications: Array<InAppNotification>
  postCommentsCount: Scalars['Int']
  posts: Array<Post>
  postsWrittenCount: Scalars['Int']
  profileImage?: Maybe<Scalars['String']>
  savedPosts: Array<Post>
  socialMedia?: Maybe<SocialMedia>
  thanksReceivedCount: Scalars['Int']
  threadCommentsCount: Scalars['Int']
  userInterests: Array<UserInterest>
  userRole: UserRole
}

export type UserBadge = {
  __typename?: 'UserBadge'
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  type: BadgeType
}

export type UserConfiguration = {
  __typename?: 'UserConfiguration'
  digestEmail: DigestEmailConfiguration
  id: Scalars['Int']
}

export type UserInterest = {
  __typename?: 'UserInterest'
  id: Scalars['Int']
  topic: Topic
  user: User
}

export enum UserRole {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER',
}

export type CreatePostClapMutationVariables = Exact<{
  postId: Scalars['Int']
}>

export type CreatePostClapMutation = {
  __typename?: 'Mutation'
  createPostClap: {
    __typename?: 'PostClap'
    id: number
    author: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
  }
}

export type DeletePostClapMutationVariables = Exact<{
  postClapId: Scalars['Int']
}>

export type DeletePostClapMutation = {
  __typename?: 'Mutation'
  deletePostClap: { __typename?: 'PostClap'; id: number }
}

export type CreateCommentMutationVariables = Exact<{
  body: Scalars['String']
  threadId: Scalars['Int']
}>

export type CreateCommentMutation = {
  __typename?: 'Mutation'
  createComment: {
    __typename?: 'Comment'
    body: string
    author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
  }
}

export type CreatePostCommentMutationVariables = Exact<{
  body: Scalars['String']
  postId: Scalars['Int']
}>

export type CreatePostCommentMutation = {
  __typename?: 'Mutation'
  createPostComment: {
    __typename?: 'PostComment'
    id: number
    body: string
    createdAt: any
    authorLanguageLevel: LanguageLevel
    author: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
  }
}

export type CreateThreadMutationVariables = Exact<{
  postId: Scalars['Int']
  startIndex: Scalars['Int']
  endIndex: Scalars['Int']
  highlightedContent: Scalars['String']
  body: Scalars['String']
}>

export type CreateThreadMutation = {
  __typename?: 'Mutation'
  createThread: {
    __typename?: 'Thread'
    id: number
    startIndex: number
    endIndex: number
    highlightedContent: string
    archived: boolean
    comments: Array<{
      __typename?: 'Comment'
      id: number
      body: string
      createdAt: any
      authorLanguageLevel: LanguageLevel
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
      thanks: Array<{
        __typename?: 'CommentThanks'
        id: number
        author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
      }>
    }>
  }
}

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int']
}>

export type DeleteCommentMutation = {
  __typename?: 'Mutation'
  deleteComment: { __typename?: 'Comment'; id: number }
}

export type DeletePostCommentMutationVariables = Exact<{
  postCommentId: Scalars['Int']
}>

export type DeletePostCommentMutation = {
  __typename?: 'Mutation'
  deletePostComment: { __typename?: 'PostComment'; id: number }
}

export type DeleteThreadMutationVariables = Exact<{
  threadId: Scalars['Int']
}>

export type DeleteThreadMutation = {
  __typename?: 'Mutation'
  deleteThread: { __typename?: 'Thread'; id: number }
}

export type UpdateCommentMutationVariables = Exact<{
  body: Scalars['String']
  commentId: Scalars['Int']
}>

export type UpdateCommentMutation = {
  __typename?: 'Mutation'
  updateComment: {
    __typename?: 'Comment'
    id: number
    body: string
    createdAt: any
    authorLanguageLevel: LanguageLevel
    author: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
    thanks: Array<{
      __typename?: 'CommentThanks'
      id: number
      author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
    }>
  }
}

export type UpdatePostCommentMutationVariables = Exact<{
  body: Scalars['String']
  postCommentId: Scalars['Int']
}>

export type UpdatePostCommentMutation = {
  __typename?: 'Mutation'
  updatePostComment: {
    __typename?: 'PostComment'
    id: number
    body: string
    createdAt: any
    authorLanguageLevel: LanguageLevel
    author: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
  }
}

export type UserFragmentFragment = {
  __typename?: 'User'
  id: number
  name?: string | null
  handle: string
  email?: string | null
  bio?: string | null
  userRole: UserRole
  profileImage?: string | null
  city?: string | null
  country?: string | null
  emailAddressVerified: boolean
}

export type UserWithStatsFragmentFragment = {
  __typename?: 'User'
  postsWrittenCount: number
  thanksReceivedCount: number
  id: number
  name?: string | null
  handle: string
  email?: string | null
  bio?: string | null
  userRole: UserRole
  profileImage?: string | null
  city?: string | null
  country?: string | null
  emailAddressVerified: boolean
}

export type UserWithLanguagesFragmentFragment = {
  __typename?: 'User'
  id: number
  name?: string | null
  handle: string
  email?: string | null
  bio?: string | null
  userRole: UserRole
  profileImage?: string | null
  city?: string | null
  country?: string | null
  emailAddressVerified: boolean
  languages: Array<{
    __typename?: 'LanguageRelation'
    id: number
    level: LanguageLevel
    language: {
      __typename?: 'Language'
      id: number
      name: string
      devName?: string | null
      dialect?: string | null
    }
  }>
}

export type CurrentUserFragmentFragment = {
  __typename?: 'User'
  id: number
  name?: string | null
  handle: string
  email?: string | null
  bio?: string | null
  userRole: UserRole
  profileImage?: string | null
  city?: string | null
  country?: string | null
  emailAddressVerified: boolean
  notifications: Array<{
    __typename?: 'InAppNotification'
    id: number
    type: InAppNotificationType
    bumpedAt?: any | null
    readStatus: NotificationReadStatus
    userId: number
    triggeringUser?: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    } | null
    post?: {
      __typename?: 'Post'
      id: number
      title: string
      authorId: number
      headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
    } | null
    postClapNotifications: Array<{
      __typename?: 'PostClapNotification'
      id: number
      postClap: {
        __typename?: 'PostClap'
        author: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
      }
    }>
    threadCommentNotifications: Array<{
      __typename?: 'ThreadCommentNotification'
      id: number
      comment: {
        __typename?: 'Comment'
        id: number
        body: string
        author: {
          __typename?: 'User'
          id: number
          handle: string
          name?: string | null
          profileImage?: string | null
        }
        thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
      }
    }>
    postCommentNotifications: Array<{
      __typename?: 'PostCommentNotification'
      id: number
      postComment: {
        __typename?: 'PostComment'
        id: number
        body: string
        author: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
      }
    }>
    threadCommentThanksNotifications: Array<{
      __typename?: 'ThreadCommentThanksNotification'
      id: number
      thanks: {
        __typename?: 'CommentThanks'
        id: number
        author: {
          __typename?: 'User'
          id: number
          handle: string
          name?: string | null
          profileImage?: string | null
        }
        comment: {
          __typename?: 'Comment'
          id: number
          body: string
          thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
        }
      }
    }>
    newFollowerNotifications: Array<{
      __typename?: 'NewFollowerNotification'
      id: number
      followingUser: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }>
    newPostNotifications: Array<{
      __typename?: 'NewPostNotification'
      id: number
      post: {
        __typename?: 'Post'
        id: number
        title: string
        headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
        author: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
      }
    }>
    mentionNotifications: Array<{
      __typename?: 'MentionNotification'
      comment?: {
        __typename?: 'Comment'
        id: number
        body: string
        author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
        thread: {
          __typename?: 'Thread'
          id: number
          post: {
            __typename?: 'Post'
            id: number
            title: string
            headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
          }
        }
      } | null
      postComment?: {
        __typename?: 'PostComment'
        id: number
        body: string
        author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
        post: {
          __typename?: 'Post'
          id: number
          title: string
          headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
        }
      } | null
    }>
  }>
  savedPosts: Array<{ __typename?: 'Post'; id: number }>
  membershipSubscription?: {
    __typename?: 'MembershipSubscription'
    id: number
    isActive: boolean
  } | null
  languages: Array<{
    __typename?: 'LanguageRelation'
    id: number
    level: LanguageLevel
    language: {
      __typename?: 'Language'
      id: number
      name: string
      devName?: string | null
      dialect?: string | null
    }
  }>
}

export type UserConfigurationFragmentFragment = {
  __typename?: 'UserConfiguration'
  digestEmail: DigestEmailConfiguration
}

export type SocialMediaFragmentFragment = {
  __typename?: 'User'
  socialMedia?: {
    __typename?: 'SocialMedia'
    id: number
    facebook: string
    youtube: string
    instagram: string
    website: string
  } | null
}

export type AuthorFragmentFragment = {
  __typename?: 'User'
  id: number
  name?: string | null
  handle: string
  profileImage?: string | null
}

export type AuthorWithStatsFragmentFragment = {
  __typename?: 'User'
  postsWrittenCount: number
  thanksReceivedCount: number
  id: number
  name?: string | null
  handle: string
  profileImage?: string | null
}

export type AuthorWithLanguagesFragmentFragment = {
  __typename?: 'User'
  postsWrittenCount: number
  thanksReceivedCount: number
  id: number
  name?: string | null
  handle: string
  profileImage?: string | null
  languages: Array<{
    __typename?: 'LanguageRelation'
    level: LanguageLevel
    language: {
      __typename?: 'Language'
      id: number
      name: string
      devName?: string | null
      dialect?: string | null
    }
  }>
}

export type CommentFragmentFragment = {
  __typename?: 'Comment'
  id: number
  body: string
  createdAt: any
  authorLanguageLevel: LanguageLevel
  author: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    profileImage?: string | null
  }
  thanks: Array<{
    __typename?: 'CommentThanks'
    id: number
    author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
  }>
}

export type CommentThanksFragmentFragment = {
  __typename?: 'CommentThanks'
  id: number
  author: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    profileImage?: string | null
  }
}

export type PostClapFragmentFragment = {
  __typename?: 'PostClap'
  id: number
  author: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    profileImage?: string | null
  }
}

export type PostCommentFragmentFragment = {
  __typename?: 'PostComment'
  id: number
  body: string
  createdAt: any
  authorLanguageLevel: LanguageLevel
  author: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    profileImage?: string | null
  }
}

export type ThreadFragmentFragment = {
  __typename?: 'Thread'
  id: number
  startIndex: number
  endIndex: number
  highlightedContent: string
  archived: boolean
  comments: Array<{
    __typename?: 'Comment'
    id: number
    body: string
    createdAt: any
    authorLanguageLevel: LanguageLevel
    author: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
    thanks: Array<{
      __typename?: 'CommentThanks'
      id: number
      author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
    }>
  }>
}

export type PostFragmentFragment = {
  __typename?: 'Post'
  id: number
  title: string
  body: string
  status: PostStatus
  excerpt: string
  readTime: number
  createdAt: any
  publishedAt?: any | null
  bumpedAt?: any | null
  bumpCount: number
  publishedLanguageLevel: LanguageLevel
  privateShareId?: string | null
  author: {
    __typename?: 'User'
    postsWrittenCount: number
    thanksReceivedCount: number
    id: number
    name?: string | null
    handle: string
    profileImage?: string | null
    languages: Array<{
      __typename?: 'LanguageRelation'
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  }
  threads: Array<{
    __typename?: 'Thread'
    id: number
    startIndex: number
    endIndex: number
    highlightedContent: string
    archived: boolean
    comments: Array<{
      __typename?: 'Comment'
      id: number
      body: string
      createdAt: any
      authorLanguageLevel: LanguageLevel
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
      thanks: Array<{
        __typename?: 'CommentThanks'
        id: number
        author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
      }>
    }>
  }>
  postComments: Array<{
    __typename?: 'PostComment'
    id: number
    body: string
    createdAt: any
    authorLanguageLevel: LanguageLevel
    author: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
  }>
  headlineImage: {
    __typename?: 'HeadlineImage'
    id: number
    smallSize: string
    largeSize: string
    unsplashPhotographer?: string | null
  }
  claps: Array<{
    __typename?: 'PostClap'
    id: number
    author: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
  }>
}

export type PostWithTopicsFragmentFragment = {
  __typename?: 'Post'
  id: number
  title: string
  body: string
  status: PostStatus
  excerpt: string
  readTime: number
  createdAt: any
  publishedAt?: any | null
  bumpedAt?: any | null
  bumpCount: number
  publishedLanguageLevel: LanguageLevel
  privateShareId?: string | null
  postTopics: Array<{
    __typename?: 'PostTopic'
    topic: { __typename?: 'Topic'; id: number; name?: string | null }
  }>
  language: { __typename?: 'Language'; id: number; name: string; dialect?: string | null }
  author: {
    __typename?: 'User'
    postsWrittenCount: number
    thanksReceivedCount: number
    id: number
    name?: string | null
    handle: string
    profileImage?: string | null
    languages: Array<{
      __typename?: 'LanguageRelation'
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  }
  threads: Array<{
    __typename?: 'Thread'
    id: number
    startIndex: number
    endIndex: number
    highlightedContent: string
    archived: boolean
    comments: Array<{
      __typename?: 'Comment'
      id: number
      body: string
      createdAt: any
      authorLanguageLevel: LanguageLevel
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
      thanks: Array<{
        __typename?: 'CommentThanks'
        id: number
        author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
      }>
    }>
  }>
  postComments: Array<{
    __typename?: 'PostComment'
    id: number
    body: string
    createdAt: any
    authorLanguageLevel: LanguageLevel
    author: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
  }>
  headlineImage: {
    __typename?: 'HeadlineImage'
    id: number
    smallSize: string
    largeSize: string
    unsplashPhotographer?: string | null
  }
  claps: Array<{
    __typename?: 'PostClap'
    id: number
    author: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
  }>
}

export type PostCardFragmentFragment = {
  __typename?: 'Post'
  id: number
  title: string
  body: string
  excerpt: string
  readTime: number
  createdAt: any
  publishedAt?: any | null
  publishedLanguageLevel: LanguageLevel
  commentCount: number
  status: PostStatus
  headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
  claps: Array<{ __typename?: 'PostClap'; id: number }>
  author: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    profileImage?: string | null
  }
  language: {
    __typename?: 'Language'
    id: number
    name: string
    devName?: string | null
    dialect?: string | null
  }
}

export type LanguageFragmentFragment = {
  __typename?: 'Language'
  id: number
  name: string
  devName?: string | null
  dialect?: string | null
}

export type LanguageWithPostCountFragmentFragment = {
  __typename?: 'Language'
  postCount: number
  id: number
  name: string
  devName?: string | null
  dialect?: string | null
}

export type TopicFragmentFragment = { __typename?: 'Topic'; id: number; name?: string | null }

export type TopicWithPostCountFragmentFragment = {
  __typename?: 'Topic'
  postCount: number
  id: number
  name?: string | null
}

export type PostTopicFragmentFragment = {
  __typename?: 'PostTopic'
  topic: { __typename?: 'Topic'; id: number; name?: string | null }
}

export type UserBadgeFragmentFragment = {
  __typename?: 'UserBadge'
  id: number
  type: BadgeType
  createdAt: any
}

export type UserInterestFragmentFragment = {
  __typename?: 'UserInterest'
  topic: { __typename?: 'Topic'; id: number; name?: string | null }
}

export type NotificationFragmentFragment = {
  __typename?: 'InAppNotification'
  id: number
  type: InAppNotificationType
  bumpedAt?: any | null
  readStatus: NotificationReadStatus
  userId: number
  triggeringUser?: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    profileImage?: string | null
  } | null
  post?: {
    __typename?: 'Post'
    id: number
    title: string
    authorId: number
    headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
  } | null
  postClapNotifications: Array<{
    __typename?: 'PostClapNotification'
    id: number
    postClap: {
      __typename?: 'PostClap'
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }
  }>
  threadCommentNotifications: Array<{
    __typename?: 'ThreadCommentNotification'
    id: number
    comment: {
      __typename?: 'Comment'
      id: number
      body: string
      author: {
        __typename?: 'User'
        id: number
        handle: string
        name?: string | null
        profileImage?: string | null
      }
      thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
    }
  }>
  postCommentNotifications: Array<{
    __typename?: 'PostCommentNotification'
    id: number
    postComment: {
      __typename?: 'PostComment'
      id: number
      body: string
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }
  }>
  threadCommentThanksNotifications: Array<{
    __typename?: 'ThreadCommentThanksNotification'
    id: number
    thanks: {
      __typename?: 'CommentThanks'
      id: number
      author: {
        __typename?: 'User'
        id: number
        handle: string
        name?: string | null
        profileImage?: string | null
      }
      comment: {
        __typename?: 'Comment'
        id: number
        body: string
        thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
      }
    }
  }>
  newFollowerNotifications: Array<{
    __typename?: 'NewFollowerNotification'
    id: number
    followingUser: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
  }>
  newPostNotifications: Array<{
    __typename?: 'NewPostNotification'
    id: number
    post: {
      __typename?: 'Post'
      id: number
      title: string
      headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }
  }>
  mentionNotifications: Array<{
    __typename?: 'MentionNotification'
    comment?: {
      __typename?: 'Comment'
      id: number
      body: string
      author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
      thread: {
        __typename?: 'Thread'
        id: number
        post: {
          __typename?: 'Post'
          id: number
          title: string
          headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
        }
      }
    } | null
    postComment?: {
      __typename?: 'PostComment'
      id: number
      body: string
      author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
      post: {
        __typename?: 'Post'
        id: number
        title: string
        headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
      }
    } | null
  }>
}

export type AddLanguageRelationMutationVariables = Exact<{
  languageId: Scalars['Int']
  level: LanguageLevel
}>

export type AddLanguageRelationMutation = {
  __typename?: 'Mutation'
  addLanguageRelation: {
    __typename?: 'LanguageRelation'
    language: { __typename?: 'Language'; id: number }
  }
}

export type LanguagesQueryVariables = Exact<{
  hasPosts?: InputMaybe<Scalars['Boolean']>
  authoredOnly?: InputMaybe<Scalars['Boolean']>
}>

export type LanguagesQuery = {
  __typename?: 'Query'
  languages: Array<{
    __typename?: 'Language'
    postCount: number
    id: number
    name: string
    devName?: string | null
    dialect?: string | null
  }>
}

export type LanguagesFormDataQueryVariables = Exact<{ [key: string]: never }>

export type LanguagesFormDataQuery = {
  __typename?: 'Query'
  languages: Array<{
    __typename?: 'Language'
    id: number
    name: string
    devName?: string | null
    dialect?: string | null
  }>
  currentUser?: {
    __typename?: 'User'
    id: number
    languages: Array<{
      __typename?: 'LanguageRelation'
      id: number
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  } | null
}

export type RemoveLanguageRelationMutationVariables = Exact<{
  languageId: Scalars['Int']
}>

export type RemoveLanguageRelationMutation = {
  __typename?: 'Mutation'
  removeLanguageRelation: { __typename?: 'LanguageRelation'; id: number }
}

export type PurchaseMembershipSubscriptionMutationVariables = Exact<{
  period: MembershipSubscriptionPeriod
  paymentMethodId: Scalars['String']
}>

export type PurchaseMembershipSubscriptionMutation = {
  __typename?: 'Mutation'
  purchaseMembershipSubscription: { __typename?: 'MembershipSubscription'; id: number }
}

export type UpdateSubscriptionPaymentMethodMutationVariables = Exact<{
  paymentMethodId: Scalars['String']
}>

export type UpdateSubscriptionPaymentMethodMutation = {
  __typename?: 'Mutation'
  updateSubscriptionPaymentMethod: { __typename?: 'MembershipSubscription'; id: number }
}

export type UpdateSubscriptionPlanMutationVariables = Exact<{
  period: MembershipSubscriptionPeriod
}>

export type UpdateSubscriptionPlanMutation = {
  __typename?: 'Mutation'
  updateSubscriptionPlan: {
    __typename?: 'MembershipSubscription'
    id: number
    period: MembershipSubscriptionPeriod
  }
}

export type UpdateSubscriptionRenewalMutationVariables = Exact<{
  cancelAtPeriodEnd: Scalars['Boolean']
}>

export type UpdateSubscriptionRenewalMutation = {
  __typename?: 'Mutation'
  updateSubscriptionRenewal: { __typename?: 'MembershipSubscription'; id: number }
}

export type DeleteInAppNotificationMutationVariables = Exact<{
  notificationId: Scalars['Int']
}>

export type DeleteInAppNotificationMutation = {
  __typename?: 'Mutation'
  deleteInAppNotification: { __typename?: 'InAppNotification'; id: number }
}

export type UpdateInAppNotificationMutationVariables = Exact<{
  notificationId: Scalars['Int']
  readStatus?: InputMaybe<NotificationReadStatus>
}>

export type UpdateInAppNotificationMutation = {
  __typename?: 'Mutation'
  updateInAppNotification: {
    __typename?: 'InAppNotification'
    id: number
    readStatus: NotificationReadStatus
  }
}

export type PostPageQueryVariables = Exact<{
  id: Scalars['Int']
  uiLanguage: UiLanguage
}>

export type PostPageQuery = {
  __typename?: 'Query'
  postById: {
    __typename?: 'Post'
    id: number
    title: string
    body: string
    status: PostStatus
    excerpt: string
    readTime: number
    createdAt: any
    publishedAt?: any | null
    bumpedAt?: any | null
    bumpCount: number
    publishedLanguageLevel: LanguageLevel
    privateShareId?: string | null
    postTopics: Array<{
      __typename?: 'PostTopic'
      topic: { __typename?: 'Topic'; id: number; name?: string | null }
    }>
    language: { __typename?: 'Language'; id: number; name: string; dialect?: string | null }
    author: {
      __typename?: 'User'
      postsWrittenCount: number
      thanksReceivedCount: number
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
      languages: Array<{
        __typename?: 'LanguageRelation'
        level: LanguageLevel
        language: {
          __typename?: 'Language'
          id: number
          name: string
          devName?: string | null
          dialect?: string | null
        }
      }>
    }
    threads: Array<{
      __typename?: 'Thread'
      id: number
      startIndex: number
      endIndex: number
      highlightedContent: string
      archived: boolean
      comments: Array<{
        __typename?: 'Comment'
        id: number
        body: string
        createdAt: any
        authorLanguageLevel: LanguageLevel
        author: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
        thanks: Array<{
          __typename?: 'CommentThanks'
          id: number
          author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
        }>
      }>
    }>
    postComments: Array<{
      __typename?: 'PostComment'
      id: number
      body: string
      createdAt: any
      authorLanguageLevel: LanguageLevel
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }>
    headlineImage: {
      __typename?: 'HeadlineImage'
      id: number
      smallSize: string
      largeSize: string
      unsplashPhotographer?: string | null
    }
    claps: Array<{
      __typename?: 'PostClap'
      id: number
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }>
  }
  currentUser?: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
    notifications: Array<{
      __typename?: 'InAppNotification'
      id: number
      type: InAppNotificationType
      bumpedAt?: any | null
      readStatus: NotificationReadStatus
      userId: number
      triggeringUser?: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      } | null
      post?: {
        __typename?: 'Post'
        id: number
        title: string
        authorId: number
        headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
      } | null
      postClapNotifications: Array<{
        __typename?: 'PostClapNotification'
        id: number
        postClap: {
          __typename?: 'PostClap'
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      threadCommentNotifications: Array<{
        __typename?: 'ThreadCommentNotification'
        id: number
        comment: {
          __typename?: 'Comment'
          id: number
          body: string
          author: {
            __typename?: 'User'
            id: number
            handle: string
            name?: string | null
            profileImage?: string | null
          }
          thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
        }
      }>
      postCommentNotifications: Array<{
        __typename?: 'PostCommentNotification'
        id: number
        postComment: {
          __typename?: 'PostComment'
          id: number
          body: string
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      threadCommentThanksNotifications: Array<{
        __typename?: 'ThreadCommentThanksNotification'
        id: number
        thanks: {
          __typename?: 'CommentThanks'
          id: number
          author: {
            __typename?: 'User'
            id: number
            handle: string
            name?: string | null
            profileImage?: string | null
          }
          comment: {
            __typename?: 'Comment'
            id: number
            body: string
            thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
          }
        }
      }>
      newFollowerNotifications: Array<{
        __typename?: 'NewFollowerNotification'
        id: number
        followingUser: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
      }>
      newPostNotifications: Array<{
        __typename?: 'NewPostNotification'
        id: number
        post: {
          __typename?: 'Post'
          id: number
          title: string
          headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      mentionNotifications: Array<{
        __typename?: 'MentionNotification'
        comment?: {
          __typename?: 'Comment'
          id: number
          body: string
          author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
          thread: {
            __typename?: 'Thread'
            id: number
            post: {
              __typename?: 'Post'
              id: number
              title: string
              headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
            }
          }
        } | null
        postComment?: {
          __typename?: 'PostComment'
          id: number
          body: string
          author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
          post: {
            __typename?: 'Post'
            id: number
            title: string
            headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
          }
        } | null
      }>
    }>
    savedPosts: Array<{ __typename?: 'Post'; id: number }>
    membershipSubscription?: {
      __typename?: 'MembershipSubscription'
      id: number
      isActive: boolean
    } | null
    languages: Array<{
      __typename?: 'LanguageRelation'
      id: number
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  } | null
}

export type PrivatePostPageQueryVariables = Exact<{
  privateShareId: Scalars['String']
  uiLanguage: UiLanguage
}>

export type PrivatePostPageQuery = {
  __typename?: 'Query'
  postById: {
    __typename?: 'Post'
    id: number
    title: string
    body: string
    status: PostStatus
    excerpt: string
    readTime: number
    createdAt: any
    publishedAt?: any | null
    bumpedAt?: any | null
    bumpCount: number
    publishedLanguageLevel: LanguageLevel
    privateShareId?: string | null
    postTopics: Array<{
      __typename?: 'PostTopic'
      topic: { __typename?: 'Topic'; id: number; name?: string | null }
    }>
    language: { __typename?: 'Language'; id: number; name: string; dialect?: string | null }
    author: {
      __typename?: 'User'
      postsWrittenCount: number
      thanksReceivedCount: number
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
      languages: Array<{
        __typename?: 'LanguageRelation'
        level: LanguageLevel
        language: {
          __typename?: 'Language'
          id: number
          name: string
          devName?: string | null
          dialect?: string | null
        }
      }>
    }
    threads: Array<{
      __typename?: 'Thread'
      id: number
      startIndex: number
      endIndex: number
      highlightedContent: string
      archived: boolean
      comments: Array<{
        __typename?: 'Comment'
        id: number
        body: string
        createdAt: any
        authorLanguageLevel: LanguageLevel
        author: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
        thanks: Array<{
          __typename?: 'CommentThanks'
          id: number
          author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
        }>
      }>
    }>
    postComments: Array<{
      __typename?: 'PostComment'
      id: number
      body: string
      createdAt: any
      authorLanguageLevel: LanguageLevel
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }>
    headlineImage: {
      __typename?: 'HeadlineImage'
      id: number
      smallSize: string
      largeSize: string
      unsplashPhotographer?: string | null
    }
    claps: Array<{
      __typename?: 'PostClap'
      id: number
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }>
  }
  currentUser?: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
    notifications: Array<{
      __typename?: 'InAppNotification'
      id: number
      type: InAppNotificationType
      bumpedAt?: any | null
      readStatus: NotificationReadStatus
      userId: number
      triggeringUser?: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      } | null
      post?: {
        __typename?: 'Post'
        id: number
        title: string
        authorId: number
        headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
      } | null
      postClapNotifications: Array<{
        __typename?: 'PostClapNotification'
        id: number
        postClap: {
          __typename?: 'PostClap'
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      threadCommentNotifications: Array<{
        __typename?: 'ThreadCommentNotification'
        id: number
        comment: {
          __typename?: 'Comment'
          id: number
          body: string
          author: {
            __typename?: 'User'
            id: number
            handle: string
            name?: string | null
            profileImage?: string | null
          }
          thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
        }
      }>
      postCommentNotifications: Array<{
        __typename?: 'PostCommentNotification'
        id: number
        postComment: {
          __typename?: 'PostComment'
          id: number
          body: string
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      threadCommentThanksNotifications: Array<{
        __typename?: 'ThreadCommentThanksNotification'
        id: number
        thanks: {
          __typename?: 'CommentThanks'
          id: number
          author: {
            __typename?: 'User'
            id: number
            handle: string
            name?: string | null
            profileImage?: string | null
          }
          comment: {
            __typename?: 'Comment'
            id: number
            body: string
            thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
          }
        }
      }>
      newFollowerNotifications: Array<{
        __typename?: 'NewFollowerNotification'
        id: number
        followingUser: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
      }>
      newPostNotifications: Array<{
        __typename?: 'NewPostNotification'
        id: number
        post: {
          __typename?: 'Post'
          id: number
          title: string
          headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      mentionNotifications: Array<{
        __typename?: 'MentionNotification'
        comment?: {
          __typename?: 'Comment'
          id: number
          body: string
          author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
          thread: {
            __typename?: 'Thread'
            id: number
            post: {
              __typename?: 'Post'
              id: number
              title: string
              headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
            }
          }
        } | null
        postComment?: {
          __typename?: 'PostComment'
          id: number
          body: string
          author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
          post: {
            __typename?: 'Post'
            id: number
            title: string
            headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
          }
        } | null
      }>
    }>
    savedPosts: Array<{ __typename?: 'Post'; id: number }>
    membershipSubscription?: {
      __typename?: 'MembershipSubscription'
      id: number
      isActive: boolean
    } | null
    languages: Array<{
      __typename?: 'LanguageRelation'
      id: number
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  } | null
}

export type ProfilePageQueryVariables = Exact<{
  userHandle: Scalars['String']
  uiLanguage: UiLanguage
}>

export type ProfilePageQuery = {
  __typename?: 'Query'
  userByIdentifier: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
    followedBy: Array<{
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      email?: string | null
      bio?: string | null
      userRole: UserRole
      profileImage?: string | null
      city?: string | null
      country?: string | null
      emailAddressVerified: boolean
    }>
    following: Array<{
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      email?: string | null
      bio?: string | null
      userRole: UserRole
      profileImage?: string | null
      city?: string | null
      country?: string | null
      emailAddressVerified: boolean
    }>
    badges: Array<{ __typename?: 'UserBadge'; id: number; type: BadgeType; createdAt: any }>
    userInterests: Array<{
      __typename?: 'UserInterest'
      topic: { __typename?: 'Topic'; id: number; name?: string | null }
    }>
    languages: Array<{
      __typename?: 'LanguageRelation'
      id: number
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
    socialMedia?: {
      __typename?: 'SocialMedia'
      id: number
      facebook: string
      youtube: string
      instagram: string
      website: string
    } | null
  }
  posts: {
    __typename?: 'PostPage'
    count: number
    posts: Array<{
      __typename?: 'Post'
      id: number
      title: string
      body: string
      excerpt: string
      readTime: number
      createdAt: any
      publishedAt?: any | null
      publishedLanguageLevel: LanguageLevel
      commentCount: number
      status: PostStatus
      headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
      claps: Array<{ __typename?: 'PostClap'; id: number }>
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  }
  currentUser?: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
    languages: Array<{
      __typename?: 'LanguageRelation'
      id: number
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  } | null
}

export type ProfileUserFragmentFragment = {
  __typename?: 'User'
  id: number
  name?: string | null
  handle: string
  email?: string | null
  bio?: string | null
  userRole: UserRole
  profileImage?: string | null
  city?: string | null
  country?: string | null
  emailAddressVerified: boolean
  followedBy: Array<{
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
  }>
  following: Array<{
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
  }>
  badges: Array<{ __typename?: 'UserBadge'; id: number; type: BadgeType; createdAt: any }>
  userInterests: Array<{
    __typename?: 'UserInterest'
    topic: { __typename?: 'Topic'; id: number; name?: string | null }
  }>
  languages: Array<{
    __typename?: 'LanguageRelation'
    id: number
    level: LanguageLevel
    language: {
      __typename?: 'Language'
      id: number
      name: string
      devName?: string | null
      dialect?: string | null
    }
  }>
  socialMedia?: {
    __typename?: 'SocialMedia'
    id: number
    facebook: string
    youtube: string
    instagram: string
    website: string
  } | null
}

export type SubscriptionSettingsPageQueryVariables = Exact<{ [key: string]: never }>

export type SubscriptionSettingsPageQuery = {
  __typename?: 'Query'
  currentUser?: {
    __typename?: 'User'
    id: number
    email?: string | null
    emailAddressVerified: boolean
    isStudent: boolean
    lastFourCardNumbers?: string | null
    cardBrand?: string | null
    membershipSubscription?: {
      __typename?: 'MembershipSubscription'
      id: number
      period: MembershipSubscriptionPeriod
      expiresAt?: any | null
      cancelAtPeriodEnd: boolean
      isActive: boolean
    } | null
  } | null
}

export type UserWithSubscriptionFragmentFragment = {
  __typename?: 'User'
  id: number
  email?: string | null
  emailAddressVerified: boolean
  isStudent: boolean
  lastFourCardNumbers?: string | null
  cardBrand?: string | null
  membershipSubscription?: {
    __typename?: 'MembershipSubscription'
    id: number
    period: MembershipSubscriptionPeriod
    expiresAt?: any | null
    cancelAtPeriodEnd: boolean
    isActive: boolean
  } | null
}

export type ApplySuggestionMutationVariables = Exact<{
  commentId: Scalars['Int']
  suggestedContent: Scalars['String']
  currentContentInPost: Scalars['String']
}>

export type ApplySuggestionMutation = {
  __typename?: 'Mutation'
  applySuggestion: {
    __typename?: 'Post'
    id: number
    title: string
    body: string
    status: PostStatus
    excerpt: string
    readTime: number
    createdAt: any
    publishedAt?: any | null
    bumpedAt?: any | null
    bumpCount: number
    publishedLanguageLevel: LanguageLevel
    privateShareId?: string | null
    author: {
      __typename?: 'User'
      postsWrittenCount: number
      thanksReceivedCount: number
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
      languages: Array<{
        __typename?: 'LanguageRelation'
        level: LanguageLevel
        language: {
          __typename?: 'Language'
          id: number
          name: string
          devName?: string | null
          dialect?: string | null
        }
      }>
    }
    threads: Array<{
      __typename?: 'Thread'
      id: number
      startIndex: number
      endIndex: number
      highlightedContent: string
      archived: boolean
      comments: Array<{
        __typename?: 'Comment'
        id: number
        body: string
        createdAt: any
        authorLanguageLevel: LanguageLevel
        author: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
        thanks: Array<{
          __typename?: 'CommentThanks'
          id: number
          author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
        }>
      }>
    }>
    postComments: Array<{
      __typename?: 'PostComment'
      id: number
      body: string
      createdAt: any
      authorLanguageLevel: LanguageLevel
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }>
    headlineImage: {
      __typename?: 'HeadlineImage'
      id: number
      smallSize: string
      largeSize: string
      unsplashPhotographer?: string | null
    }
    claps: Array<{
      __typename?: 'PostClap'
      id: number
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }>
  }
}

export type BumpPostMutationVariables = Exact<{
  postId: Scalars['Int']
}>

export type BumpPostMutation = {
  __typename?: 'Mutation'
  bumpPost: { __typename?: 'Post'; id: number }
}

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String']
  body: Array<EditorNode> | EditorNode
  languageId: Scalars['Int']
  topicIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>
  status: PostStatus
  headlineImage: HeadlineImageInput
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost: {
    __typename?: 'Post'
    id: number
    title: string
    body: string
    excerpt: string
    readTime: number
    createdAt: any
    publishedAt?: any | null
    publishedLanguageLevel: LanguageLevel
    commentCount: number
    status: PostStatus
    headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
    claps: Array<{ __typename?: 'PostClap'; id: number }>
    author: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
    language: {
      __typename?: 'Language'
      id: number
      name: string
      devName?: string | null
      dialect?: string | null
    }
  }
}

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Int']
}>

export type DeletePostMutation = {
  __typename?: 'Mutation'
  deletePost: { __typename?: 'Post'; id: number }
}

export type EditPostQueryVariables = Exact<{
  id: Scalars['Int']
  uiLanguage: UiLanguage
}>

export type EditPostQuery = {
  __typename?: 'Query'
  postById: {
    __typename?: 'Post'
    title: string
    bodySrc: string
    updatedAt: any
    author: { __typename?: 'User'; id: number }
    language: { __typename?: 'Language'; id: number }
    headlineImage: {
      __typename?: 'HeadlineImage'
      id: number
      largeSize: string
      smallSize: string
    }
    postTopics: Array<{
      __typename?: 'PostTopic'
      topic: { __typename?: 'Topic'; id: number; name?: string | null }
    }>
  }
  topics: Array<{ __typename?: 'Topic'; id: number; name?: string | null }>
  currentUser?: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
    notifications: Array<{
      __typename?: 'InAppNotification'
      id: number
      type: InAppNotificationType
      bumpedAt?: any | null
      readStatus: NotificationReadStatus
      userId: number
      triggeringUser?: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      } | null
      post?: {
        __typename?: 'Post'
        id: number
        title: string
        authorId: number
        headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
      } | null
      postClapNotifications: Array<{
        __typename?: 'PostClapNotification'
        id: number
        postClap: {
          __typename?: 'PostClap'
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      threadCommentNotifications: Array<{
        __typename?: 'ThreadCommentNotification'
        id: number
        comment: {
          __typename?: 'Comment'
          id: number
          body: string
          author: {
            __typename?: 'User'
            id: number
            handle: string
            name?: string | null
            profileImage?: string | null
          }
          thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
        }
      }>
      postCommentNotifications: Array<{
        __typename?: 'PostCommentNotification'
        id: number
        postComment: {
          __typename?: 'PostComment'
          id: number
          body: string
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      threadCommentThanksNotifications: Array<{
        __typename?: 'ThreadCommentThanksNotification'
        id: number
        thanks: {
          __typename?: 'CommentThanks'
          id: number
          author: {
            __typename?: 'User'
            id: number
            handle: string
            name?: string | null
            profileImage?: string | null
          }
          comment: {
            __typename?: 'Comment'
            id: number
            body: string
            thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
          }
        }
      }>
      newFollowerNotifications: Array<{
        __typename?: 'NewFollowerNotification'
        id: number
        followingUser: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
      }>
      newPostNotifications: Array<{
        __typename?: 'NewPostNotification'
        id: number
        post: {
          __typename?: 'Post'
          id: number
          title: string
          headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      mentionNotifications: Array<{
        __typename?: 'MentionNotification'
        comment?: {
          __typename?: 'Comment'
          id: number
          body: string
          author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
          thread: {
            __typename?: 'Thread'
            id: number
            post: {
              __typename?: 'Post'
              id: number
              title: string
              headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
            }
          }
        } | null
        postComment?: {
          __typename?: 'PostComment'
          id: number
          body: string
          author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
          post: {
            __typename?: 'Post'
            id: number
            title: string
            headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
          }
        } | null
      }>
    }>
    savedPosts: Array<{ __typename?: 'Post'; id: number }>
    membershipSubscription?: {
      __typename?: 'MembershipSubscription'
      id: number
      isActive: boolean
    } | null
    languages: Array<{
      __typename?: 'LanguageRelation'
      id: number
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  } | null
}

export type InitiateInlinePostImageUploadMutationVariables = Exact<{ [key: string]: never }>

export type InitiateInlinePostImageUploadMutation = {
  __typename?: 'Mutation'
  initiateInlinePostImageUpload: {
    __typename?: 'InitiateInlinePostImageUploadResponse'
    uploadUrl: string
    checkUrl: string
    finalUrl: string
  }
}

export type InitiatePostImageUploadMutationVariables = Exact<{ [key: string]: never }>

export type InitiatePostImageUploadMutation = {
  __typename?: 'Mutation'
  initiatePostImageUpload: {
    __typename?: 'InitiatePostImageUploadResponse'
    uploadUrl: string
    checkUrl: string
    finalUrlLarge: string
    finalUrlSmall: string
    unsplashPhotographer?: string | null
  }
}

export type NewPostQueryVariables = Exact<{
  uiLanguage: UiLanguage
}>

export type NewPostQuery = {
  __typename?: 'Query'
  topics: Array<{ __typename?: 'Topic'; id: number; name?: string | null }>
  currentUser?: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
    notifications: Array<{
      __typename?: 'InAppNotification'
      id: number
      type: InAppNotificationType
      bumpedAt?: any | null
      readStatus: NotificationReadStatus
      userId: number
      triggeringUser?: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      } | null
      post?: {
        __typename?: 'Post'
        id: number
        title: string
        authorId: number
        headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
      } | null
      postClapNotifications: Array<{
        __typename?: 'PostClapNotification'
        id: number
        postClap: {
          __typename?: 'PostClap'
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      threadCommentNotifications: Array<{
        __typename?: 'ThreadCommentNotification'
        id: number
        comment: {
          __typename?: 'Comment'
          id: number
          body: string
          author: {
            __typename?: 'User'
            id: number
            handle: string
            name?: string | null
            profileImage?: string | null
          }
          thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
        }
      }>
      postCommentNotifications: Array<{
        __typename?: 'PostCommentNotification'
        id: number
        postComment: {
          __typename?: 'PostComment'
          id: number
          body: string
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      threadCommentThanksNotifications: Array<{
        __typename?: 'ThreadCommentThanksNotification'
        id: number
        thanks: {
          __typename?: 'CommentThanks'
          id: number
          author: {
            __typename?: 'User'
            id: number
            handle: string
            name?: string | null
            profileImage?: string | null
          }
          comment: {
            __typename?: 'Comment'
            id: number
            body: string
            thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
          }
        }
      }>
      newFollowerNotifications: Array<{
        __typename?: 'NewFollowerNotification'
        id: number
        followingUser: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
      }>
      newPostNotifications: Array<{
        __typename?: 'NewPostNotification'
        id: number
        post: {
          __typename?: 'Post'
          id: number
          title: string
          headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      mentionNotifications: Array<{
        __typename?: 'MentionNotification'
        comment?: {
          __typename?: 'Comment'
          id: number
          body: string
          author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
          thread: {
            __typename?: 'Thread'
            id: number
            post: {
              __typename?: 'Post'
              id: number
              title: string
              headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
            }
          }
        } | null
        postComment?: {
          __typename?: 'PostComment'
          id: number
          body: string
          author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
          post: {
            __typename?: 'Post'
            id: number
            title: string
            headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
          }
        } | null
      }>
    }>
    savedPosts: Array<{ __typename?: 'Post'; id: number }>
    membershipSubscription?: {
      __typename?: 'MembershipSubscription'
      id: number
      isActive: boolean
    } | null
    languages: Array<{
      __typename?: 'LanguageRelation'
      id: number
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  } | null
}

export type PostByIdQueryVariables = Exact<{
  id: Scalars['Int']
  uiLanguage: UiLanguage
}>

export type PostByIdQuery = {
  __typename?: 'Query'
  postById: {
    __typename?: 'Post'
    id: number
    title: string
    body: string
    status: PostStatus
    excerpt: string
    readTime: number
    createdAt: any
    publishedAt?: any | null
    bumpedAt?: any | null
    bumpCount: number
    publishedLanguageLevel: LanguageLevel
    privateShareId?: string | null
    postTopics: Array<{
      __typename?: 'PostTopic'
      topic: { __typename?: 'Topic'; id: number; name?: string | null }
    }>
    language: { __typename?: 'Language'; id: number; name: string; dialect?: string | null }
    author: {
      __typename?: 'User'
      postsWrittenCount: number
      thanksReceivedCount: number
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
      languages: Array<{
        __typename?: 'LanguageRelation'
        level: LanguageLevel
        language: {
          __typename?: 'Language'
          id: number
          name: string
          devName?: string | null
          dialect?: string | null
        }
      }>
    }
    threads: Array<{
      __typename?: 'Thread'
      id: number
      startIndex: number
      endIndex: number
      highlightedContent: string
      archived: boolean
      comments: Array<{
        __typename?: 'Comment'
        id: number
        body: string
        createdAt: any
        authorLanguageLevel: LanguageLevel
        author: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
        thanks: Array<{
          __typename?: 'CommentThanks'
          id: number
          author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
        }>
      }>
    }>
    postComments: Array<{
      __typename?: 'PostComment'
      id: number
      body: string
      createdAt: any
      authorLanguageLevel: LanguageLevel
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }>
    headlineImage: {
      __typename?: 'HeadlineImage'
      id: number
      smallSize: string
      largeSize: string
      unsplashPhotographer?: string | null
    }
    claps: Array<{
      __typename?: 'PostClap'
      id: number
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }>
  }
}

export type PostsQueryVariables = Exact<{
  first: Scalars['Int']
  skip: Scalars['Int']
  search?: InputMaybe<Scalars['String']>
  languages?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>
  topics?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>
  followedAuthors?: InputMaybe<Scalars['Boolean']>
  needsFeedback?: InputMaybe<Scalars['Boolean']>
  hasInteracted?: InputMaybe<Scalars['Boolean']>
  authorId?: InputMaybe<Scalars['Int']>
  status: PostStatus
  savedPosts?: InputMaybe<Scalars['Boolean']>
}>

export type PostsQuery = {
  __typename?: 'Query'
  posts: {
    __typename?: 'PostPage'
    count: number
    posts: Array<{
      __typename?: 'Post'
      id: number
      title: string
      body: string
      excerpt: string
      readTime: number
      createdAt: any
      publishedAt?: any | null
      publishedLanguageLevel: LanguageLevel
      commentCount: number
      status: PostStatus
      headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
      claps: Array<{ __typename?: 'PostClap'; id: number }>
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  }
}

export type ReportSpamPostMutationVariables = Exact<{
  postId: Scalars['Int']
  postAuthorId: Scalars['Int']
}>

export type ReportSpamPostMutation = {
  __typename?: 'Mutation'
  reportSpamPost: { __typename?: 'Post'; id: number }
}

export type SavePostMutationVariables = Exact<{
  postId: Scalars['Int']
}>

export type SavePostMutation = {
  __typename?: 'Mutation'
  savePost: { __typename?: 'User'; id: number }
}

export type UnsavePostMutationVariables = Exact<{
  postId: Scalars['Int']
}>

export type UnsavePostMutation = {
  __typename?: 'Mutation'
  unsavePost: { __typename?: 'User'; id: number }
}

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['Int']
  title?: InputMaybe<Scalars['String']>
  languageId?: InputMaybe<Scalars['Int']>
  topicIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>
  body?: InputMaybe<Array<EditorNode> | EditorNode>
  status?: InputMaybe<PostStatus>
  headlineImage: HeadlineImageInput
}>

export type UpdatePostMutation = {
  __typename?: 'Mutation'
  updatePost: {
    __typename?: 'Post'
    id: number
    title: string
    body: string
    status: PostStatus
    excerpt: string
    readTime: number
    createdAt: any
    publishedAt?: any | null
    bumpedAt?: any | null
    bumpCount: number
    publishedLanguageLevel: LanguageLevel
    privateShareId?: string | null
    author: {
      __typename?: 'User'
      postsWrittenCount: number
      thanksReceivedCount: number
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
      languages: Array<{
        __typename?: 'LanguageRelation'
        level: LanguageLevel
        language: {
          __typename?: 'Language'
          id: number
          name: string
          devName?: string | null
          dialect?: string | null
        }
      }>
    }
    threads: Array<{
      __typename?: 'Thread'
      id: number
      startIndex: number
      endIndex: number
      highlightedContent: string
      archived: boolean
      comments: Array<{
        __typename?: 'Comment'
        id: number
        body: string
        createdAt: any
        authorLanguageLevel: LanguageLevel
        author: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
        thanks: Array<{
          __typename?: 'CommentThanks'
          id: number
          author: { __typename?: 'User'; id: number; name?: string | null; handle: string }
        }>
      }>
    }>
    postComments: Array<{
      __typename?: 'PostComment'
      id: number
      body: string
      createdAt: any
      authorLanguageLevel: LanguageLevel
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }>
    headlineImage: {
      __typename?: 'HeadlineImage'
      id: number
      smallSize: string
      largeSize: string
      unsplashPhotographer?: string | null
    }
    claps: Array<{
      __typename?: 'PostClap'
      id: number
      author: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      }
    }>
  }
}

export type CreateCommentThanksMutationVariables = Exact<{
  commentId: Scalars['Int']
}>

export type CreateCommentThanksMutation = {
  __typename?: 'Mutation'
  createCommentThanks: {
    __typename?: 'CommentThanks'
    id: number
    author: {
      __typename?: 'User'
      id: number
      name?: string | null
      handle: string
      profileImage?: string | null
    }
  }
}

export type DeleteCommentThanksMutationVariables = Exact<{
  commentThanksId: Scalars['Int']
}>

export type DeleteCommentThanksMutation = {
  __typename?: 'Mutation'
  deleteCommentThanks: { __typename?: 'CommentThanks'; id: number }
}

export type AddUserInterestMutationVariables = Exact<{
  topicId: Scalars['Int']
}>

export type AddUserInterestMutation = {
  __typename?: 'Mutation'
  addUserInterest: { __typename?: 'UserInterest'; topic: { __typename?: 'Topic'; id: number } }
}

export type RemoveUserInterestMutationVariables = Exact<{
  topicId: Scalars['Int']
}>

export type RemoveUserInterestMutation = {
  __typename?: 'Mutation'
  removeUserInterest: { __typename?: 'UserInterest'; id: number }
}

export type TopicsQueryVariables = Exact<{
  hasPosts?: InputMaybe<Scalars['Boolean']>
  authoredOnly?: InputMaybe<Scalars['Boolean']>
  uiLanguage: UiLanguage
  languages?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>
}>

export type TopicsQuery = {
  __typename?: 'Query'
  topics: Array<{ __typename?: 'Topic'; postCount: number; id: number; name?: string | null }>
}

export type CreateUserMutationVariables = Exact<{
  handle: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser: { __typename?: 'User'; id: number; handle: string; email?: string | null }
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  currentUser?: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
    notifications: Array<{
      __typename?: 'InAppNotification'
      id: number
      type: InAppNotificationType
      bumpedAt?: any | null
      readStatus: NotificationReadStatus
      userId: number
      triggeringUser?: {
        __typename?: 'User'
        id: number
        name?: string | null
        handle: string
        profileImage?: string | null
      } | null
      post?: {
        __typename?: 'Post'
        id: number
        title: string
        authorId: number
        headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
      } | null
      postClapNotifications: Array<{
        __typename?: 'PostClapNotification'
        id: number
        postClap: {
          __typename?: 'PostClap'
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      threadCommentNotifications: Array<{
        __typename?: 'ThreadCommentNotification'
        id: number
        comment: {
          __typename?: 'Comment'
          id: number
          body: string
          author: {
            __typename?: 'User'
            id: number
            handle: string
            name?: string | null
            profileImage?: string | null
          }
          thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
        }
      }>
      postCommentNotifications: Array<{
        __typename?: 'PostCommentNotification'
        id: number
        postComment: {
          __typename?: 'PostComment'
          id: number
          body: string
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      threadCommentThanksNotifications: Array<{
        __typename?: 'ThreadCommentThanksNotification'
        id: number
        thanks: {
          __typename?: 'CommentThanks'
          id: number
          author: {
            __typename?: 'User'
            id: number
            handle: string
            name?: string | null
            profileImage?: string | null
          }
          comment: {
            __typename?: 'Comment'
            id: number
            body: string
            thread: { __typename?: 'Thread'; id: number; highlightedContent: string }
          }
        }
      }>
      newFollowerNotifications: Array<{
        __typename?: 'NewFollowerNotification'
        id: number
        followingUser: {
          __typename?: 'User'
          id: number
          name?: string | null
          handle: string
          profileImage?: string | null
        }
      }>
      newPostNotifications: Array<{
        __typename?: 'NewPostNotification'
        id: number
        post: {
          __typename?: 'Post'
          id: number
          title: string
          headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
          author: {
            __typename?: 'User'
            id: number
            name?: string | null
            handle: string
            profileImage?: string | null
          }
        }
      }>
      mentionNotifications: Array<{
        __typename?: 'MentionNotification'
        comment?: {
          __typename?: 'Comment'
          id: number
          body: string
          author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
          thread: {
            __typename?: 'Thread'
            id: number
            post: {
              __typename?: 'Post'
              id: number
              title: string
              headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
            }
          }
        } | null
        postComment?: {
          __typename?: 'PostComment'
          id: number
          body: string
          author: { __typename?: 'User'; id: number; handle: string; profileImage?: string | null }
          post: {
            __typename?: 'Post'
            id: number
            title: string
            headlineImage: { __typename?: 'HeadlineImage'; smallSize: string }
          }
        } | null
      }>
    }>
    savedPosts: Array<{ __typename?: 'Post'; id: number }>
    membershipSubscription?: {
      __typename?: 'MembershipSubscription'
      id: number
      isActive: boolean
    } | null
    languages: Array<{
      __typename?: 'LanguageRelation'
      id: number
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  } | null
}

export type FollowUserMutationVariables = Exact<{
  followedUserId: Scalars['Int']
}>

export type FollowUserMutation = {
  __typename?: 'Mutation'
  followUser: { __typename?: 'User'; id: number }
}

export type FollowingUsersQueryVariables = Exact<{ [key: string]: never }>

export type FollowingUsersQuery = {
  __typename?: 'Query'
  currentUser?: {
    __typename?: 'User'
    id: number
    following: Array<{ __typename?: 'User'; id: number }>
  } | null
}

export type InitiateAvatarImageUploadMutationVariables = Exact<{ [key: string]: never }>

export type InitiateAvatarImageUploadMutation = {
  __typename?: 'Mutation'
  initiateAvatarImageUpload: {
    __typename?: 'InitiateAvatarImageUploadResponse'
    uploadUrl: string
    checkUrl: string
    finalUrl: string
  }
}

export type LoginUserMutationVariables = Exact<{
  identifier: Scalars['String']
  password: Scalars['String']
}>

export type LoginUserMutation = {
  __typename?: 'Mutation'
  loginUser: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = {
  __typename?: 'Mutation'
  logout: { __typename?: 'User'; id: number }
}

export type RequestResetPasswordMutationVariables = Exact<{
  identifier: Scalars['String']
}>

export type RequestResetPasswordMutation = {
  __typename?: 'Mutation'
  requestResetPassword: { __typename?: 'User'; id: number }
}

export type ResendEmailVerificationEmailMutationVariables = Exact<{ [key: string]: never }>

export type ResendEmailVerificationEmailMutation = {
  __typename?: 'Mutation'
  resendEmailVerificationEmail: { __typename?: 'User'; id: number }
}

export type ResetPasswordMutationVariables = Exact<{
  resetToken: Scalars['String']
  password: Scalars['String']
  confirmPassword: Scalars['String']
}>

export type ResetPasswordMutation = {
  __typename?: 'Mutation'
  resetPassword: { __typename?: 'User'; id: number }
}

export type SettingsFormDataQueryVariables = Exact<{
  uiLanguage: UiLanguage
}>

export type SettingsFormDataQuery = {
  __typename?: 'Query'
  languages: Array<{
    __typename?: 'Language'
    id: number
    name: string
    devName?: string | null
    dialect?: string | null
  }>
  topics: Array<{ __typename?: 'Topic'; id: number; name?: string | null }>
  currentUser?: {
    __typename?: 'User'
    id: number
    bio?: string | null
    languages: Array<{
      __typename?: 'LanguageRelation'
      id: number
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
    userInterests: Array<{
      __typename?: 'UserInterest'
      topic: { __typename?: 'Topic'; id: number; name?: string | null }
    }>
    configuration?: {
      __typename?: 'UserConfiguration'
      id: number
      digestEmail: DigestEmailConfiguration
    } | null
    socialMedia?: {
      __typename?: 'SocialMedia'
      id: number
      facebook: string
      youtube: string
      instagram: string
      website: string
    } | null
  } | null
}

export type UnfollowUserMutationVariables = Exact<{
  followedUserId: Scalars['Int']
}>

export type UnfollowUserMutation = {
  __typename?: 'Mutation'
  unfollowUser: { __typename?: 'User'; id: number }
}

export type UpdatePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']
  newPassword: Scalars['String']
}>

export type UpdatePasswordMutation = {
  __typename?: 'Mutation'
  updatePassword: { __typename?: 'User'; id: number }
}

export type UpdateSocialMediaMutationVariables = Exact<{
  facebook?: InputMaybe<Scalars['String']>
  instagram?: InputMaybe<Scalars['String']>
  youtube?: InputMaybe<Scalars['String']>
  website?: InputMaybe<Scalars['String']>
}>

export type UpdateSocialMediaMutation = {
  __typename?: 'Mutation'
  updateSocialMedia: { __typename?: 'SocialMedia'; id: number }
}

export type UpdateUserMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  profileImage?: InputMaybe<Scalars['String']>
  bio?: InputMaybe<Scalars['String']>
  handle?: InputMaybe<Scalars['String']>
  city?: InputMaybe<Scalars['String']>
  country?: InputMaybe<Scalars['String']>
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
  }
}

export type UserByIdentifierQueryVariables = Exact<{
  handle?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
}>

export type UserByIdentifierQuery = {
  __typename?: 'Query'
  userByIdentifier: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    email?: string | null
    bio?: string | null
    userRole: UserRole
    profileImage?: string | null
    city?: string | null
    country?: string | null
    emailAddressVerified: boolean
    languages: Array<{
      __typename?: 'LanguageRelation'
      id: number
      level: LanguageLevel
      language: {
        __typename?: 'Language'
        id: number
        name: string
        devName?: string | null
        dialect?: string | null
      }
    }>
  }
}

export type UserSearchQueryVariables = Exact<{
  search: Scalars['String']
}>

export type UserSearchQuery = {
  __typename?: 'Query'
  users: Array<{ __typename?: 'User'; id: number; handle: string; name?: string | null }>
}

export type UserStatsQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type UserStatsQuery = {
  __typename?: 'Query'
  userByIdentifier: {
    __typename?: 'User'
    id: number
    name?: string | null
    handle: string
    postsWrittenCount: number
    languagesPostedInCount: number
    threadCommentsCount: number
    postCommentsCount: number
    thanksReceivedCount: number
    createdAt: any
    activityGraphData: Array<{
      __typename?: 'DatedActivityCount'
      date: string
      postCount: number
      threadCommentCount: number
      postCommentCount: number
    }>
  }
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = {
  __typename?: 'Query'
  users: Array<{
    __typename?: 'User'
    id: number
    name?: string | null
    email?: string | null
    posts: Array<{ __typename?: 'Post'; id: number; title: string; body: string }>
  }>
}

export type UpdateUserConfigurationMutationVariables = Exact<{
  digestEmailConfig?: InputMaybe<DigestEmailConfiguration>
}>

export type UpdateUserConfigurationMutation = {
  __typename?: 'Mutation'
  updateUserConfiguration: {
    __typename?: 'UserConfiguration'
    digestEmail: DigestEmailConfiguration
  }
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
    devName
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
export const NotificationFragmentFragmentDoc = gql`
  fragment NotificationFragment on InAppNotification {
    id
    type
    bumpedAt
    readStatus
    userId
    triggeringUser {
      id
      name
      handle
      profileImage
    }
    post {
      id
      title
      headlineImage {
        smallSize
      }
      authorId
    }
    postClapNotifications {
      id
      postClap {
        author {
          id
          name
          handle
          profileImage
        }
      }
    }
    threadCommentNotifications {
      id
      comment {
        id
        body
        author {
          id
          handle
          name
          profileImage
        }
        thread {
          id
          highlightedContent
        }
      }
    }
    postCommentNotifications {
      id
      postComment {
        id
        body
        author {
          id
          name
          handle
          profileImage
        }
      }
    }
    threadCommentThanksNotifications {
      id
      thanks {
        id
        author {
          id
          handle
          name
          profileImage
        }
        comment {
          id
          body
          thread {
            id
            highlightedContent
          }
        }
      }
    }
    newFollowerNotifications {
      id
      followingUser {
        id
        name
        handle
        profileImage
      }
    }
    newPostNotifications {
      id
      post {
        id
        title
        headlineImage {
          smallSize
        }
        author {
          id
          name
          handle
          profileImage
        }
      }
    }
    mentionNotifications {
      comment {
        id
        body
        author {
          id
          handle
          profileImage
        }
        thread {
          id
          post {
            id
            headlineImage {
              smallSize
            }
            title
          }
        }
      }
      postComment {
        id
        body
        author {
          id
          handle
          profileImage
        }
        post {
          id
          headlineImage {
            smallSize
          }
          title
        }
      }
    }
  }
`
export const CurrentUserFragmentFragmentDoc = gql`
  fragment CurrentUserFragment on User {
    ...UserWithLanguagesFragment
    notifications {
      ...NotificationFragment
    }
    savedPosts {
      id
    }
    membershipSubscription {
      id
      isActive
    }
  }
  ${UserWithLanguagesFragmentFragmentDoc}
  ${NotificationFragmentFragmentDoc}
`
export const UserConfigurationFragmentFragmentDoc = gql`
  fragment UserConfigurationFragment on UserConfiguration {
    digestEmail
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
    authorLanguageLevel
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
    authorLanguageLevel
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
    privateShareId
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
      unsplashPhotographer
    }
    claps {
      id
      author {
        id
        name
        handle
        profileImage
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
    id
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
    followedBy {
      ...UserFragment
    }
    following {
      ...UserFragment
    }
    badges {
      ...UserBadgeFragment
    }
    userInterests {
      ...UserInterestFragment
    }
    ...SocialMediaFragment
  }
  ${UserWithLanguagesFragmentFragmentDoc}
  ${UserFragmentFragmentDoc}
  ${UserBadgeFragmentFragmentDoc}
  ${UserInterestFragmentFragmentDoc}
  ${SocialMediaFragmentFragmentDoc}
`
export const UserWithSubscriptionFragmentFragmentDoc = gql`
  fragment UserWithSubscriptionFragment on User {
    id
    email
    emailAddressVerified
    isStudent
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
export type CreatePostClapMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<CreatePostClapMutation, CreatePostClapMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePostClapMutation, CreatePostClapMutationVariables>(
    CreatePostClapDocument,
    options,
  )
}
export type CreatePostClapMutationHookResult = ReturnType<typeof useCreatePostClapMutation>
export type CreatePostClapMutationResult = Apollo.MutationResult<CreatePostClapMutation>
export type CreatePostClapMutationOptions = Apollo.BaseMutationOptions<
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
export type DeletePostClapMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<DeletePostClapMutation, DeletePostClapMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePostClapMutation, DeletePostClapMutationVariables>(
    DeletePostClapDocument,
    options,
  )
}
export type DeletePostClapMutationHookResult = ReturnType<typeof useDeletePostClapMutation>
export type DeletePostClapMutationResult = Apollo.MutationResult<DeletePostClapMutation>
export type DeletePostClapMutationOptions = Apollo.BaseMutationOptions<
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
export type CreateCommentMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument,
    options,
  )
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
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
export type CreatePostCommentMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostCommentMutation,
    CreatePostCommentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePostCommentMutation, CreatePostCommentMutationVariables>(
    CreatePostCommentDocument,
    options,
  )
}
export type CreatePostCommentMutationHookResult = ReturnType<typeof useCreatePostCommentMutation>
export type CreatePostCommentMutationResult = Apollo.MutationResult<CreatePostCommentMutation>
export type CreatePostCommentMutationOptions = Apollo.BaseMutationOptions<
  CreatePostCommentMutation,
  CreatePostCommentMutationVariables
>
export const CreateThreadDocument = gql`
  mutation createThread(
    $postId: Int!
    $startIndex: Int!
    $endIndex: Int!
    $highlightedContent: String!
    $body: String!
  ) {
    createThread(
      postId: $postId
      startIndex: $startIndex
      endIndex: $endIndex
      highlightedContent: $highlightedContent
      body: $body
    ) {
      ...ThreadFragment
    }
  }
  ${ThreadFragmentFragmentDoc}
`
export type CreateThreadMutationFn = Apollo.MutationFunction<
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
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateThreadMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateThreadMutation, CreateThreadMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateThreadMutation, CreateThreadMutationVariables>(
    CreateThreadDocument,
    options,
  )
}
export type CreateThreadMutationHookResult = ReturnType<typeof useCreateThreadMutation>
export type CreateThreadMutationResult = Apollo.MutationResult<CreateThreadMutation>
export type CreateThreadMutationOptions = Apollo.BaseMutationOptions<
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
export type DeleteCommentMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
    DeleteCommentDocument,
    options,
  )
}
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
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
export type DeletePostCommentMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    DeletePostCommentMutation,
    DeletePostCommentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePostCommentMutation, DeletePostCommentMutationVariables>(
    DeletePostCommentDocument,
    options,
  )
}
export type DeletePostCommentMutationHookResult = ReturnType<typeof useDeletePostCommentMutation>
export type DeletePostCommentMutationResult = Apollo.MutationResult<DeletePostCommentMutation>
export type DeletePostCommentMutationOptions = Apollo.BaseMutationOptions<
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
export type DeleteThreadMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<DeleteThreadMutation, DeleteThreadMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteThreadMutation, DeleteThreadMutationVariables>(
    DeleteThreadDocument,
    options,
  )
}
export type DeleteThreadMutationHookResult = ReturnType<typeof useDeleteThreadMutation>
export type DeleteThreadMutationResult = Apollo.MutationResult<DeleteThreadMutation>
export type DeleteThreadMutationOptions = Apollo.BaseMutationOptions<
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
export type UpdateCommentMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(
    UpdateCommentDocument,
    options,
  )
}
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<
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
export type UpdatePostCommentMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePostCommentMutation,
    UpdatePostCommentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePostCommentMutation, UpdatePostCommentMutationVariables>(
    UpdatePostCommentDocument,
    options,
  )
}
export type UpdatePostCommentMutationHookResult = ReturnType<typeof useUpdatePostCommentMutation>
export type UpdatePostCommentMutationResult = Apollo.MutationResult<UpdatePostCommentMutation>
export type UpdatePostCommentMutationOptions = Apollo.BaseMutationOptions<
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
export type AddLanguageRelationMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    AddLanguageRelationMutation,
    AddLanguageRelationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddLanguageRelationMutation, AddLanguageRelationMutationVariables>(
    AddLanguageRelationDocument,
    options,
  )
}
export type AddLanguageRelationMutationHookResult = ReturnType<
  typeof useAddLanguageRelationMutation
>
export type AddLanguageRelationMutationResult = Apollo.MutationResult<AddLanguageRelationMutation>
export type AddLanguageRelationMutationOptions = Apollo.BaseMutationOptions<
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
  baseOptions?: Apollo.QueryHookOptions<LanguagesQuery, LanguagesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<LanguagesQuery, LanguagesQueryVariables>(LanguagesDocument, options)
}
export function useLanguagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LanguagesQuery, LanguagesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<LanguagesQuery, LanguagesQueryVariables>(LanguagesDocument, options)
}
export type LanguagesQueryHookResult = ReturnType<typeof useLanguagesQuery>
export type LanguagesLazyQueryHookResult = ReturnType<typeof useLanguagesLazyQuery>
export type LanguagesQueryResult = Apollo.QueryResult<LanguagesQuery, LanguagesQueryVariables>
export const LanguagesFormDataDocument = gql`
  query languagesFormData {
    languages {
      ...LanguageFragment
    }
    currentUser {
      id
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
  baseOptions?: Apollo.QueryHookOptions<LanguagesFormDataQuery, LanguagesFormDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<LanguagesFormDataQuery, LanguagesFormDataQueryVariables>(
    LanguagesFormDataDocument,
    options,
  )
}
export function useLanguagesFormDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LanguagesFormDataQuery,
    LanguagesFormDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<LanguagesFormDataQuery, LanguagesFormDataQueryVariables>(
    LanguagesFormDataDocument,
    options,
  )
}
export type LanguagesFormDataQueryHookResult = ReturnType<typeof useLanguagesFormDataQuery>
export type LanguagesFormDataLazyQueryHookResult = ReturnType<typeof useLanguagesFormDataLazyQuery>
export type LanguagesFormDataQueryResult = Apollo.QueryResult<
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
export type RemoveLanguageRelationMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    RemoveLanguageRelationMutation,
    RemoveLanguageRelationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveLanguageRelationMutation,
    RemoveLanguageRelationMutationVariables
  >(RemoveLanguageRelationDocument, options)
}
export type RemoveLanguageRelationMutationHookResult = ReturnType<
  typeof useRemoveLanguageRelationMutation
>
export type RemoveLanguageRelationMutationResult =
  Apollo.MutationResult<RemoveLanguageRelationMutation>
export type RemoveLanguageRelationMutationOptions = Apollo.BaseMutationOptions<
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
export type PurchaseMembershipSubscriptionMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    PurchaseMembershipSubscriptionMutation,
    PurchaseMembershipSubscriptionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    PurchaseMembershipSubscriptionMutation,
    PurchaseMembershipSubscriptionMutationVariables
  >(PurchaseMembershipSubscriptionDocument, options)
}
export type PurchaseMembershipSubscriptionMutationHookResult = ReturnType<
  typeof usePurchaseMembershipSubscriptionMutation
>
export type PurchaseMembershipSubscriptionMutationResult =
  Apollo.MutationResult<PurchaseMembershipSubscriptionMutation>
export type PurchaseMembershipSubscriptionMutationOptions = Apollo.BaseMutationOptions<
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
export type UpdateSubscriptionPaymentMethodMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSubscriptionPaymentMethodMutation,
    UpdateSubscriptionPaymentMethodMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateSubscriptionPaymentMethodMutation,
    UpdateSubscriptionPaymentMethodMutationVariables
  >(UpdateSubscriptionPaymentMethodDocument, options)
}
export type UpdateSubscriptionPaymentMethodMutationHookResult = ReturnType<
  typeof useUpdateSubscriptionPaymentMethodMutation
>
export type UpdateSubscriptionPaymentMethodMutationResult =
  Apollo.MutationResult<UpdateSubscriptionPaymentMethodMutation>
export type UpdateSubscriptionPaymentMethodMutationOptions = Apollo.BaseMutationOptions<
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
export type UpdateSubscriptionPlanMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSubscriptionPlanMutation,
    UpdateSubscriptionPlanMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateSubscriptionPlanMutation,
    UpdateSubscriptionPlanMutationVariables
  >(UpdateSubscriptionPlanDocument, options)
}
export type UpdateSubscriptionPlanMutationHookResult = ReturnType<
  typeof useUpdateSubscriptionPlanMutation
>
export type UpdateSubscriptionPlanMutationResult =
  Apollo.MutationResult<UpdateSubscriptionPlanMutation>
export type UpdateSubscriptionPlanMutationOptions = Apollo.BaseMutationOptions<
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
export type UpdateSubscriptionRenewalMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSubscriptionRenewalMutation,
    UpdateSubscriptionRenewalMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateSubscriptionRenewalMutation,
    UpdateSubscriptionRenewalMutationVariables
  >(UpdateSubscriptionRenewalDocument, options)
}
export type UpdateSubscriptionRenewalMutationHookResult = ReturnType<
  typeof useUpdateSubscriptionRenewalMutation
>
export type UpdateSubscriptionRenewalMutationResult =
  Apollo.MutationResult<UpdateSubscriptionRenewalMutation>
export type UpdateSubscriptionRenewalMutationOptions = Apollo.BaseMutationOptions<
  UpdateSubscriptionRenewalMutation,
  UpdateSubscriptionRenewalMutationVariables
>
export const DeleteInAppNotificationDocument = gql`
  mutation deleteInAppNotification($notificationId: Int!) {
    deleteInAppNotification(notificationId: $notificationId) {
      id
    }
  }
`
export type DeleteInAppNotificationMutationFn = Apollo.MutationFunction<
  DeleteInAppNotificationMutation,
  DeleteInAppNotificationMutationVariables
>

/**
 * __useDeleteInAppNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteInAppNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInAppNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInAppNotificationMutation, { data, loading, error }] = useDeleteInAppNotificationMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useDeleteInAppNotificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteInAppNotificationMutation,
    DeleteInAppNotificationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteInAppNotificationMutation,
    DeleteInAppNotificationMutationVariables
  >(DeleteInAppNotificationDocument, options)
}
export type DeleteInAppNotificationMutationHookResult = ReturnType<
  typeof useDeleteInAppNotificationMutation
>
export type DeleteInAppNotificationMutationResult =
  Apollo.MutationResult<DeleteInAppNotificationMutation>
export type DeleteInAppNotificationMutationOptions = Apollo.BaseMutationOptions<
  DeleteInAppNotificationMutation,
  DeleteInAppNotificationMutationVariables
>
export const UpdateInAppNotificationDocument = gql`
  mutation updateInAppNotification($notificationId: Int!, $readStatus: NotificationReadStatus) {
    updateInAppNotification(notificationId: $notificationId, readStatus: $readStatus) {
      id
      readStatus
    }
  }
`
export type UpdateInAppNotificationMutationFn = Apollo.MutationFunction<
  UpdateInAppNotificationMutation,
  UpdateInAppNotificationMutationVariables
>

/**
 * __useUpdateInAppNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateInAppNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInAppNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInAppNotificationMutation, { data, loading, error }] = useUpdateInAppNotificationMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *      readStatus: // value for 'readStatus'
 *   },
 * });
 */
export function useUpdateInAppNotificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateInAppNotificationMutation,
    UpdateInAppNotificationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateInAppNotificationMutation,
    UpdateInAppNotificationMutationVariables
  >(UpdateInAppNotificationDocument, options)
}
export type UpdateInAppNotificationMutationHookResult = ReturnType<
  typeof useUpdateInAppNotificationMutation
>
export type UpdateInAppNotificationMutationResult =
  Apollo.MutationResult<UpdateInAppNotificationMutation>
export type UpdateInAppNotificationMutationOptions = Apollo.BaseMutationOptions<
  UpdateInAppNotificationMutation,
  UpdateInAppNotificationMutationVariables
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
  baseOptions: Apollo.QueryHookOptions<PostPageQuery, PostPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostPageQuery, PostPageQueryVariables>(PostPageDocument, options)
}
export function usePostPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostPageQuery, PostPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostPageQuery, PostPageQueryVariables>(PostPageDocument, options)
}
export type PostPageQueryHookResult = ReturnType<typeof usePostPageQuery>
export type PostPageLazyQueryHookResult = ReturnType<typeof usePostPageLazyQuery>
export type PostPageQueryResult = Apollo.QueryResult<PostPageQuery, PostPageQueryVariables>
export const PrivatePostPageDocument = gql`
  query privatePostPage($privateShareId: String!, $uiLanguage: UILanguage!) {
    postById(privateShareId: $privateShareId) {
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
 * __usePrivatePostPageQuery__
 *
 * To run a query within a React component, call `usePrivatePostPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrivatePostPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrivatePostPageQuery({
 *   variables: {
 *      privateShareId: // value for 'privateShareId'
 *      uiLanguage: // value for 'uiLanguage'
 *   },
 * });
 */
export function usePrivatePostPageQuery(
  baseOptions: Apollo.QueryHookOptions<PrivatePostPageQuery, PrivatePostPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PrivatePostPageQuery, PrivatePostPageQueryVariables>(
    PrivatePostPageDocument,
    options,
  )
}
export function usePrivatePostPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PrivatePostPageQuery, PrivatePostPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PrivatePostPageQuery, PrivatePostPageQueryVariables>(
    PrivatePostPageDocument,
    options,
  )
}
export type PrivatePostPageQueryHookResult = ReturnType<typeof usePrivatePostPageQuery>
export type PrivatePostPageLazyQueryHookResult = ReturnType<typeof usePrivatePostPageLazyQuery>
export type PrivatePostPageQueryResult = Apollo.QueryResult<
  PrivatePostPageQuery,
  PrivatePostPageQueryVariables
>
export const ProfilePageDocument = gql`
  query profilePage($userHandle: String!, $uiLanguage: UILanguage!) {
    userByIdentifier(handle: $userHandle) {
      ...ProfileUserFragment
    }
    posts(first: 20, skip: 0, status: PUBLISHED, authorHandle: $userHandle) {
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
 *      userHandle: // value for 'userHandle'
 *      uiLanguage: // value for 'uiLanguage'
 *   },
 * });
 */
export function useProfilePageQuery(
  baseOptions: Apollo.QueryHookOptions<ProfilePageQuery, ProfilePageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProfilePageQuery, ProfilePageQueryVariables>(ProfilePageDocument, options)
}
export function useProfilePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfilePageQuery, ProfilePageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProfilePageQuery, ProfilePageQueryVariables>(
    ProfilePageDocument,
    options,
  )
}
export type ProfilePageQueryHookResult = ReturnType<typeof useProfilePageQuery>
export type ProfilePageLazyQueryHookResult = ReturnType<typeof useProfilePageLazyQuery>
export type ProfilePageQueryResult = Apollo.QueryResult<ProfilePageQuery, ProfilePageQueryVariables>
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
  baseOptions?: Apollo.QueryHookOptions<
    SubscriptionSettingsPageQuery,
    SubscriptionSettingsPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SubscriptionSettingsPageQuery, SubscriptionSettingsPageQueryVariables>(
    SubscriptionSettingsPageDocument,
    options,
  )
}
export function useSubscriptionSettingsPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SubscriptionSettingsPageQuery,
    SubscriptionSettingsPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SubscriptionSettingsPageQuery, SubscriptionSettingsPageQueryVariables>(
    SubscriptionSettingsPageDocument,
    options,
  )
}
export type SubscriptionSettingsPageQueryHookResult = ReturnType<
  typeof useSubscriptionSettingsPageQuery
>
export type SubscriptionSettingsPageLazyQueryHookResult = ReturnType<
  typeof useSubscriptionSettingsPageLazyQuery
>
export type SubscriptionSettingsPageQueryResult = Apollo.QueryResult<
  SubscriptionSettingsPageQuery,
  SubscriptionSettingsPageQueryVariables
>
export const ApplySuggestionDocument = gql`
  mutation applySuggestion(
    $commentId: Int!
    $suggestedContent: String!
    $currentContentInPost: String!
  ) {
    applySuggestion(
      commentId: $commentId
      suggestedContent: $suggestedContent
      currentContentInPost: $currentContentInPost
    ) {
      ...PostFragment
    }
  }
  ${PostFragmentFragmentDoc}
`
export type ApplySuggestionMutationFn = Apollo.MutationFunction<
  ApplySuggestionMutation,
  ApplySuggestionMutationVariables
>

/**
 * __useApplySuggestionMutation__
 *
 * To run a mutation, you first call `useApplySuggestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplySuggestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applySuggestionMutation, { data, loading, error }] = useApplySuggestionMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      suggestedContent: // value for 'suggestedContent'
 *      currentContentInPost: // value for 'currentContentInPost'
 *   },
 * });
 */
export function useApplySuggestionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApplySuggestionMutation,
    ApplySuggestionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ApplySuggestionMutation, ApplySuggestionMutationVariables>(
    ApplySuggestionDocument,
    options,
  )
}
export type ApplySuggestionMutationHookResult = ReturnType<typeof useApplySuggestionMutation>
export type ApplySuggestionMutationResult = Apollo.MutationResult<ApplySuggestionMutation>
export type ApplySuggestionMutationOptions = Apollo.BaseMutationOptions<
  ApplySuggestionMutation,
  ApplySuggestionMutationVariables
>
export const BumpPostDocument = gql`
  mutation bumpPost($postId: Int!) {
    bumpPost(postId: $postId) {
      id
    }
  }
`
export type BumpPostMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<BumpPostMutation, BumpPostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<BumpPostMutation, BumpPostMutationVariables>(BumpPostDocument, options)
}
export type BumpPostMutationHookResult = ReturnType<typeof useBumpPostMutation>
export type BumpPostMutationResult = Apollo.MutationResult<BumpPostMutation>
export type BumpPostMutationOptions = Apollo.BaseMutationOptions<
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
export type CreatePostMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options,
  )
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
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
export type DeletePostMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    options,
  )
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
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
  baseOptions: Apollo.QueryHookOptions<EditPostQuery, EditPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<EditPostQuery, EditPostQueryVariables>(EditPostDocument, options)
}
export function useEditPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EditPostQuery, EditPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<EditPostQuery, EditPostQueryVariables>(EditPostDocument, options)
}
export type EditPostQueryHookResult = ReturnType<typeof useEditPostQuery>
export type EditPostLazyQueryHookResult = ReturnType<typeof useEditPostLazyQuery>
export type EditPostQueryResult = Apollo.QueryResult<EditPostQuery, EditPostQueryVariables>
export const InitiateInlinePostImageUploadDocument = gql`
  mutation initiateInlinePostImageUpload {
    initiateInlinePostImageUpload {
      uploadUrl
      checkUrl
      finalUrl
    }
  }
`
export type InitiateInlinePostImageUploadMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    InitiateInlinePostImageUploadMutation,
    InitiateInlinePostImageUploadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    InitiateInlinePostImageUploadMutation,
    InitiateInlinePostImageUploadMutationVariables
  >(InitiateInlinePostImageUploadDocument, options)
}
export type InitiateInlinePostImageUploadMutationHookResult = ReturnType<
  typeof useInitiateInlinePostImageUploadMutation
>
export type InitiateInlinePostImageUploadMutationResult =
  Apollo.MutationResult<InitiateInlinePostImageUploadMutation>
export type InitiateInlinePostImageUploadMutationOptions = Apollo.BaseMutationOptions<
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
      unsplashPhotographer
    }
  }
`
export type InitiatePostImageUploadMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    InitiatePostImageUploadMutation,
    InitiatePostImageUploadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    InitiatePostImageUploadMutation,
    InitiatePostImageUploadMutationVariables
  >(InitiatePostImageUploadDocument, options)
}
export type InitiatePostImageUploadMutationHookResult = ReturnType<
  typeof useInitiatePostImageUploadMutation
>
export type InitiatePostImageUploadMutationResult =
  Apollo.MutationResult<InitiatePostImageUploadMutation>
export type InitiatePostImageUploadMutationOptions = Apollo.BaseMutationOptions<
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
  baseOptions: Apollo.QueryHookOptions<NewPostQuery, NewPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<NewPostQuery, NewPostQueryVariables>(NewPostDocument, options)
}
export function useNewPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NewPostQuery, NewPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<NewPostQuery, NewPostQueryVariables>(NewPostDocument, options)
}
export type NewPostQueryHookResult = ReturnType<typeof useNewPostQuery>
export type NewPostLazyQueryHookResult = ReturnType<typeof useNewPostLazyQuery>
export type NewPostQueryResult = Apollo.QueryResult<NewPostQuery, NewPostQueryVariables>
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
  baseOptions: Apollo.QueryHookOptions<PostByIdQuery, PostByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostByIdQuery, PostByIdQueryVariables>(PostByIdDocument, options)
}
export function usePostByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostByIdQuery, PostByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostByIdQuery, PostByIdQueryVariables>(PostByIdDocument, options)
}
export type PostByIdQueryHookResult = ReturnType<typeof usePostByIdQuery>
export type PostByIdLazyQueryHookResult = ReturnType<typeof usePostByIdLazyQuery>
export type PostByIdQueryResult = Apollo.QueryResult<PostByIdQuery, PostByIdQueryVariables>
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
    $savedPosts: Boolean
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
      savedPosts: $savedPosts
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
 *      savedPosts: // value for 'savedPosts'
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options)
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options)
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>
export const ReportSpamPostDocument = gql`
  mutation reportSpamPost($postId: Int!, $postAuthorId: Int!) {
    reportSpamPost(postId: $postId, postAuthorId: $postAuthorId) {
      id
    }
  }
`
export type ReportSpamPostMutationFn = Apollo.MutationFunction<
  ReportSpamPostMutation,
  ReportSpamPostMutationVariables
>

/**
 * __useReportSpamPostMutation__
 *
 * To run a mutation, you first call `useReportSpamPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportSpamPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportSpamPostMutation, { data, loading, error }] = useReportSpamPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      postAuthorId: // value for 'postAuthorId'
 *   },
 * });
 */
export function useReportSpamPostMutation(
  baseOptions?: Apollo.MutationHookOptions<ReportSpamPostMutation, ReportSpamPostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ReportSpamPostMutation, ReportSpamPostMutationVariables>(
    ReportSpamPostDocument,
    options,
  )
}
export type ReportSpamPostMutationHookResult = ReturnType<typeof useReportSpamPostMutation>
export type ReportSpamPostMutationResult = Apollo.MutationResult<ReportSpamPostMutation>
export type ReportSpamPostMutationOptions = Apollo.BaseMutationOptions<
  ReportSpamPostMutation,
  ReportSpamPostMutationVariables
>
export const SavePostDocument = gql`
  mutation savePost($postId: Int!) {
    savePost(postId: $postId) {
      id
    }
  }
`
export type SavePostMutationFn = Apollo.MutationFunction<
  SavePostMutation,
  SavePostMutationVariables
>

/**
 * __useSavePostMutation__
 *
 * To run a mutation, you first call `useSavePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePostMutation, { data, loading, error }] = useSavePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useSavePostMutation(
  baseOptions?: Apollo.MutationHookOptions<SavePostMutation, SavePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SavePostMutation, SavePostMutationVariables>(SavePostDocument, options)
}
export type SavePostMutationHookResult = ReturnType<typeof useSavePostMutation>
export type SavePostMutationResult = Apollo.MutationResult<SavePostMutation>
export type SavePostMutationOptions = Apollo.BaseMutationOptions<
  SavePostMutation,
  SavePostMutationVariables
>
export const UnsavePostDocument = gql`
  mutation unsavePost($postId: Int!) {
    unsavePost(postId: $postId) {
      id
    }
  }
`
export type UnsavePostMutationFn = Apollo.MutationFunction<
  UnsavePostMutation,
  UnsavePostMutationVariables
>

/**
 * __useUnsavePostMutation__
 *
 * To run a mutation, you first call `useUnsavePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsavePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsavePostMutation, { data, loading, error }] = useUnsavePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUnsavePostMutation(
  baseOptions?: Apollo.MutationHookOptions<UnsavePostMutation, UnsavePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UnsavePostMutation, UnsavePostMutationVariables>(
    UnsavePostDocument,
    options,
  )
}
export type UnsavePostMutationHookResult = ReturnType<typeof useUnsavePostMutation>
export type UnsavePostMutationResult = Apollo.MutationResult<UnsavePostMutation>
export type UnsavePostMutationOptions = Apollo.BaseMutationOptions<
  UnsavePostMutation,
  UnsavePostMutationVariables
>
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
export type UpdatePostMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    options,
  )
}
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
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
export type CreateCommentThanksMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentThanksMutation,
    CreateCommentThanksMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateCommentThanksMutation, CreateCommentThanksMutationVariables>(
    CreateCommentThanksDocument,
    options,
  )
}
export type CreateCommentThanksMutationHookResult = ReturnType<
  typeof useCreateCommentThanksMutation
>
export type CreateCommentThanksMutationResult = Apollo.MutationResult<CreateCommentThanksMutation>
export type CreateCommentThanksMutationOptions = Apollo.BaseMutationOptions<
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
export type DeleteCommentThanksMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCommentThanksMutation,
    DeleteCommentThanksMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteCommentThanksMutation, DeleteCommentThanksMutationVariables>(
    DeleteCommentThanksDocument,
    options,
  )
}
export type DeleteCommentThanksMutationHookResult = ReturnType<
  typeof useDeleteCommentThanksMutation
>
export type DeleteCommentThanksMutationResult = Apollo.MutationResult<DeleteCommentThanksMutation>
export type DeleteCommentThanksMutationOptions = Apollo.BaseMutationOptions<
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
export type AddUserInterestMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    AddUserInterestMutation,
    AddUserInterestMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddUserInterestMutation, AddUserInterestMutationVariables>(
    AddUserInterestDocument,
    options,
  )
}
export type AddUserInterestMutationHookResult = ReturnType<typeof useAddUserInterestMutation>
export type AddUserInterestMutationResult = Apollo.MutationResult<AddUserInterestMutation>
export type AddUserInterestMutationOptions = Apollo.BaseMutationOptions<
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
export type RemoveUserInterestMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    RemoveUserInterestMutation,
    RemoveUserInterestMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RemoveUserInterestMutation, RemoveUserInterestMutationVariables>(
    RemoveUserInterestDocument,
    options,
  )
}
export type RemoveUserInterestMutationHookResult = ReturnType<typeof useRemoveUserInterestMutation>
export type RemoveUserInterestMutationResult = Apollo.MutationResult<RemoveUserInterestMutation>
export type RemoveUserInterestMutationOptions = Apollo.BaseMutationOptions<
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
  baseOptions: Apollo.QueryHookOptions<TopicsQuery, TopicsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options)
}
export function useTopicsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TopicsQuery, TopicsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options)
}
export type TopicsQueryHookResult = ReturnType<typeof useTopicsQuery>
export type TopicsLazyQueryHookResult = ReturnType<typeof useTopicsLazyQuery>
export type TopicsQueryResult = Apollo.QueryResult<TopicsQuery, TopicsQueryVariables>
export const CreateUserDocument = gql`
  mutation createUser($handle: String!, $email: String!, $password: String!) {
    createUser(handle: $handle, email: $email, password: $password) {
      id
      handle
      email
    }
  }
`
export type CreateUserMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  )
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
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
  baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options)
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options,
  )
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>
export const FollowUserDocument = gql`
  mutation followUser($followedUserId: Int!) {
    followUser(followedUserId: $followedUserId) {
      id
    }
  }
`
export type FollowUserMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(
    FollowUserDocument,
    options,
  )
}
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<
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
  baseOptions?: Apollo.QueryHookOptions<FollowingUsersQuery, FollowingUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<FollowingUsersQuery, FollowingUsersQueryVariables>(
    FollowingUsersDocument,
    options,
  )
}
export function useFollowingUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FollowingUsersQuery, FollowingUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<FollowingUsersQuery, FollowingUsersQueryVariables>(
    FollowingUsersDocument,
    options,
  )
}
export type FollowingUsersQueryHookResult = ReturnType<typeof useFollowingUsersQuery>
export type FollowingUsersLazyQueryHookResult = ReturnType<typeof useFollowingUsersLazyQuery>
export type FollowingUsersQueryResult = Apollo.QueryResult<
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
export type InitiateAvatarImageUploadMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    InitiateAvatarImageUploadMutation,
    InitiateAvatarImageUploadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    InitiateAvatarImageUploadMutation,
    InitiateAvatarImageUploadMutationVariables
  >(InitiateAvatarImageUploadDocument, options)
}
export type InitiateAvatarImageUploadMutationHookResult = ReturnType<
  typeof useInitiateAvatarImageUploadMutation
>
export type InitiateAvatarImageUploadMutationResult =
  Apollo.MutationResult<InitiateAvatarImageUploadMutation>
export type InitiateAvatarImageUploadMutationOptions = Apollo.BaseMutationOptions<
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
export type LoginUserMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument,
    options,
  )
}
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<
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
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>

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
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options)
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
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
export type RequestResetPasswordMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    RequestResetPasswordMutation,
    RequestResetPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RequestResetPasswordMutation, RequestResetPasswordMutationVariables>(
    RequestResetPasswordDocument,
    options,
  )
}
export type RequestResetPasswordMutationHookResult = ReturnType<
  typeof useRequestResetPasswordMutation
>
export type RequestResetPasswordMutationResult = Apollo.MutationResult<RequestResetPasswordMutation>
export type RequestResetPasswordMutationOptions = Apollo.BaseMutationOptions<
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
export type ResendEmailVerificationEmailMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    ResendEmailVerificationEmailMutation,
    ResendEmailVerificationEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ResendEmailVerificationEmailMutation,
    ResendEmailVerificationEmailMutationVariables
  >(ResendEmailVerificationEmailDocument, options)
}
export type ResendEmailVerificationEmailMutationHookResult = ReturnType<
  typeof useResendEmailVerificationEmailMutation
>
export type ResendEmailVerificationEmailMutationResult =
  Apollo.MutationResult<ResendEmailVerificationEmailMutation>
export type ResendEmailVerificationEmailMutationOptions = Apollo.BaseMutationOptions<
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
export type ResetPasswordMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    ResetPasswordDocument,
    options,
  )
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
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
      id
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
      configuration {
        id
        digestEmail
      }
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
  baseOptions: Apollo.QueryHookOptions<SettingsFormDataQuery, SettingsFormDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SettingsFormDataQuery, SettingsFormDataQueryVariables>(
    SettingsFormDataDocument,
    options,
  )
}
export function useSettingsFormDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SettingsFormDataQuery, SettingsFormDataQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SettingsFormDataQuery, SettingsFormDataQueryVariables>(
    SettingsFormDataDocument,
    options,
  )
}
export type SettingsFormDataQueryHookResult = ReturnType<typeof useSettingsFormDataQuery>
export type SettingsFormDataLazyQueryHookResult = ReturnType<typeof useSettingsFormDataLazyQuery>
export type SettingsFormDataQueryResult = Apollo.QueryResult<
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
export type UnfollowUserMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(
    UnfollowUserDocument,
    options,
  )
}
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<
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
export type UpdatePasswordMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(
    UpdatePasswordDocument,
    options,
  )
}
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<
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
export type UpdateSocialMediaMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSocialMediaMutation,
    UpdateSocialMediaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateSocialMediaMutation, UpdateSocialMediaMutationVariables>(
    UpdateSocialMediaDocument,
    options,
  )
}
export type UpdateSocialMediaMutationHookResult = ReturnType<typeof useUpdateSocialMediaMutation>
export type UpdateSocialMediaMutationResult = Apollo.MutationResult<UpdateSocialMediaMutation>
export type UpdateSocialMediaMutationOptions = Apollo.BaseMutationOptions<
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
export type UpdateUserMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  )
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const UserByIdentifierDocument = gql`
  query userByIdentifier($handle: String, $id: Int) {
    userByIdentifier(handle: $handle, id: $id) {
      ...UserWithLanguagesFragment
    }
  }
  ${UserWithLanguagesFragmentFragmentDoc}
`

/**
 * __useUserByIdentifierQuery__
 *
 * To run a query within a React component, call `useUserByIdentifierQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdentifierQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdentifierQuery({
 *   variables: {
 *      handle: // value for 'handle'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdentifierQuery(
  baseOptions?: Apollo.QueryHookOptions<UserByIdentifierQuery, UserByIdentifierQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserByIdentifierQuery, UserByIdentifierQueryVariables>(
    UserByIdentifierDocument,
    options,
  )
}
export function useUserByIdentifierLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserByIdentifierQuery, UserByIdentifierQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserByIdentifierQuery, UserByIdentifierQueryVariables>(
    UserByIdentifierDocument,
    options,
  )
}
export type UserByIdentifierQueryHookResult = ReturnType<typeof useUserByIdentifierQuery>
export type UserByIdentifierLazyQueryHookResult = ReturnType<typeof useUserByIdentifierLazyQuery>
export type UserByIdentifierQueryResult = Apollo.QueryResult<
  UserByIdentifierQuery,
  UserByIdentifierQueryVariables
>
export const UserSearchDocument = gql`
  query userSearch($search: String!) {
    users(search: $search) {
      id
      handle
      name
    }
  }
`

/**
 * __useUserSearchQuery__
 *
 * To run a query within a React component, call `useUserSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSearchQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useUserSearchQuery(
  baseOptions: Apollo.QueryHookOptions<UserSearchQuery, UserSearchQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserSearchQuery, UserSearchQueryVariables>(UserSearchDocument, options)
}
export function useUserSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserSearchQuery, UserSearchQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserSearchQuery, UserSearchQueryVariables>(UserSearchDocument, options)
}
export type UserSearchQueryHookResult = ReturnType<typeof useUserSearchQuery>
export type UserSearchLazyQueryHookResult = ReturnType<typeof useUserSearchLazyQuery>
export type UserSearchQueryResult = Apollo.QueryResult<UserSearchQuery, UserSearchQueryVariables>
export const UserStatsDocument = gql`
  query userStats($id: Int!) {
    userByIdentifier(id: $id) {
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
  baseOptions: Apollo.QueryHookOptions<UserStatsQuery, UserStatsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, options)
}
export function useUserStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserStatsQuery, UserStatsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, options)
}
export type UserStatsQueryHookResult = ReturnType<typeof useUserStatsQuery>
export type UserStatsLazyQueryHookResult = ReturnType<typeof useUserStatsLazyQuery>
export type UserStatsQueryResult = Apollo.QueryResult<UserStatsQuery, UserStatsQueryVariables>
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
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options)
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options)
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>
export const UpdateUserConfigurationDocument = gql`
  mutation updateUserConfiguration($digestEmailConfig: DigestEmailConfiguration) {
    updateUserConfiguration(digestEmailConfig: $digestEmailConfig) {
      ...UserConfigurationFragment
    }
  }
  ${UserConfigurationFragmentFragmentDoc}
`
export type UpdateUserConfigurationMutationFn = Apollo.MutationFunction<
  UpdateUserConfigurationMutation,
  UpdateUserConfigurationMutationVariables
>

/**
 * __useUpdateUserConfigurationMutation__
 *
 * To run a mutation, you first call `useUpdateUserConfigurationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserConfigurationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserConfigurationMutation, { data, loading, error }] = useUpdateUserConfigurationMutation({
 *   variables: {
 *      digestEmailConfig: // value for 'digestEmailConfig'
 *   },
 * });
 */
export function useUpdateUserConfigurationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserConfigurationMutation,
    UpdateUserConfigurationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateUserConfigurationMutation,
    UpdateUserConfigurationMutationVariables
  >(UpdateUserConfigurationDocument, options)
}
export type UpdateUserConfigurationMutationHookResult = ReturnType<
  typeof useUpdateUserConfigurationMutation
>
export type UpdateUserConfigurationMutationResult =
  Apollo.MutationResult<UpdateUserConfigurationMutation>
export type UpdateUserConfigurationMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserConfigurationMutation,
  UpdateUserConfigurationMutationVariables
>
