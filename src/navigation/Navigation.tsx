import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {navigationRef} from '../services/Navigation.service';
import AuthenticationNavigation from './authentication.navigation';
import {isTokenExpired} from '../services/Token.service';
import {AUTH_NAV} from '../constant/authentication.constant';
import DrawerNavigation from './DrawerNavigation';

const Stack = createStackNavigator();

const Navigation = () => {
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  const accessToken = useSelector((state: any) => state.auth.accessToken);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isTokenExpired(refreshToken) && isTokenExpired(accessToken) ? (
          <Stack.Screen
            name={AUTH_NAV.MAIN}
            component={AuthenticationNavigation}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name={AUTH_NAV.DRAWER}
            component={DrawerNavigation}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
