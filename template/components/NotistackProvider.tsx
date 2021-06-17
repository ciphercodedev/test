import { SnackbarProvider } from 'notistack';
import { memo } from 'react';
import { FC } from 'react';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import infoFill from '@iconify/icons-eva/info-fill';
import Icon from '@iconify/react';
import { alpha, Box, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';

// ----------------------------------------------------------------------

type UseStylesResult =
   | 'containerRoot'
   | 'contentRoot'
   | 'message'
   | 'action'
   | 'info'
   | 'success'
   | 'warning'
   | 'error';

interface SnackbarIconProps {
   icon: object;
   color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
}

interface NotistackProviderProps {
   children: JSX.Element | JSX.Element[];
}

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme: Theme) => {
   const isLight = theme.palette.mode === 'light';

   const createStyle = {
      color: `${theme.palette.text.primary} !important`,
      backgroundColor: `${theme.palette.background.paper} !important`
   };

   return createStyles({
      containerRoot: {
         '& .MuiCollapse-wrapperInner': {
            width: '100%'
         },
         pointerEvents: 'all' // if dismiss this will make the close button does not work
      },
      contentRoot: {
         width: '100%',
         padding: theme.spacing(1.5),
         margin: theme.spacing(0.25, 0),
         boxShadow: theme.customShadows.z8,
         borderRadius: theme.shape.borderRadius,
         color: theme.palette.grey[isLight ? 0 : 800],
         backgroundColor: theme.palette.grey[isLight ? 900 : 0]
      },
      message: {
         padding: 0,
         fontWeight: theme.typography.fontWeightMedium
      },
      action: {
         marginRight: -4,
         '& svg': {
            width: 20,
            height: 20,
            opacity: 0.48,
            '&:hover': { opacity: 1 }
         }
      },
      info: { ...createStyle },
      success: { ...createStyle },
      warning: { ...createStyle },
      error: { ...createStyle }
   });
});

// ----------------------------------------------------------------------

const SnackbarIcon: FC<SnackbarIconProps> = memo(({ icon, color = 'primary' }) => {
   return (
      <Box
         component="span"
         sx={{
            mr: 1.5,
            width: 40,
            height: 40,
            display: 'flex',
            borderRadius: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            color: `${color}.main`,
            bgcolor: (theme) => alpha(theme.palette[color].main, 0.16)
         }}
      >
         <Icon icon={icon} width={24} height={24} />
      </Box>
   );
});

const NotistackProvider: FC<NotistackProviderProps> = memo(({ children }) => {
   const classes = useStyles();

   return (
      <SnackbarProvider
         dense
         preventDuplicate
         maxSnack={5}
         autoHideDuration={3000}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
         }}
         iconVariant={{
            success: <SnackbarIcon icon={checkmarkCircle2Fill} color="success" />,
            info: <SnackbarIcon icon={alertCircleFill} color="info" />,
            warning: <SnackbarIcon icon={alertTriangleFill} color="warning" />,
            error: <SnackbarIcon icon={infoFill} color="error" />
         }}
         classes={{
            containerRoot: classes.containerRoot,
            // @ts-ignore
            contentRoot: classes.contentRoot,
            message: classes.message,
            action: classes.action,
            variantInfo: classes.info,
            variantSuccess: classes.success,
            variantWarning: classes.warning,
            variantError: classes.error
         }}
      >
         {children}
      </SnackbarProvider>
   );
});

export default NotistackProvider;
