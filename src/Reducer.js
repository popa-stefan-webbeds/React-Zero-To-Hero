import TYPES from './types'

const reducer = (state, { type, payload }) => {
    switch (type) {
        case TYPES.ADD_TASK:
            return { ...state, tasks: [...state.tasks, payload] }
        case TYPES.DELETE_TASK:
            return { ...state, tasks: state.tasks.filter((task) => task.id !== payload) }
        case TYPES.UPDATE_TASK:
            const {id, updatedTask} = payload 
            return { ...state, tasks: state.tasks.map((task) => task.id === id ? updatedTask : task)}
        case TYPES.SHOW_ADD_TASK:
            return { ...state, showAddTask: !state.showAddTask }
        case TYPES.FETCH_SERVER_TASKS:
            return { ...state, tasks: payload, loading: false }
        default:
            break;
    }
    return state
}

export default reducer
