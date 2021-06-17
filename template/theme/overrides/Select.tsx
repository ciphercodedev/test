import dynamic from 'next/dynamic';

const ExpandMoreRoundedIcon = dynamic(import('@material-ui/icons/ExpandMoreRounded'), {
   ssr: false
});

// ----------------------------------------------------------------------

export default function Select() {
   return {
      MuiSelect: {
         defaultProps: {
            IconComponent: ExpandMoreRoundedIcon
         },

         styleOverrides: {
            root: {}
         }
      }
   };
}
