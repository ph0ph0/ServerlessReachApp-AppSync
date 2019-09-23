import awsmobile from './aws-exports';
//import AWSAppSyncClient from "aws-appsync";
import { createAppSyncLink } from 'aws-appsync'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: awsmobile.aws_appsync_graphqlEndpoint
})

const awsLink = createAppSyncLink({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    apiKey: awsmobile.aws_appsync_apiKey
  }
})

export const client = new ApolloClient({
    link: awsLink.concat(httpLink),
    cache: new InMemoryCache()
  })