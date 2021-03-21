import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';

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
      <Card>
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
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  outterContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40, // TODO lome: Maybe remove
    padding: 20,
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
