A
------------------

A simple component to integrate with react router

Highlights:
1) component prototyping with [Storybook](https://github.com/storybooks/storybook)
2) [focused](https://github.com/adriantoine/enzyme-to-json#focused-tests) snapshot testing with [Jest](https://github.com/facebook/jest)


AddressAutocomplete
-------------------

A wrapper component for Google Geocode API

Highlights:

1) strict interfaces with typescript
2) usage of the thirdparty (Google API) typescript definitions for seamless integration
3) integration with redux form is in a separate HOC component, so component can be used separately or inside a redux form
4) use of [redux-saga](https://github.com/redux-saga/redux-saga) for handling side effects

Models
-------------------

Integration with backend API.

A collection of functions to query relational data, normalize data and store in redux store,
a collection of selectors to query data from redux store (inspired by the [Apollo framework](https://www.apollodata.com/))

Highlights:

1) store is [normalized](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html#normalizing-state-shape)
2) works with reactive UI layer (based on [Reselect](https://github.com/reactjs/reselect) library)

Sockets
-------------------

Integration with [Pusher](https://pusher.com/) for real-time traffic.

Highlights:

1) subscribe/unsubscribe to relevant real-time events on specific router state changes
2) refresh subscriptions in case of a page refresh

.circleci
-------------------

Integration with [Circle CI](https://circleci.com/) 2.0 for building, testing, and deployment

Highlights:

1) 3-step deploy to production
2) End-to-end testing, more info on how we do testing please check out my series of articles: [Part 1](https://dashbouquet.com/blog/frontend-development/cypressio-and-docker-the-ultimate-e2e-stack-part-1) and [Part 2](https://dashbouquet.com/blog/frontend-development/cypressio-and-docker-the-ultimate-e2e-stack-part2)