/* eslint-disable no-param-reassign */
import { SectionHeader } from '@moneyboy/components/general/lists/sectionHeader';
import { MoneyDiff, MoneyDiffProps } from '@moneyboy/components/general/payments/moneyDiff';
import { Content } from '@moneyboy/components/general/structure/content';
import { ViewBase } from '@moneyboy/components/general/structure/viewBase';
import variables from '@moneyboy/config/variables';
import { AuthContext } from '@moneyboy/context/authContext';
import { PescaContext } from '@moneyboy/context/pescaContext';
import { useStorage } from '@moneyboy/hooks/useStorage';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo, StyleSheet } from 'react-native';

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
  const pesca = useContext(PescaContext);
  const { user } = useContext(AuthContext);

  const [diffs, setDiffs] = useState<MoneyDiffProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [storagePayments, setStoragePayments] = useStorage('payments');

  // update payment state
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
    updatePayments(storagePayments);
  }, [updatePayments, storagePayments]);

  // get payments from server
  const getPayments = useCallback(() => {
    setRefreshing(true);
    pesca?.getPayments().then(ps => {
      if (ps) {
        setStoragePayments(ps);
      }
      setRefreshing(false);
    });
  }, [pesca, setStoragePayments]);

  // initially, get all payments
  useEffect(() => {
    getPayments();
  }, [getPayments]);

  const sections = [
    {
      title: 'Statistics',
      data: diffs,
    },
  ];

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    placeholder: {
      height: variables.display.placeholderTop.height,
    },
  });

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
