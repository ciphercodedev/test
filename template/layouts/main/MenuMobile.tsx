import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Icon } from '@iconify/react';
import {
   Box,
   Collapse,
   Drawer,
   List,
   ListItem,
   ListItemIcon,
   ListItemText
} from '@material-ui/core';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';
import { MIconButton } from '../../components/@material-extend';
import Logo from '../../components/Logo';
import NavSection from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
import { SideBarConfigItemsProps } from '../dashboard/SidebarConfig';

// ----------------------------------------------------------------------

interface StyledComponentProps {
   onClick?: () => void;
   sx?: SxProps;
}

interface MenuMobileItemProps {
   item: SideBarConfigItemsProps;
   isOpen?: boolean;
   isActive?: boolean;
   onOpen: () => void;
}

interface MenuMobileProps {
   isOffset?: boolean;
   isHome?: boolean;
   navConfig: SideBarConfigItemsProps[];
}

// ----------------------------------------------------------------------

const ICON_SIZE = 22;
const ITEM_SIZE = 48;
const PADDING = 2.5;

const ListItemStyle = styled((props: StyledComponentProps) => <ListItem button {...props} />)(
   ({ theme }) => ({
      ...theme.typography.body2,
      height: ITEM_SIZE,
      textTransform: 'capitalize',
      paddingLeft: theme.spacing(PADDING),
      paddingRight: theme.spacing(2.5),
      color: theme.palette.text.secondary
   })
);

// ----------------------------------------------------------------------

const MenuMobileItem: FC<MenuMobileItemProps> = ({ item, isOpen, isActive, onOpen }) => {
   const { title, path, icon, children } = item;

   if (children) {
      return (
         <div key={title}>
            <ListItemStyle onClick={onOpen}>
               <ListItemIcon>{icon}</ListItemIcon>
               <ListItemText disableTypography primary={title} />
               <Box
                  component={Icon}
                  icon={isOpen ? arrowIosDownwardFill : arrowIosForwardFill}
                  sx={{ width: 16, height: 16, ml: 1 }}
               />
            </ListItemStyle>

            <Collapse in={isOpen} timeout="auto" unmountOnExit>
               <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
                  <NavSection
                     navConfig={menuConfig[2].children}
                     sx={{
                        '&.MuiList-root:last-child .MuiListItem-root': {
                           height: 200,
                           backgroundSize: '92%',
                           backgroundPosition: 'center',
                           bgcolor: 'background.neutral',
                           backgroundRepeat: 'no-repeat',
                           backgroundImage: 'url(/static/illustrations/illustration_dashboard.png)',
                           '& > *:not(.MuiTouchRipple-root)': { display: 'none' }
                        },
                        '& .MuiListSubheader-root': {
                           pl: PADDING,
                           display: 'flex',
                           alignItems: 'center',
                           '&:before': {
                              ml: '6px',
                              mr: '22px',
                              width: 8,
                              height: 2,
                              content: "''",
                              borderRadius: 2,
                              bgcolor: 'currentColor'
                           }
                        },
                        '& .MuiListItem-root': {
                           pl: PADDING,
                           '&:before': { display: 'none' },
                           '&.active': { color: 'primary.main', bgcolor: 'transparent' }
                        },
                        '& .MuiListItemIcon-root': {
                           width: ICON_SIZE,
                           height: ICON_SIZE,
                           '&:before': {
                              width: 4,
                              height: 4,
                              content: "''",
                              borderRadius: '50%',
                              bgcolor: 'currentColor'
                           }
                        }
                     }}
                  />
               </Box>
            </Collapse>
         </div>
      );
   }

   return (
      <NextLink key={title} href={path}>
         <ListItemStyle
            sx={{
               ...(isActive && {
                  color: 'primary.main',
                  fontWeight: 'fontWeightMedium',
                  bgcolor: (theme) =>
                     alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
               })
            }}
         >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText disableTypography primary={title} />
         </ListItemStyle>
      </NextLink>
   );
};

const MenuMobile: FC<MenuMobileProps> = ({ isOffset = false, isHome = false, navConfig = [] }) => {
   const { pathname } = useRouter();
   const [open, setOpen] = useState(false);
   const [mobileOpen, setMobileOpen] = useState(false);

   useEffect(() => {
      if (mobileOpen) {
         handleDrawerClose();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pathname]);

   const handleDrawerOpen = () => {
      setMobileOpen(true);
   };

   const handleDrawerClose = () => {
      setMobileOpen(false);
   };

   const handleOpen = () => {
      setOpen(!open);
   };

   return (
      <>
         <MIconButton
            onClick={handleDrawerOpen}
            sx={{
               ml: 1,
               ...(isHome && { color: 'common.white' }),
               ...(isOffset && { color: 'text.primary' })
            }}
         >
            <Icon icon={menu2Fill} />
         </MIconButton>

         <Drawer
            open={mobileOpen}
            onClose={handleDrawerClose}
            ModalProps={{ keepMounted: true }}
            PaperProps={{ sx: { pb: 5, width: 260 } }}
         >
            <Scrollbar>
               <Box sx={{ display: 'inline-flex' }}>
                  <NextLink href="/">
                     <Logo sx={{ mx: PADDING, my: 3 }} />
                  </NextLink>
               </Box>

               <List disablePadding>
                  {navConfig.map((link) => (
                     <MenuMobileItem
                        key={link.title}
                        item={link}
                        isOpen={open}
                        onOpen={handleOpen}
                        isActive={pathname === link.path}
                     />
                  ))}
               </List>
            </Scrollbar>
         </Drawer>
      </>
   );
};

export default MenuMobile;
