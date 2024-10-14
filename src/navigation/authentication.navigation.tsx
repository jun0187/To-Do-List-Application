import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useDispatch} from 'react-redux';
import {AUTH_NAV} from '../constant/authentication.constant';
import {
  getBiometryTypeAction,
  getLoginUserAction,
} from '../saga/authentication.saga';
import Login from '../screen/Authentication/Login';
import Registration from '../screen/Authentication/Registration';

const Stack = createStackNavigator();

const AuthenticationNavigation = () => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};
export default AuthenticationNavigation;
