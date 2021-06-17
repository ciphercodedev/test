import { FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

interface MCircularProgressProps {
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

const MCircularProgress: FC<MCircularProgressProps> = ({ color = 'primary', sx, ...other }) => {
   const theme = useTheme();

   if (color === 'inherit' || color === 'primary' || color === 'secondary') {
      return <CircularProgress color={color} sx={sx} {...other} />;
   }

   return (
      <CircularProgress
         sx={{
            color: theme.palette[color].main,
            ...sx
         }}
         {...other}
      />
   );
};

export default MCircularProgress;
