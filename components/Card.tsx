import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CardProps {
  header?: string;
}

/**
 *  Container for displaying content with rounded corners and an elevation effect.
 */
export default function Card({
  header,
  children,
}: PropsWithChildren<CardProps>) {
  return (
    <View style={styles.card}>
      {(() => {
        if (header) {
          return (
            <>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{header}</Text>
              </View>
              <View style={styles.borderFaker} />
            </>
          );
        }
      })()}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#42423d',
    shadowRadius: 5,
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
});
