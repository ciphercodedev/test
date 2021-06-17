import { useRef, useState } from 'react';
import { Box, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import { MIconButton } from '../../components/@material-extend';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

const LANGS = [
   {
      value: 'en',
      label: 'English',
      icon: '/static/icons/ic_flag_en.svg'
   },
   {
      value: 'de',
      label: 'German',
      icon: '/static/icons/ic_flag_de.svg'
   },
   {
      value: 'fr',
      label: 'French',
      icon: '/static/icons/ic_flag_fr.svg'
   }
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
   const anchorRef = useRef(null);
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   return (
      <>
         <MIconButton
            ref={anchorRef}
            onClick={handleOpen}
            sx={{
               padding: 0,
               width: 44,
               height: 44,
               ...(open && {
                  bgcolor: (theme) =>
                     alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
               })
            }}
         >
            <img src={LANGS[0].icon} alt={LANGS[0].label} />
         </MIconButton>

         <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
            <Box sx={{ py: 1 }}>
               {LANGS.map((option) => (
                  <MenuItem
                     key={option.value}
                     selected={option.value === LANGS[0].value}
                     onClick={handleClose}
                     sx={{ py: 1, px: 2.5 }}
                  >
                     <ListItemIcon>
                        <Box component="img" alt={option.label} src={option.icon} />
                     </ListItemIcon>
                     <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                        {option.label}
                     </ListItemText>
                  </MenuItem>
               ))}
            </Box>
         </MenuPopover>
      </>
   );
}
