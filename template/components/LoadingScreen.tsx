import { motion } from 'framer-motion';
import { ElementType, FC } from 'react';
import { Box } from '@material-ui/core';
import { alpha, experimentalStyled as styled, Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';
import Logo from './Logo';

// ----------------------------------------------------------------------

interface LoadingScreenProps {
   theme?: Theme;
   as?: ElementType<any>;
   sx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
   height: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

const LoadingScreen: FC<LoadingScreenProps> = ({ ...other }) => {
   return (
      <RootStyle {...other}>
         <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{
               duration: 2,
               ease: 'easeInOut',
               repeatDelay: 1,
               repeat: Infinity
            }}
         >
            <Logo sx={{ width: 64, height: 64 }} />
         </motion.div>

         <Box
            component={motion.div}
            animate={{
               scale: [1.2, 1, 1, 1.2, 1.2],
               rotate: [270, 0, 0, 270, 270],
               opacity: [0.25, 1, 1, 1, 0.25],
               borderRadius: ['25%', '25%', '50%', '50%', '25%']
            }}
            transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
            sx={{
               width: 100,
               height: 100,
               borderRadius: '25%',
               position: 'absolute',
               border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`
            }}
         />

         <Box
            component={motion.div}
            animate={{
               scale: [1, 1.2, 1.2, 1, 1],
               rotate: [0, 270, 270, 0, 0],
               opacity: [1, 0.25, 0.25, 0.25, 1],
               borderRadius: ['25%', '25%', '50%', '50%', '25%']
            }}
            transition={{
               ease: 'linear',
               duration: 3.2,
               repeat: Infinity
            }}
            sx={{
               width: 120,
               height: 120,
               borderRadius: '25%',
               position: 'absolute',
               border: (theme) => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`
            }}
         />
      </RootStyle>
   );
};

export default LoadingScreen;
