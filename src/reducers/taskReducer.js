import { types } from '../types/types';


const initialState = {
    tasks: [],
    activeTask: null
}

export const taskReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.taskSetActive: 
            return {
                ...state,
                activeTask: action.payload
            }
        case types.taskClearActiveEvent:
            return {
                ...state,
                activeTask: null
            }
        case types.taskAddNew:
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    action.payload
                ]
            } 
        case types.taskLoaded:
            return {
                ...state,
                tasks: [...action.payload] 
            } 
        case types.taskUpdated:
            return {
                ...state,
                tasks: state.tasks.map(
                    tarea => (tarea.id === action.payload.id) ? action.payload: tarea
                )
            }
        case types.taskDeleted: 
            return {
                ...state,
                tasks: state.tasks.filter(
                    tarea => (tarea.id !== action.payload)
                ),
                activeTask: null
            }
        case types.taskLogout: 
            return {
                ...initialState
            }
        default:
            return state;
    }

}