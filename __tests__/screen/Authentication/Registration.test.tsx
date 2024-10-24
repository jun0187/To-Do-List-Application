import React, {act} from 'react';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import {store} from '../../../src/store';
import {fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {userMock} from '../../../__mocks__/authentication.mock';
import Registration from '../../../src/screen/Authentication/Registration';
jest.useFakeTimers();

describe('Registration', () => {
  let renderUi: any = {};
  let curStore: any = {};

  beforeEach(() => {
    curStore = {...store};
    act(() => {});
    renderUi = render(
      <Provider store={curStore}>
        <Registration />
      </Provider>,
    );
  });

  it('renders Registration correctly', () => {
    const {getByTestId} = renderUi;
    expect(getByTestId('input-First Name')).toBeTruthy();
    expect(getByTestId('input-Last Name')).toBeTruthy();
    expect(getByTestId('input-Email')).toBeTruthy();

    expect(getByTestId('register-input-password')).toBeTruthy();
    expect(getByTestId('register-input-confirmed-password')).toBeTruthy();
    expect(getByTestId('submit-button')).toBeTruthy();
    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('submit register form', async () => {
    const {getByTestId, getAllByTestId} = renderUi;

    await act(async () => {
      fireEvent.changeText(
        await getByTestId('input-First Name'),
        'Test First Name',
      );
      fireEvent.changeText(
        await getByTestId('input-Last Name'),
        'Test Last Name',
      );
      fireEvent.changeText(await getByTestId('input-Email'), userMock.email);
      fireEvent.changeText(
        await getByTestId('register-input-password'),
        userMock.password,
      );
      fireEvent.changeText(
        await getByTestId('register-input-confirmed-password'),
        userMock.password,
      );
      fireEvent.press(await getAllByTestId('biometric-icon')[0]);
      fireEvent.press(await getAllByTestId('biometric-icon')[1]);

      fireEvent.press(await getByTestId('submit-button'));
    });
  });
  it('test back button', async () => {
    const {getByTestId} = renderUi;

    await act(() => {
      fireEvent.press(getByTestId('back-button'));
    });
  });
});
