import * as React from 'react';

import { CardContent } from '@mui/material';
import { Edit, Form, Toolbar } from 'react-admin';

import { CompanyAside } from './CompanyAside';
import { CompanyInputs } from './CompanyInputs';

export const CompanyEdit = () => (
  <Edit
    aside={<CompanyAside link="show" />}
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
    <Form>
      <CardContent>
        <CompanyInputs />
      </CardContent>
      <Toolbar />
    </Form>
  </Edit>
);
