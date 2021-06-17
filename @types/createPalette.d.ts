import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
   interface CustomTypeBackground {
      neutral?: string;
   }

   export interface GreyColorPartial extends ColorPartial {
      0?: string;
      500_8?: string;
      500_12?: string;
      500_16?: stirng;
      500_24?: stirng;
      500_32?: stirng;
      500_48?: stirng;
      500_56?: stirng;
      500_80?: stirng;
   }

   export interface GradientPaletteOpions {
      primary?: string;
      success?: string;
      info?: string;
      warning?: string;
      error?: string;
   }

   export interface SimplePaletteColorOptions {
      lighter?: string;
      light?: string;
      main: string;
      dark?: string;
      darker?: string;
      contrastText?: string;
   }

   export type PaletteColorOptions = SimplePaletteColorOptions | createPalette.ColorPartial;

   export interface PaletteOptions {
      primary?: PaletteColorOptions;
      secondary?: PaletteColorOptions;
      error?: PaletteColorOptions;
      warning?: PaletteColorOptions;
      info?: PaletteColorOptions;
      success?: PaletteColorOptions;
      grey?: GreyColorPartial;
      gradients?: GradientPaletteOpions;
      background?: Partial<TypeBackground> & CustomTypeBackground;
   }

   export interface OverridesPaletteOptions extends createPalette.PaletteOptions {
      primary?: SimplePaletteColorOptions;
      secondary?: SimplePaletteColorOptions;
      error?: SimplePaletteColorOptions;
      warning?: SimplePaletteColorOptions;
      info?: SimplePaletteColorOptions;
      success?: SimplePaletteColorOptions;
      grey?: GreyColorPartial;
      gradients?: GradientPaletteOpions;
      background?: Partial<TypeBackground> & CustomTypeBackground;
   }
}
