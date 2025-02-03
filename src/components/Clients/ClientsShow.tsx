import { Show, SimpleShowLayout, TextField } from 'react-admin';

export function ClientsShow() {
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
