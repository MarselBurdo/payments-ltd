import {
  Create,
  DateInput,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';

export const PaymentsCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
      <TextInput source="description" multiline={true} />
      <NumberInput source="amount" />
      <DateInput
        label="Publication date"
        source="published_at"
        defaultValue={new Date()}
      />
    </SimpleForm>
  </Create>
);
