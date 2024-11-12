import { AppBar, AppBarProps, Layout, LayoutProps } from 'react-admin';
import { Typography } from '@mui/material';
import { JSX } from 'react';
import { ClerkLoading, ClerkLoaded, UserButton } from '@clerk/nextjs';
import { Loader } from 'lucide-react';

const CustomAppBar = (props: JSX.IntrinsicAttributes & AppBarProps) => (
    <AppBar {...props}>
      <Typography
          fontStyle="Poppins"
          variant="h6"
          color="inherit"
          id="react-admin-title"
          style={{ flex: 1 }}
      >
      </Typography>
      <ClerkLoading>
        <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton afterSignOutUrl="/" />
      </ClerkLoaded>
    </AppBar>
);

const CustomLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => <Layout {...props} appBar={CustomAppBar} />;

export default CustomLayout;
