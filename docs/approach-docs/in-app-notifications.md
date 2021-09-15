# Approach Doc - In App Notifications System

## Background & Rationale

Until now, we have relied on our Daily Digest Email to notify users of activity. This has proved to work great for that purpose of a daily breakdown & summary, but there's no question that many users want and need much quicker and more user-friendly notification of when something relevant happens - as we have seen some users commenting back and forth continuously in quite rapid succession for hours - thus the need for an in-app notifications system.

After some initial discussion, our current thought is that this does not need to be instantaneous, due to added design, architecture, and infrastructure complexity, along with - above all - the potential scaling of cost to run such a system relative to what we feel is a perfectly good alternative: a system based on polling, though we have yet to determine exactly what the optimal amount of time will be. This may require some guess-work for the initial release and then getting user feedback, or perhaps soliciting that during development.

This system should be incredibly easy for users to access within the app and should attract their attention without being too disruptive. To that end, we've also decided to "collect" notifications of the same type to reduce the number of items in their feed: so for example "you have 6 unread messages" or "you received 13 comments on post X".

At some point, we will want this system to be configurable by the user, but in order to keep this already large and complex project as simple as possible, we should do that as a separate project and therefore this first iteration should be as "general" as possible and optimize for behaviour that is likely to be helpful to most people and least likely to potentially be disruptive or undesireable. For example, some people might prefer to be notified separately for each individual notification item, but this is likely to be disruptive to a large number of people (along with taking up a lot of UI space) and thus the decision to group similar items together.

## Terminology

- Grouping 

## Non-Goals

- Instantaneous notifications (web sockets)
- Building a highly configurable system
- Not for recommendations (for now)


## Product Requirements

- Very easy to access & intuitive to navigate
- Easy to find but not necessarily distracting
- Ideally, this should feel like an instantaneous system to users (it should not leave them wondering if something has happened)
- Should handle notifying users of anything that we think most users would feel is relevant
  - new feedback comment in a thread they are subscribed to (separate user's posts vs. other users' posts?)
  - new post comment (same open question as above)
    - These will be rolled together by post
  - claps 👏🏼 (also grouped)
  - new followers (click to profile)
- (opt-in on interaction with toggle) browser notifications
- Leverage tab title text (or favicon)
- Link targets
  - deep linking
    - Nested notification UI
- Visal placement
  - Desktop: sidebar + make it scrollable (overlay)
  - Mobile: icon in top right > full-screen (overlay)
- Scrolling
  - no infinite scroll or pagination
  - set amount TBD (ex: 50 or 100)
  - user can mark as read > pushes out of list
  - unread always appear at the top

## Technical Requirements

- Optimize for simplest architecture and lowest potential cost as the system scales
- Not a separate service/package
- 

## Technical Design

### System Architecture

...

### Data Model

...

### Interface/API

...

### Business Logic

...

### Migration Strategy

...

## Implementation Details

...

## Future Developments & Improvements

- Once we have Direct Messaging, notificaitons of DMs (grouped as with other notifications in this iteration)
- Once we have @mentioning, notify of that (outside & non-grouped)
- We could perhaps notify users of new posts from people they follow. In order to be minimally disruptive, perhaps simply "there are 14 new posts from Journalers you follow" just to prompt them to check the feed via our "followed journalers" filter action
