import * as React from 'react';

import { Box, Card, CardContent } from '@mui/material';
import { CreateBase, Form, Toolbar, useGetIdentity } from 'react-admin';

import { Contact } from '@/types';

import { ContactInputs } from './ContactInputs';

export const ContactCreate = () => {
  const { identity } = useGetIdentity();
  return (
    <CreateBase
      redirect="show"
      transform={(data: Contact) => ({
        ...data,
        first_seen: new Date().toISOString(),
        last_seen: new Date().toISOString(),
        tags: [],
      })}
    >
      <Box mt={2} display="flex">
        <Box flex="1">
          <Form defaultValues={{ sales_id: identity?.id }}>
            <Card>
              <CardContent>
                <ContactInputs />
              </CardContent>
              <Toolbar />
            </Card>
          </Form>
        </Box>
      </Box>
    </CreateBase>
  );
};
