import {StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {TASK_STATUS, TASK_NAV} from '../constant/task.constant';
import {TaskModel} from '../interface/task.interface';
import {savedTaskAction} from '../saga/task.saga';
import {backgroundStyle} from '../screen/Navigation';
import InputWithLabel from './InputWithLabel';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

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
  const navigation = useNavigation<StackNavigationProp<any>>();

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
    inputTitle: 'input-title',
    inputDesc: 'input-description',
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
    navigation.navigate(TASK_NAV.HOME);
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{headerLabel}</Text>

        <InputWithLabel
          placeholder={labelList.title}
          label={labelList.title}
          value={title}
          onChangeText={setTitle}
          testId={testID.inputTitle}
        />
        <InputWithLabel
          placeholder={labelList.description}
          label={labelList.description}
          value={description}
          onChangeText={setDescription}
          testId={testID.inputDesc}
          isMultiline
        />

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
        <View style={styles.buttonContainer}>
          <CustomButton
            label={labelList.backBtn}
            onPressButton={navigation.goBack}
            testId={testID.backBtn}
          />
          <CustomButton
            label={btnLabel}
            onPressButton={submitItem}
            testId={testID.submitBtn}
            isDisableNext={!title || !description}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: '7%',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    paddingBottom: '3%',
  },
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
  buttonContainer: {
    flexDirection: 'row',
  },
});
export default TaskForm;
