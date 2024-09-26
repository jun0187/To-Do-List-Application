import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {TaskModel} from '../interface/task.interface';

export interface TaskState {
  task: TaskModel | null;
  taskList: Array<TaskModel>;
}

const initialState: TaskState = {
  task: null,
  taskList: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<TaskModel | null>) => {
      state.task = action.payload;
    },
    setTaskList: (state, action: PayloadAction<Array<TaskModel>>) => {
      state.taskList = action.payload;
    },
  },
});

export const {setTask, setTaskList} = taskSlice.actions;

export default taskSlice.reducer;
