import {
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';

export const ClientsCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
      <TextInput source="email" />
      <NumberInput source="inn" validate={[required()]} />
    </SimpleForm>
  </Create>
);
