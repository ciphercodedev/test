import { forwardRef } from 'react';
import { Checkbox } from '@material-ui/core';
import { alpha, useTheme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

interface MCheckboxProps {
   sx?: SxProps;
   color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
   [key: string]: any;
}

// ----------------------------------------------------------------------

const MCheckbox = forwardRef<HTMLButtonElement, MCheckboxProps>(
   ({ color = 'primary', sx = {}, ...other }, ref) => {
      const theme = useTheme();

      if (color === 'default' || color === 'primary' || color === 'secondary') {
         return <Checkbox ref={ref} color={color} sx={sx} {...other} />;
      }

      return (
         <Checkbox
            ref={ref}
            sx={{
               '&.Mui-checked': {
                  color: theme.palette[color].main
               },
               '&.MuiCheckbox-indeterminate': {
                  color: theme.palette[color].main
               },
               '&:hover, &.Mui-checked:hover': {
                  backgroundColor: alpha(
                     theme.palette[color].main,
                     theme.palette.action.hoverOpacity
                  )
               },
               ...sx
            }}
            {...other}
         />
      );
   }
);

export default MCheckbox;
