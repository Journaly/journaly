--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: BadgeType; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."BadgeType" AS ENUM (
    'ALPHA_USER',
    'BETA_USER',
    'ONEHUNDRED_POSTS',
    'TEN_POSTS',
    'CODE_CONTRIBUTOR',
    'ODRADEK',
    'NECROMANCER'
);


ALTER TYPE public."BadgeType" OWNER TO robin;

--
-- Name: EmailNotificationType; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."EmailNotificationType" AS ENUM (
    'THREAD_COMMENT',
    'POST_COMMENT',
    'THREAD_COMMENT_THANKS',
    'NEW_POST',
    'POST_CLAP'
);


ALTER TYPE public."EmailNotificationType" OWNER TO robin;

--
-- Name: EmailVerificationStatus; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."EmailVerificationStatus" AS ENUM (
    'PENDING',
    'VERIFIED'
);


ALTER TYPE public."EmailVerificationStatus" OWNER TO robin;

--
-- Name: InAppNotificationType; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."InAppNotificationType" AS ENUM (
    'THREAD_COMMENT',
    'POST_COMMENT',
    'THREAD_COMMENT_THANKS',
    'NEW_POST',
    'POST_CLAP',
    'NEW_FOLLOWER'
);


ALTER TYPE public."InAppNotificationType" OWNER TO robin;

--
-- Name: LanguageLevel; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."LanguageLevel" AS ENUM (
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
    'NATIVE'
);


ALTER TYPE public."LanguageLevel" OWNER TO robin;

--
-- Name: MembershipSubscriptionPeriod; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."MembershipSubscriptionPeriod" AS ENUM (
    'MONTHLY',
    'QUARTERLY',
    'ANNUALY',
    'STUDENT_ANNUALLY'
);


ALTER TYPE public."MembershipSubscriptionPeriod" OWNER TO robin;

--
-- Name: NotificationReadStatus; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."NotificationReadStatus" AS ENUM (
    'READ',
    'UNREAD'
);


ALTER TYPE public."NotificationReadStatus" OWNER TO robin;

--
-- Name: PostStatus; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."PostStatus" AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'PRIVATE'
);


ALTER TYPE public."PostStatus" OWNER TO robin;

--
-- Name: UILanguage; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."UILanguage" AS ENUM (
    'ENGLISH',
    'GERMAN',
    'SPANISH'
);


ALTER TYPE public."UILanguage" OWNER TO robin;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'MODERATOR',
    'USER'
);


ALTER TYPE public."UserRole" OWNER TO robin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Auth; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."Auth" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    password text NOT NULL,
    "resetToken" text,
    "resetTokenExpiry" integer,
    "emailVerificationToken" text,
    "emailVerificationStatus" public."EmailVerificationStatus" DEFAULT 'PENDING'::public."EmailVerificationStatus" NOT NULL
);


ALTER TABLE public."Auth" OWNER TO robin;

--
-- Name: Auth_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."Auth_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Auth_id_seq" OWNER TO robin;

--
-- Name: Auth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."Auth_id_seq" OWNED BY public."Auth".id;


--
-- Name: Comment; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    body text NOT NULL,
    "authorId" integer NOT NULL,
    "threadId" integer NOT NULL,
    "authorLanguageLevel" public."LanguageLevel" DEFAULT 'BEGINNER'::public."LanguageLevel" NOT NULL
);


ALTER TABLE public."Comment" OWNER TO robin;

--
-- Name: CommentThanks; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."CommentThanks" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "authorId" integer NOT NULL,
    "commentId" integer NOT NULL
);


ALTER TABLE public."CommentThanks" OWNER TO robin;

--
-- Name: CommentThanks_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."CommentThanks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CommentThanks_id_seq" OWNER TO robin;

--
-- Name: CommentThanks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."CommentThanks_id_seq" OWNED BY public."CommentThanks".id;


--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Comment_id_seq" OWNER TO robin;

--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: HeadlineImage; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."HeadlineImage" (
    id integer NOT NULL,
    "smallSize" text NOT NULL,
    "largeSize" text NOT NULL
);


ALTER TABLE public."HeadlineImage" OWNER TO robin;

--
-- Name: HeadlineImage_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."HeadlineImage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."HeadlineImage_id_seq" OWNER TO robin;

--
-- Name: HeadlineImage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."HeadlineImage_id_seq" OWNED BY public."HeadlineImage".id;


--
-- Name: InAppNotification; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."InAppNotification" (
    id integer NOT NULL,
    type public."InAppNotificationType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "bumpedAt" timestamp(3) without time zone,
    "readStatus" public."NotificationReadStatus" DEFAULT 'UNREAD'::public."NotificationReadStatus" NOT NULL,
    "postId" integer,
    "userId" integer NOT NULL,
    "triggeringUserId" integer
);


ALTER TABLE public."InAppNotification" OWNER TO robin;

--
-- Name: InAppNotification_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."InAppNotification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."InAppNotification_id_seq" OWNER TO robin;

--
-- Name: InAppNotification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."InAppNotification_id_seq" OWNED BY public."InAppNotification".id;


--
-- Name: Language; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."Language" (
    id integer NOT NULL,
    name text NOT NULL,
    dialect text,
    "devName" text
);


ALTER TABLE public."Language" OWNER TO robin;

--
-- Name: LanguageLearning; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."LanguageLearning" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "languageId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."LanguageLearning" OWNER TO robin;

--
-- Name: LanguageLearning_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."LanguageLearning_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LanguageLearning_id_seq" OWNER TO robin;

--
-- Name: LanguageLearning_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."LanguageLearning_id_seq" OWNED BY public."LanguageLearning".id;


--
-- Name: LanguageNative; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."LanguageNative" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "languageId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."LanguageNative" OWNER TO robin;

--
-- Name: LanguageNative_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."LanguageNative_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LanguageNative_id_seq" OWNER TO robin;

--
-- Name: LanguageNative_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."LanguageNative_id_seq" OWNED BY public."LanguageNative".id;


--
-- Name: LanguageRelation; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."LanguageRelation" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "languageId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    level public."LanguageLevel" NOT NULL
);


ALTER TABLE public."LanguageRelation" OWNER TO robin;

--
-- Name: LanguageRelation_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."LanguageRelation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LanguageRelation_id_seq" OWNER TO robin;

--
-- Name: LanguageRelation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."LanguageRelation_id_seq" OWNED BY public."LanguageRelation".id;


--
-- Name: Language_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."Language_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Language_id_seq" OWNER TO robin;

--
-- Name: Language_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."Language_id_seq" OWNED BY public."Language".id;


--
-- Name: MembershipSubscription; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."MembershipSubscription" (
    id integer NOT NULL,
    period public."MembershipSubscriptionPeriod" NOT NULL,
    "userId" integer NOT NULL,
    "stripeSubscription" jsonb NOT NULL,
    "stripeSubscriptionId" text NOT NULL,
    "expiresAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "cancelAtPeriodEnd" boolean DEFAULT false NOT NULL,
    "lastPaymentFailure" boolean DEFAULT false NOT NULL,
    "nextBillingDate" timestamp(3) without time zone
);


ALTER TABLE public."MembershipSubscription" OWNER TO robin;

--
-- Name: MembershipSubscriptionInvoice; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."MembershipSubscriptionInvoice" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "membershipSubscriptionPeriod" public."MembershipSubscriptionPeriod" NOT NULL,
    "stripeInvoiceId" text NOT NULL,
    "stripeInvoiceData" jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MembershipSubscriptionInvoice" OWNER TO robin;

--
-- Name: MembershipSubscriptionInvoiceItem; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."MembershipSubscriptionInvoiceItem" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    amount integer NOT NULL,
    currency text NOT NULL,
    description text NOT NULL,
    proration boolean NOT NULL,
    "invoiceId" integer NOT NULL,
    "stripeInvoiceItemId" text NOT NULL,
    "stripeInvoiceItemData" jsonb NOT NULL
);


ALTER TABLE public."MembershipSubscriptionInvoiceItem" OWNER TO robin;

--
-- Name: MembershipSubscriptionInvoiceItem_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."MembershipSubscriptionInvoiceItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MembershipSubscriptionInvoiceItem_id_seq" OWNER TO robin;

--
-- Name: MembershipSubscriptionInvoiceItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."MembershipSubscriptionInvoiceItem_id_seq" OWNED BY public."MembershipSubscriptionInvoiceItem".id;


--
-- Name: MembershipSubscriptionInvoice_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."MembershipSubscriptionInvoice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MembershipSubscriptionInvoice_id_seq" OWNER TO robin;

--
-- Name: MembershipSubscriptionInvoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."MembershipSubscriptionInvoice_id_seq" OWNED BY public."MembershipSubscriptionInvoice".id;


--
-- Name: MembershipSubscription_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."MembershipSubscription_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MembershipSubscription_id_seq" OWNER TO robin;

--
-- Name: MembershipSubscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."MembershipSubscription_id_seq" OWNED BY public."MembershipSubscription".id;


--
-- Name: NewFollowerNotification; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."NewFollowerNotification" (
    id integer NOT NULL,
    "notificationId" integer NOT NULL,
    "followingUserId" integer NOT NULL
);


ALTER TABLE public."NewFollowerNotification" OWNER TO robin;

--
-- Name: NewFollowerNotification_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."NewFollowerNotification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."NewFollowerNotification_id_seq" OWNER TO robin;

--
-- Name: NewFollowerNotification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."NewFollowerNotification_id_seq" OWNED BY public."NewFollowerNotification".id;


--
-- Name: NewPostNotification; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."NewPostNotification" (
    id integer NOT NULL,
    "notificationId" integer NOT NULL,
    "postId" integer NOT NULL
);


ALTER TABLE public."NewPostNotification" OWNER TO robin;

--
-- Name: NewPostNotification_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."NewPostNotification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."NewPostNotification_id_seq" OWNER TO robin;

--
-- Name: NewPostNotification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."NewPostNotification_id_seq" OWNED BY public."NewPostNotification".id;


--
-- Name: PendingNotification; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."PendingNotification" (
    id integer NOT NULL,
    type public."EmailNotificationType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer,
    "postCommentThanksId" integer,
    "commentThanksId" integer,
    "postCommentId" integer,
    "commentId" integer,
    "postClapId" integer
);


ALTER TABLE public."PendingNotification" OWNER TO robin;

--
-- Name: PendingNotification_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."PendingNotification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PendingNotification_id_seq" OWNER TO robin;

--
-- Name: PendingNotification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."PendingNotification_id_seq" OWNED BY public."PendingNotification".id;


--
-- Name: Post; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."Post" (
    id integer NOT NULL,
    title text NOT NULL,
    body text NOT NULL,
    "bodySrc" text DEFAULT ''::text NOT NULL,
    excerpt text NOT NULL,
    status public."PostStatus" DEFAULT 'DRAFT'::public."PostStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "authorId" integer NOT NULL,
    "readTime" integer DEFAULT 1 NOT NULL,
    "languageId" integer NOT NULL,
    longitude numeric(65,30),
    latitude numeric(65,30),
    "publishedAt" timestamp(3) without time zone,
    "publishedLanguageLevel" public."LanguageLevel" DEFAULT 'BEGINNER'::public."LanguageLevel" NOT NULL,
    "wordCount" integer DEFAULT 0 NOT NULL,
    "headlineImageId" integer NOT NULL,
    "bumpedAt" timestamp(3) without time zone,
    "bumpCount" integer DEFAULT 0 NOT NULL,
    "privateShareId" text
);


ALTER TABLE public."Post" OWNER TO robin;

--
-- Name: PostClap; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."PostClap" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "postId" integer NOT NULL,
    "authorId" integer NOT NULL
);


ALTER TABLE public."PostClap" OWNER TO robin;

--
-- Name: PostClapNotification; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."PostClapNotification" (
    id integer NOT NULL,
    "notificationId" integer NOT NULL,
    "postClapId" integer NOT NULL
);


ALTER TABLE public."PostClapNotification" OWNER TO robin;

--
-- Name: PostClapNotification_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."PostClapNotification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PostClapNotification_id_seq" OWNER TO robin;

--
-- Name: PostClapNotification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."PostClapNotification_id_seq" OWNED BY public."PostClapNotification".id;


--
-- Name: PostClap_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."PostClap_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PostClap_id_seq" OWNER TO robin;

--
-- Name: PostClap_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."PostClap_id_seq" OWNED BY public."PostClap".id;


--
-- Name: PostComment; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."PostComment" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    body text NOT NULL,
    "authorId" integer NOT NULL,
    "postId" integer NOT NULL,
    "authorLanguageLevel" public."LanguageLevel" DEFAULT 'BEGINNER'::public."LanguageLevel" NOT NULL
);


ALTER TABLE public."PostComment" OWNER TO robin;

