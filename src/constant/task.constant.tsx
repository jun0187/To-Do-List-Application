export const TASK_NAV = {
  MAIN: 'Task',
  TASK_LISTING: 'TaskListing',
  ADD_TASK: 'AddTask',
  EDIT_TASK: 'EditTask',
};

export const TASK_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
};

export const STORAGE_KEY = {
  TASK_LIST: '@task_list',
  USER: '@user',
};

export const FILTER_TASK_STATUS = [
  {id: '*', label: 'All'},
  {id: '0', label: TASK_STATUS.PENDING},
  {id: '1', label: TASK_STATUS.COMPLETED},
];
