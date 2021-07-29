--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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
    'ANNUALY'
);


ALTER TYPE public."MembershipSubscriptionPeriod" OWNER TO robin;

--
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."NotificationType" AS ENUM (
    'THREAD_COMMENT',
    'POST_COMMENT',
    'THREAD_COMMENT_THANKS',
    'POST_COMMENT_THANKS',
    'NEW_POST',
    'POST_CLAP'
);


ALTER TYPE public."NotificationType" OWNER TO robin;

--
-- Name: PostStatus; Type: TYPE; Schema: public; Owner: robin
--

CREATE TYPE public."PostStatus" AS ENUM (
    'DRAFT',
    'PUBLISHED'
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
    "resetTokenExpiry" integer
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
    "threadId" integer NOT NULL
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
-- Name: PendingNotification; Type: TABLE; Schema: public; Owner: robin
--

CREATE TABLE public."PendingNotification" (
    id integer NOT NULL,
    type public."NotificationType" NOT NULL,
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
    "bumpCount" integer DEFAULT 0 NOT NULL
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
    "postId" integer NOT NULL
);


ALTER TABLE public."PostComment" OWNER TO robin;

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
    "cardBrand" text
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
-- Name: PostComment id; Type: DEFAULT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostComment" ALTER COLUMN id SET DEFAULT nextval('public."PostComment_id_seq"'::regclass);


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

COPY public."Auth" (id, "userId", password, "resetToken", "resetTokenExpiry") FROM stdin;
1	1	$2a$10$dU6Vpx9ikVVsF/fhM2E9BuOzoH4hpi.mzNiVgXj7ogjbtUwh3PBeG	\N	\N
2	2	$2a$10$QtQRhgmpHUZcjHYqeabMvuT9pd.7rqM7/hDPV4G/guxgf.MErEJxi	\N	\N
3	3	$2a$10$Y8y1528p2Owz8XsfCixYgeNTmip5eImBhpYiJwigCzbWwm.LRCcxy	\N	\N
4	4	$2a$10$o8tKUAE91TokYU87s/UY/.UgGTOqIYBF.3j3fnk6a1INRL2mWzDj2	\N	\N
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."Comment" (id, "createdAt", "updatedAt", body, "authorId", "threadId") FROM stdin;
1	2021-07-28 23:22:56.293	2021-07-28 23:22:56.294	That "1" looks an awful lot like a "6", I think you made a mistake.	4	2
2	2021-07-28 23:23:11.118	2021-07-28 23:23:11.119	That's right.	4	3
3	2021-07-28 23:23:47.339	2021-07-28 23:23:47.339	That's one thing we can agree on.	4	5
4	2021-07-28 23:24:31.102	2021-07-28 23:24:31.102	Go away Tywin, don't you have a date with a crossbow bolt or something?	3	2
\.


--
-- Data for Name: CommentThanks; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."CommentThanks" (id, "createdAt", "authorId", "commentId") FROM stdin;
1	2021-07-28 23:24:35.469	3	3
\.


--
-- Data for Name: HeadlineImage; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."HeadlineImage" (id, "smallSize", "largeSize") FROM stdin;
1	https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-small	https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-large
2	https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-small	https://d2ieewwzq5w1x7.cloudfront.net/post-image/a8949a84-43b3-4dc1-851c-6f089fab32b3-large
3	https://d2ieewwzq5w1x7.cloudfront.net/post-image/149c24d6-99de-4dc7-972e-cab92ff2d358-small	https://d2ieewwzq5w1x7.cloudfront.net/post-image/149c24d6-99de-4dc7-972e-cab92ff2d358-large
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
-- Data for Name: PendingNotification; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PendingNotification" (id, type, "createdAt", "userId", "postId", "postCommentThanksId", "commentThanksId", "postCommentId", "commentId", "postClapId") FROM stdin;
1	THREAD_COMMENT	2021-07-28 23:22:56.307	3	\N	\N	\N	\N	1	\N
2	THREAD_COMMENT	2021-07-28 23:23:11.131	3	\N	\N	\N	\N	2	\N
3	THREAD_COMMENT	2021-07-28 23:23:47.35	3	\N	\N	\N	\N	3	\N
4	POST_COMMENT	2021-07-28 23:24:01.925	3	\N	\N	\N	1	\N	\N
5	THREAD_COMMENT	2021-07-28 23:24:31.111	4	\N	\N	\N	\N	4	\N
6	THREAD_COMMENT_THANKS	2021-07-28 23:24:35.477	4	\N	\N	1	\N	\N	\N
7	POST_CLAP	2021-07-28 23:27:17.06	3	\N	\N	\N	\N	\N	1
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."Post" (id, title, body, "bodySrc", excerpt, status, "createdAt", "updatedAt", "authorId", "readTime", "languageId", longitude, latitude, "publishedAt", "publishedLanguageLevel", "wordCount", "headlineImageId", "bumpedAt", "bumpCount") FROM stdin;
1	Heraldry of the Great Houses (Kitchen Sink Post)	<p >Let&#39;s get started.</p><p ></p><h2 >The great houses.</h2><p >There are a number of great houses, here&#39;s the list in no particular order:</p><p ></p><ul ><li >House Arryn</li><li >House Baratheon</li><li >House Greyjoy</li><li >House Lannister</li><li >House Martell</li><li >House Stark</li><li >House Tully </li></ul><p ></p><p >Here&#39;s the OFFICIAL GREAT HOUSE POWER RANKING:</p><p ></p><ol ><li > Stark</li><li >Baratheon</li><li >Arryn</li><li >Martel</li><li >Tully</li><li >Lannister</li><li >Greyjoy</li></ol><p ></p><p >Anyone who disagrees is objectively wrong.</p><p ></p><h2 >Banners</h2><p >Naturally if these houses are great, they&#39;re going to have some sick banners too. Here&#39;s the sickest one:</p><p ></p><p ></p><img src=https://d1tjf7rcyn4hkr.cloudfront.net/inline-post-image/51e48bda-4bac-4200-a5f0-b2503cf02c45-default><p >With the runner up being:</p><p ></p><p ></p><img src=https://d1tjf7rcyn4hkr.cloudfront.net/inline-post-image/1dc30c4c-7beb-4662-b100-ea122cde0faf-default><p ></p><p >The Lannisters are pretty lame, but who doesn&#39;t like a lion?</p><p ></p><blockquote >I like lions</blockquote><p >- Everyone</p><p ></p><p >Typically family crests and banners don&#39;t have words on them, but if they did they&#39;d be something like <strong>Winter is Coming</strong>, <em>Hear me Roar</em>, <u>Family, Duty, Honor</u>, <strong><em>As High as Honor</em></strong>, <u><strong>Ours is the Fury</strong></u>, <u><em>Unbowed, Unbent, Unbroken</em></u>, and of course <u><strong><em>Growing Strong</em></strong></u>.</p><p ></p><h2 >Official Great House Heraldry Matchup Spread</h2><p >This table shows you who beats who in terms of heraldry. It is official.</p><p ></p><table ><tr ><td ><p ></p></td><td ><p >Stark</p></td><td ><p >Lannister</p></td><td ><p >Tully</p></td></tr><tr ><td ><p >Stark</p></td><td ><p >-</p></td><td ><p >Stark (but lions are cool)</p></td><td ><p >Stark (fish suck)</p></td></tr><tr ><td ><p >Lannister</p></td><td ><p >Stark (but lions are cool)</p></td><td ><p >-</p></td><td ><p >Lannister (fish suck)</p></td></tr><tr ><td ><p >Tully</p></td><td ><p >Stark (fish suck)</p></td><td ><p >Lannister (fish suck)</p></td><td ><p >-</p></td></tr></table><p ></p><h2 >More Info</h2><p >For more info about the great houses, check out <a href="https://awoiaf.westeros.org/index.php/Great_Houses" target="_blank" rel="noopener noreferrer">A Wiki of Ice and Fire</a> (which is objectively better than the &quot;game of thrones&quot; wiki. Daily reminder that the books are cannon and the show went off the rails a few seasons in and everything after they apparently forgot that Sunspear is the actual seat of Dorne is a lie)</p>	[{"type":"paragraph","children":[{"text":"Let's get started."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"heading-two","children":[{"text":"The great houses."}]},{"type":"paragraph","children":[{"text":"There are a number of great houses, here's the list in no particular order:"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"bulleted-list","children":[{"type":"list-item","children":[{"text":"House Arryn"}]},{"type":"list-item","children":[{"text":"House Baratheon"}]},{"type":"list-item","children":[{"text":"House Greyjoy"}]},{"type":"list-item","children":[{"text":"House Lannister"}]},{"type":"list-item","children":[{"text":"House Martell"}]},{"type":"list-item","children":[{"text":"House Stark"}]},{"type":"list-item","children":[{"text":"House Tully "}]}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Here's the OFFICIAL GREAT HOUSE POWER RANKING:"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"numbered-list","children":[{"type":"list-item","children":[{"text":" Stark"}]},{"type":"list-item","children":[{"text":"Baratheon"}]},{"type":"list-item","children":[{"text":"Arryn"}]},{"type":"list-item","children":[{"text":"Martel"}]},{"type":"list-item","children":[{"text":"Tully"}]},{"type":"list-item","children":[{"text":"Lannister"}]},{"type":"list-item","children":[{"text":"Greyjoy"}]}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Anyone who disagrees is objectively wrong."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"heading-two","children":[{"text":"Banners"}]},{"type":"paragraph","children":[{"text":"Naturally if these houses are great, they're going to have some sick banners too. Here's the sickest one:"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"image","uploaded":true,"url":"https://d1tjf7rcyn4hkr.cloudfront.net/inline-post-image/51e48bda-4bac-4200-a5f0-b2503cf02c45-default","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"With the runner up being:"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"image","uploaded":true,"url":"https://d1tjf7rcyn4hkr.cloudfront.net/inline-post-image/1dc30c4c-7beb-4662-b100-ea122cde0faf-default","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"The Lannisters are pretty lame, but who doesn't like a lion?"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"block-quote","children":[{"text":"I like lions"}]},{"type":"paragraph","children":[{"text":"- Everyone"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Typically family crests and banners don't have words on them, but if they did they'd be something like "},{"text":"Winter is Coming","bold":true},{"text":", "},{"text":"Hear me Roar","italic":true},{"text":", "},{"text":"Family, Duty, Honor","underline":true},{"text":", "},{"text":"As High as Honor","italic":true,"bold":true},{"text":", "},{"text":"Ours is the Fury","bold":true,"underline":true},{"text":", "},{"text":"Unbowed, Unbent, Unbroken","italic":true,"underline":true},{"text":", and of course "},{"text":"Growing Strong","italic":true,"bold":true,"underline":true},{"text":"."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"heading-two","children":[{"text":"Official Great House Heraldry Matchup Spread"}]},{"type":"paragraph","children":[{"text":"This table shows you who beats who in terms of heraldry. It is official."}]},{"type":"p","children":[{"text":""}]},{"type":"table","children":[{"type":"tr","children":[{"type":"td","children":[{"type":"p","children":[{"text":""}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Stark"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Lannister"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Tully"}]}]}]},{"type":"tr","children":[{"type":"td","children":[{"type":"p","children":[{"text":"Stark"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"-"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Stark (but lions are cool)"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Stark (fish suck)"}]}]}]},{"type":"tr","children":[{"type":"td","children":[{"type":"p","children":[{"text":"Lannister"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Stark (but lions are cool)"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"-"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Lannister (fish suck)"}]}]}]},{"type":"tr","children":[{"type":"td","children":[{"type":"p","children":[{"text":"Tully"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Stark (fish suck)"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"Lannister (fish suck)"}]}]},{"type":"td","children":[{"type":"p","children":[{"text":"-"}]}]}]}]},{"type":"p","children":[{"text":""}]},{"type":"heading-two","children":[{"text":"More Info"}]},{"type":"paragraph","children":[{"text":"For more info about the great houses, check out "},{"type":"link","url":"https://awoiaf.westeros.org/index.php/Great_Houses","children":[{"text":"A Wiki of Ice and Fire"}]},{"text":" (which is objectively better than the \\"game of thrones\\" wiki. Daily reminder that the books are cannon and the show went off the rails a few seasons in and everything after they apparently forgot that Sunspear is the actual seat of Dorne is a lie)"}]}]	Let's get started. There are a number of great houses, here's the list in no particular order: House ArrynHouse BaratheonHouse GreyjoyHouse LannisterHouse MartellHouse StarkHouse Tully Here's the	PUBLISHED	2021-07-28 23:04:46.232	2021-07-28 23:20:56.386	3	1	2	\N	\N	2021-07-28 23:04:46.228	NATIVE	0	1	2021-07-28 23:04:46.228	0
2	The Treasury is the Best Weapon	<p >It&#39;s how I fight all my battles at least.</p>	[{"type":"paragraph","children":[{"text":"It's how I fight all my battles at least."}]}]	It's how I fight all my battles at least.	PUBLISHED	2021-07-28 23:26:34.418	2021-07-28 23:26:34.419	4	0	2	\N	\N	2021-07-28 23:26:34.414	BEGINNER	0	2	2021-07-28 23:26:34.414	0
3	Valar	<p >Valar Morgulus!</p><p ></p><p >Thank you for reading my post.</p>	[{"type":"paragraph","children":[{"text":"Valar Morgulus!"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Thank you for reading my post."}]}]	Valar Morgulus! Thank you for reading my post.	PUBLISHED	2021-07-28 23:27:04.038	2021-07-28 23:27:04.039	3	0	3	\N	\N	2021-07-28 23:27:04.036	BEGINNER	0	3	2021-07-28 23:27:04.036	0
\.


--
-- Data for Name: PostClap; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PostClap" (id, "createdAt", "postId", "authorId") FROM stdin;
1	2021-07-28 23:27:17.049	3	4
\.


--
-- Data for Name: PostComment; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PostComment" (id, "createdAt", "updatedAt", body, "authorId", "postId") FROM stdin;
1	2021-07-28 23:24:01.906	2021-07-28 23:24:01.907	Lots of factual errors here buddy	4	1
\.


--
-- Data for Name: PostCommentSubscription; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."PostCommentSubscription" (id, "createdAt", "userId", "postId") FROM stdin;
1	2021-07-28 23:04:46.233	3	1
2	2021-07-28 23:24:01.915	4	1
3	2021-07-28 23:26:34.418	4	2
4	2021-07-28 23:27:04.038	3	3
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
3	1	2
4	1	4
5	2	4
6	3	6
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
2	277	286	Lannister	1	f
3	546	554	Everyone	1	f
5	508	532	who doesn't like a lion?	1	f
\.


--
-- Data for Name: ThreadSubscription; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."ThreadSubscription" (id, "createdAt", "userId", "threadId") FROM stdin;
3	2021-07-28 23:22:56.301	4	2
4	2021-07-28 23:23:06.721	3	3
5	2021-07-28 23:23:11.123	4	3
7	2021-07-28 23:23:40.04	3	5
8	2021-07-28 23:23:47.344	4	5
2	2021-07-28 23:22:34.363	3	2
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
\.


--
-- Data for Name: TopicTranslation; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."TopicTranslation" (id, "uiLanguage", name, "topicId") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."User" (id, name, email, handle, "userRole", bio, "createdAt", "updatedAt", "profileImage", city, country, "stripeCustomerId", "moosendSubscriberId", "lastFourCardNumbers", "cardBrand") FROM stdin;
2	\N	jon@arryn.net	HandyMan	MODERATOR	\N	2021-07-28 21:29:23.535	2021-07-28 21:29:24.175	\N	\N	\N	\N	9b525bfd-a224-4816-b406-209e1f33f216	\N	\N
1	\N	robert@baratheon.net	RobertBaratheon	ADMIN	\N	2021-07-28 21:25:42.74	2021-07-28 21:39:29.281	\N	\N	\N	cus_JwCnTV2oSgERHO	0b6fe694-9298-4aef-b7af-895329b60ed9	NONE	visa
3	\N	j@n.com	jsno	USER	\N	2021-07-28 21:31:53.623	2021-07-28 21:40:49.63	\N	\N	\N	cus_JwCmGeU4Hqiwmn	a010a2ec-6266-42c0-9a54-ce4ee81060cb	NONE	visa
4	\N	gold@gold.gold	TheLannyster	USER	\N	2021-07-28 23:21:51.833	2021-07-28 23:21:52.786	\N	\N	\N	\N	45b510f8-e131-49c5-97f8-c3b2831ab243	\N	\N
\.


--
-- Data for Name: UserBadge; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."UserBadge" (id, type, "createdAt", "userId") FROM stdin;
\.


--
-- Data for Name: UserInterest; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."UserInterest" (id, "userId", "topicId", "createdAt") FROM stdin;
\.


--
-- Data for Name: _UserFollows; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public."_UserFollows" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: robin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
901cc4e4-a73b-4065-ad97-9207f3fdd4e1	4afca9733197a4e23e7d00aca95eb4da9527ed1a091265719c2a4358388	2021-07-28 16:11:39.589229-05	20210507181000_re_init	\N	\N	2021-07-28 16:11:39.393639-05	1
130a2a10-da8b-4601-b7b6-376655eedb6f	b5c9e4501526233cb36890bd13f3518ea1b3df52ba5577fd1dfa9c22158dd8	2021-07-28 16:11:39.593364-05	20210507182525_add_word_count_col_to_posts	\N	\N	2021-07-28 16:11:39.590422-05	1
52db6040-d9b9-4d11-aeb1-f0e4f6ac6706	f98897fc9b261c4fa1d7ff6f3327d15b63bb4fef42c6ea3fee75213337e8	2021-07-28 16:11:39.602131-05	20210507185054_remove_page_view_table	\N	\N	2021-07-28 16:11:39.594562-05	1
24b9741f-041c-46c4-85c2-51b904fee6d1	6ab7714e9f8b59f8a9f87faa56714b13331705499a90a64ddabe3d503e3269	2021-07-28 16:11:39.609883-05	20210525114631_payments_related_improvements	\N	\N	2021-07-28 16:11:39.603404-05	1
f73a8aa6-802a-4633-98ce-5d7bdab04ffa	a3b7a53aeb2327e3c12cb849ed2b8b422f51bda8326cd86ba60147f5516	2021-07-28 16:11:39.621742-05	20210529142147_image_data_redesign	\N	\N	2021-07-28 16:11:39.611297-05	1
9c9a667f-e64f-40db-8a55-d013c1d1e54f	b042e874725060d6c86831e341cd3a8584680711055d73236f38689d7a1d19	2021-07-28 16:11:39.632434-05	20210605143036_like_to_clap	\N	\N	2021-07-28 16:11:39.622556-05	1
23e60130-7af4-4999-bf07-2fadb4986bf8	f650d7d96fd34f2c47ab613179794ef4822b314dc1b81c392f710e176cb7d6d	2021-07-28 16:11:39.634792-05	20210605145217_post_clap_notification	\N	\N	2021-07-28 16:11:39.633386-05	1
f77a3292-cebe-42b1-b9f4-5e9b635969ce	2e601110329736a8bd2452a4356b1dc685627e183908657ed3d974b3efebf19	2021-07-28 16:11:39.639952-05	20210605150936_clap_pending_notification	\N	\N	2021-07-28 16:11:39.635756-05	1
d76dd2bd-29b2-46d9-8e4c-be27b9877cec	90297866a4678787fa37a835b59496df6cd323a6d4521a75f49d036fc6785de	2021-07-28 16:11:39.643329-05	20210609141814_add_post_bumping	\N	\N	2021-07-28 16:11:39.6408-05	1
16c0b293-664c-40fc-94f3-3dcab6f70769	c3e298c1da2296fb8d48474f78220b6d86ce3b47f1a6ee99bc83c13c822ad7c	2021-07-28 16:11:39.646181-05	20210612192514_add_odradek_and_necromancer_badges	\N	\N	2021-07-28 16:11:39.644316-05	1
\.


--
-- Name: Auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Auth_id_seq"', 4, true);


--
-- Name: CommentThanks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."CommentThanks_id_seq"', 1, true);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 4, true);


--
-- Name: HeadlineImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."HeadlineImage_id_seq"', 3, true);


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

SELECT pg_catalog.setval('public."LanguageRelation_id_seq"', 3, true);


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
-- Name: PendingNotification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PendingNotification_id_seq"', 7, true);


--
-- Name: PostClap_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostClap_id_seq"', 1, true);


--
-- Name: PostCommentSubscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostCommentSubscription_id_seq"', 4, true);


--
-- Name: PostCommentThanks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostCommentThanks_id_seq"', 1, false);


--
-- Name: PostComment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostComment_id_seq"', 1, true);


--
-- Name: PostTopic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."PostTopic_id_seq"', 6, true);


--
-- Name: Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Post_id_seq"', 3, true);


--
-- Name: Prompt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Prompt_id_seq"', 1, false);


--
-- Name: SocialMedia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."SocialMedia_id_seq"', 1, false);


--
-- Name: ThreadSubscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."ThreadSubscription_id_seq"', 8, true);


--
-- Name: Thread_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Thread_id_seq"', 5, true);


--
-- Name: TopicTranslation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."TopicTranslation_id_seq"', 1, false);


--
-- Name: Topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."Topic_id_seq"', 6, true);


--
-- Name: UserBadge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."UserBadge_id_seq"', 1, false);


--
-- Name: UserInterest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."UserInterest_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: robin
--

SELECT pg_catalog.setval('public."User_id_seq"', 4, true);


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
-- Name: PendingNotification PendingNotification_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PendingNotification"
    ADD CONSTRAINT "PendingNotification_pkey" PRIMARY KEY (id);


--
-- Name: PostClap PostClap_pkey; Type: CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostClap"
    ADD CONSTRAINT "PostClap_pkey" PRIMARY KEY (id);


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
-- Name: Auth.userId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "Auth.userId_unique" ON public."Auth" USING btree ("userId");


--
-- Name: CommentThanks.authorId_commentId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "CommentThanks.authorId_commentId_unique" ON public."CommentThanks" USING btree ("authorId", "commentId");


--
-- Name: Language.name_dialect_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "Language.name_dialect_unique" ON public."Language" USING btree (name, dialect);


--
-- Name: LanguageLearning.userId_languageId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "LanguageLearning.userId_languageId_unique" ON public."LanguageLearning" USING btree ("userId", "languageId");


--
-- Name: LanguageNative.userId_languageId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "LanguageNative.userId_languageId_unique" ON public."LanguageNative" USING btree ("userId", "languageId");


--
-- Name: LanguageRelation.userId_languageId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "LanguageRelation.userId_languageId_unique" ON public."LanguageRelation" USING btree ("userId", "languageId");


--
-- Name: MembershipSubscription.stripeSubscriptionId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "MembershipSubscription.stripeSubscriptionId_unique" ON public."MembershipSubscription" USING btree ("stripeSubscriptionId");


--
-- Name: MembershipSubscription.userId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "MembershipSubscription.userId_unique" ON public."MembershipSubscription" USING btree ("userId");


--
-- Name: Post.headlineImageId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "Post.headlineImageId_unique" ON public."Post" USING btree ("headlineImageId");


--
-- Name: PostClap.authorId_postId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "PostClap.authorId_postId_unique" ON public."PostClap" USING btree ("authorId", "postId");


--
-- Name: PostCommentSubscription.userId_postId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "PostCommentSubscription.userId_postId_unique" ON public."PostCommentSubscription" USING btree ("userId", "postId");


--
-- Name: PostCommentThanks.authorId_postCommentId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "PostCommentThanks.authorId_postCommentId_unique" ON public."PostCommentThanks" USING btree ("authorId", "postCommentId");


--
-- Name: PostTopic.postId_topicId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "PostTopic.postId_topicId_unique" ON public."PostTopic" USING btree ("postId", "topicId");


--
-- Name: SocialMedia.userId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "SocialMedia.userId_unique" ON public."SocialMedia" USING btree ("userId");


--
-- Name: ThreadSubscription.userId_threadId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "ThreadSubscription.userId_threadId_unique" ON public."ThreadSubscription" USING btree ("userId", "threadId");


--
-- Name: TopicTranslation.uiLanguage_topicId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "TopicTranslation.uiLanguage_topicId_unique" ON public."TopicTranslation" USING btree ("uiLanguage", "topicId");


--
-- Name: User.email_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "User.email_unique" ON public."User" USING btree (email);


--
-- Name: User.handle_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "User.handle_unique" ON public."User" USING btree (handle);


--
-- Name: UserBadge.userId_type_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "UserBadge.userId_type_unique" ON public."UserBadge" USING btree ("userId", type);


--
-- Name: UserInterest.userId_topicId_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "UserInterest.userId_topicId_unique" ON public."UserInterest" USING btree ("userId", "topicId");


--
-- Name: _UserFollows_AB_unique; Type: INDEX; Schema: public; Owner: robin
--

CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON public."_UserFollows" USING btree ("A", "B");


--
-- Name: _UserFollows_B_index; Type: INDEX; Schema: public; Owner: robin
--

CREATE INDEX "_UserFollows_B_index" ON public."_UserFollows" USING btree ("B");


--
-- Name: Auth Auth_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Auth"
    ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CommentThanks CommentThanks_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."CommentThanks"
    ADD CONSTRAINT "CommentThanks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CommentThanks CommentThanks_commentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."CommentThanks"
    ADD CONSTRAINT "CommentThanks_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_threadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES public."Thread"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LanguageLearning LanguageLearning_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageLearning"
    ADD CONSTRAINT "LanguageLearning_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES public."Language"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LanguageLearning LanguageLearning_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageLearning"
    ADD CONSTRAINT "LanguageLearning_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LanguageNative LanguageNative_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageNative"
    ADD CONSTRAINT "LanguageNative_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES public."Language"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LanguageNative LanguageNative_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageNative"
    ADD CONSTRAINT "LanguageNative_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LanguageRelation LanguageRelation_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageRelation"
    ADD CONSTRAINT "LanguageRelation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES public."Language"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LanguageRelation LanguageRelation_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."LanguageRelation"
    ADD CONSTRAINT "LanguageRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MembershipSubscriptionInvoiceItem MembershipSubscriptionInvoiceItem_invoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscriptionInvoiceItem"
    ADD CONSTRAINT "MembershipSubscriptionInvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public."MembershipSubscriptionInvoice"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MembershipSubscriptionInvoice MembershipSubscriptionInvoice_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscriptionInvoice"
    ADD CONSTRAINT "MembershipSubscriptionInvoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MembershipSubscription MembershipSubscription_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."MembershipSubscription"
    ADD CONSTRAINT "MembershipSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
    ADD CONSTRAINT "PendingNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostClap PostClap_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostClap"
    ADD CONSTRAINT "PostClap_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostClap PostClap_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostClap"
    ADD CONSTRAINT "PostClap_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostCommentSubscription PostCommentSubscription_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentSubscription"
    ADD CONSTRAINT "PostCommentSubscription_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostCommentSubscription PostCommentSubscription_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentSubscription"
    ADD CONSTRAINT "PostCommentSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostCommentThanks PostCommentThanks_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentThanks"
    ADD CONSTRAINT "PostCommentThanks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostCommentThanks PostCommentThanks_postCommentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostCommentThanks"
    ADD CONSTRAINT "PostCommentThanks_postCommentId_fkey" FOREIGN KEY ("postCommentId") REFERENCES public."PostComment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PostComment PostComment_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostComment"
    ADD CONSTRAINT "PostComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostComment PostComment_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostComment"
    ADD CONSTRAINT "PostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostTopic PostTopic_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostTopic"
    ADD CONSTRAINT "PostTopic_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostTopic PostTopic_topicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."PostTopic"
    ADD CONSTRAINT "PostTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Post Post_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Post Post_headlineImageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_headlineImageId_fkey" FOREIGN KEY ("headlineImageId") REFERENCES public."HeadlineImage"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Post Post_languageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES public."Language"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Prompt Prompt_topicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Prompt"
    ADD CONSTRAINT "Prompt_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SocialMedia SocialMedia_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."SocialMedia"
    ADD CONSTRAINT "SocialMedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ThreadSubscription ThreadSubscription_threadId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadSubscription"
    ADD CONSTRAINT "ThreadSubscription_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES public."Thread"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ThreadSubscription ThreadSubscription_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."ThreadSubscription"
    ADD CONSTRAINT "ThreadSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Thread Thread_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."Thread"
    ADD CONSTRAINT "Thread_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TopicTranslation TopicTranslation_topicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."TopicTranslation"
    ADD CONSTRAINT "TopicTranslation_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserBadge UserBadge_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."UserBadge"
    ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserInterest UserInterest_topicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."UserInterest"
    ADD CONSTRAINT "UserInterest_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topic"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserInterest UserInterest_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: robin
--

ALTER TABLE ONLY public."UserInterest"
    ADD CONSTRAINT "UserInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- PostgreSQL database dump complete
--

