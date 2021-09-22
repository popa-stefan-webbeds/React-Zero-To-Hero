import { createContext, useReducer } from "react";
import Box from '@material-ui/core/Box'
import { useEffect } from "react/cjs/react.development";
import { useStyles } from "../Styles";
import ClipLoader from 'react-spinners/ClipLoader'
import { fetchTasksApi, fetchTaskApi, addTaskApi, deleteTaskApi, updateTaskApi } from "../Services";
import reducer from "../Reducer";
import TYPES  from "../types";

export const GlobalContext = createContext()

const initialState = {
    tasks: [],
    loading: true,
    showAddTask: false,
    remainingTodos: 0,
    doneTodos: 0,
}

const MyContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const classes = useStyles()

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasksApi()
            dispatch({type: TYPES.FETCH_SERVER_TASKS, payload: tasksFromServer})
        }
        getTasks()
    }, [])

    useEffect(() =>{
        dispatch({type: TYPES.UPDATE_COUNTERS})
    }, [state.tasks])

    const onShowAdd = () =>{
        dispatch({type: TYPES.SHOW_ADD_TASK})
    }

    const addTask = async (newTask) => {
        const data = await addTaskApi(newTask);
        dispatch({type: TYPES.ADD_TASK, payload: data})
    }

    const deleteTask = async (id) => {
        const result = await deleteTaskApi(id);
        if (result) {
            dispatch({type: TYPES.DELETE_TASK, payload: id})
        }
    }

    const updateTask = async (id) => {
        const myTask = await fetchTaskApi(id)
        const result = await updateTaskApi(id, { 'text': myTask.text, 'checked': !myTask.checked });
        if (result) {
            const updatedTask = await fetchTaskApi(id);
            dispatch({type: TYPES.UPDATE_TASK, payload: {id, updatedTask}})
        }
    }

    return (
        state.loading ? <Box className={classes.loadingIcon}><ClipLoader size={125} color={"aqua"} /></Box> :
            <GlobalContext.Provider value={{...state, onShowAdd, addTask, deleteTask, updateTask}}>
                <div className={classes.container}>
                    {children}
                </div>
            </GlobalContext.Provider>
    )
}

export default MyContext
