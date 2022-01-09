import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { PescaInputField } from '@moneyboy/components/general/input/PescaInputField';
import { ListItem } from '@moneyboy/components/general/lists/ListItem';
import { ScreenComponentProps } from '@moneyboy/components/general/navigation/PescaNavigator/PescaScreen';
import { PescaContext } from '@moneyboy/contexts/pescaContext';
import { useAuth } from '@moneyboy/hooks/useAuth';
import { useStyle } from '@moneyboy/hooks/useStyle';
import { EnterPaymentViewParams } from '@moneyboy/screens/addPayments/enterPayment';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Insets, SectionList, SectionListData, SectionListRenderItemInfo, StyleSheet, Text, View } from 'react-native';

type SectionData = {
  id: string;
  username: string;
  displayName: string;
};

type SectionT = {
  title: string;
  data: SectionData[];
};

export const SearchListView: React.FC<ScreenComponentProps<unknown, EnterPaymentViewParams>> = ({ navigation }) => {
  const pesca = useContext(PescaContext);
  const { user } = useAuth();

  const [users, setUsers] = useState<Pesca.UserInformation[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getUsers = useCallback(() => {
    setRefreshing(true);
    pesca?.getUsers().then(us => {
      if (us) {
        setUsers(us.filter(u => u.id !== user?.id));
      }
      setRefreshing(false);
    });
  }, [pesca, user?.id]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const sections: SectionT[] = [{ title: 'Users', data: users }];

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

  const { Buttons, Flyouts, Texts, Input } = useStyle();
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
      backgroundColor: Flyouts.background,
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
    separator: {
      backgroundColor: Flyouts.separator.color,
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
        }
        separatorStyle={styles.separator}>
        <Text style={[styles.listItem]}>{item.displayName}</Text>
      </ListItem>
    );
  }

  function renderSectionHeader({ section: { title } }: { section: SectionListData<SectionData, SectionT> }) {
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
          .map(s => ({
            ...s,
            data: s.data.filter(d => d.displayName.toLowerCase().includes(value.toLowerCase())),
          }))
          .filter(s => s.data.length > 0)}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        style={[styles.list]}
        onRefresh={getUsers}
        refreshing={refreshing}
        stickySectionHeadersEnabled
      />
    </>
  );
};
