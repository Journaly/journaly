# Journaly Frontend Style Guide

## React & TypeScript

At Journaly we use TypeScript on both the frontend and backend, which also means that we use it with our React code. This is a simple guide to help you understand the general style and philosophy that we follow.

### Interfaces to describe objects

This is a standard practice in the TypeScript community, but we typically model our objects with [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html). This allows for great type safety, superb autocompletion, and delightfully readable code once you get the hang of it.

### Functional Components First

We basically always use functional components in our React code, and denote them as such with the following TypeScript notation: `const MyComponent: React.FC = () => {}`
