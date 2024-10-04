import React from 'react';
import {beforeEach, describe, it} from '@jest/globals';
import {store} from '../../../src/store';
import {act, fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditTask from '../../../src/screen/Task/EditTask';
import {setTask} from '../../../src/reducer/task.reducer';
import {taskListMock} from '../../../__mocks__/task.mock';

describe('Edit Task', () => {
  let renderUi: any = {};
  let curStore: any = {};

  beforeEach(() => {
    curStore = {...store};
    act(() => {
      return curStore.dispatch(setTask(taskListMock[0]));
    });
    renderUi = render(
      <Provider store={curStore}>
        <EditTask />
      </Provider>,
    );
  });

  it('renders EditTask correctly', () => {
    const {getByTestId} = renderUi;
    expect(getByTestId('input-title')).toBeTruthy();
    expect(getByTestId('input-description')).toBeTruthy();
    expect(getByTestId('segmented-tab-pending')).toBeTruthy();
    expect(getByTestId('segmented-tab-completed')).toBeTruthy();
    expect(getByTestId('back-button')).toBeTruthy();
    expect(getByTestId('submit-button')).toBeTruthy();
  });

  it('test input - completed', async () => {
    const {getByTestId} = renderUi;
    await act(async () => {
      fireEvent.changeText(getByTestId('input-title'), 'testTitle');
      fireEvent.changeText(getByTestId('input-description'), 'testDesc');
      fireEvent.press(getByTestId('segmented-tab-completed'));
      fireEvent.press(await getByTestId('submit-button'));
    });
  });

  it('test input - pending', async () => {
    const {getByTestId} = renderUi;
    await act(async () => {
      fireEvent.changeText(getByTestId('input-title'), 'testTitle');
      fireEvent.changeText(getByTestId('input-description'), 'testDesc');
      fireEvent.press(getByTestId('segmented-tab-pending'));
      fireEvent.press(await getByTestId('submit-button'));
    });
  });

  it('test back button', () => {
    const {getByTestId} = renderUi;
    act(() => {
      fireEvent.press(getByTestId('back-button'));
    });
  });

  it('test for completed status scenario', () => {
    act(() => {
      return curStore.dispatch(setTask(taskListMock[1]));
    });
  });

  it('test if no data passed', () => {
    act(() => {
      return curStore.dispatch(setTask(null));
    });
  });
});
