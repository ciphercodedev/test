import { forwardRef } from 'react';
import { Avatar, useTheme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

interface MAvatarProps {
   children: JSX.Element | JSX.Element[];
   sx?: SxProps;
   color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
   [key: string]: any;
}

// ----------------------------------------------------------------------
const MAvatar = forwardRef<HTMLDivElement, MAvatarProps>(
   ({ color = 'default', sx = {}, children, ...other }, ref) => {
      const theme = useTheme();

      if (color === 'default') {
         return (
            <Avatar ref={ref} sx={sx} {...other}>
               {children}
            </Avatar>
         );
      }

      return (
         <Avatar
            ref={ref}
            sx={{
               fontWeight: theme.typography.fontWeightMedium,
               color: theme.palette[color].contrastText,
               backgroundColor: theme.palette[color].main,
               ...sx
            }}
            {...other}
         >
            {children}
         </Avatar>
      );
   }
);

export default MAvatar;
