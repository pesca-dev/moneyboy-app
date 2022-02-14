import { PescaButton } from '@moneyboy/components/general/input/PescaButton';
import { PescaInputField } from '@moneyboy/components/general/input/PescaInputField';
import { ListItem } from '@moneyboy/components/general/lists/ListItem';
import { ScreenComponentProps } from '@moneyboy/components/general/navigation/PescaNavigator/PescaScreen';
import { useAuth } from '@moneyboy/hooks/useAuth';
import { usePesca } from '@moneyboy/hooks/usePesca';
import { EnterPaymentViewParams } from '@moneyboy/screens/addPayments/EnterPayment';
import React, { useCallback, useEffect, useState } from 'react';
import { Insets, SectionList, SectionListData, SectionListRenderItemInfo, Text, View } from 'react-native';
import { useSearchListStyles } from './SearchList.style';

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
  const pesca = usePesca();
  const { user } = useAuth();

  const [users, setUsers] = useState<Pesca.UserInformation[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getUsers = useCallback(() => {
    setRefreshing(true);
    pesca.getUsers().then(us => {
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

  const styles = useSearchListStyles();

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
