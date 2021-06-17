import Head from 'next/head';
import { forwardRef } from 'react';
import { Box } from '@material-ui/core';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

interface PageProps {
   children: JSX.Element | JSX.Element[];
   title: string;
   sx?: SxProps;
   [key: string]: any;
}

// ----------------------------------------------------------------------

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, title = '', ...other }, ref) => (
   <Box ref={ref} {...other}>
      <Head>
         <title>{title}</title>
      </Head>
      {children}
   </Box>
));

export default Page;
