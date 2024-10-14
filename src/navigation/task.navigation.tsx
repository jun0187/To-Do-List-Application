import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {TASK_NAV} from '../constant/task.constant';
import Home from '../screen/Home';
import AddTask from '../screen/Task/AddTask';
import EditTask from '../screen/Task/EditTask';

const Stack = createStackNavigator();

const TaskNavigation = () => {
  return (
    <Stack.Navigator>
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
  );
};
export default TaskNavigation;
