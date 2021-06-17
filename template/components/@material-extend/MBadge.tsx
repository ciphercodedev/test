import { forwardRef } from 'react';
import { Badge } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

interface MBadgeProps {
   children: JSX.Element | JSX.Element[];
   sx?: SxProps;
   color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
   [key: string]: any;
}

// ----------------------------------------------------------------------

const MBadge = forwardRef<HTMLSpanElement, MBadgeProps>(
   ({ color = 'default', children, sx = {}, ...other }, ref) => {
      const theme = useTheme();

      if (
         color === 'default' ||
         color === 'error' ||
         color === 'primary' ||
         color === 'secondary'
      ) {
         return (
            <Badge ref={ref} color={color} sx={sx} {...other}>
               {children}
            </Badge>
         );
      }

      return (
         <Badge
            ref={ref}
            sx={{
               '& .MuiBadge-badge': {
                  color: theme.palette[color].contrastText,
                  bgcolor: theme.palette[color].main
               },
               ...sx
            }}
            {...other}
         >
            {children}
         </Badge>
      );
   }
);

export default MBadge;
