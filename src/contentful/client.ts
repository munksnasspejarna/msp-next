import { ApolloClient, InMemoryCache } from '@apollo/client';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID env variable undefined');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN env variable undefined');
}

if (!process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_PREVIEW_ACCESS_TOKEN env variable undefined');
}

const graphqlUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const contentfulClient = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
});

const previewClient = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
  },
});

export function getClient(preview: boolean) {
  return preview ? previewClient : contentfulClient;
}
