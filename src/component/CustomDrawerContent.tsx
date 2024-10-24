import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

interface CustomDrawerContentProps {
  state: any; // Navigation state
  descriptors: any; // Descriptors for the routes
  navigation: any; // Navigation object
  logout: () => void; // Function to call on logout
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  logout,
  ...props
}) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.logoutContainer}>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    marginTop: 'auto',
    padding: 16,
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    textAlign: 'center',
  },
});

export default CustomDrawerContent;
