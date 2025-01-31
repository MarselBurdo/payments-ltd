import {  List, Datagrid, TextField, Pagination, useTranslate } from "react-admin";


export function PaymentsList(){
    const translate = useTranslate();
    return <List resource={'payments'} pagination={<Pagination rowsPerPageOptions={[10, 25, 50, 100]}/>} perPage={10} >
        <Datagrid>
            <TextField source="name"/>
            <TextField source="amount" />
            <TextField source="status" label={translate('resources.payments.fields.status')}/>
            <TextField source="description" />
        </Datagrid>
    </List>
}