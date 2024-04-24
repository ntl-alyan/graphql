/**
 * @author: Alyan Quddoos
 * @description: This is integration of Apollo Client for the GraphQL. 
 * @datetime :24-April-2024
 */

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3016/graphql',
  cache: new InMemoryCache(),
});

export default client;
