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
