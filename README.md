# Construkt

## Stack

- TypeScript;
- Node;
- React with Styled Components;
- Cypress;
- Nx.

## Description

Simple REST API (although it currently only utilizes GET) with no persistence
whatsoever. Consumed by a simple React-based application. It utilized what I
consider to be good practices, like:

- E2E tests covering frontend;
- Unit and integration tests covering backend;
- Globally accessible public contracts;
- Most operations kept as pure functions in a separate space;
- Clear routing;
- Separated UI (although if another FE project would appear, I would move it to
  a separate package);
- Automatic code review looking for long or overly complex functions, linting
  errors etc;
- Meaningful commits written in unified style.

You may notice that there are not much going on there. The task was simple,
create an API that serves static data over HTTP. So no real point in introducing
large frameworks like Nest or Feathers. Same for frontend, some view components,
really just one stateful component (with reducer instead of `useState`). Nothing
more to it. Also, there are no tests on the frontend – initially I wanted to
expand this and use MSW, but after a while, I've realized that there is nothing
to test, really. All I could test is the reducer, but I've decided not to, given
the fact that I didn't really have the time. Also, I wanted to make a hook for
fetching data, but then again — no point, for just one fetch.

Project is created as a monorepo orchestrated by Nx. This is my first usage of
this tool in the wild, so I am assuming I've made at least a few mistakes, but
it was actually quite smooth.

## TODO

- Automatically generate OpenAPI documentation;
- Generate REST client from OpenAPI;
- Add logging (at least for errors);
- Introduce CI/CD pipeline
  (currently there is only Netlify hooked up for frontend.
  Heroku cannot connect to GitHub as of 2022-05-03, 10:25.
  Vercel requires different config that I have);
- Add actual versioning;
- Introduce persistence and backoffice for maintaining items;
- Implement cascading filtering on backend;
- Implement joined filters on frontend;
- Introduce CHANGELOG document;
- Think about scaling.

