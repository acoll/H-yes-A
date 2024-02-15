# H-yes-A

## Introduction

This is a simple Remix.run app that fetches data to display in a table. I used Vercel's vo.dev to generate the component for the table to quickly get a decent looking table (mainly because I wanted an excuse to try out shadcn and v0).

## Development

From your terminal:

```sh
npm install
npm run dev

```

## TODO / Improvements

- Better handle loading data errors
  - what if the API is down?
  - what if the API data shape changes?
- `logic.ts` has a bunch of hard-coded values that could be moved to config or pulled from the API
- Add a loading state
