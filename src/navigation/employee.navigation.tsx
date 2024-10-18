import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useDispatch} from 'react-redux';
import {EMPLOYEE_NAV} from '../constant/employee.constant';
import EmployeeListing from '../screen/Employee/EmployeeListing';
import {getEmployeeListAction} from '../saga/employee.saga';
import EmployeeDetail from '../screen/Employee/EmployeeDetail';

const Stack = createStackNavigator();

const EmployeeNavigation = () => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={EMPLOYEE_NAV.LISTING}
        component={EmployeeListing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={EMPLOYEE_NAV.EMPLOYEE_DETAIL}
        component={EmployeeDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default EmployeeNavigation;
