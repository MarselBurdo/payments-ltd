import { Droppable } from '@hello-pangea/dnd';
import { Box, Stack, Typography } from '@mui/material';

import { Payment } from '@/types';
import { PaymentCard } from './PaymentCard';
import { useConfigurationContext } from '@/root/ConfigurationContext';
import { findPaymentLabel } from './payment';

export const PaymentColumn = ({
    stage,
    payments,
}: {
    stage: string;
    payments: Payment[];
}) => {
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

    const { paymentStages } = useConfigurationContext();
    return (
        <Box
            sx={{
                flex: 1,
                paddingTop: '8px',
                paddingBottom: '16px',
                bgcolor: '#eaeaee',
                '&:first-of-type': {
                    paddingLeft: '5px',
                    borderTopLeftRadius: 5,
                },
                '&:last-of-type': {
                    paddingRight: '5px',
                    borderTopRightRadius: 5,
                },
            }}
        >
            <Stack alignItems="center">
                <Typography variant="subtitle1">
                    {findPaymentLabel(paymentStages, stage)}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontSize="small"
                >
                    {totalAmount.toLocaleString('en-US', {
                        notation: 'compact',
                        style: 'currency',
                        currency: 'USD',
                        currencyDisplay: 'narrowSymbol',
                        minimumSignificantDigits: 3,
                    })}
                </Typography>
            </Stack>
            <Droppable droppableId={stage}>
                {(droppableProvided, snapshot) => (
                    <Box
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                        className={
                            snapshot.isDraggingOver ? ' isDraggingOver' : ''
                        }
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 1,
                            padding: '5px',
                            '&.isDraggingOver': {
                                bgcolor: '#dadadf',
                            },
                        }}
                    >
                        {payments.map((payment, index) => (
                            <PaymentCard key={payment.id} payment={payment} index={index} />
                        ))}
                        {droppableProvided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Box>
    );
};
