import { FC } from 'react';
import { Radio } from '@material-ui/core';
import { alpha, useTheme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

interface MRadioProps {
   sx?: SxProps;
   color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
   [key: string]: any;
}

// ----------------------------------------------------------------------

const MRadio: FC<MRadioProps> = ({ color = 'primary', sx, ...other }) => {
   const theme = useTheme();

   if (color === 'default' || color === 'primary' || color === 'secondary') {
      return <Radio color={color} sx={sx} {...other} />;
   }

   return (
      <Radio
         sx={{
            '&.Mui-checked': {
               color: theme.palette[color].main
            },
            '&:hover, &.Mui-checked:hover': {
               bgcolor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
            },
            ...sx
         }}
         {...other}
      />
   );
};

export default MRadio;
