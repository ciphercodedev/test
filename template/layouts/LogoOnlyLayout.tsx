import NextLink from 'next/link';
import { FC } from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Logo from '../components/Logo';

// ----------------------------------------------------------------------

interface LogoOnlyLayoutProps {
   children: JSX.Element | JSX.Element[];
}

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
   top: 0,
   left: 0,
   lineHeight: 0,
   width: '100%',
   position: 'absolute',
   padding: theme.spacing(3, 3, 0),
   [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 5, 0)
   }
}));

// ----------------------------------------------------------------------

const LogoOnlyLayout: FC<LogoOnlyLayoutProps> = ({ children }) => {
   return (
      <>
         <HeaderStyle>
            <NextLink href="/">
               <Logo />
            </NextLink>
         </HeaderStyle>
         {children}
      </>
   );
};

export default LogoOnlyLayout;
