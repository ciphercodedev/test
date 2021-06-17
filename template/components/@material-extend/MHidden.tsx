import { FC, ReactElement } from 'react';
import { Breakpoint, Theme, useMediaQuery } from '@material-ui/core';

// ----------------------------------------------------------------------

interface MHiddenProps {
   children: ReactElement<any, any>;
   width:
      | 'xsDown'
      | 'smDown'
      | 'mdDown'
      | 'lgDown'
      | 'xlDown'
      | 'xsUp'
      | 'smUp'
      | 'mdUp'
      | 'lgUp'
      | 'xlUp';
}

// ----------------------------------------------------------------------

const MHidden: FC<MHiddenProps> = ({ width, children }) => {
   const breakpoint = width.substring(0, 2) as Breakpoint;
   const hiddenUp = useMediaQuery((theme: Theme) => theme.breakpoints.up(breakpoint));
   const hiddenDown = useMediaQuery((theme: Theme) => theme.breakpoints.down(breakpoint));

   if (width.includes('Down')) {
      return hiddenDown ? null : children;
   }

   if (width.includes('Up')) {
      return hiddenUp ? null : children;
   }

   return null;
};

export default MHidden;
