import { FC } from 'react';
import { ButtonGroup, ButtonGroupTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
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
   children: HTMLButtonElement | HTMLButtonElement[];
   theme?: Theme;
   styleProps: StyleProps;
}

interface MButtonGroupProps {
   children: HTMLButtonElement | HTMLButtonElement[];
   color?: Color;
   variant?: Variant;
   sx?: SxProps;
   [key: string]: any;
}

// ----------------------------------------------------------------------

const ButtonGroupStyle = styled<
   OverridableComponent<ButtonGroupTypeMap<StyledComponentProps, 'div'>>
>(ButtonGroup)(({ theme, styleProps }) => {
   const { color, variant } = styleProps;

   const styleContained = (color) => ({
      boxShadow: theme.customShadows[color],
      '& .MuiButtonGroup-grouped': {
         color: theme.palette[color].contrastText,
         backgroundColor: theme.palette[color].main,
         borderColor: `${theme.palette[color].dark} !important`,
         '&:hover': {
            backgroundColor: theme.palette[color].dark
         }
      }
   });

   const styleOutlined = (color) => ({
      '& .MuiButtonGroup-grouped': {
         color: theme.palette[color].main,
         borderColor: `${alpha(theme.palette[color].main, 0.48)} !important`,
         '&:hover': {
            borderColor: `${theme.palette[color].main} !important`,
            backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
         }
      }
   });

   const styleText = (color) => ({
      '& .MuiButtonGroup-grouped': {
         color: theme.palette[color].main,
         borderColor: `${theme.palette[color].main} !important`,
         '&:hover': {
            backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
         }
      }
   });
   return {
      ...(variant === 'contained' && { ...styleContained(color) }),
      ...(variant === 'outlined' && { ...styleOutlined(color) }),
      ...(variant === 'text' && { ...styleText(color) })
   };
});

// ----------------------------------------------------------------------

const MButtonGroup: FC<MButtonGroupProps> = ({
   color = 'primary',
   variant = 'outlined',
   children,
   ...other
}) => {
   if (color === 'inherit' || color === 'primary' || color === 'secondary') {
      return (
         <ButtonGroup color={color} variant={variant} {...other}>
            {children}
         </ButtonGroup>
      );
   }

   return (
      <ButtonGroupStyle variant={variant} styleProps={{ color, variant }} {...other}>
         {children}
      </ButtonGroupStyle>
   );
};

export default MButtonGroup;
