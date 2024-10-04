import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useColorScheme} from 'react-native';
import {useDispatch} from 'react-redux';
import {AUTH_NAV} from '../constant/authentication.constant';
import {TASK_NAV} from '../constant/task.constant';
import {
  getBiometryTypeAction,
  getLoginUserAction,
} from '../saga/authentication.saga';
import Login from './Authentication/Login';
import Registration from './Authentication/Registration';
import Home from './Home';
import AddTask from './Task/AddTask';
import EditTask from './Task/EditTask';
import Colors from '../assets/Colors';

const Stack = createStackNavigator();
export const backgroundStyle = () => {
  return {
    backgroundColor:
      useColorScheme() === 'dark' ? Colors.dark : Colors.backgroundLight,
    flex: 1,
  };
};
const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={AUTH_NAV.LOGIN}>
        {/* Authentication */}
        <Stack.Screen
          name={AUTH_NAV.LOGIN}
          component={Login}
          options={{headerShown: false}}
          listeners={{
            focus: () => {
              dispatch(getLoginUserAction());
              dispatch(getBiometryTypeAction());
            },
          }}
        />
        <Stack.Screen
          name={AUTH_NAV.REGISTRATION}
          component={Registration}
          options={{headerShown: false}}
        />

        {/* TASK */}
        <Stack.Screen
          name={TASK_NAV.HOME}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={TASK_NAV.ADD_TASK}
          component={AddTask}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={TASK_NAV.EDIT_TASK}
          component={EditTask}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
