import { InMemoryCache } from '@apollo/client/cache';

export default new InMemoryCache({
   addTypename: false,
   typePolicies: {
      Query: {
         fields: {}
      }
   }
});
