/* eslint-disable no-param-reassign */
import { MoneyDiffProps } from '@moneyboy/components/general/payments/MoneyDiff';

type StatisticReducer = {
  users: {
    [key: string]: Pesca.UserInformation;
  };
  statistics: {
    [key: string]: number;
  };
};

type MainScreenPaymentsReducerAction = {
  payments: Pesca.PaymentInformation[];
  user?: Pesca.UserProfileInformation;
};

export const mainScreenPaymentsReducer = (_: MoneyDiffProps[], { payments, user }: MainScreenPaymentsReducerAction) => {
  const statistics = payments.reduce<StatisticReducer>(
    (memo, payment) => {
      const toMe = payment.to.id === user?.id;
      const other = toMe ? payment.from : payment.to;
      const factor = toMe ? -1 : 1;

      if (!memo.users[other.id]) {
        memo.users[other.id] = other;
        memo.statistics[other.id] = 0;
      }

      memo.statistics[other.id] += factor * payment.amount;

      return memo;
    },
    { users: {}, statistics: {} },
  );

  return Object.keys(statistics.users).map<MoneyDiffProps>(id => ({
    amount: statistics.statistics[id],
    id: `statistics-${id}`,
    name: statistics.users[id].displayName,
  }));
};
