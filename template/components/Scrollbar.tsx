import { FC } from 'react';
import SimpleBarReact from 'simplebar-react';
import { Box } from '@material-ui/core';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

interface ScrollbarProps {
   children: JSX.Element | JSX.Element[];
   sx?: SxProps;
   [key: string]: any;
}

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
   flexGrow: 1,
   height: '100%',
   overflow: 'hidden'
});

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
   maxHeight: '100%',
   '& .simplebar-scrollbar': {
      '&:before': {
         backgroundColor: alpha(theme.palette.grey[600], 0.48)
      },
      '&.simplebar-visible:before': {
         opacity: 1
      }
   },
   '& .simplebar-track.simplebar-vertical': {
      width: 10
   },
   '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
      height: 6
   },
   '& .simplebar-mask': {
      zIndex: 'inherit'
   }
}));

// ----------------------------------------------------------------------

const Scrollbar: FC<ScrollbarProps> = ({ children, sx, ...other }) => {
   const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
   );

   if (isMobile) {
      return (
         <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
            {children}
         </Box>
      );
   }

   return (
      <RootStyle>
         <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
            {children}
         </SimpleBarStyle>
      </RootStyle>
   );
};

export default Scrollbar;
