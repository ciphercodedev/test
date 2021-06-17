import { motion } from 'framer-motion';
import { FC } from 'react';
import { Box } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { varWrapEnter } from './variants';

// ----------------------------------------------------------------------

interface MotionContainerProps {
   open: boolean;
   children: JSX.Element | JSX.Element[];
   sx?: SxProps;
   [key: string]: any;
}

// ----------------------------------------------------------------------

const MotionContainer: FC<MotionContainerProps> = ({ open, children, ...other }) => {
   return (
      <Box
         component={motion.div}
         initial={false}
         animate={open ? 'animate' : 'exit'}
         variants={varWrapEnter}
         {...other}
      >
         {children}
      </Box>
   );
};

export default MotionContainer;
