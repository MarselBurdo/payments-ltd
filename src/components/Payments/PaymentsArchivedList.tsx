import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useGetIdentity, useGetList } from 'react-admin';

import { DialogCloseButton } from '@/misc/DialogCloseButton';
import { Payment } from '@/types';

import { PaymentCardContent } from './PaymentCard';

export const PaymentsArchivedList = () => {
  const { identity } = useGetIdentity();
  const {
    data: archivedLists,
    total,
    isPending,
  } = useGetList('payments', {
    pagination: { page: 1, perPage: 1000 },
    sort: { field: 'archived_at', order: 'DESC' },
    filter: { 'archived_at@not.is': null },
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!isPending && total === 0) {
      setOpenDialog(false);
    }
  }, [isPending, total]);

  useEffect(() => {
    setOpenDialog(false);
  }, [archivedLists]);

  if (!identity || isPending || !total || !archivedLists) return null;

  // Group archived lists by date
  const archivedListsByDate: { [date: string]: Payment[] } =
    archivedLists.reduce(
      (acc, payment) => {
        const date = new Date(payment.archived_at).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(payment);
        return acc;
      },
      {} as { [date: string]: Deal[] }
    );

  return (
    <>
      <Button variant="text" onClick={() => setOpenDialog(true)} sx={{ my: 1 }}>
        View archived payments
      </Button>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogCloseButton onClose={() => setOpenDialog(false)} />
        <DialogTitle>Archived Deals</DialogTitle>
        <DialogContent>
          <Stack gap={2}>
            {Object.entries(archivedListsByDate).map(([date, payments]) => (
              <Stack key={date} gap={1}>
                <Typography variant="body1" fontWeight="bold">
                  {getRelativeTimeString(date)}
                </Typography>
                <Grid container spacing={2}>
                  {payments.map((payment: Deal) => (
                    <Grid item xs={12} sm={6} md={4} key={payment.id}>
                      <PaymentCardContent payment={payment} />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export function getRelativeTimeString(dateString: string): string {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diff = date.getTime() - today.getTime();
  const unitDiff = Math.round(diff / (1000 * 60 * 60 * 24));

  // Check if the date is more than one week old
  if (Math.abs(unitDiff) > 7) {
    return new Intl.DateTimeFormat(undefined, {
      day: 'numeric',
      month: 'long',
    }).format(date);
  }

  // Intl.RelativeTimeFormat for dates within the last week
  const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });
  return ucFirst(rtf.format(unitDiff, 'day'));
}

function ucFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
