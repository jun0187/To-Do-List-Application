import {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import CheckBox from 'react-native-check-box';
import {
  FILTER_TASK_STATUS,
  TASK_NAV,
  TASK_STATUS,
} from '../constant/task.constant';
import {setTask} from '../reducer/task.reducer';
import {getTaskListAction, savedTaskAction} from '../saga/task.saga';
import {Dropdown} from 'react-native-element-dropdown';
import {backgroundStyle} from './Navigation';
import {handleLogoutUserAction} from '../saga/authentication.saga';
import Colors from '../assets/Colors';
import CustomButton from '../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useTokenCounter from '../component/useTokenCounter';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [refreshing, setRefreshing] = useState(false);
  const taskList = useSelector((state: any) => state.task.taskList);
  const [data, setData] = useState(taskList);
  const [sortData, setSortData] = useState(FILTER_TASK_STATUS[0]);
  const [shouldStopCounter, setShouldStopCounter] = useState(false);

  useTokenCounter(shouldStopCounter);

  const testId = {
    taskDetail: 'test-task-detail',
    flatList: 'test-flat-list',
    dropDown: 'test-drop-down',
    addBtn: 'add-btn',
    deleteBtn: 'delete-btn',
    checkBox: 'test-check-box',
    logoutBtn: 'logout-btn',
  };

  const labelList = {
    addBtn: '+ Add',
    deleteBtn: 'Delete',
    logoutBtn: 'Logout',
  };

  useEffect(() => {
    updateList();
  }, []);

  useEffect(() => {
    setData(taskList);
    setRefreshing(false);
  }, [taskList]);

  const updateList = () => {
    dispatch(getTaskListAction());
  };

  const updateItem = (id: string) => {
    const newData = data.map((item: any) =>
      item.id === id
        ? {
            ...item,
            status:
              item.status === TASK_STATUS.COMPLETED
                ? TASK_STATUS.PENDING
                : TASK_STATUS.COMPLETED,
          }
        : item,
    );
    setData(newData);
    dispatch(savedTaskAction({taskList: newData}));
  };

  const deleteItem = (id: string) => {
    const newData = data.filter((item: any) => item.id !== id);
    setData(newData);
    dispatch(savedTaskAction({taskList: newData}));
  };

  const logout = () => {
    dispatch(handleLogoutUserAction());
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Dropdown
            testID={testId.dropDown}
            style={styles.dropdown}
            placeholderStyle={styles.fontSizeStyle}
            selectedTextStyle={styles.fontSizeStyle}
            iconStyle={styles.iconStyle}
            data={FILTER_TASK_STATUS}
            maxHeight={300}
            labelField="label"
            valueField="id"
            value={sortData}
            onChange={item => {
              setSortData(item);
              const filterData =
                item.id === '*'
                  ? taskList
                  : taskList.filter((i: any) => i.status === item.label);
              setData(filterData);
            }}
          />
          <CustomButton
            label={labelList.logoutBtn}
            onPressButton={logout}
            testId={testId.logoutBtn}
            buttonWidth={21}
          />
        </View>
        <CustomButton
          label={labelList.addBtn}
          onPressButton={() => {
            setShouldStopCounter(true);
            dispatch(setTask(null));
            navigation.navigate(TASK_NAV.ADD_TASK);
          }}
          testId={testId.addBtn}
          buttonWidth={90}
        />
        <FlatList
          testID={testId.flatList}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            updateList();
          }}
          data={data}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item, index}) => {
            return (
              <View style={styles.listingContainer} key={index}>
                <TouchableOpacity
                  key={item.id}
                  testID={`${testId.taskDetail}-${index}`}
                  onPress={() => {
                    setShouldStopCounter(true);
                    dispatch(setTask(item));
                    navigation.navigate(TASK_NAV.EDIT_TASK);
                  }}>
                  <View style={styles.row}>
                    <CheckBox
                      testID={`${testId.checkBox}-${index}`}
                      onClick={() => {
                        updateItem(item.id);
                      }}
                      isChecked={item.status === TASK_STATUS.COMPLETED}
                    />
                    <View style={styles.column}>
                      <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                      <Text>{item.description}</Text>
                      <Text
                        style={{
                          color:
                            item.status === TASK_STATUS.COMPLETED
                              ? Colors.success
                              : Colors.pending,
                        }}>
                        {item.status}
                      </Text>
                    </View>
                    <CustomButton
                      label={labelList.deleteBtn}
                      onPressButton={() => {
                        deleteItem(item.id);
                      }}
                      testId={`${testId.deleteBtn}-${index}`}
                      buttonWidth={30}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    marginHorizontal: '5%',
    marginVertical: '2%',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  dropdown: {
    height: 50,
    width: '80%',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: '3%',
    backgroundColor: Colors.container,
  },
  fontSizeStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: '9%',
  },
  listingContainer: {
    borderRadius: 30,
    borderWidth: 0.3,
    backgroundColor: Colors.container,
    width: Dimensions.get('window').width - 32,
    padding: '5%',
    marginVertical: '1%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    paddingLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '60%',
  },
});
export default Home;
