import { Draggable } from '@hello-pangea/dnd';
import { Box, Card, Typography } from '@mui/material';
import { ReferenceField, useRedirect } from 'react-admin';
import { CompanyAvatar } from '../Companies/CompanyAvatar';
import { Payment} from '@/types';

export const PaymentCard = ({ payment, index }: { payment: Payment; index: number }) => {
    if (!payment) return null;

    return (
        <Draggable draggableId={String(payment.id)} index={index}>
            {(provided, snapshot) => (
                <PaymentCardContent
                    provided={provided}
                    snapshot={snapshot}
                    payment={payment}
                />
            )}
        </Draggable>
    );
};

export const PaymentCardContent = ({
    provided,
    snapshot,
    payment,
}: {
    provided?: any;
    snapshot?: any;
    payment: Deal;
}) => {
    const redirect = useRedirect();
    const handleClick = () => {
        redirect(`/payments/${payment.id}/show`, undefined, undefined, undefined, {
            _scrollToTop: false,
        });
    };

    return (
        <Box
            sx={{ marginBottom: 1, cursor: 'pointer' }}
            {...provided?.draggableProps}
            {...provided?.dragHandleProps}
            ref={provided?.innerRef}
            onClick={handleClick}
        >
            <Card
                style={{
                    opacity: snapshot?.isDragging ? 0.9 : 1,
                    transform: snapshot?.isDragging ? 'rotate(-2deg)' : '',
                }}
                elevation={snapshot?.isDragging ? 3 : 1}
            >
                <Box padding={1} display="flex">
                    <ReferenceField
                        source="company_id"
                        record={payment}
                        reference="companies"
                        link={false}
                    >
                        <CompanyAvatar width={20} height={20} />
                    </ReferenceField>
                    <Box sx={{ marginLeft: 1 }}>
                        <Typography variant="body2" gutterBottom>
                            {payment.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {payment.amount.toLocaleString('en-US', {
                                notation: 'compact',
                                style: 'currency',
                                currency: 'USD',
                                currencyDisplay: 'narrowSymbol',
                                minimumSignificantDigits: 3,
                            })}
                            {payment.category ? `, ${payment.category}` : ''}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};
