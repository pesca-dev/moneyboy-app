import PescaButton from '@components/input/PescaButton';
import PescaInputField from '@components/input/PescaInputField';
import Flyout from '@components/structure/Flyout';
import ListItem from '@components/structure/ListItem';
import { ThemeContext } from '@context/ThemeContext';
import React, { useContext, useState } from 'react';
import { Insets, SectionList, SectionListData, SectionListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IconStyle = {
  fontSize: number;
  color: string;
};

type AddPaymentButtonProps = {
  onPress?(): void;
  iconStyle?: IconStyle;
};

enum SectionType {
  user,
  group,
}

type UserSectionData = {
  username: string;
  id: string;
};

const users: UserSectionData[] = [
  {
    username: 'User a',
    id: uuid(),
  },
  {
    username: 'User b',
    id: uuid(),
  },
  {
    username: 'User c',
    id: uuid(),
  },
  {
    username: 'User d',
    id: uuid(),
  },
  {
    username: 'User e',
    id: uuid(),
  },
  {
    username: 'User f',
    id: uuid(),
  },
  {
    username: 'User g',
    id: uuid(),
  },
  {
    username: 'User h',
    id: uuid(),
  },
  {
    username: 'User i',
    id: uuid(),
  },
];

type GroupSectionData = {
  groupName: string;
  id: string;
};

const groups: GroupSectionData[] = [
  {
    groupName: 'Group a',
    id: uuid(),
  },
  {
    groupName: 'Group b',
    id: uuid(),
  },
  {
    groupName: 'Group c',
    id: uuid(),
  },
  {
    groupName: 'Group d',
    id: uuid(),
  },
  {
    groupName: 'Group e',
    id: uuid(),
  },
  {
    groupName: 'Group f',
    id: uuid(),
  },
  {
    groupName: 'Group g',
    id: uuid(),
  },
  {
    groupName: 'Group h',
    id: uuid(),
  },
  {
    groupName: 'Group i',
    id: uuid(),
  },
  {
    groupName: 'Group j',
    id: uuid(),
  },
];

type SectionT = {
  title: string;
  type: SectionType;
  data: any[];
};

const sections: SectionT[] = [
  {
    title: 'Users',
    type: SectionType.user,
    data: users,
  },
  {
    title: 'Groups',
    type: SectionType.group,
    data: groups,
  },
];

export default function AddPaymentButton({ onPress, iconStyle }: AddPaymentButtonProps) {
  const [value, setValue] = useState('');
  const [isOpen, setOpen] = useState(false);

  function onAddPaymentButtonPress() {
    setOpen(true);
    onPress?.();
  }

  function onSubmit() {
    console.log('submit');
  }

  const hitSlop: Insets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  const theme = useContext(ThemeContext);
  const styles = StyleSheet.create({
    addPaymentButton: {
      marginRight: 15,
      paddingRight: 15,
      borderColor: theme.buttons.add.color,
      borderRightWidth: 1,
    },
    flyoutContent: {
      maxHeight: '100%',
    },
    flyoutHeaderContainer: {
      marginBottom: 10,
    },
    flyoutHeading: {
      color: theme.flyout.heading.color,
      fontSize: theme.flyout.heading.fontSize,
      fontWeight: 'bold',
    },
    submitButtonContainer: {
      width: '100%',
      backgroundColor: theme.buttons.default.background,
      padding: 5,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText: {
      color: theme.buttons.default.color,
    },
  });

  function renderUserItem(item: UserSectionData) {
    return <Text style={{ fontSize: 16 }}>{item.username}</Text>;
  }

  function renderGroupItem(item: GroupSectionData) {
    return <Text style={{ fontSize: 16 }}>{item.groupName}</Text>;
  }

  function renderItem({
    item,
    index,
    section,
  }: SectionListRenderItemInfo<UserSectionData | GroupSectionData, SectionT>) {
    switch (section.type) {
      case SectionType.user: {
        return (
          <ListItem last={index === section.data.length - 1} onPress={() => console.log(item.id)}>
            {renderUserItem(item as UserSectionData)}
          </ListItem>
        );
      }

      case SectionType.group: {
        return (
          <ListItem last={index === section.data.length - 1} onPress={() => console.log(item.id)}>
            {renderGroupItem(item as GroupSectionData)}
          </ListItem>
        );
      }

      default: {
        return <View />;
      }
    }
  }

  function renderSectionHeader({ section: { title } }: { section: SectionListData<any, SectionT> }) {
    return (
      <View style={{ paddingVertical: 5, backgroundColor: '#fff' }}>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={[styles.addPaymentButton]}>
        <PescaButton onPress={onAddPaymentButtonPress}>
          <MaterialCommunityIcons name="credit-card-plus-outline" style={[iconStyle]} />
        </PescaButton>
      </View>
      <Flyout isOpen={isOpen} close={() => setOpen(false)}>
        <View style={[styles.flyoutContent]}>
          <View style={[styles.flyoutHeaderContainer]}>
            <Text style={[styles.flyoutHeading]}>Add a payment</Text>
            <PescaInputField
              label="Search for a user"
              value={value}
              onChangeText={setValue}
              onSubmitEditing={onSubmit}
            />
            <PescaButton onPress={onSubmit} hitSlop={hitSlop}>
              <View style={[styles.submitButtonContainer]}>
                <Text style={[styles.submitButtonText]}>Search</Text>
              </View>
            </PescaButton>
          </View>
          <SectionList
            initialNumToRender={20}
            sections={sections}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
          />
        </View>
      </Flyout>
    </>
  );
}
