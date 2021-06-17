import { FC } from 'react';
import { Popover } from '@material-ui/core';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

interface MenuPopoverProps {
   open: boolean;
   children: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
   sx?: SxProps;
   [key: string]: any;
}

// ----------------------------------------------------------------------

const ArrowStyle = styled('span')(({ theme }) => ({
   [theme.breakpoints.up('sm')]: {
      top: -7,
      zIndex: 1,
      width: 12,
      right: 20,
      height: 12,
      content: "''",
      position: 'absolute',
      borderRadius: '0 0 4px 0',
      transform: 'rotate(-135deg)',
      background: theme.palette.background.paper,
      borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
      borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`
   }
}));

// ----------------------------------------------------------------------

const MenuPopover: FC<MenuPopoverProps> = ({ open = false, children, sx, ...other }) => {
   return (
      <Popover
         open={open}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         PaperProps={{
            sx: {
               mt: 1.5,
               ml: 0.5,
               overflow: 'inherit',
               boxShadow: (theme) => theme.customShadows.z20,
               border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
               width: 200,
               ...sx
            }
         }}
         {...other}
      >
         <ArrowStyle />

         {children}
      </Popover>
   );
};

export default MenuPopover;