--
-- Name: PostCommentNotification; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."PostCommentNotification" (
    id integer NOT NULL,
    "notificationId" integer NOT NULL,
    "postCommentId" integer NOT NULL
);


ALTER TABLE public."PostCommentNotification" OWNER TO robin;

--
-- Name: PostCommentNotification_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."PostCommentNotification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PostCommentNotification_id_seq" OWNER TO robin;

--
-- Name: PostCommentNotification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."PostCommentNotification_id_seq" OWNED BY public."PostCommentNotification".id;


--
-- Name: PostCommentSubscription; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."PostCommentSubscription" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL
);


ALTER TABLE public."PostCommentSubscription" OWNER TO robin;

--
-- Name: PostCommentSubscription_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."PostCommentSubscription_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PostCommentSubscription_id_seq" OWNER TO robin;

--
-- Name: PostCommentSubscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."PostCommentSubscription_id_seq" OWNED BY public."PostCommentSubscription".id;


--
-- Name: PostCommentThanks; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."PostCommentThanks" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "authorId" integer NOT NULL,
    "postCommentId" integer
);


ALTER TABLE public."PostCommentThanks" OWNER TO robin;

--
-- Name: PostCommentThanks_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."PostCommentThanks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PostCommentThanks_id_seq" OWNER TO robin;

--
-- Name: PostCommentThanks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."PostCommentThanks_id_seq" OWNED BY public."PostCommentThanks".id;


--
-- Name: PostComment_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."PostComment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PostComment_id_seq" OWNER TO robin;

--
-- Name: PostComment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."PostComment_id_seq" OWNED BY public."PostComment".id;


--
-- Name: PostTopic; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."PostTopic" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "topicId" integer NOT NULL
);


ALTER TABLE public."PostTopic" OWNER TO robin;

--
-- Name: PostTopic_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."PostTopic_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PostTopic_id_seq" OWNER TO robin;

--
-- Name: PostTopic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."PostTopic_id_seq" OWNED BY public."PostTopic".id;


--
-- Name: Post_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Post_id_seq" OWNER TO robin;

--
-- Name: Post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."Post_id_seq" OWNED BY public."Post".id;


--
-- Name: Prompt; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."Prompt" (
    id integer NOT NULL,
    text text NOT NULL,
    "topicId" integer NOT NULL
);


ALTER TABLE public."Prompt" OWNER TO robin;

--
-- Name: Prompt_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."Prompt_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Prompt_id_seq" OWNER TO robin;

--
-- Name: Prompt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."Prompt_id_seq" OWNED BY public."Prompt".id;


--
-- Name: SocialMedia; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."SocialMedia" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    website text NOT NULL,
    youtube text NOT NULL,
    instagram text NOT NULL,
    facebook text NOT NULL
);


ALTER TABLE public."SocialMedia" OWNER TO robin;

--
-- Name: SocialMedia_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."SocialMedia_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SocialMedia_id_seq" OWNER TO robin;

--
-- Name: SocialMedia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."SocialMedia_id_seq" OWNED BY public."SocialMedia".id;


--
-- Name: Thread; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."Thread" (
    id integer NOT NULL,
    "startIndex" integer NOT NULL,
    "endIndex" integer NOT NULL,
    "highlightedContent" text NOT NULL,
    "postId" integer NOT NULL,
    archived boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Thread" OWNER TO robin;

--
-- Name: ThreadCommentNotification; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."ThreadCommentNotification" (
    id integer NOT NULL,
    "notificationId" integer NOT NULL,
    "commentId" integer NOT NULL
);


ALTER TABLE public."ThreadCommentNotification" OWNER TO robin;

--
-- Name: ThreadCommentNotification_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."ThreadCommentNotification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ThreadCommentNotification_id_seq" OWNER TO robin;

--
-- Name: ThreadCommentNotification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."ThreadCommentNotification_id_seq" OWNED BY public."ThreadCommentNotification".id;


--
-- Name: ThreadCommentThanksNotification; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."ThreadCommentThanksNotification" (
    id integer NOT NULL,
    "thanksId" integer NOT NULL,
    "notificationId" integer NOT NULL
);


ALTER TABLE public."ThreadCommentThanksNotification" OWNER TO robin;

--
-- Name: ThreadCommentThanksNotification_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."ThreadCommentThanksNotification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ThreadCommentThanksNotification_id_seq" OWNER TO robin;

--
-- Name: ThreadCommentThanksNotification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."ThreadCommentThanksNotification_id_seq" OWNED BY public."ThreadCommentThanksNotification".id;


--
-- Name: ThreadSubscription; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."ThreadSubscription" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL,
    "threadId" integer NOT NULL
);


ALTER TABLE public."ThreadSubscription" OWNER TO robin;

--
-- Name: ThreadSubscription_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."ThreadSubscription_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ThreadSubscription_id_seq" OWNER TO robin;

--
-- Name: ThreadSubscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."ThreadSubscription_id_seq" OWNED BY public."ThreadSubscription".id;


--
-- Name: Thread_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."Thread_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Thread_id_seq" OWNER TO robin;

--
-- Name: Thread_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."Thread_id_seq" OWNED BY public."Thread".id;


--
-- Name: Topic; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."Topic" (
    id integer NOT NULL,
    "devName" text NOT NULL
);


ALTER TABLE public."Topic" OWNER TO robin;

--
-- Name: TopicTranslation; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."TopicTranslation" (
    id integer NOT NULL,
    "uiLanguage" public."UILanguage" NOT NULL,
    name text NOT NULL,
    "topicId" integer NOT NULL
);


ALTER TABLE public."TopicTranslation" OWNER TO robin;

--
-- Name: TopicTranslation_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."TopicTranslation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TopicTranslation_id_seq" OWNER TO robin;

--
-- Name: TopicTranslation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."TopicTranslation_id_seq" OWNED BY public."TopicTranslation".id;


--
-- Name: Topic_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."Topic_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Topic_id_seq" OWNER TO robin;

--
-- Name: Topic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."Topic_id_seq" OWNED BY public."Topic".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text,
    email text NOT NULL,
    handle text NOT NULL,
    "userRole" public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    bio text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "profileImage" text,
    city text,
    country text,
    "stripeCustomerId" text,
    "moosendSubscriberId" text,
    "lastFourCardNumbers" text,
    "cardBrand" text,
    "isStudent" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."User" OWNER TO robin;

