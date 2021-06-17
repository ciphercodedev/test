import { FC } from 'react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Icon } from '@iconify/react';
import { AppBar, Box, IconButton, Stack, Toolbar } from '@material-ui/core';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { MHidden } from '../../components/@material-extend';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import Searchbar from './Searchbar';

// ----------------------------------------------------------------------

interface DashboardNavbarProps {
   onOpenSidebar: () => void;
}

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
   boxShadow: 'none',
   backdropFilter: 'blur(6px)',
   WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
   backgroundColor: alpha(theme.palette.background.default, 0.72),
   [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
   }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
   minHeight: APPBAR_MOBILE,
   [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5)
   }
}));

// ----------------------------------------------------------------------

const DashboardNavbar: FC<DashboardNavbarProps> = ({ onOpenSidebar }) => {
   return (
      <RootStyle>
         <ToolbarStyle>
            <MHidden width="lgUp">
               <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
                  <Icon icon={menu2Fill} />
               </IconButton>
            </MHidden>

            <Searchbar />
            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }}>
               <LanguagePopover />
               <NotificationsPopover />
               <AccountPopover />
            </Stack>
         </ToolbarStyle>
      </RootStyle>
   );
};

export default DashboardNavbar;