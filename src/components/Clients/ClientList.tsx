import {
    List,
    DatagridConfigurable,
    TextField,
    Pagination,
    TopToolbar,
    SelectColumnsButton,
    CreateButton,
    ExportButton,
    SearchInput,
} from "react-admin";

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);

const clientsFilters = [
    <SearchInput source="q" alwaysOn/>,
];

export function ClientList() {
    return <List resource={'clients'} pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]}/>} perPage={10}
                 actions={<ListActions/>} filters={clientsFilters}>

        <DatagridConfigurable>

            <TextField source="name"/>
            <TextField source="inn"/>
            <TextField source="id"/>
            <TextField source="email"/>
        </DatagridConfigurable>

    </List>
}