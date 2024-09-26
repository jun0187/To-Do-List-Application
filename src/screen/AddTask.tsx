import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TASK_NAV, TASK_STATUS} from '../constant/task.constant';
import {backgroundStyle} from '../../App';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {useDispatch, useSelector} from 'react-redux';
import {TaskModel} from '../interface/task.interface';
import uuid from 'react-native-uuid';
import {savedTaskAction} from '../saga/task.saga';

const AddTask = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const taskList = useSelector((state: any) => state.task.taskList);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(0);
  const id: string = uuid.v4().toString();

  const labelList = {
    addTask: 'Add Task',
    title: 'Title',
    description: 'Description',
    status: 'Status',
    backBtn: 'Back',
    addBtn: 'Add',
  };

  const testID = {
    inputTitle: 'input-title',
    inputDesc: 'input-description',
    pendingTab: 'segmented-tab-pending',
    completedTab: 'segmented-tab-completed',
    backBtn: 'back-button',
    addBtn: 'add-button',
  };

  const addItem = () => {
    const taskItem: TaskModel = {
      title,
      description,
      id,
      status: status ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING,
    };
    const updatedTaskList = [...taskList, taskItem];
    dispatch(savedTaskAction({taskList: updatedTaskList}));
    navigation.navigate(TASK_NAV.HOME);
  };
  console.log('add', title, description);
  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{labelList.addTask}</Text>
        <TextInput
          style={styles.input}
          placeholder={labelList.title}
          onChangeText={setTitle}
          value={title}
          testID={testID.inputTitle}
        />
        <TextInput
          style={styles.input}
          placeholder={labelList.description}
          onChangeText={setDescription}
          value={description}
          testID={testID.inputDesc}
        />

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
          <Button
            testID={testID.backBtn}
            title={labelList.backBtn}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Button
            testID={testID.addBtn}
            title={labelList.addBtn}
            onPress={addItem}
            disabled={!title || !description}
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
  },
  input: {
    height: 40,
    marginVertical: '3%',
    padding: '3%',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  statusContainer: {
    margin: '5%',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
export default AddTask;
