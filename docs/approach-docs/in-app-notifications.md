# Approach Doc - In App Notifications System

### Background & Rationale

Until now, we have relied on our Daily Digest Email to notify users of activity. This has proved to work great for that purpose of a daily breakdown & summary, but there's no question that many users want and need much quicker and more user-friendly notification of when something relevant happens - as we have seen some users commenting back and forth continuously in quite rapid succession for hours - thus the need for an in-app notifications system.

After some initial discussion, our current thought is that this does not need to be instantaneous, due to added design, architecture, and infrastructure complexity, along with - above all - the potential scaling of cost to run such a system relative to what we feel is a perfectly good alternative: a system based on polling, though we have yet to determine exactly what the optimal amount of time will be. This may require some guess-work for the initial release and then getting user feedback, or perhaps soliciting that during development.

This system should be incredibly easy for users to access within the app and should attract their attention without being too disruptive. To that end, we've also decided to "collect" notifications of the same type to reduce the number it items in their feed: so for example "you have 6 unread messages" or "you received 13 comments on post X".

At some point, we will want this system to be configurable by the user, but in order to keep this already large and complex project as simple as possible, we should do that as a separate project and therefore this first iteration should be as "general" as possible and optimize for behaviour that is likely to be helpful to most people and least likely to potentially be disruptive or undesireable. For example, some people might prefer to be notified separately for each individual notification item, but this is likely to be disruptive to a large number of people (along with taking up a lot of UI space) and thus the decision to group similar items together.

### Terminology

...

### Non-Goals

...


## Product Requirements

...

## Technical Requirements

...

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

...
