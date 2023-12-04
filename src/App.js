import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import CountryList from './CountryList';

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h1>List of Countries</h1>
      <CountryList />
    </div>
  </ApolloProvider>
);

export default App;
