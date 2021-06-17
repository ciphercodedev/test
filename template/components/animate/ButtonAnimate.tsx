import { motion } from 'framer-motion';
import { FC } from 'react';
import { Box } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { varMediumClick, varSmallClick } from './variants';

// ----------------------------------------------------------------------

interface ButtonAnimateProps {
   sx?: SxProps;
   mediumClick?: boolean;
   children: JSX.Element | JSX.Element[];
   [key: string]: any;
}

// ----------------------------------------------------------------------

const ButtonAnimate: FC<ButtonAnimateProps> = ({ mediumClick = false, children, sx, ...other }) => {
   return (
      <Box
         component={motion.div}
         whileTap="tap"
         whileHover="hover"
         variants={mediumClick ? varMediumClick : varSmallClick}
         sx={{ display: 'inline-flex', ...sx }}
         {...other}
      >
         {children}
      </Box>
   );
};

export default ButtonAnimate;
