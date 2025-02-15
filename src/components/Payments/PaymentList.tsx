import {
    CreateButton,
    ExportButton,
    FilterButton,
    ListBase,
    ListToolbar,
    ReferenceInput,
    SearchInput,
    SelectInput,
    Title,
    TopToolbar,
    useGetIdentity,
    useListContext,
} from 'react-admin';
import { matchPath, useLocation } from 'react-router';

import { Card, Stack } from '@mui/material';
import { useConfigurationContext } from '@/root/ConfigurationContext';
import { PaymentsArchivedList } from './PaymentsArchivedList';
import { PaymentCreate } from './PaymentCreate';
import { PaymentEdit } from './PaymentEdit';
import { PaymentEmpty } from './PaymentEmpty';
import { PaymentListContent } from './PaymentListContent';
import { PaymentShow } from './PaymentShow';
import { OnlyMineInput } from './OnlyMineInput';

const PaymentList = () => {
    const { identity } = useGetIdentity();

    if (!identity) return null;
    return (
        <ListBase
            perPage={100}
            filter={{
                'archived_at@is': null,
            }}
            sort={{ field: 'index', order: 'DESC' }}
        >
            <PaymentLayout />
        </ListBase>
    );
};

const PaymentLayout = () => {
    const location = useLocation();
    const matchCreate = matchPath('/payments/create', location.pathname);
    const matchShow = matchPath('/payments/:id/show', location.pathname);
    const matchEdit = matchPath('/payments/:id', location.pathname);

    const { paymentCategories } = useConfigurationContext();

    const paymentFilters = [
        <SearchInput source="q" alwaysOn />,
        <ReferenceInput source="company_id" reference="companies" />,
        <SelectInput
            source="category"
            label="Category"
            choices={paymentCategories.map(type => ({ id: type, name: type }))}
        />,
        <OnlyMineInput source="sales_id" alwaysOn />,
    ];

    const { data, isPending, filterValues } = useListContext();
    const hasFilters = filterValues && Object.keys(filterValues).length > 0;

    if (isPending) return null;
    if (!data?.length && !hasFilters)
        return (
            <>
                <PaymentEmpty>
                    <PaymentShow open={!!matchShow} id={matchShow?.params.id} />
                    <PaymentsArchivedList />
                </PaymentEmpty>
            </>
        );

    return (
        <Stack component="div" sx={{ width: '100%' }}>
            <Title title={'Payments'} />
            <ListToolbar filters={paymentFilters} actions={<PaymentActions />} />
            <Card>
                <PaymentListContent />
            </Card>
            <PaymentsArchivedList />
            <PaymentCreate open={!!matchCreate} />
            <PaymentEdit
                open={!!matchEdit && !matchCreate}
                id={matchEdit?.params.id}
            />
            <PaymentShow open={!!matchShow} id={matchShow?.params.id} />
        </Stack>
    );
};

const PaymentActions = () => {
    return (
        <TopToolbar>
            <FilterButton />
            <ExportButton />
            <CreateButton
                variant="contained"
                label="New Payment"
                sx={{ marginLeft: 2 }}
            />
        </TopToolbar>
    );
};

export default PaymentList;
