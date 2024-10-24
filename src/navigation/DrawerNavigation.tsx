import {createDrawerNavigator} from '@react-navigation/drawer';
import {EMPLOYEE_NAV} from '../constant/employee.constant';
import {TASK_NAV} from '../constant/task.constant';
import EmployeeNavigation from './employee.navigation';
import TaskNavigation from './task.navigation';
import CustomDrawerContent from '../component/CustomDrawerContent';
import {useDispatch} from 'react-redux';
import {handleLogoutUserAction} from '../saga/authentication.saga';
import React from 'react';
import Colors from '../assets/Colors';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(handleLogoutUserAction());
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.container,
          width: '60%',
        },
        drawerActiveBackgroundColor: Colors.button,
        drawerActiveTintColor: Colors.white,
      }}
      drawerContent={props => (
        <CustomDrawerContent {...props} logout={handleLogout} />
      )}>
      <Drawer.Screen name={TASK_NAV.MAIN} component={TaskNavigation} />
      <Drawer.Screen name={EMPLOYEE_NAV.MAIN} component={EmployeeNavigation} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
