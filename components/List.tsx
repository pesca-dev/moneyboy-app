import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ListProps<T> {
  header?: string | React.ReactNode;
  data: T[];
  render(data: T[]): React.ReactNode;
}

/**
 * A simple display utility for displaying a list.
 */
function List<T>(props: ListProps<T>) {
  return (
    <View style={styles.outterContainer}>
      <View style={styles.outterList}>
        {(() => {
          if (props.header) {
            return (
              <>
                <View style={styles.headerContainer}>
                  <Text style={styles.headerText}>{props.header}</Text>
                </View>
                <View style={styles.borderFaker} />
              </>
            );
          }
        })()}
        {/* TODO lome: Maybe wrap each item into item-wrapper */}
        <View style={styles.itemContainer}>{props.render(props.data)}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outterContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40, // TODO lome: Maybe remove
  },
  outterList: {
    width: '90%',
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#42423d',
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  borderFaker: {
    height: 1,
    borderRadius: 2,
    width: '100%',
    backgroundColor: '#7f8c8d',
  },
  itemContainer: {},
});

export default List;
