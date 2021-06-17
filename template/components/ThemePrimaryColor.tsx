import { useMemo } from 'react';
import { FC } from 'react';
import { alpha, createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles';
import useSettings from '../hooks/useSettings';
import componentsOverride from '../theme/overrides';

// ----------------------------------------------------------------------

interface ThemePrimaryColorProps {
   children: JSX.Element | JSX.Element;
}

// ----------------------------------------------------------------------

const ThemePrimaryColor: FC<ThemePrimaryColorProps> = ({ children }) => {
   const outerTheme = useTheme();
   const { setColor } = useSettings();

   const themeOptions = useMemo(
      () => ({
         ...outerTheme,
         palette: {
            ...outerTheme.palette,
            primary: setColor
         },
         customShadows: {
            ...outerTheme.customShadows,
            primary: `0 8px 16px 0 ${alpha(setColor.main, 0.24)}`
         }
      }),
      [setColor, outerTheme]
   );

   const theme = createTheme(themeOptions);
   theme.components = componentsOverride(theme);

   return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemePrimaryColor;
