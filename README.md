# H-yes(but sometimes no)-A

## Introduction

This is a simple Remix.run app that fetches data to display in a table. I used Vercel's vo.dev to generate the component for the table to quickly get a decent looking table, mainly because I wanted an excuse to try out shadcn and v0. I recommend checking it out, it was surprisingly easy, fast and the output was great.

## Development

First create a .env and put the API_URL and API_KEY in it.

From your terminal:

```sh
npm install
npm run dev

```

## TODO / Improvements

- Better handle data loading errors
  - what if the API is down?
  - what if the API data shape changes?
- `logic.ts` has a bunch of hard-coded values that could be moved to config or pulled from the API
- Add a loading state
