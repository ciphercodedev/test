import { motion, Variants } from 'framer-motion';
import { FC } from 'react';
import { Typography } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { varFadeInUp } from './variants';

// ----------------------------------------------------------------------

interface TextAnimateProps {
   text: string;
   variants?: Variants;
   sx?: SxProps;
   [key: string]: any;
}

// ----------------------------------------------------------------------

const TextAnimate: FC<TextAnimateProps> = ({ text, variants = varFadeInUp, sx, ...other }) => {
   return (
      <Typography
         component={motion.h1}
         sx={{
            typography: 'h1',
            overflow: 'hidden',
            display: 'inline-flex',
            ...sx
         }}
         {...other}
      >
         {text.split('').map((letter, index) => (
            <motion.span key={index} variants={variants}>
               {letter}
            </motion.span>
         ))}
      </Typography>
   );
};

export default TextAnimate;
