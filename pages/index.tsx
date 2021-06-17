import {
   LandingAdvertisement,
   LandingCleanInterfaces,
   LandingDarkMode,
   LandingHero,
   LandingHugePackElements,
   LandingMinimal
} from 'apps/components/_external-pages/landing';
import Page from 'apps/components/Page';
import MainLayout from 'apps/layouts/main';
import { experimentalStyled as styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
   height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
   overflow: 'hidden',
   position: 'relative',
   backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
   return (
      <MainLayout>
         <RootStyle title="The starting point for your next project | Minimal-UI" id="move_top">
            <LandingHero />
            <ContentStyle>
               <LandingMinimal />
               <LandingHugePackElements />
               <LandingDarkMode />
               <LandingCleanInterfaces />
               <LandingAdvertisement />
            </ContentStyle>
         </RootStyle>
      </MainLayout>
   );
}
