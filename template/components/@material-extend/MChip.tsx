import { forwardRef } from 'react';
import { Chip, ChipTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { alpha, emphasize, experimentalStyled as styled, Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

type Color = 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

type Variant = 'filled' | 'outlined';

type OnDelete = () => void;

interface StyleProps {
   color: Color;
   variant: Variant;
   clickable: boolean;
   onDelete: OnDelete;
}

interface StyledComponentProps {
   theme?: Theme;
   styleProps: StyleProps;
}

interface MChipProps {
   clickable?: boolean;
   onDelete: OnDelete;
   color?: Color;
   variant?: Variant;
   sx?: SxProps;
   [key: string]: any;
}

// ----------------------------------------------------------------------

const ChipStyle = styled<OverridableComponent<ChipTypeMap<StyledComponentProps, 'div'>>>(Chip)(
   ({ theme, styleProps }) => {
      const { color, variant, clickable, onDelete } = styleProps;

      // Filled
      const styleFilled = (color) => ({
         color: theme.palette[color].contrastText,
         backgroundColor: theme.palette[color].main,
         '& .MuiChip-icon': { color: 'inherit' },
         '& .MuiChip-avatar': {
            color: theme.palette[color].lighter,
            backgroundColor: theme.palette[color].dark
         },
         '& .MuiChip-deleteIcon': {
            color: alpha(theme.palette[color].contrastText, 0.7),
            '&:hover, &:active': { color: theme.palette[color].contrastText }
         }
      });

      const styleFilledClickable = (color) => ({
         '&:hover, &:focus': {
            backgroundColor: emphasize(theme.palette[color].main, theme.palette.action.hoverOpacity)
         }
      });

      const styleFilledDeletable = (color) => ({
         '&:focus': {
            backgroundColor: emphasize(theme.palette[color].main, theme.palette.action.focusOpacity)
         }
      });

      // Outlined
      const styleOutlined = (color) => ({
         color: theme.palette[color].main,
         border: `1px solid ${theme.palette[color].main}`,
         '&:focus, &.MuiChip-clickable:hover': {
            backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
         },
         '& .MuiChip-icon': { color: 'currentColor' },
         '& .MuiChip-avatar': {
            color: theme.palette[color].lighter,
            backgroundColor: theme.palette[color].dark
         },
         '& .MuiChip-deleteIcon': {
            color: alpha(theme.palette[color].main, 0.7),
            '&:hover, &:active': { color: theme.palette[color].main }
         }
      });

      return {
         ...(variant === 'filled'
            ? {
                 ...styleFilled(color),
                 ...(clickable && { ...styleFilledClickable(color) }),
                 ...(onDelete && { ...styleFilledDeletable(color) })
              }
            : {
                 ...styleOutlined(color)
              })
      };
   }
);

// ----------------------------------------------------------------------

const Mchip = forwardRef<HTMLDivElement, MChipProps>(
   (
      {
         color = 'default',
         variant = 'filled',
         clickable: clickableProp,
         onDelete: onDeleteProp,
         children,
         ...other
      },
      ref
   ) => {
      if (color === 'default' || color === 'primary' || color === 'secondary') {
         return (
            <Chip
               ref={ref}
               color={color}
               variant={variant}
               clickable={clickableProp && clickableProp}
               onDelete={onDeleteProp && onDeleteProp}
               {...other}
            />
         );
      }

      return (
         <ChipStyle
            ref={ref}
            variant={variant}
            clickable={clickableProp && clickableProp}
            onDelete={onDeleteProp && onDeleteProp}
            styleProps={{
               color,
               variant,
               clickable: clickableProp && clickableProp,
               onDelete: onDeleteProp && onDeleteProp
            }}
            {...other}
         />
      );
   }
);

export default Mchip;
