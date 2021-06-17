import { Theme } from './createTheme';

declare module '@material-ui/core/styles/useTheme' {
   export default function useTheme<T = Theme>(): T;
}
