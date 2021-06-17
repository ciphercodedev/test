import { Theme as SystemTheme } from '@material-ui/system/createTheme';
import { OverridesPaletteOptions } from '@material-ui/core/styles/createPalette';
import { Shape, ShapeOptions } from './shape';

declare module '@material-ui/core/styles/createTheme' {
   export interface CustomShadows {
      z1: string;
      z8: string;
      z12: string;
      z16: string;
      z20: string;
      z24: string;
      primary: string;
      secondary: string;
      info: string;
      success: string;
      warning: string;
      error: string;
   }

   export interface ThemeOptions {
      shape?: ShapeOptions;
      customShadows?: CustomShadows;
   }

   export interface Theme extends SystemTheme {
      shape: Shape;
      customShadows?: CustomShadows;
      palette: OverridesPaletteOptions;
   }
}
