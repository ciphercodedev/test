import { forwardRef } from 'react';
import { Button, ButtonTypeMap, ExtendButtonBase } from '@material-ui/core';
import { alpha, experimentalStyled as styled, Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

type Color = 'inherit' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

type Variant = 'contained' | 'outlined' | 'text';

interface StyleProps {
   color: Color;
   variant: Variant;
}

interface StyledComponentProps {
   children: JSX.Element | JSX.Element[];
   theme?: Theme;
   styleProps: StyleProps;
}

interface MButtonProps {
   children: JSX.Element | JSX.Element[];
   color?: Color;
   variant?: Variant;
   sx?: SxProps;
   [key: string]: any;
}

// ----------------------------------------------------------------------

const ButtonStyle = styled<ExtendButtonBase<ButtonTypeMap<StyledComponentProps, 'button'>>>(Button)(
   ({ theme, styleProps }) => {
      const { color, variant } = styleProps;

      const styleContained = (color) => ({
         boxShadow: theme.customShadows[color],
         color: theme.palette[color].contrastText,
         backgroundColor: theme.palette[color].main,
         '&:hover': {
            backgroundColor: theme.palette[color].dark
         }
      });

      const styleOutlined = (color) => ({
         color: theme.palette[color].main,
         border: `1px solid ${alpha(theme.palette[color].main, 0.48)}`,
         '&:hover': {
            border: `1px solid ${theme.palette[color].main}`,
            backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
         }
      });

      const styleText = (color) => ({
         color: theme.palette[color].main,
         '&:hover': {
            backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
         }
      });
      return {
         ...(variant === 'contained' && { ...styleContained(color) }),
         ...(variant === 'outlined' && { ...styleOutlined(color) }),
         ...(variant === 'text' && { ...styleText(color) })
      };
   }
);

// ----------------------------------------------------------------------

const MButton = forwardRef<HTMLButtonElement, MButtonProps>(
   ({ color = 'primary', variant = 'text', children, ...other }, ref) => {
      if (color === 'inherit' || color === 'primary' || color === 'secondary') {
         return (
            <Button ref={ref} color={color} variant={variant} {...other}>
               {children}
            </Button>
         );
      }

      return (
         <ButtonStyle ref={ref} variant={variant} styleProps={{ color, variant }} {...other}>
            {children}
         </ButtonStyle>
      );
   }
);

export default MButton;
