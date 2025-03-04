import * as React from 'react';

import { CardContent } from '@mui/material';
import { Create, Form, Toolbar } from 'react-admin';

import { CompanyInputs } from './CompanyInputs';

export const CompanyCreate = () => {
  return (
    <Create
      actions={false}
      redirect="show"
      transform={values => {
        // add https:// before website if not present
        if (values.website && !values.website.startsWith('http')) {
          values.website = `https://${values.website}`;
        }
        return values;
      }}
    >
      <Form defaultValues={{ sales_id: 1 }}>
        <CardContent>
          <CompanyInputs />
        </CardContent>
        <Toolbar />
      </Form>
    </Create>
  );
};
