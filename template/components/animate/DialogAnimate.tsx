import { AnimatePresence, motion, Variants } from 'framer-motion';
import { FC } from 'react';
import { Dialog } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { varFadeInUp } from './variants';

// ----------------------------------------------------------------------

interface DialogAnimate {
   children: JSX.Element | JSX.Element[];
   open: boolean;
   animate?: Variants;
   onClose: () => void;
   sx?: SxProps;
   [key: string]: any;
}

// ----------------------------------------------------------------------

const DialogAnimate: FC<DialogAnimate> = ({
   open = false,
   animate = varFadeInUp,
   onClose,
   children,
   ...other
}) => {
   return (
      <AnimatePresence>
         {open && (
            <Dialog
               fullWidth
               maxWidth="xs"
               open={open}
               onClose={onClose}
               // @ts-ignore
               PaperComponent={motion.div}
               PaperProps={{
                  sx: {
                     borderRadius: 2,
                     bgcolor: 'background.paper'
                  },
                  ...animate
               }}
               {...other}
            >
               {children}
            </Dialog>
         )}
      </AnimatePresence>
   );
};

export default DialogAnimate;
