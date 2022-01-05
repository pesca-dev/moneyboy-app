import { MoneyDiff, MoneyDiffProps } from '@components/extended/MoneyDiff';
import { Content } from '@components/structure/Content';
import { SectionHeader } from '@components/structure/SectionHeader';
import { ViewBase } from '@components/structure/ViewBase';
import { AuthContext } from '@context/AuthContext';
import { PescaContext } from '@context/PescaContext';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { NavigationHelpers, ParamListBase, RouteProp } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo } from 'react-native';

type HistoryViewProps = {
  route: RouteProp<ParamListBase, string>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

export const HistoryView: React.FC<HistoryViewProps> = () => {
  const [payments, setPayents] = useState<Pesca.PaymentInformation[]>([]);
  const pesca = useContext(PescaContext);
  const { user } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);

  const getPayments = useCallback(() => {
    setRefreshing(true);
    pesca?.getPayments().then(ps => {
      if (ps) {
        setPayents(ps.sort((a, b) => a.date - b.date));
      }
      setRefreshing(false);
    });
  }, [pesca]);

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
