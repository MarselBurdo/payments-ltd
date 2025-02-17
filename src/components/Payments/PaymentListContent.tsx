import { useEffect, useState } from 'react';

import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import isEqual from 'lodash/isEqual';
import { DataProvider, useDataProvider, useListContext } from 'react-admin';

import { useConfigurationContext } from '@/root/ConfigurationContext';
import { Payment } from '@/types';

import { PaymentColumn } from './PaymentColumn';
import { PaymentsByStage, getPaymentsByStage } from './stages';

export const PaymentListContent = () => {
  const { paymentStages } = useConfigurationContext();
  const {
    data: unorderedPayments,
    isPending,
    refetch,
  } = useListContext<Payment>();
  const dataProvider = useDataProvider();

  const [paymentsByStage, setPaymentsByStage] = useState<PaymentsByStage>(
    getPaymentsByStage([], paymentStages)
  );

  useEffect(() => {
    if (unorderedPayments) {
      const newPaymentsByStage = getPaymentsByStage(
        unorderedPayments,
        paymentStages
      );
      if (!isEqual(newPaymentsByStage, paymentsByStage)) {
        setPaymentsByStage(newPaymentsByStage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unorderedPayments]);

  if (isPending) return null;

  const onDragEnd: OnDragEndResponder = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStage = source.droppableId;
    const destinationStage = destination.droppableId;
    const sourcePayment = paymentsByStage[sourceStage][source.index]!;
    const destinationPayment = paymentsByStage[destinationStage][
      destination.index
    ] ?? {
      stage: destinationStage,
      index: undefined, // undefined if dropped after the last item
    };

    // compute local state change synchronously
    setPaymentsByStage(
      updatePaymentStageLocal(
        sourcePayment,
        { stage: sourceStage, index: source.index },
        { stage: destinationStage, index: destination.index },
        paymentsByStage
      )
    );

    // persist the changes
    updatePaymentStage(sourcePayment, destinationPayment, dataProvider).then(
      () => {
        refetch();
      }
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex">
        {paymentStages.map(stage => (
          <PaymentColumn
            stage={stage.value}
            payments={paymentsByStage[stage.value]}
            key={stage.value}
          />
        ))}
      </Box>
    </DragDropContext>
  );
};

const updatePaymentStageLocal = (
  sourcePayment: Payment,
  source: { stage: string; index: number },
  destination: {
    stage: string;
    index?: number; // undefined if dropped after the last item
  },
  paymentsByStage: PaymentsByStage
) => {
  if (source.stage === destination.stage) {
    // moving payment inside the same column
    const column = paymentsByStage[source.stage];
    column.splice(source.index, 1);
    column.splice(destination.index ?? column.length + 1, 0, sourcePayment);
    return {
      ...paymentsByStage,
      [destination.stage]: column,
    };
  } else {
    // moving payment across columns
    const sourceColumn = paymentsByStage[source.stage];
    const destinationColumn = paymentsByStage[destination.stage];
    sourceColumn.splice(source.index, 1);
    destinationColumn.splice(
      destination.index ?? destinationColumn.length + 1,
      0,
      sourcePayment
    );
    return {
      ...paymentsByStage,
      [source.stage]: sourceColumn,
      [destination.stage]: destinationColumn,
    };
  }
};

const updatePaymentStage = async (
  source: Payment,
  destination: {
    stage: string;
    index?: number; // undefined if dropped after the last item
  },
  dataProvider: DataProvider
) => {
  if (source.stage === destination.stage) {
    // moving payment inside the same column
    // Fetch all the payments in this stage (because the list may be filtered, but we need to update even non-filtered payments)
    const { data: columnPayments } = await dataProvider.getList('payments', {
      sort: { field: 'index', order: 'ASC' },
      pagination: { page: 1, perPage: 100 },
      filter: { stage: source.stage },
    });
    const destinationIndex = destination.index ?? columnPayments.length + 1;

    if (source.index > destinationIndex) {
      // payment moved up, eg
      // dest   src
      //  <------
      // [4, 7, 23, 5]
      await Promise.all([
        // for all payments between destinationIndex and source.index, increase the index
        ...columnPayments
          .filter(
            payment =>
              payment.index >= destinationIndex && payment.index < source.index
          )
          .map(payment =>
            dataProvider.update('payments', {
              id: payment.id,
              data: { index: payment.index + 1 },
              previousData: payment,
            })
          ),
        // for the payment that was moved, update its index
        dataProvider.update('payments', {
          id: source.id,
          data: { index: destinationIndex },
          previousData: source,
        }),
      ]);
    } else {
      // payment moved down, e.g
      // src   dest
      //  ------>
      // [4, 7, 23, 5]
      await Promise.all([
        // for all payments between source.index and destinationIndex, decrease the index
        ...columnPayments
          .filter(
            payment =>
              payment.index <= destinationIndex && payment.index > source.index
          )
          .map(payment =>
            dataProvider.update('payments', {
              id: payment.id,
              data: { index: payment.index - 1 },
              previousData: payment,
            })
          ),
        // for the payment that was moved, update its index
        dataProvider.update('payments', {
          id: source.id,
          data: { index: destinationIndex },
          previousData: source,
        }),
      ]);
    }
  } else {
    // moving payment across columns
    // Fetch all the payments in both stages (because the list may be filtered, but we need to update even non-filtered payments)
    const [{ data: sourcePayments }, { data: destinationPayments }] =
      await Promise.all([
        dataProvider.getList('payments', {
          sort: { field: 'index', order: 'ASC' },
          pagination: { page: 1, perPage: 100 },
          filter: { stage: source.stage },
        }),
        dataProvider.getList('payments', {
          sort: { field: 'index', order: 'ASC' },
          pagination: { page: 1, perPage: 100 },
          filter: { stage: destination.stage },
        }),
      ]);
    const destinationIndex =
      destination.index ?? destinationPayments.length + 1;

    await Promise.all([
      // decrease index on the payments after the source index in the source columns
      ...sourcePayments
        .filter(payment => payment.index > source.index)
        .map(payment =>
          dataProvider.update('payments', {
            id: payment.id,
            data: { index: payment.index - 1 },
            previousData: payment,
          })
        ),
      // increase index on the payments after the destination index in the destination columns
      ...destinationPayments
        .filter(payment => payment.index >= destinationIndex)
        .map(payment =>
          dataProvider.update('payments', {
            id: payment.id,
            data: { index: payment.index + 1 },
            previousData: payment,
          })
        ),
      // change the dragged payment to take the destination index and column
      dataProvider.update('payments', {
        id: source.id,
        data: {
          index: destinationIndex,
          stage: destination.stage,
        },
        previousData: source,
      }),
    ]);
  }
};
