import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskSetActive, taskStartDelete, taskStartLoading } from '../../actions/tasks';

export const TaskLists = () => {
  const { tasks } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(taskStartLoading());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(taskStartDelete(id));
    taskStartLoading();
  };

  const handleUpdate = (e) => {
    dispatch(taskSetActive(e));
  };

  const crearRows = () => {
    return tasks.map((task) => (
      <tr key={task.id}>
        <td style={{ cursor: "pointer" }} onClick={() => handleUpdate(task)}>
          {task.title}
        </td>
        <td>
          <button
            className="btn btn-warning mr-5"
            onClick={() => handleUpdate(task)}
          >
            <i className="fas fa-edit"></i>
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(task.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped mt-4">
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Editar</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};
