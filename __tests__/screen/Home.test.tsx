import React from 'react';
import {beforeEach, describe, it, jest} from '@jest/globals';
import {store} from '../../src/store';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import Home from '../../src/screen/Home';
import {setTaskList} from '../../src/reducer/task.reducer';
import {taskListMock} from '../../__mocks__/task.mock';

describe('Home', () => {
  let renderUi: any = {};
  let curStore: any = {};

  beforeEach(() => {
    curStore = {...store};
    act(() => {
      return curStore.dispatch(setTaskList(taskListMock));
    });
    renderUi = render(
      <Provider store={curStore}>
        <Home />
      </Provider>,
    );
  });

  it('renders Home correctly', () => {
    const {getByTestId} = renderUi;
    expect(getByTestId('test-drop-down')).toBeTruthy();
    expect(getByTestId('test-flat-list')).toBeTruthy();
    expect(getByTestId('add-btn')).toBeTruthy();
    expect(getByTestId('test-task-detail-0')).toBeTruthy();
    expect(getByTestId('test-task-detail-1')).toBeTruthy();
  });

  it('test dropdown', () => {
    const {getByTestId} = renderUi;
    const dropDown = getByTestId('test-drop-down');
    act(() => {
      fireEvent.press(dropDown);
    });
  });

  it('test add button', () => {
    const {getByTestId} = renderUi;
    const addBtn = getByTestId('add-btn');
    act(() => {
      fireEvent.press(addBtn);
    });
  });

  it('test flatlist onRefresh', () => {
    const {getByTestId} = renderUi;

    act(() => {
      getByTestId('test-flat-list').props.onRefresh();
    });
  });

  it('test flatlist detail on press', () => {
    const {getByTestId} = renderUi;
    jest.useFakeTimers();
    act(() => {
      fireEvent.press(getByTestId('test-task-detail-0'));
      fireEvent.press(getByTestId('test-check-box-0'));
      fireEvent.press(getByTestId('delete-btn-0'));

      fireEvent.press(getByTestId('test-task-detail-1'));
      fireEvent.press(getByTestId('test-check-box-1'));
      fireEvent.press(getByTestId('delete-btn-1'));
    });
  });

  it('test add button', () => {
    const {getByTestId} = renderUi;
    const addBtn = getByTestId('add-btn');
    act(() => {
      fireEvent.press(addBtn);
    });
  });
});
