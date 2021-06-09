import MoneyDiff from '@components/extended/MoneyDiff';
import SectionHeader from '@components/structure/SectionHeader';
import Container from '@components/structure/Container';
import Content from '@components/structure/Content';
import variables from '@config/variables';
import React from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo, StyleSheet, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

const data = [
  {
    title: 'Groups',
    data: [
      {
        text: 'Hello',
      },
      {
        text: 'Hello',
      },
      {
        text: 'Hello',
      },
      {
        text: 'Hello',
      },
    ],
  },
];

function renderListItem({ item, index, section }: SectionListRenderItemInfo<{ text: string }, DefaultSectionT>) {
  return (
    <Content>
      <MoneyDiff key={uuid()} name={item.text} amount={0} last={index === section.data.length - 1} />
    </Content>
  );
}

export default function GroupView() {
  return (
    <>
      <Container>
        <View style={[styles.placeholder]} />
        <SectionList
          sections={data}
          keyExtractor={() => uuid()}
          renderItem={renderListItem}
          renderSectionHeader={({ section: { title } }) => <SectionHeader key={uuid()} header={title} />}
        />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  placeholder: {
    height: variables.display.placeholderTop.height,
  },
});
