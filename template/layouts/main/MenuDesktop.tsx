import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import { Icon } from '@iconify/react';
import {
   Box,
   CardActionArea,
   Grid,
   Link,
   List,
   ListItem,
   ListSubheader,
   Popover,
   Stack
} from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { SideBarConfigItemsProps } from '../dashboard/SidebarConfig';

// ----------------------------------------------------------------------

interface IconBulletProps {
   type?: 'subheader' | 'item';
}

interface MenuDesktopItemProps {
   item: SideBarConfigItemsProps;
   pathname: string;
   isHome?: boolean;
   isOffset?: boolean;
   isOpen?: boolean;
   onOpen: () => void;
   onClose: () => void;
}

interface MenuDesktopProps {
   isOffset?: boolean;
   isHome?: boolean;
   navConfig: SideBarConfigItemsProps[];
}

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
   ...theme.typography.subtitle2,
   color: theme.palette.text.primary,
   marginRight: theme.spacing(5),
   transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest
   }),
   '&:hover': {
      opacity: 0.48,
      textDecoration: 'none'
   }
}));

// ----------------------------------------------------------------------

const IconBullet: FC<IconBulletProps> = ({ type = 'item' }) => {
   return (
      <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
         <Box
            component="span"
            sx={{
               ml: '2px',
               width: 4,
               height: 4,
               borderRadius: '50%',
               bgcolor: 'currentColor',
               ...(type !== 'item' && {
                  ml: 0,
                  width: 8,
                  height: 2,
                  borderRadius: 2
               })
            }}
         />
      </Box>
   );
};

const MenuDesktopItem: FC<MenuDesktopItemProps> = ({
   item,
   pathname,
   isHome = false,
   isOpen = false,
   isOffset = false,
   onOpen,
   onClose
}) => {
   const { title, path, children } = item;
   const isActive = pathname === path;

   if (children) {
      return (
         <div key={title}>
            <LinkStyle
               onClick={onOpen}
               sx={{
                  display: 'flex',
                  cursor: 'pointer',
                  alignItems: 'center',
                  ...(isHome && { color: 'common.white' }),
                  ...(isOffset && { color: 'text.primary' }),
                  ...(isOpen && { opacity: 0.48 })
               }}
            >
               {title}
               <Box
                  component={Icon}
                  icon={isOpen ? arrowIosUpwardFill : arrowIosDownwardFill}
                  sx={{ ml: 0.5, width: 16, height: 16 }}
               />
            </LinkStyle>

            <Popover
               open={isOpen}
               anchorReference="anchorPosition"
               anchorPosition={{ top: 80, left: 0 }}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
               transformOrigin={{ vertical: 'top', horizontal: 'center' }}
               onClose={onClose}
               PaperProps={{
                  sx: {
                     px: 3,
                     pt: 5,
                     pb: 3,
                     right: 16,
                     margin: 'auto',
                     maxWidth: 1280,
                     borderRadius: 2,
                     boxShadow: (theme) => theme.customShadows.z24
                  }
               }}
            >
               <Grid container spacing={3}>
                  {children.map((list) => {
                     const { title } = list;
                     const items = [];

                     return (
                        <Grid key={title} item xs={12} md={title === 'Dashboard' ? 6 : 2}>
                           <List disablePadding>
                              <ListSubheader
                                 disableSticky
                                 disableGutters
                                 sx={{
                                    display: 'flex',
                                    lineHeight: 'unset',
                                    alignItems: 'center',
                                    color: 'text.primary',
                                    typography: 'overline'
                                 }}
                              >
                                 <IconBullet type="subheader" /> {title}
                              </ListSubheader>

                              {items.map((item) => (
                                 <NextLink key={item.title} href={item.path}>
                                    <ListItem
                                       // underline="none"
                                       sx={{
                                          p: 0,
                                          mt: 3,
                                          typography: 'body2',
                                          color: 'text.secondary',
                                          transition: (theme) => theme.transitions.create('color'),
                                          '&:hover': { color: 'text.primary' },
                                          ...(item.path === pathname && {
                                             typography: 'subtitle2',
                                             color: 'text.primary'
                                          })
                                       }}
                                    >
                                       {item.title === 'Dashboard' ? (
                                          <CardActionArea
                                             sx={{
                                                py: 5,
                                                px: 10,
                                                borderRadius: 2,
                                                color: 'primary.main',
                                                bgcolor: 'background.neutral'
                                             }}
                                          >
                                             <Box
                                                component={motion.img}
                                                whileTap="tap"
                                                whileHover="hover"
                                                variants={{
                                                   hover: { scale: 1.02 },
                                                   tap: { scale: 0.98 }
                                                }}
                                                src="/static/illustrations/illustration_dashboard.png"
                                                sx={{ minWidth: 420 }}
                                             />
                                          </CardActionArea>
                                       ) : (
                                          <>
                                             <IconBullet />
                                             {item.title}
                                          </>
                                       )}
                                    </ListItem>
                                 </NextLink>
                              ))}
                           </List>
                        </Grid>
                     );
                  })}
               </Grid>
            </Popover>
         </div>
      );
   }

   return (
      <NextLink key={title} href={path} passHref>
         <LinkStyle
            sx={{
               ...(isHome && { color: 'common.white' }),
               ...(isOffset && { color: 'text.primary' }),
               ...(isActive && { color: 'primary.main' })
            }}
         >
            {title}
         </LinkStyle>
      </NextLink>
   );
};

const MenuDesktop: FC<MenuDesktopProps> = ({
   isOffset = false,
   isHome = false,
   navConfig = []
}) => {
   const { pathname } = useRouter();
   const [open, setOpen] = useState(false);

   useEffect(() => {
      if (open) {
         handleClose();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pathname]);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <Stack direction="row">
         {navConfig.map((link) => (
            <MenuDesktopItem
               key={link.title}
               item={link}
               pathname={pathname}
               isOpen={open}
               onOpen={handleOpen}
               onClose={handleClose}
               isOffset={isOffset}
               isHome={isHome}
            />
         ))}
      </Stack>
   );
};

export default MenuDesktop;
