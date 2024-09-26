import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Button,
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
import {StackNavigationProp} from '@react-navigation/stack';
import {backgroundStyle} from '../../App';
import CheckBox from 'react-native-check-box';
import {
  FILTER_TASK_STATUS,
  TASK_NAV,
  TASK_STATUS,
} from '../constant/task.constant';
import {setTask} from '../reducer/task.reducer';
import {getTaskListAction, savedTaskAction} from '../saga/task.saga';
import {Dropdown} from 'react-native-element-dropdown';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const taskList = useSelector((state: any) => state.task.taskList);
  const [data, setData] = useState(taskList);
  const [sortData, setSortData] = useState(FILTER_TASK_STATUS[0]);

  const testId = {
    taskDetail: 'test-task-detail',
    flatList: 'test-flat-list',
    dropDown: 'test-drop-down',
  };

  const labelList = {
    addBtn: 'Add',
    deleteBtn: 'Delete',
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
  console.log(taskList);
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
          <Button
            title={labelList.addBtn}
            onPress={() => navigation.navigate(TASK_NAV.ADD_TASK)}
          />
        </View>

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
                    dispatch(setTask(item));
                    navigation.navigate(TASK_NAV.EDIT_TASK);
                  }}>
                  <View style={styles.row}>
                    <CheckBox
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
                              ? 'green'
                              : 'blue',
                        }}>
                        {item.status}
                      </Text>
                    </View>
                    <View style={styles.deleteBtnContainer}>
                      <Button
                        title={labelList.deleteBtn}
                        onPress={() => deleteItem(item.id)}
                      />
                    </View>
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
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: '3%',
  },
  fontSizeStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: '9%',
  },
  listingContainer: {
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 0.3,
    backgroundColor: 'white',
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
    width: '70%',
  },
  deleteBtnContainer: {
    paddingHorizontal: 10,
  },
});
export default Home;
