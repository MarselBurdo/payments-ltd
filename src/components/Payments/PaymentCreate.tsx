import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import {
  Create,
  Form,
  GetListResult,
  SaveButton,
  Toolbar,
  useDataProvider,
  useGetIdentity,
  useListContext,
  useRedirect,
} from 'react-admin';

import { DialogCloseButton } from '@/misc/DialogCloseButton';
import { Payment } from '@/types';

import { PaymentInputs } from './PaymentDealInputs';

export const PaymentCreate = ({ open }: { open: boolean }) => {
  const redirect = useRedirect();
  const dataProvider = useDataProvider();
  const { data: allPayments } = useListContext<Payment>();

  const handleClose = () => {
    redirect('/payments');
  };

  const queryClient = useQueryClient();

  const onSuccess = async (payment: Payment) => {
    if (!allPayments) {
      redirect('/payments');
      return;
    }
    // increase the index of all payments in the same stage as the new payment
    // first, get the list of payments in the same stage
    const payments = allPayments.filter(
      (d: Payment) => d.stage === payment.stage && d.id !== payment.id
    );
    // update the actual payments in the database
    await Promise.all(
      payments.map(async oldPayment =>
        dataProvider.update('payments', {
          id: oldPayment.id,
          data: { index: oldPayment.index + 1 },
          previousData: oldPayment,
        })
      )
    );
    // refresh the list of payments in the cache as we used dataProvider.update(),
    // which does not update the cache
    const paymentsById = payments.reduce(
      (acc, d) => ({
        ...acc,
        [d.id]: { ...d, index: d.index + 1 },
      }),
      {} as { [key: string]: Payment }
    );
    const now = Date.now();
    queryClient.setQueriesData<GetListResult | undefined>(
      { queryKey: ['payments', 'getList'] },
      res => {
        if (!res) return res;
        return {
          ...res,
          data: res.data.map((d: Payment) => paymentsById[d.id] || d),
        };
      },
      { updatedAt: now }
    );
    redirect('/payments');
  };

  const { identity } = useGetIdentity();

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <Create<Payment>
        resource="payments"
        mutationOptions={{ onSuccess }}
        sx={{ '& .RaCreate-main': { mt: 0 } }}
      >
        <DialogCloseButton onClose={handleClose} />
        <DialogTitle
          sx={{
            paddingBottom: 0,
          }}
        >
          Create a new payment
        </DialogTitle>
        <Form
          defaultValues={{
            sales_id: identity?.id,
            contact_ids: [],
            index: 0,
          }}
        >
          <DialogContent>
            <PaymentInputs />
          </DialogContent>
          <Toolbar>
            <SaveButton />
          </Toolbar>
        </Form>
      </Create>
    </Dialog>
  );
};
