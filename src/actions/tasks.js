import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import Swal from "sweetalert2";
import { prepareTasks } from "../helpers/prepareTasks";


export const taskStartAddNew = (task) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;

    try {
      const resp = await fetchConToken("tareas", task, "POST");
      const body = await resp.json();

      if (body.ok) {
        task.id = body.tarea.id;
        task.date = body.tarea.date
        task.vigente = body.tarea.vigente
        task.user = {
          _id: uid,
          name: name,
        };
        dispatch(taskAddNew(task));
      }
    } catch (error) {
      console.log(error);
    }
  };
};


 const taskAddNew = (task) =>( {
    type: types.taskAddNew,
    payload: task
});


export const taskSetActive = (task) =>( {
    type: types.taskSetActive,
    payload: task
});

export const taskClearActiveEvent = () => ({
    type: types.taskClearActiveEvent
});


export const taskStartUpdate = (task) => {
    return async(dispatch) => {

        try {

            const resp = await fetchConToken(`tareas/${task.id}`, task, 'PUT');
            const body = await resp.json();

            if(body.ok) {
                dispatch(taskUpdated(task));
            }else {
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error)
        }

    }
}

const taskUpdated = (task) => ({
    type: types.taskUpdated,
    payload: task
});


export const taskStartDelete = (id) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`tareas/${id}`, {}, "DELETE");
      const body = await resp.json();
      if (body.ok) {
        dispatch(taskDeleted(id));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const taskDeleted = (id) => ({
  type: types.taskDeleted,
  payload: id,
});



export const taskStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("tareas");
      const body = await resp.json();

      const tasks = prepareTasks(body.tareas);

      dispatch(taskLoaded(tasks));
    } catch (error) {
      console.log(error);
    }
  };
};

const taskLoaded = (tasks) => ({
    type: types.taskLoaded,
    payload: tasks
})

export const taskLogout = () => ({
    type: types.taskLogout
})