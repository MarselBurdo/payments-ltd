import {  List, Datagrid, TextField, Pagination } from "react-admin";


export function PaymentsList(){
    return <List resource={'payments'} pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]}/>} perPage={10} >
        <Datagrid>
            <TextField source="name"/>
            <TextField source="amount" />
            <TextField source="status"/>
            <TextField source="description" />
        </Datagrid>
    </List>
}