/* eslint-disable no-param-reassign */
import { SectionHeader } from '@moneyboy/components/general/lists/SectionHeader';
import { MoneyDiff, MoneyDiffProps } from '@moneyboy/components/general/payments/MoneyDiff';
import { Content } from '@moneyboy/components/general/structure/Content';
import { ViewBase } from '@moneyboy/components/general/structure/ViewBase';
import { useAuth } from '@moneyboy/hooks/useAuth';
import { usePayments } from '@moneyboy/hooks/usePayments';
import React, { useCallback, useEffect, useState } from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo } from 'react-native';
import { useMainStyles } from './Main.style';

function renderListItem({
  item: { name, amount, id },
  // item,
  index,
  section,
}: SectionListRenderItemInfo<MoneyDiffProps, DefaultSectionT>) {
  return (
    <Content>
      <MoneyDiff key={id} id={id} name={name} amount={amount} last={index === section.data.length - 1} />
    </Content>
  );
}

type MainViewProps = unknown;

type StatisticReducer = {
  users: {
    [key: string]: Pesca.UserInformation;
  };
  statistics: {
    [key: string]: number;
  };
};

export const MainView: React.FC<MainViewProps> = () => {
  const { user } = useAuth();
  const { payments, update } = usePayments();

  const [diffs, setDiffs] = useState<MoneyDiffProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // update local payment state
  const updatePayments = useCallback(
    (ps: Pesca.PaymentInformation[]) => {
      const statistics = ps.reduce<StatisticReducer>(
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
      setDiffs(
        Object.keys(statistics.users).map<MoneyDiffProps>(id => ({
          amount: statistics.statistics[id],
          id: `statistics-${id}`,
          name: statistics.users[id].displayName,
        })),
      );
    },
    [user?.id],
  );

  // on update of storage paments, update state payments
  useEffect(() => {
    updatePayments(payments);
  }, [updatePayments, payments]);

  // update all payments
  const getPayments = useCallback(() => {
    setRefreshing(true);
    update().then(() => setRefreshing(false));
  }, [update]);

  const sections = [
    {
      title: 'Statistics',
      data: diffs,
    },
  ];

  const styles = useMainStyles();

  return (
    <ViewBase>
      <SectionList
        style={[styles.scrollView]}
        sections={sections}
        renderItem={renderListItem}
        keyExtractor={({ id }) => `mainview-moneydiff-${id}`}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader key={`mainview-section-${title}`} header={title} />
        )}
        onRefresh={getPayments}
        refreshing={refreshing}
        stickySectionHeadersEnabled
      />
    </ViewBase>
  );
};
