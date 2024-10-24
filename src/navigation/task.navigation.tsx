import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {TASK_NAV} from '../constant/task.constant';
import TaskListing from '../screen/Task/TaskListing';
import AddTask from '../screen/Task/AddTask';
import EditTask from '../screen/Task/EditTask';

const Stack = createStackNavigator();

const TaskNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={TASK_NAV.TASK_LISTING}>
      <Stack.Screen
        name={TASK_NAV.TASK_LISTING}
        component={TaskListing}
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
