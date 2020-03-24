# Journaly Frontend Style Guide

## React & TypeScript

At Journaly we use TypeScript on both the frontend and backend, which also means that we use it with our React code. This is a simple guide to help you understand the general style and philosophy that we follow.

### Interfaces to describe objects

This is a standard practice in the TypeScript community, but we typically model our objects with [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html). This allows for great type safety, superb autocompletion, and delightfully readable code once you get the hang of it.

### Functional Components First

We basically always use functional components in our React code, and denote them as such with the following TypeScript notation: `const MyComponent: React.FC = () => {}`

### Optional Chaining over Logical && Operator

We use TypeScript's optional chaining syntax for situations when you aren't sure if a certain property will be defined.

Let's say we're fetching user data and we're not sure if the `job` property will be defined, perhaps because they don't have a job, or the data hasn't finished coming in yet:

```
const fetchedUserData = {
  id: '1',
  name: 'Max',
  job: { title: 'CEO' },
}

console.log(fetchedUserData?.job?.title)
```

The above `console.log` statement allows us to say, only IF there is `fetchedUserData`, then try to access the `job` property, and only IF that property is defined, print the job `title`.

Rather than: `console.log(fetchedUserData && fetchedUserData.job && fetchedUserData.job.title))`
