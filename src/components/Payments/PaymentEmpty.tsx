import { ReactNode } from 'react';

import { LinearProgress, Stack, Typography } from '@mui/material';
import { CreateButton, useGetList } from 'react-admin';
import { matchPath, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { Contact } from '@/types';

import useAppBarHeight from '../../misc/useAppBarHeight';
import { PaymentCreate } from './PaymentCreate';

export const PaymentEmpty = ({ children }: { children?: ReactNode }) => {
  const location = useLocation();
  const matchCreate = matchPath('/payments/create', location.pathname);
  const appbarHeight = useAppBarHeight();

  // get Contact data
  const { data: contacts, isPending: contactsLoading } = useGetList<Contact>(
    'contacts',
    {
      pagination: { page: 1, perPage: 1 },
    }
  );

  if (contactsLoading) return <LinearProgress />;

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={3}
      sx={{
        height: `calc(100dvh - ${appbarHeight}px)`,
      }}
    >
      <img src="./img/empty.svg" alt="No contacts found" />
      {contacts && contacts.length > 0 ? (
        <>
          <Stack gap={0} alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              No payments found
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              It seems your payment list is empty.
            </Typography>
          </Stack>
          <Stack spacing={2} direction="row">
            <CreateButton variant="contained" label="Create payment" />
          </Stack>
          <PaymentCreate open={!!matchCreate} />
          {children}
        </>
      ) : (
        <Stack gap={0} alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            No payments found
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            It seems your contact list is empty.
            <br />
            <Link to="/contacts/create">Add your first contact</Link> before
            creating a payment.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
