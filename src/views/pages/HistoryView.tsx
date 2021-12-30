/* eslint-disable react-native/no-inline-styles */
import { MoneyDiff, MoneyDiffProps } from '@components/extended/MoneyDiff';
import { Content } from '@components/structure/Content';
import { SectionHeader } from '@components/structure/SectionHeader';
import { ViewBase } from '@components/structure/ViewBase';
import { AuthContext } from '@context/AuthContext';
import { PescaContext } from '@context/PescaContext';
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { NavigationHelpers, ParamListBase, RouteProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo } from 'react-native';

type HistoryViewProps = {
  route: RouteProp<ParamListBase, any>;
  navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>;
};

export const HistoryView: React.FC<HistoryViewProps> = ({}) => {
  const [payments, setPayents] = useState<Pesca.PaymentInformation[]>([]);
  const pesca = useContext(PescaContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    pesca?.getPayments().then(ps => {
      console.log(ps);
      if (ps) {
        setPayents(ps);
      }
    });
  }, [pesca]);

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
        style={{ flex: 1 }}
        sections={data}
        renderItem={renderListItem}
        keyExtractor={({ id }) => id}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader key={`historyview-section-${title}`} header={title} />
        )}
      />
    </ViewBase>
  );
};
