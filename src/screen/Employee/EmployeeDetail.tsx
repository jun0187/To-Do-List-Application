import React, {useState} from 'react';
import Form from '../../component/Form';
import {useDispatch, useSelector} from 'react-redux';
import {
  addEmployeeAction,
  updateEmployeeAction,
} from '../../saga/employee.saga';
import {navigate} from '../../services/Navigation.service';
import {EMPLOYEE_NAV} from '../../constant/employee.constant';
import {EmployeeModel} from '../../interface/employee.interface';
import {emailValidation} from '../../services/Validation.service';

const EmployeeDetail = () => {
  const dispatch = useDispatch();
  const employee = useSelector((state: any) => state.employee.employee);
  const [firstName, setFirstName] = useState(employee?.firstName ?? '');
  const [lastName, setLastName] = useState(employee?.lastName ?? '');
  const [email, setEmail] = useState(employee?.email ?? '');
  const [department, setDepartment] = useState(employee?.department ?? '');
  const [salary, setSalary] = useState(
    employee?.salary?.toFixed(2)?.toString() ?? '',
  );

  const labelList = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    department: 'Department',
    salary: 'Salary (MYR)',
    header: `${employee ? 'Edit' : 'Add'} Employee`,
    btn: employee ? 'Edit' : 'Add',
    emailInlineError: !emailValidation(email) ? 'Invalid Email' : undefined,
  };

  const onPressSubmitItem = () => {
    const item: EmployeeModel = {
      id: employee?.id ?? undefined,
      firstName,
      lastName,
      email,
      department,
      salary,
    };
    if (employee) {
      //Edit
      dispatch(updateEmployeeAction(item));
    } else {
      //Add
      dispatch(addEmployeeAction(item));
    }
    navigate(EMPLOYEE_NAV.LISTING);
  };

  return (
    <Form
      headerLabel={labelList.header}
      btnLabel={labelList.btn}
      item={[
        {
          state: firstName,
          setState: setFirstName,
          label: labelList.firstName,
        },
        {
          state: lastName,
          setState: setLastName,
          label: labelList.lastName,
        },
        {
          state: email,
          setState: setEmail,
          label: labelList.email,
          keyboardType: 'email-address',
          inlineMessage: labelList.emailInlineError,
        },
        {
          state: department,
          setState: setDepartment,
          label: labelList.department,
        },
        {
          state: salary,
          setState: setSalary,
          label: labelList.salary,
          keyboardType: 'decimal-pad',
        },
      ]}
      onPressSubmitItem={onPressSubmitItem}
      extraDisableCondition={!emailValidation(email)}
    />
  );
};

export default EmployeeDetail;
