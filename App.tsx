import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Provider} from 'react-redux';
import {TASK_NAV} from './src/constant/task.constant';
import Home from './src/screen/Home';
import AddTask from './src/screen/AddTask';
import EditTask from './src/screen/EditTask';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {store} from './src/store';

const Stack = createStackNavigator();
export const backgroundStyle = () => {
  return {
    backgroundColor:
      useColorScheme() === 'dark' ? Colors.darker : Colors.lighter,
    flex: 1,
  };
};
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={TASK_NAV.HOME}>
          <Stack.Screen name={TASK_NAV.HOME} component={Home} />
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
    </Provider>
  );
};
export default App;
