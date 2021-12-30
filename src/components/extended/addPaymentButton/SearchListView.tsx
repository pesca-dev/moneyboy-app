import { EnterPaymentViewParams } from '@components/extended/addPaymentButton/EnterPaymentView';
import { PescaButton } from '@components/input/PescaButton';
import { PescaInputField } from '@components/input/PescaInputField';
import { ScreenComponentProps } from '@components/navigation/pesca-navigator/pescaScreen';
import { ListItem } from '@components/structure/ListItem';
import { StyleContext } from '@context/StyleContext';
import React, { useContext, useState } from 'react';
import { Insets, SectionList, SectionListData, SectionListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

type SectionData = {
  id: string;
  name: string;
};

const users: SectionData[] = [
  {
    name: 'User a',
    id: uuid(),
  },
  {
    name: 'User b',
    id: uuid(),
  },
  {
    name: 'User c',
    id: uuid(),
  },
  {
    name: 'User d',
    id: uuid(),
  },
  {
    name: 'User e',
    id: uuid(),
  },
  {
    name: 'User f',
    id: uuid(),
  },
  {
    name: 'User g',
    id: uuid(),
  },
  {
    name: 'User h',
    id: uuid(),
  },
  {
    name: 'User i',
    id: uuid(),
  },
];

const groups: SectionData[] = [
  {
    name: 'Group a',
    id: uuid(),
  },
  {
    name: 'Group b',
    id: uuid(),
  },
  {
    name: 'Group c',
    id: uuid(),
  },
  {
    name: 'Group d',
    id: uuid(),
  },
  {
    name: 'Group e',
    id: uuid(),
  },
  {
    name: 'Group f',
    id: uuid(),
  },
  {
    name: 'Group g',
    id: uuid(),
  },
  {
    name: 'Group h',
    id: uuid(),
  },
  {
    name: 'Group i',
    id: uuid(),
  },
  {
    name: 'Group j',
    id: uuid(),
  },
];

type SectionT = {
  title: string;
  data: SectionData[];
};

const sections: SectionT[] = [
  {
    title: 'Users',
    data: users,
  },
  {
    title: 'Groups',
    data: groups,
  },
];

export const SearchListView: React.FC<ScreenComponentProps<any, EnterPaymentViewParams>> = ({ navigation }) => {
  const [value, setValue] = useState('');
  function onSubmit() {
    console.log('submit');
  }

  const hitSlop: Insets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  const { Buttons, Flyouts, Content, Texts, Input } = useContext(StyleContext);
  const styles = StyleSheet.create({
    flyoutHeaderContainer: {
      marginBottom: 10,
    },
    flyoutHeading: {
      color: Flyouts.heading.color,
      fontSize: Flyouts.heading.fontSize,
      fontWeight: 'bold',
    },
    submitButtonContainer: {
      width: '100%',
      backgroundColor: Buttons.primary.active.background,
      padding: 5,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText: {
      color: Buttons.primary.active.color,
    },
    inputLabel: {
      color: Input.label.color,
    },
    sectionHeaderContainer: {
      paddingVertical: 5,
      backgroundColor: Content.background.dp00,
    },
    sectionHeaderLabel: {
      fontWeight: 'bold',
      color: Texts.colors.primary,
    },
    list: {
      flexGrow: 0,
    },
    listItem: {
      fontSize: 16,
      color: Texts.colors.primary,
    },
  });

  function renderItem({ item, index, section }: SectionListRenderItemInfo<SectionData, SectionT>) {
    return (
      <ListItem
        last={index === section.data.length - 1}
        key={item.id}
        onPress={() =>
          navigation.next({
            item,
          })
        }>
        <Text style={[styles.listItem]}>{item.name}</Text>
      </ListItem>
    );
  }

  function renderSectionHeader({ section: { title } }: { section: SectionListData<any, SectionT> }) {
    return (
      <View style={[styles.sectionHeaderContainer]}>
        <Text style={[styles.sectionHeaderLabel]}>{title}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={[styles.flyoutHeaderContainer]}>
        <PescaInputField label="Search for a user" value={value} onChangeText={setValue} onSubmitEditing={onSubmit} />
        <PescaButton onPress={onSubmit} hitSlop={hitSlop}>
          <View style={[styles.submitButtonContainer]}>
            <Text style={[styles.submitButtonText]}>Search</Text>
          </View>
        </PescaButton>
      </View>
      <SectionList
        initialNumToRender={20}
        sections={sections
          .map(s => {
            return {
              ...s,
              data: s.data.filter(d => d.name.toLowerCase().includes(value.toLowerCase())),
            };
          })
          .filter(s => s.data.length > 0)}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        style={[styles.list]}
      />
    </>
  );
};
