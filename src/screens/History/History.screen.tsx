import { SectionHeader } from '@moneyboy/components/general/lists/SectionHeader';
import { PaymentListItem, PaymentProps } from '@moneyboy/components/general/payments/PaymentListItem';
import { Content } from '@moneyboy/components/general/structure/Content';
import { ViewBase } from '@moneyboy/components/general/structure/ViewBase';
import { useAuth } from '@moneyboy/hooks/useAuth';
import { usePayments } from '@moneyboy/hooks/usePayments';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { NavigationHelpers, ParamListBase, RouteProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo } from 'react-native';

type HistoryViewProps = {
  route: RouteProp<ParamListBase, string>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

export const HistoryView: React.FC<HistoryViewProps> = () => {
  const { user } = useAuth();
  const { payments, update } = usePayments();

  const [localPayments, setLocalPayments] = useState<Pesca.PaymentInformation[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // update payment state
  const updatePayments = useCallback((ps: Pesca.PaymentInformation[]) => {
    setLocalPayments(ps.sort((a, b) => b.date - a.date));
  }, []);

  // on update of storage payments, update state payments
  useEffect(() => {
    updatePayments(payments);
  }, [payments, updatePayments]);

  // get payments from server
  const getPayments = useCallback(() => {
    setRefreshing(true);
    update().then(() => setRefreshing(false));
  }, [setRefreshing, update]);

  const data = [
    {
      title: 'History',
      data: localPayments,
    },
  ];

  function renderListItem({ item, index, section }: SectionListRenderItemInfo<PaymentProps, DefaultSectionT>) {
    return (
      <Content>
        <PaymentListItem last={index === section.data.length - 1} {...item} />
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
