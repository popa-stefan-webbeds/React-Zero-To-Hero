import TYPES from './types'

const reducer = (state, { type, payload }) => {
    switch (type) {
        case TYPES.ADD_TASK:
            return { ...state, tasks: [...state.tasks, payload] }
        case TYPES.DELETE_TASK:
            return { ...state, tasks: state.tasks.filter((task) => task.id !== payload) }
        case TYPES.UPDATE_TASK:
            const { id, updatedTask } = payload
            return { ...state, tasks: state.tasks.map((task) => task.id === id ? updatedTask : task) }
        case TYPES.SHOW_ADD_TASK:
            return { ...state, showAddTask: !state.showAddTask }
        case TYPES.FETCH_SERVER_TASKS:
            return { ...state, tasks: payload, loading: false }
        case TYPES.UPDATE_COUNTERS:
            const remainingTodos = state.tasks.filter((task) => !task.checked).length;
            const doneTodos = state.tasks.length - remainingTodos;
            return { ...state, remainingTodos: remainingTodos, doneTodos: doneTodos }
        default:
            break;
    }
    return state
}

export default reducer
