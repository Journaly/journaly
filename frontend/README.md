# Journaly Frontend

## Creating Next.js Pages

When creating a new page, make sure to require a namespace for translations. This ensures that only the translations that are needed are sent along with that page.

```jsx
const MyPage: NextPage = () => {
  /* ... */
}

MyPage.getInitialProps = async () => ({
  // You can create a new namespace for the page, and if you need other ones, just include them
  // in the list, e.g. ['common', 'myPage']
  namespacesRequired: ['myPage'],
})

export default withApollo(MyPage)
```

## Internationalization (i18n)

We use the [next-i18next](https://github.com/isaachinman/next-i18next) library, which is built on top of [react-i18next](https://react.i18next.com/) and [i18next](https://www.i18next.com/).
`next-i18next` primarily helps with serving up translations with SSR.

Translations are stored in JSON files under `public/static/locales/{languageCode}/{namespace}.json`. For example, English translations in the `common` namespace (for shared translations used across many components) are stored in `public/static/locales/en/common.json`.

Config settings are stored in `i18n.js`, where you can see the default language (`en`) and fallbacks. Checkout [the docs](https://github.com/isaachinman/next-i18next#options) for more information.

### Examples

When using translations in a React component, default to using the [useTranslation hook](https://react.i18next.com/latest/usetranslation-hook).

```jsx
import React from 'react'
import { useTranslation } from '../config/i18n'

export function MyComponent() {
  const { t } = useTranslation()

  return <p>{t('homePage.welcomeMessageTitle')}</p>
}
```

## Event Tracking

### Google Analytics

#### Page Views

Page views are handled automatically since we send an event with every route change.

```js
Router.events.on('routeChangeComplete', (url) => trackPageView(url))
```

#### Events

Google Analytics `Events` are used to collect data about interactions with the content, which are measured independently from page loads. These could include downloads, link clicks, or form submissions.

To better understand what data to send along with an `Event` as well as how to name things, read [About Events](https://support.google.com/analytics/answer/1033068), but here is a summary:

When sending an `Event`, the most important values are:

- category
- action
- label (optional, but recommended)
- value (optional)

Example:

```yaml
- Category: 'Videos'
- Action: 'Play'
- Label: 'Learning with Journaly'
```

For categories, make sure that the name is:

- broad enough to encompass multiple actions
- plural, e.g. `Users`, `Videos`; however, something like `Scroll Tracking` is also fine

For actions:

- Make sure that they are relevant to the report data. If many catagories have a generic `Click` action, then the report for the `Click` action doesn't provide very useful information.
- You can use action names globally to aggregate or distinguish user interaction. So, `Action: Play - Mac Chrome` and `Action: Play - Windows Chrome` could distinguish between two different video players.
- They do not always have to mean "action." Here is an example where the action is the downloaded file extension: `Category: Downloads, Action: PDF, Label: How to use Journaly`.

For labels:

- Even though they are optional, it's highly recommended to add it to an `Event`.
- They are generally the specific thing that is being tracked (video name, file path).
- 🚨 Note: do not send personally identifiable information like emails and personal names.

Another useful value you can send, is `nonInteraction`. This affects whether that `Event` counts toward the page's bounce rate.

#### How to use Events in the code

Event-tracking functions are defined in `/events/*`. Each file within events corresponds to a category, and each function tracks a specific action.
For example, to send an `Event` of the type `{ category: 'Users', action: 'Create Account' }`, you'd do the following:

```js
import { trackCreateAccount } from '../../events/users'

trackCreateAccount()
```

That's it! This ensures that the category and action names are always the same, as slight deviations in spelling generate additional data reports. Furthermore, every new category and action will require a new file and/or function, which makes sure that catagory and action names are carefully thought about and constructed.

#### Debugging

If you need to test that events are being sent, use the [Google Analytics Debugger chrome extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna). This will show events that are logged in the Chrome DevTools.

## Images

### SVGs

SVGs are componentized with `svgr`. To import an SVG into the repo, run `npm run svgr` and follow the prompts. This script will take a `path/to/file.svg` and create a new `<SvgName>.tsx` React component.

Now your new SVG component can take props for colors, sizes, etc. Check out the `components/Icons/` directory for examples.

### JPGs and PNGs

Download [ImageOptim](https://imageoptim.com/mac) and run your `.jpg` and `.png` files through it before commiting them to the repo. After you optimize them, place them in the `public/images/` directory or any of the relevant subdirectories.
