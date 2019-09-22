import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';

//NOTE: here we are using apollo provider from react hooks, not from react apollo!
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'

import awsmobile from './aws-exports';

const client = new AWSAppSyncClient( {
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    apiKey: awsmobile.aws_appsync_apiKey
  }
})

//NOTE:
//react-apollo@2.5.8 requires a peer of apollo-client@^2.6.3 but none is installed. You must install peer dependencies yourself.

//Here we are showing our own loading component (cunt face)

const WithProvider = () => (
  <ApolloProvider client= {client} >
    <ApolloHooksProvider client = {client}>
      <Rehydrated
        render = {({rehydrated}) => (
          rehydrated ? <App /> : <h1>CUNTFACE</h1>
        )}
      />
    </ApolloHooksProvider>
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));