import { Show, SimpleShowLayout, TextField } from 'react-admin';

export function PaymentsView() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="status" />
        <TextField source="amount" />
      </SimpleShowLayout>
    </Show>
  );
}
