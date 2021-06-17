import { motion, Transition, useAnimation, Variants } from 'framer-motion';
import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Box } from '@material-ui/core';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

interface MotionInViewProps {
   children: JSX.Element | JSX.Element[];
   variants: Variants;
   transition?: Transition;
   threshold?: number;
   sx?: SxProps;
}

// ----------------------------------------------------------------------

const MotionInView: FC<MotionInViewProps> = ({
   children,
   variants,
   transition = {},
   threshold = 0,
   ...other
}) => {
   const controls = useAnimation();
   const [ref, inView] = useInView({
      threshold: threshold || 0,
      triggerOnce: true
   });

   useEffect(() => {
      if (inView) {
         controls.start(Object.keys(variants)[1]);
      } else {
         controls.start(Object.keys(variants)[0]);
      }
   }, [controls, inView, variants]);

   return (
      <Box
         ref={ref}
         component={motion.div}
         initial={Object.keys(variants)[0]}
         animate={controls}
         variants={variants}
         transition={transition}
         {...other}
      >
         {children}
      </Box>
   );
};

export default MotionInView;
