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
import {savedTaskAction} from '../saga/task.saga';

const EditTask = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const task = useSelector((state: any) => state.task.task);
  const taskList = useSelector((state: any) => state.task.taskList);

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [status, setStatus] = useState(
    task?.status === TASK_STATUS.COMPLETED ? 1 : 0,
  );

  const labelList = {
    editTask: 'Edit Task',
    title: 'Title',
    description: 'Description',
    status: 'Status',
    backBtn: 'Back',
    editBtn: 'Update',
  };
  const updateItem = async () => {
    const taskItem: TaskModel = {
      ...task,
      title,
      description,
      status: status ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING,
    };
    const filterTaskList = taskList.filter((i: any) => i.id !== task.id);
    console.log('filter', filterTaskList);
    const updatedTaskList = [...filterTaskList, taskItem];
    dispatch(savedTaskAction({taskList: updatedTaskList}));
  };
  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{labelList.editTask}</Text>
        <TextInput
          style={styles.input}
          placeholder={labelList.title}
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          style={styles.input}
          placeholder={labelList.description}
          onChangeText={setDescription}
          value={description}
        />

        <SegmentedControlTab
          values={[TASK_STATUS.PENDING, TASK_STATUS.COMPLETED]}
          tabsContainerStyle={styles.statusContainer}
          selectedIndex={status}
          onTabPress={index => {
            setStatus(index);
          }}
        />
        <View style={styles.buttonContainer}>
          <Button
            title={labelList.backBtn}
            onPress={() => navigation.goBack()}
          />
          <Button title={labelList.editBtn} onPress={updateItem} />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
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
export default EditTask;
