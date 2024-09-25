import {TASK_STATUS} from '../constant/task.constant';

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
