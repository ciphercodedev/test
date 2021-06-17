import { createUploadLink } from 'apollo-upload-client';
import deepmerge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';
import { ApolloClient, ApolloLink, from, NormalizedCacheObject } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import cache from './cache';

// ----------------------------------------------------------------------

type ApolloClientState = ApolloClient<NormalizedCacheObject> | undefined;

// ----------------------------------------------------------------------

export let apolloClient: ApolloClientState;
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const isBrowser = process.browser;

const createApolloClient = () => {
   const requestLink = new ApolloLink((operation, forward) => {
      operation.setContext({
         headers: {
            headers: {
               authorization: ''
            }
         }
      });

      return forward(operation);
   });

   const uploadLink = createUploadLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
      credentials: 'include'
   });

   const errorLink = onError(() => {});

   return new ApolloClient({
      ssrMode: !isBrowser,
      link: from([requestLink, errorLink, uploadLink]),
      cache
   });
};

export const initializeApollo = (initialState = null) => {
   const _apolloClient = apolloClient ?? createApolloClient();

   if (initialState) {
      const existingCache = _apolloClient.extract();

      const data = deepmerge(initialState, existingCache, {
         arrayMerge: (destinationArray, sourceArray) => [
            ...sourceArray,
            ...destinationArray.filter((destination) =>
               sourceArray.every((source) => !isEqual(destination, source))
            )
         ]
      });

      _apolloClient.cache.restore(data);
   }

   if (!isBrowser) {
      return _apolloClient;
   }

   if (!apolloClient) {
      apolloClient = _apolloClient;
   }

   return _apolloClient;
};

export const addApolloState = (client: ApolloClientState, pageProps: any) => {
   if (pageProps?.props) {
      pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
   }

   return pageProps;
};

export const useApollo = (pageProps: any) => {
   const state = pageProps[APOLLO_STATE_PROP_NAME];
   const store = useMemo(() => initializeApollo(state), [state]);
   return store;
};
