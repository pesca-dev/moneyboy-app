import { SectionHeader } from '@moneyboy/components/general/lists/sectionHeader';
import { MoneyDiff, MoneyDiffProps } from '@moneyboy/components/general/payments/moneyDiff';
import { Content } from '@moneyboy/components/general/structure/content';
import { ViewBase } from '@moneyboy/components/general/structure/viewBase';
import { AuthContext } from '@moneyboy/contexts/authContext';
import { PescaContext } from '@moneyboy/contexts/pescaContext';
import { useStorage } from '@moneyboy/hooks/useStorage';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { NavigationHelpers, ParamListBase, RouteProp } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo } from 'react-native';

type HistoryViewProps = {
  route: RouteProp<ParamListBase, string>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

export const HistoryView: React.FC<HistoryViewProps> = () => {
  const pesca = useContext(PescaContext);
  const { user } = useContext(AuthContext);

  const [payments, setPayments] = useState<Pesca.PaymentInformation[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [storagePayments, setStoragePayments] = useStorage('payments');

  // update payment state
  const updatePayments = useCallback((ps: Pesca.PaymentInformation[]) => {
    setPayments(ps.sort((a, b) => a.date - b.date));
  }, []);

  // on update of storage payments, update state payments
  useEffect(() => {
    updatePayments(storagePayments);
  }, [storagePayments, updatePayments]);

  // get payments from server
  const getPayments = useCallback(() => {
    setRefreshing(true);
    pesca?.getPayments().then(ps => {
      if (ps) {
        // store new payments
        setStoragePayments(ps);
      }
      setRefreshing(false);
    });
  }, [pesca, setStoragePayments]);

  // initially, get all payments
  useEffect(() => {
    getPayments();
  }, [getPayments]);

  const data = [
    {
      title: 'History',
      data: payments.map<MoneyDiffProps>(info => {
        // check, if payment is "against" us
        if (info.to.id === user?.id) {
          return {
            amount: -1 * info.amount,
            id: info.id,
            name: info.from.displayName,
          };
        }
        return {
          amount: info.amount,
          id: info.id,
          name: info.to.displayName,
        };
      }),
    },
  ];

  function renderListItem({
    item: { id, name, amount },
    index,
    section,
  }: SectionListRenderItemInfo<MoneyDiffProps, DefaultSectionT>) {
    return (
      <Content>
        <MoneyDiff id={id} key={id} name={name} amount={amount} last={index === section.data.length - 1} />
      </Content>
    );
  }

  return (
    <ViewBase>
      <SectionList
        sections={data}
        renderItem={renderListItem}
        keyExtractor={({ id }) => id}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader key={`historyview-section-${title}`} header={title} />
        )}
        onRefresh={getPayments}
        refreshing={refreshing}
        stickySectionHeadersEnabled
      />
    </ViewBase>
  );
};
