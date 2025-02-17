import * as React from 'react';

import { Box, Card, CardContent } from '@mui/material';
import {
  EditBase,
  Form,
  SaveButton,
  Toolbar,
  useEditContext,
} from 'react-admin';

import { Contact } from '@/types';

import { ContactAside } from './ContactAside';
import { ContactInputs } from './ContactInputs';

export const ContactEdit = () => (
  <EditBase redirect="show">
    <ContactEditContent />
  </EditBase>
);

const ContactEditContent = () => {
  const { isPending, record } = useEditContext<Contact>();
  if (isPending || !record) return null;
  return (
    <Box mt={2} display="flex">
      <Box flex="1">
        <Form>
          <Card>
            <CardContent>
              <ContactInputs />
            </CardContent>
            <Toolbar>
              <SaveButton />
            </Toolbar>
          </Card>
        </Form>
      </Box>
      <ContactAside link="show" />
    </Box>
  );
};
