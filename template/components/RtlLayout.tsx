import { create } from 'jss';
import rtl from 'jss-rtl';
import { useEffect } from 'react';
import { FC } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useTheme } from '@material-ui/core/styles';
import { jssPreset, StylesProvider } from '@material-ui/styles';

// ----------------------------------------------------------------------

interface RtlLayoutProps {
   children: JSX.Element | JSX.Element[];
}

// ----------------------------------------------------------------------

const RtlLayout: FC<RtlLayoutProps> = ({ children }) => {
   const theme = useTheme();

   const jss = create({
      plugins: [...jssPreset().plugins, rtl()]
   });

   useEffect(() => {
      document.dir = theme.direction;
   }, [theme.direction]);

   const cache = createCache({
      key: theme.direction === 'rtl' ? 'rtl' : 'css',
      prepend: true,
      //@ts-ignore
      stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : []
   });

   cache.compat = true;

   return (
      <CacheProvider value={cache}>
         <StylesProvider jss={jss}>{children}</StylesProvider>
      </CacheProvider>
   );
};

export default RtlLayout;
