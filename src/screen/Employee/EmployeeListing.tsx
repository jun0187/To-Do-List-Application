import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import CustomButton from '../../component/CustomButton';
import useTokenCounter from '../../component/useTokenCounter';
import {EMPLOYEE_NAV} from '../../constant/employee.constant';
import {navigate} from '../../services/Navigation.service';
import {setEmployee} from '../../reducer/employee.reducer';
import {
  deleteEmployeeAction,
  getEmployeeListAction,
} from '../../saga/employee.saga';
import Colors from '../../assets/Colors';
import {EmployeeModel} from '../../interface/employee.interface';
import {useFocusEffect} from '@react-navigation/native';
import StackContainer from '../../component/StackContainer';
import IconButton from '../../component/IconButton';
import Icons from '../../assets/Icons';

const EmployeeListing = () => {
  const dispatch = useDispatch();
  const pageNo = useRef(0);
  const [refreshing, setRefreshing] = useState(true);
  const employeeList = useSelector(
    (state: any) => state.employee.employeeList?.data,
  );
  const [data, setData] = useState(employeeList?.content);
  const [shouldStopCounter, setShouldStopCounter] = useState(false);

  useTokenCounter(shouldStopCounter);

  const testId = {
    employeeDetail: 'test-employee-detail',
    flatList: 'test-flat-list',
    addBtn: 'add-btn',
    deleteBtn: 'delete-btn',
    refreshBtn: 'test-refresh-btn',
  };

  const labelList = {
    title: 'Employee',
    addBtn: '+ Add',
    refreshBtn: 'Refresh',
  };

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, []),
  );

  useEffect(() => {
    setData(employeeList?.content);
    if (refreshing && !employeeList?.isLoading) {
      setRefreshing(false);
    }
  }, [employeeList]);

  const updateList = () => {
    dispatch(getEmployeeListAction({pageNo: pageNo.current}));
  };

  const deleteItem = (employee: EmployeeModel) => {
    dispatch(deleteEmployeeAction(employee));
    onRefresh();
  };

  const onEndReached = () => {
    if (
      !employeeList ||
      employeeList.isError ||
      employeeList.isLoading ||
      employeeList.last
    ) {
      return;
    }
    pageNo.current += 1;
    updateList();
  };

  const onRefresh = () => {
    setRefreshing(true);
    pageNo.current = 0;
    updateList();
  };

  return (
    <StackContainer
      isToggleButton
      title={labelList.title}
      style={styles.container}>
      <CustomButton
        label={labelList.addBtn}
        onPressButton={() => {
          setShouldStopCounter(true);
          dispatch(setEmployee(null));
          navigate(EMPLOYEE_NAV.EMPLOYEE_DETAIL);
        }}
        testId={testId.addBtn}
        buttonWidth={90}
      />

      <View style={styles.flatListContainer}>
        <FlatList
          testID={testId.flatList}
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={data}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.01}
          ListFooterComponent={
            employeeList?.isLoading &&
            !refreshing && (
              <ActivityIndicator animating={true} color={Colors.loader} />
            )
          }
          ListEmptyComponent={
            employeeList?.isError && (
              <View style={styles.emptyContainer}>
                <CustomButton
                  label={labelList.refreshBtn}
                  onPressButton={onRefresh}
                  testId={testId.refreshBtn}
                  buttonWidth={100}
                />
              </View>
            )
          }
          renderItem={({item, index}) => {
            return (
              <View style={styles.listingContainer} key={index}>
                <TouchableOpacity
                  key={item.id}
                  testID={`${testId.employeeDetail}-${index}`}
                  onPress={() => {
                    setShouldStopCounter(true);
                    dispatch(setEmployee(item));
                    navigate(EMPLOYEE_NAV.EMPLOYEE_DETAIL);
                  }}>
                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={{fontWeight: 'bold'}}>
                        {`${item.firstName}, ${
                          item.lastName
                        } (MYR ${item.salary.toFixed(2)})`}
                      </Text>
                      <Text>{item.email}</Text>
                      <Text>{item.department}</Text>
                    </View>
                    <IconButton
                      iconName={Icons.DELETE}
                      onPress={() => {
                        deleteItem(item);
                      }}
                      iconSize={28}
                      testId={`${testId.deleteBtn}-${index}`}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </StackContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: '10%',
  },
  flatListContainer: {
    marginBottom: '5%',
  },
  emptyContainer: {
    width: Dimensions.get('window').width - 32,
    padding: '5%',
    marginVertical: '1%',
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
    width: '80%',
  },
});
export default EmployeeListing;
