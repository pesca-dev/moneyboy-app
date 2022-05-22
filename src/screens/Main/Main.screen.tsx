import { SectionHeader } from '@moneyboy/components/general/lists/SectionHeader';
import { MoneyDiff, MoneyDiffProps } from '@moneyboy/components/general/payments/MoneyDiff';
import { Content } from '@moneyboy/components/general/structure/Content';
import { ViewBase } from '@moneyboy/components/general/structure/ViewBase';
import { useAuth } from '@moneyboy/hooks/useAuth';
import { usePayments } from '@moneyboy/hooks/usePayments';
import { mainScreenPaymentsReducer } from '@moneyboy/reducers/mainScreenPayments';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
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

export const MainView: React.FC<MainViewProps> = () => {
  const { user } = useAuth();
  const { payments, update } = usePayments();

  const [diffs, setDiffs] = useReducer(mainScreenPaymentsReducer, []);
  const [refreshing, setRefreshing] = useState(false);

  // on update of storage paments, update state payments
  useEffect(() => {
    setDiffs({ payments, user });
  }, [setDiffs, payments, user]);

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
