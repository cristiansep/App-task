import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskSetActive, taskStartDelete, taskStartLoading, taskStartUpdate } from '../../actions/tasks';

import moment from 'moment';


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

  const handleClick = (e) => {
    if(e.vigente === false) {
      e.vigente = true
    }else {
        e.vigente = false
    }
    dispatch(taskStartUpdate(e))
   
  }


  const crearRows = () => {
    return tasks.map((task) => (
      <tr key={task.id}>
        <td className="w-25">{task.desc}</td>
        <td className="w-auto">{task.user.name}</td>
        <td className="w-auto">{moment(task.date).format('DD-MM-YYYY')}</td>
        <td 
          className="w-auto"
          data-toggle="tooltip"
          data-placement="top"
          title="Cambiar estado"
          data-html="true"
          style={{cursor: 'pointer'}}
          onClick={() => handleClick(task)}
          >
            {(task.vigente ? 'Vigente' : 'Terminada')}
        </td>
        <td className="w-25">
          <button
            className="btn btn-outline-dark mr-5"
            onClick={() => handleUpdate(task)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => handleDelete(task.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="d-flex justify-content-center">
      <table className="table table-stripped mt-4 w-75 ">
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </div>
  );
};
