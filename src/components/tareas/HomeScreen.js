import React, { useState, useEffect } from 'react'
import { Navbar } from '../ui/Navbar';


import { useDispatch, useSelector } from 'react-redux';
import { taskClearActiveEvent, taskStartAddNew, taskStartUpdate} from '../../actions/tasks';
import { TaskLists } from './TaskLists';






const initTask = { title: "" };

export const HomeScreen = () => {
  const { activeTask } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  const [titleValid, setTitleValid] = useState(true);
  const [formValues, setFormValues] = useState(initTask);

  const { title } = formValues;

  useEffect(() => {
    if (activeTask) {
      setFormValues(activeTask);
    } else {
      setFormValues(initTask);
    }
  }, [activeTask, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if (activeTask) {
      dispatch(taskStartUpdate(formValues));
      dispatch(taskClearActiveEvent());
    } else {
      dispatch(taskStartAddNew(formValues));
    }

    setTitleValid(true);
    setFormValues(initTask);
    taskStartUpdate();
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="d-flex justify-content-center mb-4">
          <h1>Lista de tareas</h1>
        </div>

        <div className="d-flex justify-content-center">
          <form className="row w-75" onSubmit={handleSubmitForm}>
          <div className="col-sm-10">
          <div className="form-group mx-sm-3 mb-2">
              <input
                type="text"
                className={`form-control w-100 ${!titleValid && "is-invalid"}`}
                name="title"
                value={title || ""}
                placeholder="Ingrese su tarea"
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
          </div>
           
            <button type="submit" className="btn btn-primary mb-2">
              Guardar
            </button>
          </form>
        </div>
        <TaskLists />
      </div>
    </>
  );
};
