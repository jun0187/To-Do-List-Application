import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
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
import {TASK_NAV, TASK_STATUS} from '../constant/task.constant';
import {setTask} from '../reducer/task.reducer';

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const pageNo = useRef(1);
  const [refreshing, setRefreshing] = useState(false);
  const taskList = useSelector((state: any) => state.task.taskList);
  const [data, setData] = useState(taskList);
  console.log('data', taskList, data);
  const testId = {
    taskDetail: 'test-task-detail',
    flatList: 'test-flat-list',
  };

  useEffect(() => {
    setData(taskList);
  }, [taskList]);

  const updateList = () => {
    // if (!movieList || movieList.total_pages > pageNo.current) {
    //   dispatch(
    //     getMovieListAction({
    //       releaseDate: '2016-12-31',
    //       sortBy: `${sortData}.${ascSortName ? 'asc' : 'desc'}`,
    //       page: pageNo.current,
    //     }),
    //   );
    // }
  };
  const onEndReached = () => {
    // if (
    //   !movieList ||
    //   movieList.isError ||
    //   movieList.isLoading ||
    //   movieList.page === movieList.total_pages
    // ) {
    //   return;
    // }
    // pageNo.current += 1;
    // updateList();
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
  };

  const deleteItem = (id: string) => {
    const newData = data.filter((item: any) => item.id !== id);
    setData(newData);
  };

  return (
    <SafeAreaView style={backgroundStyle()}>
      <View style={styles.container}>
        <Button
          title={'Add'}
          onPress={() => navigation.navigate(TASK_NAV.ADD_TASK)}
        />
        <FlatList
          testID={testId.flatList}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            pageNo.current = 1;
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
                      <Text
                        style={{fontWeight: 'bold'}}
                        testID={`${testId.taskDetail}-${index}`}>
                        {item.title}
                      </Text>
                      <Text testID={`${testId.taskDetail}-${index}`}>
                        {item.desc}
                      </Text>
                      <Text
                        style={{
                          color:
                            item.status === TASK_STATUS.COMPLETED
                              ? 'green'
                              : 'blue',
                        }}
                        testID={`${testId.taskDetail}-${index}`}>
                        {item.status}
                      </Text>
                    </View>
                    <View style={styles.deleteBtnContainer}>
                      <Button
                        title={'Delete'}
                        onPress={() => deleteItem(item.id)}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.01}
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
  listingContainer: {
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 0.3,
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 32,
    padding: '5%',
    marginVertical: '3%',
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
