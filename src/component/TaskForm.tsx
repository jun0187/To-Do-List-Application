import {StyleSheet, Text} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {TASK_STATUS, TASK_NAV} from '../constant/task.constant';
import {TaskModel} from '../interface/task.interface';
import {savedTaskAction} from '../saga/task.saga';
import {navigate} from '../services/Navigation.service';
import Form from './Form';

interface TaskFormProp {
  headerLabel: string;
  btnLabel: string;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  status: number;
  setStatus: Dispatch<SetStateAction<number>>;
}

const TaskForm = (props: TaskFormProp) => {
  const {
    headerLabel,
    btnLabel,
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
  } = props;
  const dispatch = useDispatch();
  const taskList = useSelector((state: any) => state.task.taskList);
  const task = useSelector((state: any) => state.task.task);
  const id: string = uuid.v4().toString();

  const labelList = {
    title: 'Title',
    description: 'Description',
    status: 'Status',
    backBtn: 'Back',
  };

  const testID = {
    pendingTab: 'segmented-tab-pending',
    completedTab: 'segmented-tab-completed',
    backBtn: 'back-button',
    submitBtn: 'submit-button',
  };

  const submitItem = () => {
    const taskItem: TaskModel = {
      ...task,
      title,
      description,
      id,
      status: status ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING,
    };
    const filterTaskList = task
      ? taskList.filter((i: any) => i.id !== task.id)
      : taskList;
    const updatedTaskList = [...filterTaskList, taskItem];
    dispatch(savedTaskAction({taskList: updatedTaskList}));
    navigate(TASK_NAV.TASK_LISTING);
  };

  return (
    <Form
      headerLabel={headerLabel}
      btnLabel={btnLabel}
      item={[
        {
          state: title,
          setState: setTitle,
          label: labelList.title,
        },
        {
          state: description,
          setState: setDescription,
          label: labelList.description,
          isMultiline: true,
        },
      ]}
      onPressSubmitItem={submitItem}
      other={
        <>
          <Text style={styles.label}>{labelList.status}</Text>
          <SegmentedControlTab
            testIDs={[testID.pendingTab, testID.completedTab]}
            values={[TASK_STATUS.PENDING, TASK_STATUS.COMPLETED]}
            tabsContainerStyle={styles.statusContainer}
            selectedIndex={status}
            onTabPress={index => {
              setStatus(index);
            }}
          />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginTop: '1%',
    marginHorizontal: '5%',
    marginBottom: '-3%',
  },
  statusContainer: {
    margin: '5%',
  },
});
export default TaskForm;
