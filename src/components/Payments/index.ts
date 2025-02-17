/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';

const PaymentList = React.lazy(() => import('./PaymentList'));

export default {
  list: PaymentList,
};
