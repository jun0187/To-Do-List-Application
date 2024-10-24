import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions, NavigationContainerRef} from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();
let drawerNavigationRef: DrawerNavigationProp<any>;

export function setDrawerNavigation(navigation: DrawerNavigationProp<any>) {
  drawerNavigationRef = navigation;
}

export function navigate(name: string, screen?: string, params?: object) {
  navigationRef.current?.navigate(name, {screen, ...params});
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}
