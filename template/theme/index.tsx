import { useMemo } from 'react';
import { FC } from 'react';
import { CssBaseline } from '@material-ui/core';
import {
   createTheme,
   StyledEngineProvider,
   ThemeOptions,
   ThemeProvider
} from '@material-ui/core/styles';
import useSettings from '../hooks/useSettings';
import breakpoints from './breakpoints';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import shape from './shape';
import typography from './typography';

// ----------------------------------------------------------------------

interface ThemeConfigProps {
   children: JSX.Element | JSX.Element[];
}

// ----------------------------------------------------------------------

const ThemeConfig: FC<ThemeConfigProps> = ({ children }) => {
   const { themeMode, themeDirection } = useSettings();
   const isLight = themeMode === 'light';

   const themeOptions = useMemo<ThemeOptions>(
      () => ({
         palette: isLight ? { ...palette.light, mode: 'light' } : { ...palette.dark, mode: 'dark' },
         shape,
         typography,
         breakpoints,
         direction: themeDirection,
         shadows: isLight ? shadows.light : shadows.dark,
         customShadows: isLight ? customShadows.light : customShadows.dark
      }),
      [isLight, themeDirection]
   );

   const theme = createTheme(themeOptions);
   theme.components = componentsOverride(theme);

   return (
      <StyledEngineProvider injectFirst>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            {children}
         </ThemeProvider>
      </StyledEngineProvider>
   );
};

export default ThemeConfig;
