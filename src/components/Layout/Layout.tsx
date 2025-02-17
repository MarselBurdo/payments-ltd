import { ReactNode, Suspense } from 'react';

import { Container, CssBaseline } from '@mui/material';
import { CheckForApplicationUpdate, Error, Loading } from 'react-admin';
import { ErrorBoundary } from 'react-error-boundary';

import Header from './Header';

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <CssBaseline />
    <Header />
    <Container sx={{ maxWidth: { xl: 1280 } }}>
      <main id="main-content">
        <ErrorBoundary FallbackComponent={Error}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ErrorBoundary>
      </main>
    </Container>
    <CheckForApplicationUpdate interval={30 * 1000} />
  </>
);

export default Layout;
