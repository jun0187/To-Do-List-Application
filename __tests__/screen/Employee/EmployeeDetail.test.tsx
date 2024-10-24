import React from 'react';
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import {store} from '../../../src/store';
import {act, fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {setEmployee} from '../../../src/reducer/employee.reducer';
import {employeeListApiMock} from '../../../__mocks__/employee.mock';
import {
  getNewAccessTokenAction,
  handleLoginUserAction,
} from '../../../src/saga/authentication.saga';
import {userMock} from '../../../__mocks__/authentication.mock';
import EmployeeDetail from '../../../src/screen/Employee/EmployeeDetail';
jest.useFakeTimers();
jest.runAllTimers();
describe('EmployeeDetail', () => {
  let renderUi: any = {};
  let curStore: any = {};
  beforeAll(() => {
    curStore = {...store};

    act(() => {
      curStore.dispatch(handleLoginUserAction({user: userMock}));
    });
  });
  beforeEach(() => {
    jest.clearAllMocks();

    act(() => {
      curStore.dispatch(getNewAccessTokenAction());
    });
    renderUi = render(
      <Provider store={curStore}>
        <EmployeeDetail />
      </Provider>,
    );
  });

  it('renders EmployeeDetail correctly', () => {
    const {getByTestId} = renderUi;
    expect(getByTestId('input-First Name')).toBeTruthy();
    expect(getByTestId('input-Last Name')).toBeTruthy();
    expect(getByTestId('input-Email')).toBeTruthy();
    expect(getByTestId('input-Department')).toBeTruthy();
    expect(getByTestId('input-Salary (MYR)')).toBeTruthy();
    expect(getByTestId('submit-button')).toBeTruthy();
  });

  it('submit form', async () => {
    const {queryByTestId} = renderUi;
    await act(async () => {
      fireEvent.changeText(
        await queryByTestId('input-First Name'),
        'Test First Name',
      );
      fireEvent.changeText(
        await queryByTestId('input-Last Name'),
        'Test Last Name',
      );
      fireEvent.changeText(
        await queryByTestId('input-Email'),
        'TestEmail@example.com',
      );
      fireEvent.changeText(
        await queryByTestId('input-Department'),
        'Test Department',
      );
      fireEvent.changeText(await queryByTestId('input-Salary (MYR)'), '100');
      fireEvent.press(await queryByTestId('submit-button'));
    });
  });
  it('Edit Form', async () => {
    const {findByTestId} = renderUi;

    await act(async () => {
      await curStore.dispatch(setEmployee(employeeListApiMock.data.content[0]));
    });

    const salaryInput = await findByTestId('input-Salary (MYR)');
    fireEvent.changeText(salaryInput, '100');

    const submitButton = await findByTestId('submit-button');
    fireEvent.press(submitButton);
  });
});
