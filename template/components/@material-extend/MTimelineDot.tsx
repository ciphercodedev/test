import { FC } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { TimelineDot } from '@material-ui/lab';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

interface MTimelineDotProps {
   sx?: SxProps;
   color?: 'grey' | 'inherit' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
   variant?: 'filled' | 'outlined';
   [key: string]: any;
}

// ----------------------------------------------------------------------

const MTimelineDot: FC<MTimelineDotProps> = ({
   color = 'grey',
   variant = 'filled',
   sx,
   ...other
}) => {
   const theme = useTheme();

   if (color === 'grey' || color === 'inherit' || color === 'primary' || color === 'secondary') {
      return <TimelineDot color={color} variant={variant} sx={sx} {...other} />;
   }

   return (
      <TimelineDot
         variant={variant}
         sx={{
            ...(variant === 'filled' && {
               color: theme.palette[color].contrastText,
               backgroundColor: theme.palette[color].main
            }),
            ...(variant === 'outlined' && {
               borderColor: theme.palette[color].main
            }),
            ...sx
         }}
         {...other}
      />
   );
};

export default MTimelineDot;
