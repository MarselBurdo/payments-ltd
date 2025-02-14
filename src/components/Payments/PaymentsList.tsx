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
    <SelectColumnsButton preferenceKey={'payments.dataGrid'} />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const paymentsFilters = [<SearchInput source="q" alwaysOn key="search-input-payments" />];

export function PaymentsList() {
  return (
    <List
      resource={'deals'}
      pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
      perPage={10}
      actions={<ListActions />}
      filters={paymentsFilters}
      key={'deals.dataGrid.list'}
    >
      <DatagridConfigurable preferenceKey={'payments.dataGrid'}>
        <TextField source="name"/>
        <TextField source="amount"/>
        <TextField source="status"/>
        <TextField source="description" />
      </DatagridConfigurable>
    </List>
  );
}
