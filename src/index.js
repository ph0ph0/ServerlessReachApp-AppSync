import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';

//NOTE: We must use both ApolloProviders from both libraries
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { client } from './clientConfig'

const WithProvider = () => (
  <ApolloProvider client= {client} >
    <ApolloHooksProvider client = {client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));

//OLD client before mutations hang
// const client = new AWSAppSyncClient( {
//   url: awsmobile.aws_appsync_graphqlEndpoint,
//   region: awsmobile.aws_appsync_region,
//   auth: {
//     type: awsmobile.aws_appsync_authenticationType,
//     apiKey: awsmobile.aws_appsync_apiKey
//   }
// })

//NOTE:
//react-apollo@2.5.8 requires a peer of apollo-client@^2.6.3 but none is installed. You must install peer dependencies yourself.