import { forwardRef } from 'react';
import { IconButton } from '@material-ui/core';
import { alpha, useTheme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';
import { ButtonAnimate } from '../animate';

// ----------------------------------------------------------------------

interface MIconButtonProps {
   children: JSX.Element | JSX.Element[];
   sx?: SxProps;
   color?:
      | 'default'
      | 'inherit'
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error';
   [key: string]: any;
}

// ----------------------------------------------------------------------

const MIconButton = forwardRef<HTMLButtonElement, MIconButtonProps>(
   ({ color = 'default', children, sx, ...other }, ref) => {
      const theme = useTheme();

      if (
         color === 'default' ||
         color === 'inherit' ||
         color === 'primary' ||
         color === 'secondary'
      ) {
         return (
            <ButtonAnimate>
               <IconButton ref={ref} color={color} sx={sx} {...other}>
                  {children}
               </IconButton>
            </ButtonAnimate>
         );
      }

      return (
         <ButtonAnimate>
            <IconButton
               ref={ref}
               sx={{
                  color: theme.palette[color].main,
                  '&:hover': {
                     bgcolor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
                  },
                  ...sx
               }}
               {...other}
            >
               {children}
            </IconButton>
         </ButtonAnimate>
      );
   }
);

export default MIconButton;
