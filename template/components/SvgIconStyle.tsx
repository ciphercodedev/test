import { FC } from 'react';
import { Box } from '@material-ui/core';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

interface SvgIconStyleProps {
   src: string;
   color?: 'inherit' | 'action' | 'disabled' | 'paper';
   sx?: SxProps;
}

// ----------------------------------------------------------------------

const SvgIconStyle: FC<SvgIconStyleProps> = ({ src, color = 'inherit', sx }) => {
   return (
      <Box
         component="span"
         sx={{
            width: 24,
            height: 24,
            mask: `url(${src}) no-repeat center / contain`,
            WebkitMask: `url(${src}) no-repeat center / contain`,
            bgcolor: `${color}.main`,
            ...(color === 'inherit' && { bgcolor: 'currentColor' }),
            ...(color === 'action' && { bgcolor: 'action.active' }),
            ...(color === 'disabled' && { bgcolor: 'action.disabled' }),
            ...(color === 'paper' && { bgcolor: 'background.paper' }),
            ...sx
         }}
      />
   );
};

export default SvgIconStyle;
