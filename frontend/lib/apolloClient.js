import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

//Source: https://medium.com/@lucasmcgartland/refreshing-token-based-authentication-with-apollo-client-2-0-7d45c20dc703
// Create customFetch function for handling re-authorization
// This customFetch (or any fetch you pass to the link) gets uri and options as arguments. We'll use those when we actually execute a fetch.
const customFetch = (uri, options) => {
  // In our application, the refresh token is stored in a redux store
  // We create an instance of the state here so we can get the refresh token later in our request
  //let state = store.getState()
  //Change to local storage
  let state = JSON.parse(localStorage.getItem("user")).login.access_token;

  // This reference to the refreshingPromise will let us check later on if we are executing getting the refresh token.
  this.refreshingPromise = null;

  // Create initial fetch, this is what would normally be executed in the link without the override
  var initialRequest = fetch(uri, options);

  // The apolloHttpLink expects that whatever fetch function is used, it returns a promise.
  // Here we return the initialRequest promise
  return initialRequest
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // We should now have the JSON from the response of initialRequest
      // We check that we do and look for errors from the GraphQL server
      // If it has the error 'User is not logged in' (that's our implementation of a 401) we execute the next steps in the re-auth flow
      if (
        json &&
        json.errors &&
        json.errors[0] &&
        json.errors[0].message === "User is not logged in."
      ) {
        if (!this.refreshingPromise) {
          // Grab the refresh token from the store
          var refresh_token = state.account.loginData.refresh_token;
          // Grab the client_id from our config
          var client_id = Config.REACT_APP_CLIENT_ID;
          // Create the address to grab a new token from
          // This endpoint may vary based on your Oauth server
          var address =
            Config.REACT_APP_SERVER_ADDRESS +
            "/o/token/?grant_type=refresh_token&refresh_token=" +
            refresh_token +
            "&client_id=" +
            client_id;

          // Execute the re-authorization request and set the promise returned to this.refreshingPromise
          this.refreshingPromise = fetch(address, { method: "POST" }).then(
            (refresh_token_repsonse) => {
              if (refresh_token_repsonse.ok) {
                return refresh_token_repsonse.json().then((refreshJSON) => {
                  // Save the new refresh token to your store or wherever you are keeping it
                  // saveRefreshToken(refreshJSON.refresh_token)

                  // Return the new access token as a result of the promise
                  return refreshJSON.access_token;
                });
              } else {
                // If the re-authorization request fails, handle it here
                // You can log user out, or display some sort of session has ended alert
                // logUserOut()
              }
            }
          );
        }
        return this.refreshingPromise.then((newAccessToken) => {
          // Now that the refreshing promise has been executed, set it to null
          this.refreshingPromise = null;

          // Set the authorization header on the original options parameter to the new access token we got
          options.headers.authorization = `Bearer ${newAccessToken}`;
          // Return the promise from the new fetch (which should now have used an active access token)
          // If the initialRequest had errors, this fetch that is returned below is the final result.
          return fetch(uri, options);
        });
      }
      // If there were no errors in the initialRequest, we need to repackage the promise and return it as the final result.
      var result = {};
      result.ok = true;
      result.json = () =>
        new Promise(function (resolve, reject) {
          resolve(json);
        });
      return result;
    });
};

let apolloClient;

const httpLink = new HttpLink({
  uri: "http://127.0.0.1:8000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let token = "";
  if (user) {
    token = JSON.parse(localStorage.getItem("user")).login.access_token;
  }
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = initializeApollo(initialState);
  return store;
}