--
-- Name: UserBadge; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."UserBadge" (
    id integer NOT NULL,
    type public."BadgeType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."UserBadge" OWNER TO robin;

--
-- Name: UserBadge_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."UserBadge_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserBadge_id_seq" OWNER TO robin;

--
-- Name: UserBadge_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."UserBadge_id_seq" OWNED BY public."UserBadge".id;


--
-- Name: UserInterest; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."UserInterest" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "topicId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."UserInterest" OWNER TO robin;

--
-- Name: UserInterest_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."UserInterest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserInterest_id_seq" OWNER TO robin;

--
-- Name: UserInterest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."UserInterest_id_seq" OWNED BY public."UserInterest".id;


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: robin
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO robin;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: robin
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _UserFollows; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."_UserFollows" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_UserFollows" OWNER TO robin;

--
-- Name: _UserSavedPosts; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."_UserSavedPosts" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_UserSavedPosts" OWNER TO robin;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO robin;

--
-- Name: Auth id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Auth" ALTER COLUMN id SET DEFAULT nextval('public."Auth_id_seq"'::regclass);


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: CommentThanks id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."CommentThanks" ALTER COLUMN id SET DEFAULT nextval('public."CommentThanks_id_seq"'::regclass);


--
-- Name: HeadlineImage id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."HeadlineImage" ALTER COLUMN id SET DEFAULT nextval('public."HeadlineImage_id_seq"'::regclass);


--
-- Name: InAppNotification id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."InAppNotification" ALTER COLUMN id SET DEFAULT nextval('public."InAppNotification_id_seq"'::regclass);


--
-- Name: Language id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Language" ALTER COLUMN id SET DEFAULT nextval('public."Language_id_seq"'::regclass);


--
-- Name: LanguageLearning id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageLearning" ALTER COLUMN id SET DEFAULT nextval('public."LanguageLearning_id_seq"'::regclass);


--
-- Name: LanguageNative id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageNative" ALTER COLUMN id SET DEFAULT nextval('public."LanguageNative_id_seq"'::regclass);


--
-- Name: LanguageRelation id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageRelation" ALTER COLUMN id SET DEFAULT nextval('public."LanguageRelation_id_seq"'::regclass);


--
-- Name: MembershipSubscription id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscription" ALTER COLUMN id SET DEFAULT nextval('public."MembershipSubscription_id_seq"'::regclass);


--
-- Name: MembershipSubscriptionInvoice id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscriptionInvoice" ALTER COLUMN id SET DEFAULT nextval('public."MembershipSubscriptionInvoice_id_seq"'::regclass);


--
-- Name: MembershipSubscriptionInvoiceItem id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscriptionInvoiceItem" ALTER COLUMN id SET DEFAULT nextval('public."MembershipSubscriptionInvoiceItem_id_seq"'::regclass);


--
-- Name: NewFollowerNotification id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."NewFollowerNotification" ALTER COLUMN id SET DEFAULT nextval('public."NewFollowerNotification_id_seq"'::regclass);


--
-- Name: NewPostNotification id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."NewPostNotification" ALTER COLUMN id SET DEFAULT nextval('public."NewPostNotification_id_seq"'::regclass);


--
-- Name: PendingNotification id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PendingNotification" ALTER COLUMN id SET DEFAULT nextval('public."PendingNotification_id_seq"'::regclass);


--
-- Name: Post id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Post" ALTER COLUMN id SET DEFAULT nextval('public."Post_id_seq"'::regclass);


--
-- Name: PostClap id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostClap" ALTER COLUMN id SET DEFAULT nextval('public."PostClap_id_seq"'::regclass);


--
-- Name: PostClapNotification id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostClapNotification" ALTER COLUMN id SET DEFAULT nextval('public."PostClapNotification_id_seq"'::regclass);


--
-- Name: PostComment id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostComment" ALTER COLUMN id SET DEFAULT nextval('public."PostComment_id_seq"'::regclass);


--
-- Name: PostCommentNotification id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentNotification" ALTER COLUMN id SET DEFAULT nextval('public."PostCommentNotification_id_seq"'::regclass);


--
-- Name: PostCommentSubscription id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentSubscription" ALTER COLUMN id SET DEFAULT nextval('public."PostCommentSubscription_id_seq"'::regclass);


--
-- Name: PostCommentThanks id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentThanks" ALTER COLUMN id SET DEFAULT nextval('public."PostCommentThanks_id_seq"'::regclass);


--
-- Name: PostTopic id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostTopic" ALTER COLUMN id SET DEFAULT nextval('public."PostTopic_id_seq"'::regclass);


--
-- Name: Prompt id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Prompt" ALTER COLUMN id SET DEFAULT nextval('public."Prompt_id_seq"'::regclass);


--
-- Name: SocialMedia id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."SocialMedia" ALTER COLUMN id SET DEFAULT nextval('public."SocialMedia_id_seq"'::regclass);


--
-- Name: Thread id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Thread" ALTER COLUMN id SET DEFAULT nextval('public."Thread_id_seq"'::regclass);


--
-- Name: ThreadCommentNotification id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadCommentNotification" ALTER COLUMN id SET DEFAULT nextval('public."ThreadCommentNotification_id_seq"'::regclass);


--
-- Name: ThreadCommentThanksNotification id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadCommentThanksNotification" ALTER COLUMN id SET DEFAULT nextval('public."ThreadCommentThanksNotification_id_seq"'::regclass);


--
-- Name: ThreadSubscription id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadSubscription" ALTER COLUMN id SET DEFAULT nextval('public."ThreadSubscription_id_seq"'::regclass);


--
-- Name: Topic id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Topic" ALTER COLUMN id SET DEFAULT nextval('public."Topic_id_seq"'::regclass);


--
-- Name: TopicTranslation id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."TopicTranslation" ALTER COLUMN id SET DEFAULT nextval('public."TopicTranslation_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: UserBadge id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."UserBadge" ALTER COLUMN id SET DEFAULT nextval('public."UserBadge_id_seq"'::regclass);


--
-- Name: UserInterest id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."UserInterest" ALTER COLUMN id SET DEFAULT nextval('public."UserInterest_id_seq"'::regclass);


--
-- Data for Name: Auth; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."Auth" (id, "userId", password, "resetToken", "resetTokenExpiry", "emailVerificationToken", "emailVerificationStatus") FROM stdin;
1	1	$2a$10$dU6Vpx9ikVVsF/fhM2E9BuOzoH4hpi.mzNiVgXj7ogjbtUwh3PBeG	\N	\N	\N	VERIFIED
2	2	$2a$10$QtQRhgmpHUZcjHYqeabMvuT9pd.7rqM7/hDPV4G/guxgf.MErEJxi	\N	\N	\N	VERIFIED
3	3	$2a$10$Y8y1528p2Owz8XsfCixYgeNTmip5eImBhpYiJwigCzbWwm.LRCcxy	\N	\N	\N	VERIFIED
4	4	$2a$10$o8tKUAE91TokYU87s/UY/.UgGTOqIYBF.3j3fnk6a1INRL2mWzDj2	\N	\N	\N	VERIFIED
5	5	$2a$10$71JMgoQmOvnvotLbiDjBw.qDuC7jGW.Q8sRhQbqtPeqliXjedFVuq	\N	\N	36bba2be433e0bb6a63383cab6ef64fd5dc954c0	PENDING
6	6	$2a$10$T3eHLSpHLKKIleF9qfyUr.V5komVhwsOclYtMa2G8KjnsT6PLnOSy	\N	\N	8c299082301c9ba27d18aa23b3f1e47678fc0e14	PENDING
7	7	$2a$10$3g3UmKx2bZRDVQic3HDYKO2sTB2X5a4L2wrEO7NFnR9rny6DrLVha	\N	\N	e4cdbd2c91eeb548b0bb9a342df19471763160e6	VERIFIED
8	8	$2a$10$Iqq/ux8dK0D8v9BOftuHo.0xmKpnUv8iT9vUZyCuhFMHUi4awMYjO	\N	\N	754f68a3ab9cd45e150b0d40f10ea48005e64c04	PENDING
9	9	$2a$10$A16mk/LdVFB5cBSkBrlXV.q4R9PxtFnhcoNHuTdw0uKKNkP5feQfG	\N	\N	2eb4e734271a6db185a580162491136492db6a1d	VERIFIED
10	10	$2a$10$z8EADBrP8mJwjI7g2mk1/eRjCS.e5WuaqQund17fiHZ5TOlGN9IYq	\N	\N	96cfb5c973b42c6db5186dc2f7e362c2546774dc	PENDING
11	11	$2a$10$MfOV4bW7ZZewLGAU7p3Ja.YDty/8z65nMi9dlzoYCXZbq025SV2rm	\N	\N	e54837c12a77f70ee1e267fa16b55d1919174c3c	PENDING
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."Comment" (id, "createdAt", "updatedAt", body, "authorId", "threadId", "authorLanguageLevel") FROM stdin;
1	2021-07-28 23:22:56.293	2021-07-28 23:22:56.294	That "1" looks an awful lot like a "6", I think you made a mistake.	4	2	BEGINNER
2	2021-07-28 23:23:11.118	2021-07-28 23:23:11.119	That's right.	4	3	BEGINNER
3	2021-07-28 23:23:47.339	2021-07-28 23:23:47.339	That's one thing we can agree on.	4	5	BEGINNER
4	2021-07-28 23:24:31.102	2021-07-28 23:24:31.102	Go away Tywin, don't you have a date with a crossbow bolt or something?	3	2	BEGINNER
8	2021-11-19 15:10:22.923	2021-11-19 15:10:22.923	Don't worry, Tywin. If you miss that date I've got a very special dagger who would love to meet you...	7	2	NATIVE
9	2021-11-19 15:16:23.241	2021-11-19 15:16:42.286	Settle down, Arya! Tywin is a bastard but he still owes me a fiver for that suckling pig last winter. You know what they say... 🙄	8	2	BEGINNER
10	2021-11-19 15:18:38.297	2021-11-19 15:18:38.298	Well, a Stark **always** *collects* her debts...	7	2	NATIVE
11	2021-11-19 15:20:39.745	2021-11-19 15:20:39.746	Friends! Can't we all just get along? I know a fantastic drinking game! 🍷	9	2	BEGINNER
12	2021-11-19 15:29:55.515	2021-11-19 15:30:19.871	Are you trying to get my daughter drunk **@smartest_man_in_westeros**? Right, meet me outside. Bring your little crossbow and I'll bring my giant sword.	8	2	BEGINNER
13	2021-11-19 15:31:10.83	2021-11-19 15:31:10.831	HA HA I'm saved! 🙌🏼	4	2	BEGINNER
14	2021-11-19 15:35:00.508	2021-11-19 15:35:00.509	Oh shut up, Tywin!	8	5	BEGINNER
15	2021-11-19 18:53:41.298	2021-11-19 18:53:41.299	Are we allowed to swear on this bloody platform?	5	2	NATIVE
16	2021-11-19 19:11:45.759	2021-11-19 19:11:45.76	The free folk would never say this. "nice" would be more widely understood.	3	9	NATIVE
17	2021-11-19 19:12:05.574	2021-11-19 19:12:05.574	"nice" works just fine here, too.	3	10	NATIVE
18	2021-11-19 19:13:58.775	2021-11-19 19:13:58.776	I'm not trying to be mean but I honestly just don't understand why people love this place. It smells, it's expensive, and if you're a northerner you will almost definitely be killed.	3	11	NATIVE
20	2021-11-19 19:23:03.499	2021-11-19 19:23:03.5	Almost! It's **valar morghulis**	9	14	ADVANCED
22	2021-11-19 19:27:43.867	2021-11-19 19:27:43.868	Damn it! I always mess up the spelling.	3	14	BEGINNER
23	2021-11-19 19:28:09.946	2021-11-19 19:28:09.947	Great point! I definitely don't want to exclude our northern friends.	9	9	NATIVE
24	2021-11-19 19:35:52.838	2021-11-19 19:35:52.839	I'm with Jon here. On literally every point... I can confirm from experience. Good post, though! I personally look forward to your High Valyrian posts. Cheers	8	11	BEGINNER
\.


--
-- Data for Name: CommentThanks; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."CommentThanks" (id, "createdAt", "authorId", "commentId") FROM stdin;
1	2021-07-28 23:24:35.469	3	3
2	2021-11-19 15:09:17.411	7	4
3	2021-11-19 15:16:47.158	8	8
4	2021-11-19 15:16:49.855	8	4
5	2021-11-19 15:18:45.497	7	9
6	2021-11-19 15:30:00.072	8	10
7	2021-11-19 15:31:13.611	4	12
8	2021-11-19 18:53:59.828	5	4
9	2021-11-19 19:26:51.739	3	20
10	2021-11-19 19:28:01.499	9	22
11	2021-11-19 19:28:11.307	9	16
12	2021-11-19 19:28:16.776	9	17
13	2021-11-19 19:28:21.592	9	18
\.


--
-- Data for Name: HeadlineImage; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."HeadlineImage" (id, "smallSize", "largeSize") FROM stdin;
1	https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-small	https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-large
2	https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-small	https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-large
3	https://d2ieewwzq5w1x7.cloudfront.net/post-image/149c24d6-99de-4dc7-972e-cab92ff2d358-small	https://d2ieewwzq5w1x7.cloudfront.net/post-image/149c24d6-99de-4dc7-972e-cab92ff2d358-large
4	https://d1tjf7rcyn4hkr.cloudfront.net/post-image/1c506c2f-a489-4ae3-9de8-ca7361bca579-small	https://d1tjf7rcyn4hkr.cloudfront.net/post-image/1c506c2f-a489-4ae3-9de8-ca7361bca579-large
5	https://d2ieewwzq5w1x7.cloudfront.net/post-image/149c24d6-99de-4dc7-972e-cab92ff2d358-small	https://d2ieewwzq5w1x7.cloudfront.net/post-image/149c24d6-99de-4dc7-972e-cab92ff2d358-large
6	https://d1tjf7rcyn4hkr.cloudfront.net/post-image/ffb18b74-fabc-475f-9fd7-9ba33f6bac8b-small	https://d1tjf7rcyn4hkr.cloudfront.net/post-image/ffb18b74-fabc-475f-9fd7-9ba33f6bac8b-large
\.


--
-- Data for Name: InAppNotification; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."InAppNotification" (id, type, "createdAt", "bumpedAt", "readStatus", "postId", "userId", "triggeringUserId") FROM stdin;
7	THREAD_COMMENT_THANKS	2021-11-19 15:09:17.445	2021-11-19 15:09:17.435	UNREAD	1	3	7
12	THREAD_COMMENT_THANKS	2021-11-19 15:16:49.87	2021-11-19 15:16:49.867	UNREAD	1	3	8
14	THREAD_COMMENT_THANKS	2021-11-19 15:18:45.537	2021-11-19 15:18:45.525	UNREAD	1	8	7
11	THREAD_COMMENT_THANKS	2021-11-19 15:16:47.182	2021-11-19 15:30:00.089	UNREAD	1	7	8
17	THREAD_COMMENT_THANKS	2021-11-19 15:31:13.648	2021-11-19 15:31:13.637	UNREAD	1	8	4
18	NEW_POST	2021-11-19 15:40:00.821	2021-11-19 15:40:00.809	UNREAD	\N	3	\N
19	POST_CLAP	2021-11-19 15:42:10.285	2021-11-19 15:42:10.278	UNREAD	2	4	\N
20	POST_COMMENT	2021-11-19 15:42:35.74	2021-11-19 15:42:35.735	UNREAD	2	4	\N
15	NEW_FOLLOWER	2021-11-19 15:26:50.44	2021-11-19 18:52:53.229	UNREAD	\N	9	\N
9	THREAD_COMMENT	2021-11-19 15:10:22.954	2021-11-19 18:53:41.331	UNREAD	1	4	\N
8	THREAD_COMMENT	2021-11-19 15:10:22.95	2021-11-19 18:53:41.33	UNREAD	1	3	\N
16	THREAD_COMMENT	2021-11-19 15:29:55.564	2021-11-19 18:53:41.331	UNREAD	1	9	\N
13	THREAD_COMMENT	2021-11-19 15:18:38.347	2021-11-19 18:53:41.331	UNREAD	1	8	\N
10	THREAD_COMMENT	2021-11-19 15:16:23.292	2021-11-19 18:53:41.333	UNREAD	1	7	\N
24	THREAD_COMMENT_THANKS	2021-11-19 18:53:59.853	2021-11-19 18:53:59.845	UNREAD	1	3	5
5	NEW_FOLLOWER	2021-11-19 15:08:23.61	2021-11-19 19:07:28.871	UNREAD	\N	3	\N
6	POST_CLAP	2021-11-19 15:08:49.907	2021-11-19 19:10:18.533	UNREAD	1	3	\N
26	POST_COMMENT	2021-11-19 19:10:38.501	2021-11-19 19:10:38.492	UNREAD	1	10	\N
21	POST_COMMENT	2021-11-19 18:50:38.434	2021-11-19 19:10:38.491	UNREAD	1	3	\N
25	POST_COMMENT	2021-11-19 19:00:49.595	2021-11-19 19:10:38.501	UNREAD	1	9	\N
28	POST_CLAP	2021-11-19 19:14:08.752	2021-11-19 19:16:51.273	UNREAD	4	9	\N
4	POST_CLAP	2021-11-19 15:08:19.915	2021-11-19 19:17:39.116	UNREAD	3	3	\N
32	THREAD_COMMENT	2021-11-19 19:23:03.546	2021-11-19 19:23:03.536	UNREAD	3	3	\N
33	THREAD_COMMENT_THANKS	2021-11-19 19:26:51.77	2021-11-19 19:26:51.758	UNREAD	3	9	3
34	THREAD_COMMENT	2021-11-19 19:27:43.901	2021-11-19 19:27:43.894	UNREAD	3	9	\N
35	THREAD_COMMENT_THANKS	2021-11-19 19:28:01.524	2021-11-19 19:28:01.518	UNREAD	3	3	9
37	THREAD_COMMENT_THANKS	2021-11-19 19:28:11.338	2021-11-19 19:28:21.607	UNREAD	4	3	9
27	THREAD_COMMENT	2021-11-19 19:11:45.83	2021-11-19 19:35:52.863	UNREAD	4	9	\N
36	THREAD_COMMENT	2021-11-19 19:28:09.986	2021-11-19 19:35:52.871	UNREAD	4	3	\N
\.


--
-- Data for Name: Language; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."Language" (id, name, dialect, "devName") FROM stdin;
2	Common Tongue of the Andals	\N	Common Tongue of the Andals
3	Valyrian	High	Valyrian
4	Valyrian	Bravosi	Valyrian
5	Dothraki	\N	Dothraki
\.


--
-- Data for Name: LanguageLearning; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."LanguageLearning" (id, "userId", "languageId", "createdAt") FROM stdin;
\.


--
-- Data for Name: LanguageNative; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."LanguageNative" (id, "userId", "languageId", "createdAt") FROM stdin;
\.


--
-- Data for Name: LanguageRelation; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."LanguageRelation" (id, "userId", "languageId", "createdAt", level) FROM stdin;
1	3	2	2021-07-28 22:55:33.426	NATIVE
2	3	3	2021-07-28 22:55:38.184	BEGINNER
3	4	2	2021-07-28 23:25:58.44	BEGINNER
4	5	2	2021-11-19 14:34:27.062	NATIVE
5	5	4	2021-11-19 14:34:34.91	INTERMEDIATE
6	1	2	2021-11-19 14:53:28.149	NATIVE
7	1	3	2021-11-19 14:53:32.427	ADVANCED
8	6	2	2021-11-19 14:56:42.131	NATIVE
9	6	5	2021-11-19 14:56:47.031	ADVANCED
10	6	3	2021-11-19 14:56:49.378	ADVANCED
11	6	4	2021-11-19 14:56:52.851	ADVANCED
12	7	2	2021-11-19 15:02:35.251	NATIVE
13	7	4	2021-11-19 15:02:39.129	ADVANCED
14	9	2	2021-11-19 15:27:11.366	NATIVE
15	9	5	2021-11-19 15:27:18.481	BEGINNER
16	9	3	2021-11-19 15:27:24.4	ADVANCED
17	9	4	2021-11-19 15:27:27.766	BEGINNER
\.


--
-- Data for Name: MembershipSubscription; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."MembershipSubscription" (id, period, "userId", "stripeSubscription", "stripeSubscriptionId", "expiresAt", "createdAt", "updatedAt", "cancelAtPeriodEnd", "lastPaymentFailure", "nextBillingDate") FROM stdin;
2	MONTHLY	3	{"id": "sub_JwCuRrMeFrDXpv", "plan": {"id": "price_1Im0qUB8OEjVdGPaQPQz3Ush", "active": true, "amount": 0, "object": "plan", "created": 1619806426, "product": "prod_J4as8FdGCPXend", "currency": "gbp", "interval": "month", "livemode": false, "metadata": {}, "nickname": "Free Journaly Premium Subscription", "tiers_mode": null, "usage_type": "licensed", "amount_decimal": "0", "billing_scheme": "per_unit", "interval_count": 1, "aggregate_usage": null, "transform_usage": null, "trial_period_days": null}, "items": {"url": "/v1/subscription_items?subscription=sub_JwCuRrMeFrDXpv", "data": [{"id": "si_JwCuXxfEITXqiY", "plan": {"id": "price_1Im0qUB8OEjVdGPaQPQz3Ush", "active": true, "amount": 0, "object": "plan", "created": 1619806426, "product": "prod_J4as8FdGCPXend", "currency": "gbp", "interval": "month", "livemode": false, "metadata": {}, "nickname": "Free Journaly Premium Subscription", "tiers_mode": null, "usage_type": "licensed", "amount_decimal": "0", "billing_scheme": "per_unit", "interval_count": 1, "aggregate_usage": null, "transform_usage": null, "trial_period_days": null}, "price": {"id": "price_1Im0qUB8OEjVdGPaQPQz3Ush", "type": "recurring", "active": true, "object": "price", "created": 1619806426, "product": "prod_J4as8FdGCPXend", "currency": "gbp", "livemode": false, "metadata": {}, "nickname": "Free Journaly Premium Subscription", "recurring": {"interval": "month", "usage_type": "licensed", "interval_count": 1, "aggregate_usage": null, "trial_period_days": null}, "lookup_key": null, "tiers_mode": null, "unit_amount": 0, "billing_scheme": "per_unit", "transform_quantity": null, "unit_amount_decimal": "0"}, "object": "subscription_item", "created": 1627508449, "metadata": {"journalyUserId": "3"}, "quantity": 1, "tax_rates": [], "subscription": "sub_JwCuRrMeFrDXpv", "billing_thresholds": null}], "object": "list", "has_more": false, "total_count": 1}, "object": "subscription", "status": "active", "created": 1627508448, "customer": "cus_JwCmGeU4Hqiwmn", "discount": null, "ended_at": null, "livemode": false, "metadata": {}, "quantity": 1, "schedule": null, "cancel_at": null, "trial_end": null, "start_date": 1627508448, "canceled_at": null, "trial_start": null, "automatic_tax": {"enabled": false}, "transfer_data": null, "days_until_due": null, "default_source": null, "latest_invoice": "in_1JIKUfB8OEjVdGPaQu20183j", "pending_update": null, "pause_collection": null, "payment_settings": {"payment_method_types": null, "payment_method_options": null}, "collection_method": "charge_automatically", "default_tax_rates": [], "billing_thresholds": null, "current_period_end": 1630186848, "billing_cycle_anchor": 1627508448, "cancel_at_period_end": false, "current_period_start": 1627508448, "pending_setup_intent": "seti_1JIKUfB8OEjVdGPaPLLTNpFV", "default_payment_method": null, "application_fee_percent": null, "pending_invoice_item_interval": null, "next_pending_invoice_item_invoice": null}	sub_JwCuRrMeFrDXpv	2121-07-04 21:40:48.124	2021-07-28 21:40:49.645	2021-07-28 21:40:49.646	f	f	\N
\.


--
-- Data for Name: MembershipSubscriptionInvoice; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."MembershipSubscriptionInvoice" (id, "userId", "membershipSubscriptionPeriod", "stripeInvoiceId", "stripeInvoiceData", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: MembershipSubscriptionInvoiceItem; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."MembershipSubscriptionInvoiceItem" (id, "createdAt", "updatedAt", amount, currency, description, proration, "invoiceId", "stripeInvoiceItemId", "stripeInvoiceItemData") FROM stdin;
\.


--
-- Data for Name: NewFollowerNotification; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."NewFollowerNotification" (id, "notificationId", "followingUserId") FROM stdin;
1	5	7
2	5	9
3	15	3
4	15	5
5	5	5
6	5	10
\.


--
-- Data for Name: NewPostNotification; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."NewPostNotification" (id, "notificationId", "postId") FROM stdin;
1	18	4
\.


--
-- Data for Name: PendingNotification; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PendingNotification" (id, type, "createdAt", "userId", "postId", "postCommentThanksId", "commentThanksId", "postCommentId", "commentId", "postClapId") FROM stdin;
1	THREAD_COMMENT	2021-07-28 23:22:56.307	3	\N	\N	\N	\N	1	\N
2	THREAD_COMMENT	2021-07-28 23:23:11.131	3	\N	\N	\N	\N	2	\N
3	THREAD_COMMENT	2021-07-28 23:23:47.35	3	\N	\N	\N	\N	3	\N
4	POST_COMMENT	2021-07-28 23:24:01.925	3	\N	\N	\N	1	\N	\N
5	THREAD_COMMENT	2021-07-28 23:24:31.111	4	\N	\N	\N	\N	4	\N
6	THREAD_COMMENT_THANKS	2021-07-28 23:24:35.477	4	\N	\N	1	\N	\N	\N
11	POST_CLAP	2021-11-18 22:51:24.307	4	\N	\N	\N	\N	\N	2
8	THREAD_COMMENT	2021-11-18 21:25:10.106	4	\N	\N	\N	\N	\N	\N
9	THREAD_COMMENT	2021-11-18 22:38:39.505	3	\N	\N	\N	\N	\N	\N
10	THREAD_COMMENT	2021-11-18 22:42:39.982	3	\N	\N	\N	\N	\N	\N
7	POST_CLAP	2021-07-28 23:27:17.06	3	\N	\N	\N	\N	\N	\N
12	POST_CLAP	2021-11-19 15:08:19.896	3	\N	\N	\N	\N	\N	3
13	POST_CLAP	2021-11-19 15:08:49.882	3	\N	\N	\N	\N	\N	4
14	THREAD_COMMENT_THANKS	2021-11-19 15:09:17.427	3	\N	\N	2	\N	\N	\N
15	THREAD_COMMENT	2021-11-19 15:10:22.939	3	\N	\N	\N	\N	8	\N
16	THREAD_COMMENT	2021-11-19 15:10:22.939	4	\N	\N	\N	\N	8	\N
17	THREAD_COMMENT	2021-11-19 15:16:23.269	7	\N	\N	\N	\N	9	\N
18	THREAD_COMMENT	2021-11-19 15:16:23.269	4	\N	\N	\N	\N	9	\N
19	THREAD_COMMENT	2021-11-19 15:16:23.269	3	\N	\N	\N	\N	9	\N
20	THREAD_COMMENT_THANKS	2021-11-19 15:16:47.164	7	\N	\N	3	\N	\N	\N
21	THREAD_COMMENT_THANKS	2021-11-19 15:16:49.861	3	\N	\N	4	\N	\N	\N
23	THREAD_COMMENT	2021-11-19 15:18:38.325	8	\N	\N	\N	\N	10	\N
24	THREAD_COMMENT	2021-11-19 15:18:38.325	4	\N	\N	\N	\N	10	\N
22	THREAD_COMMENT	2021-11-19 15:18:38.325	3	\N	\N	\N	\N	10	\N
25	THREAD_COMMENT_THANKS	2021-11-19 15:18:45.512	8	\N	\N	5	\N	\N	\N
26	THREAD_COMMENT	2021-11-19 15:20:39.776	3	\N	\N	\N	\N	11	\N
27	THREAD_COMMENT	2021-11-19 15:20:39.776	4	\N	\N	\N	\N	11	\N
28	THREAD_COMMENT	2021-11-19 15:20:39.776	8	\N	\N	\N	\N	11	\N
29	THREAD_COMMENT	2021-11-19 15:20:39.776	7	\N	\N	\N	\N	11	\N
30	POST_CLAP	2021-11-19 15:24:47.776	3	\N	\N	\N	\N	\N	5
31	THREAD_COMMENT	2021-11-19 15:29:55.542	4	\N	\N	\N	\N	12	\N
32	THREAD_COMMENT	2021-11-19 15:29:55.543	9	\N	\N	\N	\N	12	\N
33	THREAD_COMMENT	2021-11-19 15:29:55.542	3	\N	\N	\N	\N	12	\N
34	THREAD_COMMENT	2021-11-19 15:29:55.543	7	\N	\N	\N	\N	12	\N
35	THREAD_COMMENT_THANKS	2021-11-19 15:30:00.08	7	\N	\N	6	\N	\N	\N
37	THREAD_COMMENT	2021-11-19 15:31:10.853	9	\N	\N	\N	\N	13	\N
36	THREAD_COMMENT	2021-11-19 15:31:10.853	3	\N	\N	\N	\N	13	\N
38	THREAD_COMMENT	2021-11-19 15:31:10.853	7	\N	\N	\N	\N	13	\N
39	THREAD_COMMENT	2021-11-19 15:31:10.853	8	\N	\N	\N	\N	13	\N
40	THREAD_COMMENT_THANKS	2021-11-19 15:31:13.619	8	\N	\N	7	\N	\N	\N
41	THREAD_COMMENT	2021-11-19 15:35:00.53	3	\N	\N	\N	\N	14	\N
42	THREAD_COMMENT	2021-11-19 15:35:00.531	4	\N	\N	\N	\N	14	\N
43	POST_CLAP	2021-11-19 15:42:10.266	4	\N	\N	\N	\N	\N	6
44	POST_COMMENT	2021-11-19 15:42:35.721	4	\N	\N	\N	2	\N	\N
45	POST_CLAP	2021-11-19 15:42:51.34	3	\N	\N	\N	\N	\N	7
47	POST_COMMENT	2021-11-19 18:50:38.412	3	\N	\N	\N	3	\N	\N
46	POST_COMMENT	2021-11-19 18:50:38.412	4	\N	\N	\N	3	\N	\N
48	POST_COMMENT	2021-11-19 18:52:49.299	9	\N	\N	\N	4	\N	\N
50	THREAD_COMMENT	2021-11-19 18:53:41.321	8	\N	\N	\N	\N	15	\N
51	THREAD_COMMENT	2021-11-19 18:53:41.321	3	\N	\N	\N	\N	15	\N
49	THREAD_COMMENT	2021-11-19 18:53:41.321	9	\N	\N	\N	\N	15	\N
52	THREAD_COMMENT	2021-11-19 18:53:41.321	4	\N	\N	\N	\N	15	\N
53	THREAD_COMMENT	2021-11-19 18:53:41.321	7	\N	\N	\N	\N	15	\N
54	THREAD_COMMENT_THANKS	2021-11-19 18:53:59.838	3	\N	\N	8	\N	\N	\N
55	POST_CLAP	2021-11-19 18:54:30.599	3	\N	\N	\N	\N	\N	8
56	POST_COMMENT	2021-11-19 19:00:49.584	4	\N	\N	\N	5	\N	\N
57	POST_COMMENT	2021-11-19 19:00:49.584	9	\N	\N	\N	5	\N	\N
58	POST_COMMENT	2021-11-19 19:00:49.584	3	\N	\N	\N	5	\N	\N
59	POST_CLAP	2021-11-19 19:07:25.233	3	\N	\N	\N	\N	\N	9
60	POST_CLAP	2021-11-19 19:10:18.528	3	\N	\N	\N	\N	\N	10
61	POST_COMMENT	2021-11-19 19:10:38.487	3	\N	\N	\N	6	\N	\N
62	POST_COMMENT	2021-11-19 19:10:38.487	10	\N	\N	\N	6	\N	\N
63	POST_COMMENT	2021-11-19 19:10:38.487	4	\N	\N	\N	6	\N	\N
64	POST_COMMENT	2021-11-19 19:10:38.487	9	\N	\N	\N	6	\N	\N
65	THREAD_COMMENT	2021-11-19 19:11:45.793	9	\N	\N	\N	\N	16	\N
66	THREAD_COMMENT	2021-11-19 19:12:05.59	9	\N	\N	\N	\N	17	\N
67	THREAD_COMMENT	2021-11-19 19:13:58.799	9	\N	\N	\N	\N	18	\N
68	POST_CLAP	2021-11-19 19:14:08.742	9	\N	\N	\N	\N	\N	11
69	POST_COMMENT	2021-11-19 19:14:41.535	9	\N	\N	\N	7	\N	\N
70	POST_COMMENT	2021-11-19 19:14:41.535	5	\N	\N	\N	7	\N	\N
74	POST_CLAP	2021-11-19 19:16:51.267	9	\N	\N	\N	\N	\N	12
75	POST_CLAP	2021-11-19 19:17:39.105	3	\N	\N	\N	\N	\N	13
76	THREAD_COMMENT	2021-11-19 19:18:44.062	3	\N	\N	\N	\N	\N	\N
77	THREAD_COMMENT	2021-11-19 19:23:03.524	3	\N	\N	\N	\N	20	\N
78	THREAD_COMMENT	2021-11-19 19:24:05.099	9	\N	\N	\N	\N	\N	\N
79	THREAD_COMMENT_THANKS	2021-11-19 19:26:51.747	9	\N	\N	9	\N	\N	\N
80	THREAD_COMMENT	2021-11-19 19:27:43.885	9	\N	\N	\N	\N	22	\N
81	THREAD_COMMENT_THANKS	2021-11-19 19:28:01.505	3	\N	\N	10	\N	\N	\N
82	THREAD_COMMENT	2021-11-19 19:28:09.97	3	\N	\N	\N	\N	23	\N
83	THREAD_COMMENT_THANKS	2021-11-19 19:28:11.314	3	\N	\N	11	\N	\N	\N
84	THREAD_COMMENT_THANKS	2021-11-19 19:28:16.781	3	\N	\N	12	\N	\N	\N
85	THREAD_COMMENT_THANKS	2021-11-19 19:28:21.599	3	\N	\N	13	\N	\N	\N
71	POST_COMMENT	2021-11-19 19:16:32.286	5	\N	\N	\N	\N	\N	\N
72	POST_COMMENT	2021-11-19 19:16:32.286	9	\N	\N	\N	\N	\N	\N
73	POST_COMMENT	2021-11-19 19:16:32.286	3	\N	\N	\N	\N	\N	\N
86	THREAD_COMMENT	2021-11-19 19:35:52.856	9	\N	\N	\N	\N	24	\N
87	THREAD_COMMENT	2021-11-19 19:35:52.856	3	\N	\N	\N	\N	24	\N
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."Post" (id, title, body, "bodySrc", excerpt, status, "createdAt", "updatedAt", "authorId", "readTime", "languageId", longitude, latitude, "publishedAt", "publishedLanguageLevel", "wordCount", "headlineImageId", "bumpedAt", "bumpCount", "privateShareId") FROM stdin;
2	The Treasury is the Best Weapon	<p >It&#39;s how I fight all my battles at least.</p>	[{"type":"paragraph","children":[{"text":"It's how I fight all my battles at least."}]}]	It's how I fight all my battles at least.	PUBLISHED	2021-07-28 23:26:34.418	2021-07-28 23:26:34.419	4	0	2	\N	\N	2021-07-28 23:26:34.414	BEGINNER	0	2	2021-07-28 23:26:34.414	0	\N
3	Valar	<p >Valar Morgulus!</p><p ></p><p >Thank you for reading my post.</p>	[{"type":"paragraph","children":[{"text":"Valar Morgulus!"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Thank you for reading my post."}]}]	Valar Morgulus! Thank you for reading my post.	PUBLISHED	2021-07-28 23:27:04.038	2021-07-28 23:27:04.039	3	0	3	\N	\N	2021-07-28 23:27:04.036	BEGINNER	0	3	2021-07-28 23:27:04.036	0	\N
1	Heraldry of the Great Houses (Kitchen Sink Post)	<p >Let&#39;s get started.</p><p ></p><h2 >The great houses.</h2><p >There are a number of great houses, here&#39;s the list in no particular order:</p><p ></p><ul ><li >House Arryn</li><li >House Baratheon</li><li >House Greyjoy</li><li >House Lannister</li><li >House Martell</li><li >House Stark</li><li >House Tully </li></ul><p ></p><p >Here&#39;s the OFFICIAL GREAT HOUSE POWER RANKING:</p><p ></p><ol ><li > Stark</li><li >Baratheon</li><li >Arryn</li><li >Martel</li><li >Tully</li><li >Lannister</li><li >Greyjoy</li></ol><p ></p><p >Anyone who disagrees is objectively wrong.</p><p ></p><h2 >Banners</h2><p >Naturally if these houses are great, they&#39;re going to have some sick banners too. Here&#39;s the sickest one:</p><p ></p><p ></p><img src=https://d1tjf7rcyn4hkr.cloudfront.net/inline-post-image/51e48bda-4bac-4200-a5f0-b2503cf02c45-default><p >With the runner up being:</p><p ></p><p ></p><img src=https://d1tjf7rcyn4hkr.cloudfront.net/inline-post-image/1dc30c4c-7beb-4662-b100-ea122cde0faf-default><p ></p><p >The Lannisters are pretty lame, but who doesn&#39;t like a lion?</p><p ></p><blockquote >I like lions</blockquote><p >- Everyone</p><p ></p><p >Typically family crests and banners don&#39;t have words on them, but if they did they&#39;d be something like <strong>Winter is Coming</strong>, <em>Hear me Roar</em>, <u>Family, Duty, Honor</u>, <strong><em>As High as Honor</em></strong>, <u><strong>Ours is the Fury</strong></u>, <u><em>Unbowed, Unbent, Unbroken</em></u>, and of course <u><strong><em>Growing Strong</em></strong></u>.</p><p ></p><h2 >Official Great House Heraldry Matchup Spread</h2><p >This table shows you who beats who in terms of heraldry. It is official.</p><p ></p><table ><tr ><td ><p ></p></td><td ><p >Stark</p></td><td ><p >Lannister</p></td><td ><p >Tully</p></td></tr><tr ><td ><p >Stark</p></td><td ><p >-</p></td><td ><p >Stark (but lions are cool)</p></td><td ><p >Stark (fish suck)</p></td></tr><tr ><td ><p >Lannister</p></td><td ><p >Stark (but lions are cool)</p></td><td ><p >-</p></td><td ><p >Lannister (fish suck)</p></td></tr><tr ><td ><p >Tully</p></td><td ><p >Stark (fish suck)</p></td><td ><p >Lannister (fish suck)</p></td><td ><p >-</p></td></tr></table><p ></p><h2 >More Info</h2><p >For more info about the great houses, check out <a href="https://awoiaf.westeros.org/index.php/Great_Houses" target="_blank" rel="noopener noreferrer">A Wiki of Ice and Fire</a> (which is objectively better than the &quot;game of thrones&quot; wiki. Daily reminder that the books are cannon and the show went off the rails a few seasons in and everything after they apparently forgot that Sunspear is the actual seat of Dorne is a lie)</p>	[{"type":"paragraph","children":[{"text":"Let's get started."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"heading-two","children":[{"text":"The great houses."}]},{"type":"paragraph","children":[{"text":"There are a number of great houses, here's the list in no particular order:"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"bulleted-list","children":[{"type":"list-item","children":[{"text":"House Arryn"}]},{"type":"list-item","children":[{"text":"House Baratheon"}]},{"type":"list-item","children":[{"text":"House Greyjoy"}]},{"type":"list-item","children":[{"text":"House Lannister"}]},{"type":"list-item","children":[{"text":"House Martell"}]},{"type":"list-item","children":[{"text":"House Stark"}]},{"type":"list-item","children":[{"text":"House Tully "}]}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Here's the OFFICIAL GREAT HOUSE POWER RANKING:"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"numbered-list","children":[{"type":"list-item","children":[{"text":" Stark"}]},{"type":"list-item","children":[{"text":"Baratheon"}]},{"type":"list-item","children":[{"text":"Arryn"}]},{"type":"list-item","children":[{"text":"Martel"}]},{"type":"list-item","children":[{"text":"Tully"}]},{"type":"list-item","children":[{"text":"Lannister"}]},{"type":"list-item","children":[{"text":"Greyjoy"}]}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Anyone who disagrees is objectively wrong."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"heading-two","children":[{"text":"Banners"}]},{"type":"paragraph","children":[{"text":"Naturally if these houses are great, they're going to have some sick banners too. Here's the sickest one:"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"image","uploaded":true,"url":"https://d1tjf7rcyn4hkr.cloudfront.net/inline-post-image/51e48bda-4bac-4200-a5f0-b2503cf02c45-default","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"With the runner up being:"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"image","uploaded":true,"url":"https://d1tjf7rcyn4hkr.cloudfront.net/inline-post-image/1dc30c4c-7beb-4662-b100-ea122cde0faf-default","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"The Lannisters are pretty lame, but who doesn't like a lion?"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"block-quote","children":[{"text":"I like lions"}]},{"type":"paragraph","children":[{"text":"- Everyone"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Typically family crests and banners don't have words on them, but if they did they'd be something like "},{"text":"Winter is Coming","bold":true},{"text":", "},{"text":"Hear me Roar","italic":true},{"text":", "},{"text":"Family, Duty, Honor","underline":true},{"text":", "},{"text":"As High as Honor","italic":true,"bold":true},{"text":", "},{"text":"Ours is the Fury","bold":true,"underline":true},{"text":", "},{"text":"Unbowed, Unbent, Unbroken","italic":true,"underline":true},{"text":", and of course "},{"text":"Growing Strong","italic":true,"bold":true,"underline":true},{"text":"."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"heading-two","children":[{"text":"Official Great House Heraldry Matchup Spread"}]},{"type":"paragraph","children":[{"text":"This table shows you who beats who in terms of heraldry. It is official."}]},{"type":"p","children":[{"text":""}]},{"type":"table","children":[{"type":"tr","children":[{"type":"td","children":[{"type":"p","children":[{"text":""}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Stark"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Lannister"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Tully"}]}]}]},{"type":"tr","children":[{"type":"td","children":[{"type":"p","children":[{"text":"Stark"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"-"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Stark (but lions are cool)"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Stark (fish suck)"}]}]}]},{"type":"tr","children":[{"type":"td","children":[{"type":"p","children":[{"text":"Lannister"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Stark (but lions are cool)"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"-"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Lannister (fish suck)"}]}]}]},{"type":"tr","children":[{"type":"td","children":[{"type":"p","children":[{"text":"Tully"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Stark (fish suck)"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Lannister (fish suck)"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"-"}]}]}]}]},{"type":"p","children":[{"text":""}]},{"type":"heading-two","children":[{"text":"More Info"}]},{"type":"paragraph","children":[{"text":"For more info about the great houses, check out "},{"type":"link","url":"https://awoiaf.westeros.org/index.php/Great_Houses","children":[{"text":"A Wiki of Ice and Fire"}]},{"text":" (which is objectively better than the \\"game of thrones\\" wiki. Daily reminder that the books are cannon and the show went off the rails a few seasons in and everything after they apparently forgot that Sunspear is the actual seat of Dorne is a lie)"}]}]	Let's get started. There are a number of great houses, here's the list in no particular order: House ArrynHouse BaratheonHouse GreyjoyHouse LannisterHouse MartellHouse StarkHouse Tully Here's the	PUBLISHED	2021-07-28 23:04:46.232	2021-11-19 15:33:24.291	3	1	2	\N	\N	2021-07-28 23:04:46.228	NATIVE	0	4	2021-07-28 23:04:46.228	0	\N
4	Kings Landing: What A Place	<p >For my first post, I thought it would be splendid to just take a moment to acknowledge what a marvellous place my beloved Kings Landing is. Exquisite, amirite? (I think that&#39;s what the kids say these days)</p>	[{"type":"paragraph","children":[{"text":"For my first post, I thought it would be splendid to just take a moment to acknowledge what a marvellous place my beloved Kings Landing is. Exquisite, amirite? (I think that's what the kids say these days)"}]}]	For my first post, I thought it would be splendid to just take a moment to acknowledge what a marvellous place my beloved Kings Landing is. Exquisite, amirite? (I think that's what the kids say these	PUBLISHED	2021-11-19 15:40:00.787	2021-11-19 15:48:08.796	9	0	2	\N	\N	2021-11-19 15:40:00.785	NATIVE	0	6	2021-11-19 15:40:00.785	0	\N
\.


--
-- Data for Name: PostClap; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PostClap" (id, "createdAt", "postId", "authorId") FROM stdin;
2	2021-11-18 22:51:24.294	2	3
3	2021-11-19 15:08:19.874	3	7
4	2021-11-19 15:08:49.872	1	7
5	2021-11-19 15:24:47.762	3	9
6	2021-11-19 15:42:10.257	2	9
7	2021-11-19 15:42:51.334	1	9
8	2021-11-19 18:54:30.591	1	5
9	2021-11-19 19:07:25.221	1	10
10	2021-11-19 19:10:18.52	1	11
11	2021-11-19 19:14:08.734	4	3
12	2021-11-19 19:16:51.255	4	8
13	2021-11-19 19:17:39.097	3	8
\.


--
-- Data for Name: PostClapNotification; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PostClapNotification" (id, "notificationId", "postClapId") FROM stdin;
2	4	3
3	6	4
4	4	5
5	19	6
6	6	7
7	6	8
8	6	9
9	6	10
10	28	11
11	28	12
12	4	13
\.


--
-- Data for Name: PostComment; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PostComment" (id, "createdAt", "updatedAt", body, "authorId", "postId", "authorLanguageLevel") FROM stdin;
1	2021-07-28 23:24:01.906	2021-07-28 23:24:01.907	Lots of factual errors here buddy	4	1	BEGINNER
2	2021-11-19 15:42:35.701	2021-11-19 15:42:35.702	You are an inspiration, father. Please love me.	9	2	NATIVE
3	2021-11-19 18:50:38.374	2021-11-19 18:50:38.376	I must say, **@jsno**, I always knew you had a scholarly edge to you and this essay definitely shows it. As much as it pains me to see your views on my beloved house, one must commend a man for his efforts.	9	1	NATIVE
4	2021-11-19 18:52:49.277	2021-11-19 18:52:49.277	F... screw Kings Landing!	5	4	NATIVE
5	2021-11-19 19:00:49.561	2021-11-19 19:00:49.562	🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥	10	1	BEGINNER
6	2021-11-19 19:10:38.467	2021-11-19 19:10:38.468	🔥🥺🔥❤️🔥	11	1	BEGINNER
7	2021-11-19 19:14:41.498	2021-11-19 19:14:41.499	All in all, I'd say this is a great first post! I look forward to seeing your posts in Bravosi, I've always wanted to learn.	3	4	NATIVE
\.


--
-- Data for Name: PostCommentNotification; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PostCommentNotification" (id, "notificationId", "postCommentId") FROM stdin;
1	20	2
2	21	3
6	25	5
7	21	5
9	21	6
10	26	6
11	25	6
\.


--
-- Data for Name: PostCommentSubscription; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PostCommentSubscription" (id, "createdAt", "userId", "postId") FROM stdin;
1	2021-07-28 23:04:46.233	3	1
2	2021-07-28 23:24:01.915	4	1
3	2021-07-28 23:26:34.418	4	2
4	2021-07-28 23:27:04.038	3	3
5	2021-11-19 15:40:00.787	9	4
6	2021-11-19 15:42:35.712	9	2
7	2021-11-19 18:50:38.395	9	1
8	2021-11-19 18:52:49.287	5	4
9	2021-11-19 19:00:49.572	10	1
10	2021-11-19 19:10:38.481	11	1
11	2021-11-19 19:14:41.522	3	4
12	2021-11-19 19:16:32.27	8	4
\.


--
-- Data for Name: PostCommentThanks; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PostCommentThanks" (id, "createdAt", "authorId", "postCommentId") FROM stdin;
\.


--
-- Data for Name: PostTopic; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PostTopic" (id, "postId", "topicId") FROM stdin;
5	2	4
6	3	6
8	1	4
7	1	2
10	4	8
\.


--
-- Data for Name: Prompt; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."Prompt" (id, text, "topicId") FROM stdin;
\.


--
-- Data for Name: SocialMedia; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."SocialMedia" (id, "userId", website, youtube, instagram, facebook) FROM stdin;
\.


--
-- Data for Name: Thread; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."Thread" (id, "startIndex", "endIndex", "highlightedContent", "postId", archived) FROM stdin;
7	0	15	It's how I figh	2	f
3	546	554	Everyone	1	f
5	508	532	who doesn't like a lion?	1	f
2	277	286	Lannister	1	f
9	41	49	splendid	4	f
10	94	104	marvellous	4	f
11	111	135	my beloved Kings Landing	4	f
14	0	14	Valar Morgulus	3	f
\.


--
-- Data for Name: ThreadCommentNotification; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."ThreadCommentNotification" (id, "notificationId", "commentId") FROM stdin;
4	8	8
5	9	8
6	9	9
7	10	9
8	8	9
9	8	10
10	9	10
11	13	10
12	13	11
13	9	11
14	8	11
15	10	11
16	16	12
17	9	12
18	8	12
19	10	12
20	16	13
21	13	13
22	10	13
23	8	13
24	8	14
25	9	14
26	9	15
28	16	15
27	8	15
29	13	15
30	10	15
31	27	16
32	27	17
33	27	18
35	32	20
37	34	22
38	36	23
39	27	24
40	36	24
\.


--
-- Data for Name: ThreadCommentThanksNotification; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."ThreadCommentThanksNotification" (id, "thanksId", "notificationId") FROM stdin;
1	2	7
2	3	11
3	4	12
4	5	14
5	6	11
6	7	17
7	8	24
8	9	33
9	10	35
10	11	37
11	12	37
12	13	37
\.


--
-- Data for Name: ThreadSubscription; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."ThreadSubscription" (id, "createdAt", "userId", "threadId") FROM stdin;
4	2021-07-28 23:23:06.721	3	3
5	2021-07-28 23:23:11.123	4	3
7	2021-07-28 23:23:40.04	3	5
8	2021-07-28 23:23:47.344	4	5
2	2021-07-28 23:22:34.363	3	2
10	2021-11-18 21:25:07.074	4	7
11	2021-11-18 21:25:10.101	3	7
14	2021-11-19 15:10:22.93	7	2
16	2021-11-19 15:20:39.761	9	2
15	2021-11-19 15:16:23.254	8	2
3	2021-07-28 23:22:56.301	4	2
17	2021-11-19 15:35:00.52	8	5
18	2021-11-19 18:53:41.311	5	2
21	2021-11-19 19:11:54.938	9	10
22	2021-11-19 19:12:05.579	3	10
23	2021-11-19 19:12:48.627	9	11
24	2021-11-19 19:13:58.787	3	11
29	2021-11-19 19:23:03.508	9	14
20	2021-11-19 19:11:45.775	3	9
28	2021-11-19 19:22:55.648	3	14
19	2021-11-19 19:11:08.3	9	9
30	2021-11-19 19:35:52.847	8	11
\.


--
-- Data for Name: Topic; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."Topic" (id, "devName") FROM stdin;
2	heraldry
3	language learning
4	chivalric combat
5	ravenry
6	higher mysteries
7	reading
8	westerosi history
9	alcohol
\.


--
-- Data for Name: TopicTranslation; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."TopicTranslation" (id, "uiLanguage", name, "topicId") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."User" (id, name, email, handle, "userRole", bio, "createdAt", "updatedAt", "profileImage", city, country, "stripeCustomerId", "moosendSubscriberId", "lastFourCardNumbers", "cardBrand", "isStudent") FROM stdin;
2	\N	jon@arryn.net	HandyMan	MODERATOR	\N	2021-07-28 21:29:23.535	2021-07-28 21:29:24.175	\N	\N	\N	\N	9b525bfd-a224-4816-b406-209e1f33f216	\N	\N	f
4	\N	gold@gold.gold	TheLannyster	USER	\N	2021-07-28 23:21:51.833	2021-11-19 14:24:42.16	https://d1tjf7rcyn4hkr.cloudfront.net/avatar-image/d4876a80-b5bf-4401-994a-e6ffaad1b9c3-large	\N	\N	\N	45b510f8-e131-49c5-97f8-c3b2831ab243	\N	\N	f
3	\N	j@n.com	jsno	USER	\N	2021-07-28 21:31:53.623	2021-11-19 14:29:24.769	https://d1tjf7rcyn4hkr.cloudfront.net/avatar-image/6758b20c-6d0b-44b5-83b5-2f59f8368305-large	\N	\N	cus_JwCmGeU4Hqiwmn	a010a2ec-6266-42c0-9a54-ce4ee81060cb	NONE	visa	f
5	\N	s@ndor.com	the_bloody_hound	USER	\N	2021-11-19 14:30:10.529	2021-11-19 14:34:06.992	https://d1tjf7rcyn4hkr.cloudfront.net/avatar-image/3b0de0b8-d0a2-4dd9-b20a-356cc5d43641-large	\N	\N	\N	\N	\N	\N	f
1	\N	robert@baratheon.net	RobertBaratheon	ADMIN	\N	2021-07-28 21:25:42.74	2021-11-19 14:54:49.584	https://d1tjf7rcyn4hkr.cloudfront.net/avatar-image/fe19cc0a-8661-4a0c-9005-413f1981491b-large	\N	\N	cus_JwCnTV2oSgERHO	0b6fe694-9298-4aef-b7af-895329b60ed9	NONE	visa	f
6	\N	petyr@baelish.co.uk	little_finger	USER	\N	2021-11-19 14:56:34.037	2021-11-19 14:59:11.785	https://d1tjf7rcyn4hkr.cloudfront.net/avatar-image/5d914d2b-44f4-43df-bb5f-9a772b7b43dd-large	\N	\N	\N	\N	\N	\N	f
7		arya@harvard.edu	faceless_one	USER	Now you see me... Now you don't.	2021-11-19 15:02:26.403	2021-11-19 15:05:04.285	https://d1tjf7rcyn4hkr.cloudfront.net/avatar-image/ab7f791a-309e-4367-b10e-ca047cc5c30d-large	Winterfell		\N	\N	\N	\N	f
8		ned@stark.coffee	true_stark	USER	The Man Who Passes The Sentence Should Swing The Sword. Oh and, for God's sake, winter is coming!	2021-11-19 15:11:09.472	2021-11-19 15:14:01.098	https://d1tjf7rcyn4hkr.cloudfront.net/avatar-image/12d2f0ec-02f3-4a80-be21-e5f11f9593b9-large	Winterfell		\N	\N	\N	\N	f
9		tyrion@stark.com	smartest_man_in_westeros	USER	I really am the smartest man in Westeros, and also the most modest!	2021-11-19 15:19:48.545	2021-11-19 15:22:27.069	https://d1tjf7rcyn4hkr.cloudfront.net/avatar-image/482cfb85-907e-431b-a01f-0fb429b2f5ab-large	Casterly Rock		\N	\N	\N	\N	f
10	\N	drogon@fire.com	drogon	USER	\N	2021-11-19 18:55:34.072	2021-11-19 19:00:29.249	https://d1tjf7rcyn4hkr.cloudfront.net/avatar-image/14ed7bec-9016-4c14-9b65-edce13bdf9f1-large	\N	\N	\N	\N	\N	\N	f
11	\N	rhaegal@fire.com	rhaegal_1991	USER	\N	2021-11-19 19:09:38.651	2021-11-19 19:10:01.511	https://d1tjf7rcyn4hkr.cloudfront.net/avatar-image/e45bd6bc-a92a-410e-b02c-aa3fc9699fab-large	\N	\N	\N	\N	\N	\N	f
\.


--
-- Data for Name: UserBadge; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."UserBadge" (id, type, "createdAt", "userId") FROM stdin;
1	NECROMANCER	2021-11-18 21:25:10.14	3
2	NECROMANCER	2021-11-18 22:38:39.538	4
4	NECROMANCER	2021-11-19 15:10:22.96	7
5	NECROMANCER	2021-11-19 15:16:23.306	8
7	NECROMANCER	2021-11-19 15:20:39.806	9
10	ODRADEK	2021-11-19 15:33:24.273	3
12	NECROMANCER	2021-11-19 18:53:41.345	5
\.


--
-- Data for Name: UserInterest; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."UserInterest" (id, "userId", "topicId", "createdAt") FROM stdin;
1	9	7	2021-11-19 15:24:19.851
2	9	8	2021-11-19 15:24:23.613
3	9	9	2021-11-19 15:24:28.347
\.


--
-- Data for Name: _UserFollows; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."_UserFollows" ("A", "B") FROM stdin;
3	7
3	9
9	3
9	5
3	5
3	10
\.


--
-- Data for Name: _UserSavedPosts; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."_UserSavedPosts" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b76f2893-b749-4d56-b0ef-2b95731fe5b2	4afca90733197a4e23e7d000aca905eb4da9527ed1a091265719c2a435080388	2021-12-07 17:48:11.971344+00	20210507181000_re_init	\N	\N	2021-12-07 17:48:11.857133+00	1
8c6c67d5-c81d-4f01-b2f8-edb1c5de19bd	3d70ba7e83c8ef8fc7b853adb674d94f4186121986ce62b82a9025013be907a9	2021-12-07 17:48:12.024221+00	20211016214853_add_is_student	\N	\N	2021-12-07 17:48:12.022533+00	1
c1bd5065-706d-43ce-991d-72a403661f08	b5c9e4501526233cb36890bd013f3518ea01b3df52ba5577fd1dfa9c22158dd8	2021-12-07 17:48:11.974207+00	20210507182525_add_word_count_col_to_posts	\N	\N	2021-12-07 17:48:11.972119+00	1
32b0fd6a-33f4-4a3d-9000-85ed5dde7f66	f98897fc9b261c4fa1d7ff6f3327d15b063bb4fef42c6ea3fee75201033307e8	2021-12-07 17:48:11.979024+00	20210507185054_remove_page_view_table	\N	\N	2021-12-07 17:48:11.974836+00	1
67b6b706-0fd7-468f-9ba8-458a93c387cf	6ab7714e9f8b59f80a9f87faa56714b133317054099a90a64ddabe3d503e3269	2021-12-07 17:48:11.982619+00	20210525114631_payments_related_improvements	\N	\N	2021-12-07 17:48:11.979646+00	1
e7f13b68-1058-4a55-9575-37d7ef05f99b	c0060f0de40a9bc84ac8623d4ba379e6a5e3edc2728566db1586bbb90ed7d167	2021-12-07 17:48:12.028732+00	20211020182538_add_comment_author_language_level	\N	\N	2021-12-07 17:48:12.024828+00	1
b5b7cfd2-eb47-4d82-9513-6ca12ae1e5c7	a3b7a53aeb23270e3c12cb849ed2b8b422f51bda08326cd86ba6001407f55106	2021-12-07 17:48:11.991432+00	20210529142147_image_data_redesign	\N	\N	2021-12-07 17:48:11.983224+00	1
81b184fc-b192-47fa-936c-f2951c25aef9	b042e874725060d6c86831e341cd3a08584680711055d732036f38689d7a1d19	2021-12-07 17:48:12.000121+00	20210605143036_like_to_clap	\N	\N	2021-12-07 17:48:11.992522+00	1
16937a7c-2531-4f8e-bb4f-c5cd77c792b0	f650d7d96fd34f2c47ab613179794ef48202b314dc1b81c392f710e176cb7d6d	2021-12-07 17:48:12.003116+00	20210605145217_post_clap_notification	\N	\N	2021-12-07 17:48:12.000669+00	1
2e27ecdc-2b36-4339-8cd2-7985f88b049f	4f819694e8cc1182c95e3c457fbeb2ab3838d5a465baaa44b5b477ef9969699e	2021-12-07 17:48:12.045728+00	20211021125015_add_private_share_id	\N	\N	2021-12-07 17:48:12.029535+00	1
c481cb20-77bf-4769-9b02-2057034b1396	2e6011100329736a8bd2452a4356b1dc685627e183908657ed3d974b3efebf19	2021-12-07 17:48:12.007184+00	20210605150936_clap_pending_notification	\N	\N	2021-12-07 17:48:12.004194+00	1
ef843bd1-a494-4a64-b8e4-afbd442ef0d4	90297866a4678787fa37a835b59496df6cd323a6d45201a75f49d036fc6785de	2021-12-07 17:48:12.009498+00	20210609141814_add_post_bumping	\N	\N	2021-12-07 17:48:12.007733+00	1
c54d9a6b-587d-45ff-ab55-44ceaf3cd10b	c3e298c1da2296fb8d480474f78220b6d86ce3b47f1a6ee99bc83c13c822ad7c	2021-12-07 17:48:12.011376+00	20210612192514_add_odradek_and_necromancer_badges	\N	\N	2021-12-07 17:48:12.010107+00	1
124b99dd-9d2d-4ebf-bd69-0a84af60d085	9eae0fa29192889d1b8a387e9177fea0b85f222ce9bbeb2d5cf48009274e5a3f	2021-12-07 17:48:12.145945+00	20211118154830_in_app_notifications	\N	\N	2021-12-07 17:48:12.046804+00	1
10e7d1aa-2a65-43d2-b24c-8a69808adf82	1e783e22a0231dd839808cae1a271080250e9b01bb2eca9ea52b2a9578fbbfc7	2021-12-07 17:48:12.014074+00	20211006190810_add_email_verification	\N	\N	2021-12-07 17:48:12.01195+00	1
dd958126-3db6-459c-a3bc-810933ed1243	a42b2b50b4842e440de93457f4ce543d29e041ae854f32c6c7968a6c0e967782	2021-12-07 17:48:12.016142+00	20211011171811_add_student_price	\N	\N	2021-12-07 17:48:12.014682+00	1
209a2d61-419e-403e-8171-599cee240dfe	cb7a05c48b33ed436037161a4bfc177510659b30d740c99e28c0bfdd006a6f3c	2021-12-07 17:48:12.021774+00	20211013121219_add_saved_posts	\N	\N	2021-12-07 17:48:12.016762+00	1
8f0ad454-58f0-40bd-80a9-f46860e5350b	09360dae79dbcda946f6723b8e773026f6809b997ea4ea564f21aec0c910579a	2021-12-07 17:48:12.157992+00	20211207173544_cascading_notification_deletes	\N	\N	2021-12-07 17:48:12.146523+00	1
\.


--
-- Name: Auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Auth_id_seq"', 11, true);


--
-- Name: CommentThanks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."CommentThanks_id_seq"', 13, true);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 24, true);


--
-- Name: HeadlineImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."HeadlineImage_id_seq"', 6, true);


--
-- Name: InAppNotification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."InAppNotification_id_seq"', 37, true);


--
-- Name: LanguageLearning_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."LanguageLearning_id_seq"', 1, false);


--
-- Name: LanguageNative_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."LanguageNative_id_seq"', 1, false);


--
-- Name: LanguageRelation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."LanguageRelation_id_seq"', 17, true);


--
-- Name: Language_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Language_id_seq"', 5, true);


--
-- Name: MembershipSubscriptionInvoiceItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."MembershipSubscriptionInvoiceItem_id_seq"', 1, false);


--
-- Name: MembershipSubscriptionInvoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."MembershipSubscriptionInvoice_id_seq"', 1, false);


--
-- Name: MembershipSubscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."MembershipSubscription_id_seq"', 2, true);


--
-- Name: NewFollowerNotification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."NewFollowerNotification_id_seq"', 6, true);


--
-- Name: NewPostNotification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."NewPostNotification_id_seq"', 1, true);


--
-- Name: PendingNotification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PendingNotification_id_seq"', 87, true);


--
-- Name: PostClapNotification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostClapNotification_id_seq"', 12, true);


--
-- Name: PostClap_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostClap_id_seq"', 13, true);


--
-- Name: PostCommentNotification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostCommentNotification_id_seq"', 16, true);


--
-- Name: PostCommentSubscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostCommentSubscription_id_seq"', 12, true);


--
-- Name: PostCommentThanks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostCommentThanks_id_seq"', 1, false);


--
-- Name: PostComment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostComment_id_seq"', 8, true);


--
-- Name: PostTopic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostTopic_id_seq"', 10, true);


--
-- Name: Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Post_id_seq"', 4, true);


--
-- Name: Prompt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Prompt_id_seq"', 1, false);


--
-- Name: SocialMedia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."SocialMedia_id_seq"', 1, false);


--
-- Name: ThreadCommentNotification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."ThreadCommentNotification_id_seq"', 40, true);


--
-- Name: ThreadCommentThanksNotification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."ThreadCommentThanksNotification_id_seq"', 12, true);


--
-- Name: ThreadSubscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."ThreadSubscription_id_seq"', 30, true);


--
-- Name: Thread_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Thread_id_seq"', 14, true);


--
-- Name: TopicTranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."TopicTranslation_id_seq"', 1, false);


--
-- Name: Topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Topic_id_seq"', 9, true);


--
-- Name: UserBadge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."UserBadge_id_seq"', 14, true);


--
-- Name: UserInterest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."UserInterest_id_seq"', 3, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."User_id_seq"', 11, true);


--
-- Name: Auth Auth_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_pkey" PRIMARY KEY (id);


--
-- Name: CommentThanks CommentThanks_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."CommentThanks"
    ADD CONSTRAINT "CommentThanks_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: HeadlineImage HeadlineImage_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."HeadlineImage"
    ADD CONSTRAINT "HeadlineImage_pkey" PRIMARY KEY (id);


--
-- Name: InAppNotification InAppNotification_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."InAppNotification"
    ADD CONSTRAINT "InAppNotification_pkey" PRIMARY KEY (id);


--
-- Name: LanguageLearning LanguageLearning_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageLearning"
    ADD CONSTRAINT "LanguageLearning_pkey" PRIMARY KEY (id);


--
-- Name: LanguageNative LanguageNative_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageNative"
    ADD CONSTRAINT "LanguageNative_pkey" PRIMARY KEY (id);


--
-- Name: LanguageRelation LanguageRelation_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageRelation"
    ADD CONSTRAINT "LanguageRelation_pkey" PRIMARY KEY (id);


--
-- Name: Language Language_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Language"
    ADD CONSTRAINT "Language_pkey" PRIMARY KEY (id);


--
-- Name: MembershipSubscriptionInvoiceItem MembershipSubscriptionInvoiceItem_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscriptionInvoiceItem"
    ADD CONSTRAINT "MembershipSubscriptionInvoiceItem_pkey" PRIMARY KEY (id);


--
-- Name: MembershipSubscriptionInvoice MembershipSubscriptionInvoice_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscriptionInvoice"
    ADD CONSTRAINT "MembershipSubscriptionInvoice_pkey" PRIMARY KEY (id);


--
-- Name: MembershipSubscription MembershipSubscription_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscription"
    ADD CONSTRAINT "MembershipSubscription_pkey" PRIMARY KEY (id);


--
-- Name: NewFollowerNotification NewFollowerNotification_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."NewFollowerNotification"
    ADD CONSTRAINT "NewFollowerNotification_pkey" PRIMARY KEY (id);


--
-- Name: NewPostNotification NewPostNotification_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."NewPostNotification"
    ADD CONSTRAINT "NewPostNotification_pkey" PRIMARY KEY (id);


--
-- Name: PendingNotification PendingNotification_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PendingNotification"
    ADD CONSTRAINT "PendingNotification_pkey" PRIMARY KEY (id);


--
-- Name: PostClapNotification PostClapNotification_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostClapNotification"
    ADD CONSTRAINT "PostClapNotification_pkey" PRIMARY KEY (id);


--
-- Name: PostClap PostClap_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostClap"
    ADD CONSTRAINT "PostClap_pkey" PRIMARY KEY (id);


--
-- Name: PostCommentNotification PostCommentNotification_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentNotification"
    ADD CONSTRAINT "PostCommentNotification_pkey" PRIMARY KEY (id);


--
-- Name: PostCommentSubscription PostCommentSubscription_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentSubscription"
    ADD CONSTRAINT "PostCommentSubscription_pkey" PRIMARY KEY (id);


--
-- Name: PostCommentThanks PostCommentThanks_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentThanks"
    ADD CONSTRAINT "PostCommentThanks_pkey" PRIMARY KEY (id);


--
-- Name: PostComment PostComment_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostComment"
    ADD CONSTRAINT "PostComment_pkey" PRIMARY KEY (id);


--
-- Name: PostTopic PostTopic_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostTopic"
    ADD CONSTRAINT "PostTopic_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: Prompt Prompt_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Prompt"
    ADD CONSTRAINT "Prompt_pkey" PRIMARY KEY (id);


--
-- Name: SocialMedia SocialMedia_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."SocialMedia"
    ADD CONSTRAINT "SocialMedia_pkey" PRIMARY KEY (id);


--
-- Name: ThreadCommentNotification ThreadCommentNotification_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadCommentNotification"
    ADD CONSTRAINT "ThreadCommentNotification_pkey" PRIMARY KEY (id);


--
-- Name: ThreadCommentThanksNotification ThreadCommentThanksNotification_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadCommentThanksNotification"
    ADD CONSTRAINT "ThreadCommentThanksNotification_pkey" PRIMARY KEY (id);


--
-- Name: ThreadSubscription ThreadSubscription_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadSubscription"
    ADD CONSTRAINT "ThreadSubscription_pkey" PRIMARY KEY (id);


--
-- Name: Thread Thread_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Thread"
    ADD CONSTRAINT "Thread_pkey" PRIMARY KEY (id);


--
-- Name: TopicTranslation TopicTranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."TopicTranslation"
    ADD CONSTRAINT "TopicTranslation_pkey" PRIMARY KEY (id);


--
-- Name: Topic Topic_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Topic"
    ADD CONSTRAINT "Topic_pkey" PRIMARY KEY (id);


--
-- Name: UserBadge UserBadge_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."UserBadge"
    ADD CONSTRAINT "UserBadge_pkey" PRIMARY KEY (id);


--
-- Name: UserInterest UserInterest_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."UserInterest"
    ADD CONSTRAINT "UserInterest_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Auth_userId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "Auth_userId_key" ON public."Auth" USING btree ("userId");


--
-- Name: CommentThanks_authorId_commentId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "CommentThanks_authorId_commentId_key" ON public."CommentThanks" USING btree ("authorId", "commentId");


--
-- Name: LanguageLearning_userId_languageId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "LanguageLearning_userId_languageId_key" ON public."LanguageLearning" USING btree ("userId", "languageId");


--
-- Name: LanguageNative_userId_languageId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "LanguageNative_userId_languageId_key" ON public."LanguageNative" USING btree ("userId", "languageId");


--
-- Name: LanguageRelation_userId_languageId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "LanguageRelation_userId_languageId_key" ON public."LanguageRelation" USING btree ("userId", "languageId");


--
-- Name: Language_name_dialect_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "Language_name_dialect_key" ON public."Language" USING btree (name, dialect);


--
-- Name: MembershipSubscription_stripeSubscriptionId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "MembershipSubscription_stripeSubscriptionId_key" ON public."MembershipSubscription" USING btree ("stripeSubscriptionId");


--
-- Name: MembershipSubscription_userId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "MembershipSubscription_userId_key" ON public."MembershipSubscription" USING btree ("userId");


--
-- Name: PostClap_authorId_postId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "PostClap_authorId_postId_key" ON public."PostClap" USING btree ("authorId", "postId");


--
-- Name: PostCommentSubscription_userId_postId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "PostCommentSubscription_userId_postId_key" ON public."PostCommentSubscription" USING btree ("userId", "postId");


--
-- Name: PostCommentThanks_authorId_postCommentId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "PostCommentThanks_authorId_postCommentId_key" ON public."PostCommentThanks" USING btree ("authorId", "postCommentId");


--
-- Name: PostTopic_postId_topicId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "PostTopic_postId_topicId_key" ON public."PostTopic" USING btree ("postId", "topicId");


--
-- Name: Post_headlineImageId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "Post_headlineImageId_key" ON public."Post" USING btree ("headlineImageId");


--
-- Name: Post_privateShareId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "Post_privateShareId_key" ON public."Post" USING btree ("privateShareId");


--
-- Name: SocialMedia_userId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "SocialMedia_userId_key" ON public."SocialMedia" USING btree ("userId");


--
-- Name: ThreadSubscription_userId_threadId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "ThreadSubscription_userId_threadId_key" ON public."ThreadSubscription" USING btree ("userId", "threadId");


--
-- Name: TopicTranslation_uiLanguage_topicId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "TopicTranslation_uiLanguage_topicId_key" ON public."TopicTranslation" USING btree ("uiLanguage", "topicId");


--
-- Name: UserBadge_userId_type_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "UserBadge_userId_type_key" ON public."UserBadge" USING btree ("userId", type);


--
-- Name: UserInterest_userId_topicId_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "UserInterest_userId_topicId_key" ON public."UserInterest" USING btree ("userId", "topicId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_handle_key; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "User_handle_key" ON public."User" USING btree (handle);


--
-- Name: _UserFollows_AB_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON public."_UserFollows" USING btree ("A", "B");


--
-- Name: _UserFollows_B_index; Type: INDEX; Schema: public; Owner: robin
--

CREATE INDEX "_UserFollows_B_index" ON public."_UserFollows" USING btree ("B");


--
-- Name: _UserSavedPosts_AB_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "_UserSavedPosts_AB_unique" ON public."_UserSavedPosts" USING btree ("A", "B");


--
-- Name: _UserSavedPosts_B_index; Type: INDEX; Schema: public; Owner: robin
--

CREATE INDEX "_UserSavedPosts_B_index" ON public."_UserSavedPosts" USING btree ("B");


--
-- Name: Auth Auth_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CommentThanks CommentThanks_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."CommentThanks"
    ADD CONSTRAINT "CommentThanks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CommentThanks CommentThanks_commentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."CommentThanks"
    ADD CONSTRAINT "CommentThanks_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_threadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES public."Thread"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: InAppNotification InAppNotification_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."InAppNotification"
    ADD CONSTRAINT "InAppNotification_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: InAppNotification InAppNotification_triggeringUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."InAppNotification"
    ADD CONSTRAINT "InAppNotification_triggeringUserId_fkey" FOREIGN KEY ("triggeringUserId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: InAppNotification InAppNotification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."InAppNotification"
    ADD CONSTRAINT "InAppNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LanguageLearning LanguageLearning_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageLearning"
    ADD CONSTRAINT "LanguageLearning_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES public."Language"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LanguageLearning LanguageLearning_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageLearning"
    ADD CONSTRAINT "LanguageLearning_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LanguageNative LanguageNative_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageNative"
    ADD CONSTRAINT "LanguageNative_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES public."Language"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LanguageNative LanguageNative_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageNative"
    ADD CONSTRAINT "LanguageNative_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LanguageRelation LanguageRelation_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageRelation"
    ADD CONSTRAINT "LanguageRelation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES public."Language"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LanguageRelation LanguageRelation_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageRelation"
    ADD CONSTRAINT "LanguageRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MembershipSubscriptionInvoiceItem MembershipSubscriptionInvoiceItem_invoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscriptionInvoiceItem"
    ADD CONSTRAINT "MembershipSubscriptionInvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public."MembershipSubscriptionInvoice"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MembershipSubscriptionInvoice MembershipSubscriptionInvoice_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscriptionInvoice"
    ADD CONSTRAINT "MembershipSubscriptionInvoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MembershipSubscription MembershipSubscription_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscription"
    ADD CONSTRAINT "MembershipSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: NewFollowerNotification NewFollowerNotification_followingUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."NewFollowerNotification"
    ADD CONSTRAINT "NewFollowerNotification_followingUserId_fkey" FOREIGN KEY ("followingUserId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: NewFollowerNotification NewFollowerNotification_notificationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."NewFollowerNotification"
    ADD CONSTRAINT "NewFollowerNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES public."InAppNotification"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: NewPostNotification NewPostNotification_notificationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."NewPostNotification"
    ADD CONSTRAINT "NewPostNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES public."InAppNotification"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: NewPostNotification NewPostNotification_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."NewPostNotification"
    ADD CONSTRAINT "NewPostNotification_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PendingNotification PendingNotification_commentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PendingNotification"
    ADD CONSTRAINT "PendingNotification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PendingNotification PendingNotification_commentThanksId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PendingNotification"
    ADD CONSTRAINT "PendingNotification_commentThanksId_fkey" FOREIGN KEY ("commentThanksId") REFERENCES public."CommentThanks"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PendingNotification PendingNotification_postClapId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PendingNotification"
    ADD CONSTRAINT "PendingNotification_postClapId_fkey" FOREIGN KEY ("postClapId") REFERENCES public."PostClap"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PendingNotification PendingNotification_postCommentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PendingNotification"
    ADD CONSTRAINT "PendingNotification_postCommentId_fkey" FOREIGN KEY ("postCommentId") REFERENCES public."PostComment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PendingNotification PendingNotification_postCommentThanksId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PendingNotification"
    ADD CONSTRAINT "PendingNotification_postCommentThanksId_fkey" FOREIGN KEY ("postCommentThanksId") REFERENCES public."PostCommentThanks"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PendingNotification PendingNotification_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PendingNotification"
    ADD CONSTRAINT "PendingNotification_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PendingNotification PendingNotification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PendingNotification"
    ADD CONSTRAINT "PendingNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PostClapNotification PostClapNotification_notificationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostClapNotification"
    ADD CONSTRAINT "PostClapNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES public."InAppNotification"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostClapNotification PostClapNotification_postClapId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostClapNotification"
    ADD CONSTRAINT "PostClapNotification_postClapId_fkey" FOREIGN KEY ("postClapId") REFERENCES public."PostClap"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostClap PostClap_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostClap"
    ADD CONSTRAINT "PostClap_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PostClap PostClap_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostClap"
    ADD CONSTRAINT "PostClap_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PostCommentNotification PostCommentNotification_notificationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentNotification"
    ADD CONSTRAINT "PostCommentNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES public."InAppNotification"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostCommentNotification PostCommentNotification_postCommentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentNotification"
    ADD CONSTRAINT "PostCommentNotification_postCommentId_fkey" FOREIGN KEY ("postCommentId") REFERENCES public."PostComment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostCommentSubscription PostCommentSubscription_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentSubscription"
    ADD CONSTRAINT "PostCommentSubscription_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PostCommentSubscription PostCommentSubscription_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentSubscription"
    ADD CONSTRAINT "PostCommentSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PostCommentThanks PostCommentThanks_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentThanks"
    ADD CONSTRAINT "PostCommentThanks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PostCommentThanks PostCommentThanks_postCommentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentThanks"
    ADD CONSTRAINT "PostCommentThanks_postCommentId_fkey" FOREIGN KEY ("postCommentId") REFERENCES public."PostComment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PostComment PostComment_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostComment"
    ADD CONSTRAINT "PostComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PostComment PostComment_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostComment"
    ADD CONSTRAINT "PostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PostTopic PostTopic_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostTopic"
    ADD CONSTRAINT "PostTopic_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PostTopic PostTopic_topicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostTopic"
    ADD CONSTRAINT "PostTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topic"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_headlineImageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_headlineImageId_fkey" FOREIGN KEY ("headlineImageId") REFERENCES public."HeadlineImage"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES public."Language"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Prompt Prompt_topicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Prompt"
    ADD CONSTRAINT "Prompt_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topic"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SocialMedia SocialMedia_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."SocialMedia"
    ADD CONSTRAINT "SocialMedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ThreadCommentNotification ThreadCommentNotification_commentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadCommentNotification"
    ADD CONSTRAINT "ThreadCommentNotification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ThreadCommentNotification ThreadCommentNotification_notificationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadCommentNotification"
    ADD CONSTRAINT "ThreadCommentNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES public."InAppNotification"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ThreadCommentThanksNotification ThreadCommentThanksNotification_notificationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadCommentThanksNotification"
    ADD CONSTRAINT "ThreadCommentThanksNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES public."InAppNotification"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ThreadCommentThanksNotification ThreadCommentThanksNotification_thanksId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadCommentThanksNotification"
    ADD CONSTRAINT "ThreadCommentThanksNotification_thanksId_fkey" FOREIGN KEY ("thanksId") REFERENCES public."CommentThanks"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ThreadSubscription ThreadSubscription_threadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadSubscription"
    ADD CONSTRAINT "ThreadSubscription_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES public."Thread"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ThreadSubscription ThreadSubscription_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadSubscription"
    ADD CONSTRAINT "ThreadSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Thread Thread_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Thread"
    ADD CONSTRAINT "Thread_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TopicTranslation TopicTranslation_topicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."TopicTranslation"
    ADD CONSTRAINT "TopicTranslation_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topic"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserBadge UserBadge_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."UserBadge"
    ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserInterest UserInterest_topicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."UserInterest"
    ADD CONSTRAINT "UserInterest_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topic"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserInterest UserInterest_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."UserInterest"
    ADD CONSTRAINT "UserInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _UserFollows _UserFollows_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."_UserFollows"
    ADD CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _UserFollows _UserFollows_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."_UserFollows"
    ADD CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _UserSavedPosts _UserSavedPosts_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."_UserSavedPosts"
    ADD CONSTRAINT "_UserSavedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _UserSavedPosts _UserSavedPosts_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."_UserSavedPosts"
    ADD CONSTRAINT "_UserSavedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

