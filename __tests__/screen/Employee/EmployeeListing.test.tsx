import React from 'react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import {store} from '../../../src/store';
import {act, fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import EmployeeListing from '../../../src/screen/Employee/EmployeeListing';
import {setEmployeeList} from '../../../src/reducer/employee.reducer';
import {employeeListApiMock} from '../../../__mocks__/employee.mock';
import {
  getNewAccessTokenAction,
  handleLoginUserAction,
} from '../../../src/saga/authentication.saga';
import {userMock} from '../../../__mocks__/authentication.mock';
jest.useFakeTimers();
describe('EmployeeListing', () => {
  let renderUi: any = {};
  let curStore: any = {};

  beforeEach(() => {
    curStore = {...store};
    act(() => {
      curStore.dispatch(setEmployeeList(employeeListApiMock));
      curStore.dispatch(handleLoginUserAction({user: userMock}));
      curStore.dispatch(getNewAccessTokenAction());
    });
    renderUi = render(
      <Provider store={curStore}>
        <EmployeeListing />
      </Provider>,
    );
  });

  it('renders EmployeeListing correctly', () => {
    const {getByTestId} = renderUi;
    expect(getByTestId('test-flat-list')).toBeTruthy();
    expect(getByTestId('add-btn')).toBeTruthy();
    expect(getByTestId('test-employee-detail-0')).toBeTruthy();
    expect(getByTestId('test-employee-detail-1')).toBeTruthy();
  });

  it('test add button', () => {
    const {getByTestId} = renderUi;
    const addBtn = getByTestId('add-btn');
    act(() => {
      fireEvent.press(addBtn);
    });
  });

  it('test flatlist detail on press', async () => {
    const {getByTestId} = renderUi;
    act(() => {
      fireEvent.press(getByTestId('test-employee-detail-0'));
      fireEvent.press(getByTestId('delete-btn-0'));

      fireEvent.press(getByTestId('test-employee-detail-1'));
      fireEvent.press(getByTestId('delete-btn-1'));
    });
  });

  it('test loader', () => {
    act(() => {
      curStore.dispatch(
        setEmployeeList({
          ...employeeListApiMock,
          data: {...employeeListApiMock.data, isLoading: true},
        }),
      );
    });
  });

  it('test error', () => {
    act(() => {
      curStore.dispatch(
        setEmployeeList({
          ...employeeListApiMock,
          data: {...employeeListApiMock.data, isError: true},
        }),
      );
    });
  });
});
