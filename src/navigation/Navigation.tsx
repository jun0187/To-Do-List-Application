import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useColorScheme} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../assets/Colors';
import {navigationRef} from '../services/Navigation.service';
import AuthenticationNavigation from './authentication.navigation';
import {isTokenExpired} from '../services/Token.service';
import TaskNavigation from './task.navigation';

const Stack = createStackNavigator();
export const backgroundStyle = () => {
  return {
    backgroundColor:
      useColorScheme() === 'dark' ? Colors.dark : Colors.backgroundLight,
    flex: 1,
  };
};
const Navigation = () => {
  const refreshToken = useSelector((state: any) => state.auth.refreshToken);
  const accessToken = useSelector((state: any) => state.auth.accessToken);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isTokenExpired(refreshToken) && isTokenExpired(accessToken) ? (
          <Stack.Screen
            name="Authentication"
            component={AuthenticationNavigation}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="Task"
              component={TaskNavigation}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
