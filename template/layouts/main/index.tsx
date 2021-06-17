import { useRouter } from 'next/router';
import { FC } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Box, Container, Link, Typography } from '@material-ui/core';
import Logo from '../../components/Logo';
import MainFooter from './MainFooter';
import MainNavbar from './MainNavbar';

// ----------------------------------------------------------------------

interface MainLayoutProps {
   children: JSX.Element | JSX.Element[];
}

// ----------------------------------------------------------------------

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
   const { pathname } = useRouter();
   const isHome = pathname === '/';

   return (
      <>
         <MainNavbar />
         <div>{children}</div>

         {!isHome ? (
            <MainFooter />
         ) : (
            <Box
               sx={{
                  py: 5,
                  textAlign: 'center',
                  position: 'relative',
                  bgcolor: 'background.default'
               }}
            >
               <Container maxWidth="lg">
                  <ScrollLink to="move_top" spy smooth>
                     <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
                  </ScrollLink>

                  <Typography variant="caption" component="p">
                     © All rights reserved
                     <br /> made by &nbsp;
                     <Link href="https://minimals.cc/">minimals.cc</Link>
                  </Typography>
               </Container>
            </Box>
         )}
      </>
   );
};

export default MainLayout;
