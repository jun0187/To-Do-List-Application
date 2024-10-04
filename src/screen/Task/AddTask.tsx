import React, {useState} from 'react';
import TaskForm from '../../component/TaskForm';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(0);

  const labelList = {
    addTask: 'Add Task',
    addBtn: 'Add',
  };

  return (
    <TaskForm
      headerLabel={labelList.addTask}
      btnLabel={labelList.addBtn}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      status={status}
      setStatus={setStatus}
    />
  );
};

export default AddTask;
