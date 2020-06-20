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

For simple interpolation, follow this pattern:

```json
{
  "title": "{{user}}'s posts"
}
```

```jsx
import React from 'react'
import { useTranslation } from '../config/i18n'

export function MyComponent() {
  const { t } = useTranslation()
  const user = 'Jon Snow'

  return <h1>{t('title', { user })}</h1>
}
```
