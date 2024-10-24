import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {userMock} from '../../../__mocks__/authentication.mock';
import Login from '../../../src/screen/Authentication/Login';
import {store} from '../../../src/store';
import {BIOMETRIC_TYPE} from '../../../src/constant/authentication.constant';
import {
  setUser,
  setBiometricType,
} from '../../../src/reducer/authentication.reducer';
jest.useFakeTimers();

describe('Login', () => {
  let renderUi: any = {};
  let curStore: any = {};

  beforeEach(() => {
    curStore = {...store};
    renderUi = render(
      <Provider store={curStore}>
        <Login />
      </Provider>,
    );
  });

  it('renders Login correctly', () => {
    const {getByTestId} = renderUi;
    expect(getByTestId('login-input-email')).toBeTruthy();
    expect(getByTestId('login-input-password')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
    expect(getByTestId('login-register-button')).toBeTruthy();
  });

  it('password-based login', async () => {
    const {getByTestId} = renderUi;

    await act(async () => {
      fireEvent.changeText(
        await getByTestId('login-input-email'),
        userMock.email,
      );
      fireEvent.changeText(
        await getByTestId('login-input-password'),
        userMock.password,
      );
      fireEvent.press(await getByTestId('biometric-icon'));
      fireEvent.press(getByTestId('login-button'));
    });
  });
  it('test register button', () => {
    const {getByTestId} = renderUi;

    act(() => {
      fireEvent.press(getByTestId('login-register-button'));
    });
  });

  it('check on biometric icon', async () => {
    const {getByTestId} = renderUi;

    await act(async () => {
      expect(getByTestId('login-register-button')).toBeTruthy();
      await curStore.dispatch(setUser(userMock));
      await curStore.dispatch(setBiometricType(BIOMETRIC_TYPE.FACE_ID));
    });

    await act(async () => {
      const biometricButton = await getByTestId('login-biometric-icon-button');
      expect(biometricButton).toBeTruthy();
      fireEvent.press(await biometricButton);
    });
  });
});
