import {
  CreateButton,
  DatagridConfigurable,
  ExportButton,
  List,
  Pagination,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from 'react-admin';

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton preferenceKey={'clients.dataGrid'} />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const clientsFilters = [
  <SearchInput source="q" alwaysOn key="search-input-clients" />,
];

export function ClientsList() {
  return (
    <List
      resource={'companies'}
      pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
      perPage={10}
      actions={<ListActions />}
      filters={clientsFilters}
    >
      <DatagridConfigurable preferenceKey={'clients.dataGrid'}>
        <TextField source="name" />
        <TextField source="inn" />
        <TextField source="id" />
        <TextField source="email" />
      </DatagridConfigurable>
    </List>
  );
}
