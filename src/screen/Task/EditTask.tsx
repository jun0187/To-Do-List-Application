import React, {useState} from 'react';
import {TASK_STATUS} from '../../constant/task.constant';
import {useSelector} from 'react-redux';
import TaskForm from '../../component/TaskForm';

const EditTask = () => {
  const task = useSelector((state: any) => state.task.task);

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [status, setStatus] = useState(
    task?.status === TASK_STATUS.COMPLETED ? 1 : 0,
  );

  const labelList = {
    editTask: 'Edit Task',
    editBtn: 'Update',
  };

  return (
    <TaskForm
      headerLabel={labelList.editTask}
      btnLabel={labelList.editBtn}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      status={status}
      setStatus={setStatus}
    />
  );
};

export default EditTask;
