import 'simplebar/src/simplebar.css';
import RtlLayout from 'apps/components/RtlLayout';
import Settings from 'apps/components/settings';
import ThemePrimaryColor from 'apps/components/ThemePrimaryColor';
import TopProgressBar from 'apps/components/TopProgressBar';
import { SettingsProvider } from 'apps/contexts/SettingsContext';
import ThemeConfig from 'apps/theme';
import { useApollo } from 'lib/apollo';
import Head from 'next/head';
import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';

// ----------------------------------------------------------------------

export default function MyApp({ Component, pageProps }) {
   const apolloClient = useApollo(pageProps);

   useEffect(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
         jssStyles.parentElement.removeChild(jssStyles);
      }
   }, []);

   return (
      <ApolloProvider client={apolloClient}>
         <SettingsProvider>
            <ThemeConfig>
               <ThemePrimaryColor>
                  <RtlLayout>
                     {/* <NotistackProvider> */}
                     <Settings />
                     <Head>
                        <meta
                           name="viewport"
                           content="width=device-width, initial-scale=1, shrink-to-fit=no"
                        />
                     </Head>
                     <TopProgressBar />
                     <Component {...pageProps} />
                     {/* </NotistackProvider> */}
                  </RtlLayout>
               </ThemePrimaryColor>
            </ThemeConfig>
         </SettingsProvider>
      </ApolloProvider>
   );
}
