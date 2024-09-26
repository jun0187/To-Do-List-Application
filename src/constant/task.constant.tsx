export const TASK_NAV = {
  HOME: 'HOME',
  ADD_TASK: 'ADD_TASK',
  EDIT_TASK: 'EDIT_TASK',
};

export const TASK_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
};

export const STORAGE_KEY = '@task_list';

export const FILTER_TASK_STATUS = [
  {id: '*', label: 'All'},
  {id: '0', label: TASK_STATUS.PENDING},
  {id: '1', label: TASK_STATUS.COMPLETED},
];
