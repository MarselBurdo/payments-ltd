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
            <DealLayout />
        </ListBase>
    );
};

const DealLayout = () => {
    const location = useLocation();
    const matchCreate = matchPath('/deals/create', location.pathname);
    const matchShow = matchPath('/deals/:id/show', location.pathname);
    const matchEdit = matchPath('/deals/:id', location.pathname);

    const { dealCategories } = useConfigurationContext();

    const dealFilters = [
        <SearchInput source="q" alwaysOn />,
        <ReferenceInput source="company_id" reference="companies" />,
        <SelectInput
            source="category"
            label="Category"
            choices={dealCategories.map(type => ({ id: type, name: type }))}
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
            <Title title={'Deals'} />
            <ListToolbar filters={dealFilters} actions={<DealActions />} />
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

const DealActions = () => {
    return (
        <TopToolbar>
            <FilterButton />
            <ExportButton />
            <CreateButton
                variant="contained"
                label="New Deal"
                sx={{ marginLeft: 2 }}
            />
        </TopToolbar>
    );
};

export default PaymentList;
