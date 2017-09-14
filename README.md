
AddressAutocomplete
-------------------

A wrapper component for google geocode API

Hightlighs:

1) strict typing with typescript
2) use of third party (google api) typescript definitions for seamless integration
3) integration with redux form is in a seperate HOC component, so component can be used seperately or inside a redux form

Models
-------------------

Integration with backend API.

A collection of functions to query relational data, normalize data and store in redux store,
a collection of selectors to query data from redux store (inspired by the Apollo framework)

Highlights:

1) normalized store
2) works with reactive UI layer (based on the use reselect)

Sockets
-------------------

Integration with Pusher for realtime traffic.

Hightlighs:

1) subscribe/unsubscribe to relevant realtime events on specific router state chages
2) refresh subscribptions in case of page refresh

.circleci
-------------------

Integration with Circle CI 2.0 for building, testing and deployment

Highlights:

1) 3-step deploy to production
2) End-to-end testing, more info on how we do testing please checkout: [here](https://dashbouquet.com/blog/frontend-development/cypressio-and-docker-the-ultimate-e2e-stack-part-1) and [here](https://dashbouquet.com/blog/frontend-development/cypressio-and-docker-the-ultimate-e2e-stack-part2)