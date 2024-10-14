import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import Colors from '../assets/Colors';

const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color={Colors.loader} />
    <View style={styles.loadingTextContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.semiTransparent,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  loadingTextContainer: {
    marginTop: 10,
  },
  loadingText: {
    fontSize: 16,
  },
});

export default Loader;
