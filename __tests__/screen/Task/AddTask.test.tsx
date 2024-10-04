import React from 'react';
import {beforeEach, describe, it} from '@jest/globals';
import {store} from '../../../src/store';
import {act, fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import AddTask from '../../../src/screen/Task/AddTask';

describe('Add Task', () => {
  let renderUi: any = {};
  let curStore: any = {};

  beforeEach(() => {
    curStore = {...store};
    renderUi = render(
      <Provider store={curStore}>
        <AddTask />
      </Provider>,
    );
  });

  it('renders AddTask correctly', () => {
    const {getByTestId} = renderUi;
    expect(getByTestId('input-title')).toBeTruthy();
    expect(getByTestId('input-description')).toBeTruthy();
    expect(getByTestId('segmented-tab-pending')).toBeTruthy();
    expect(getByTestId('segmented-tab-completed')).toBeTruthy();
    expect(getByTestId('back-button')).toBeTruthy();
    expect(getByTestId('submit-button')).toBeTruthy();
  });

  it('test input with Completed', async () => {
    const {getByTestId} = renderUi;
    await act(async () => {
      fireEvent.changeText(getByTestId('input-title'), 'testTitle');
      fireEvent.changeText(getByTestId('input-description'), 'testDesc');
      fireEvent.press(getByTestId('segmented-tab-completed'));
      fireEvent.press(await getByTestId('submit-button'));
    });
  });

  it('test input with Pending', async () => {
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
});
