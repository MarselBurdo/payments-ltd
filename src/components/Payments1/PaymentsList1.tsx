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
  ChipField,
  DateField
} from 'react-admin';

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton preferenceKey={'payments.dataGrid'} />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const paymentsFilters = [
  <SearchInput source="q" alwaysOn key="search-input-payments" />,
];

export function PaymentsList1() {
  return (
    <List
      resource={'payments'}
      pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]} />}
      perPage={10}
      actions={<ListActions />}
      filters={paymentsFilters}
      key={'payments.dataGrid.list'}
    >
      <DatagridConfigurable preferenceKey={'payments.dataGrid'}>
        <TextField source="name" />
        <TextField source="category" />
        <ChipField source="stage" variant={'outline'}/>
        <TextField source="amount" />
        <DateField source="created_at"  label={'Create(date)'} locales={'ru'}/>
        <DateField source="updated_at" label={'Done(date)'} locales={'ru'}/>
        <TextField source="description" />
      </DatagridConfigurable>
    </List>
  );
}
