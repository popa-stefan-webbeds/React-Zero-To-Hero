import { createContext } from "react";
import Box from '@material-ui/core/Box'
import { useState, useEffect } from "react/cjs/react.development";
import { useStyles } from "../Styles";
import ClipLoader from 'react-spinners/ClipLoader'
import { fetchTasksApi, fetchTaskApi, addTaskApi, deleteTaskApi, updateTaskApi } from "../Services";
export const GlobalContext = createContext()


const MyContext = ({ children }) => {

    const classes = useStyles()
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true);
    const [showAddTask, setShowAddTask] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasksApi()
            setTasks(tasksFromServer)
            setLoading(false);
        }
        getTasks()
    }, [])

    const onShowAdd = () => setShowAddTask(!showAddTask)
    const remainingTodos = tasks.filter((task) => !task.checked).length;
    const doneTodos = tasks.length - remainingTodos;


    const addTask = async (newTask) => {
        const data = await addTaskApi(newTask);
        setTasks([...tasks, data]);
    }

    const deleteTask = async (id) => {
        const result = await deleteTaskApi(id);
        if (result) {
            setTasks(tasks.filter((task) => task.id !== id))
        }
    }

    const updateTask = async (id) => {
        const myTask = await fetchTaskApi(id)
        const result = await updateTaskApi(id, { 'text': myTask.text, 'checked': !myTask.checked });
        if (result) {
            const updatedTask = await fetchTaskApi(id);
            setTasks(tasks.map((task) => task.id === id ?
                updatedTask : task))
        }
    }

    return (
        loading ? <Box className={classes.loadingIcon}><ClipLoader size={125} color={"aqua"} /></Box> :
            <GlobalContext.Provider value={{ tasks, setTasks, remainingTodos, doneTodos, onShowAdd, showAddTask, addTask, deleteTask, updateTask }}>
                <div className={classes.container}>
                    {children}
                </div>
            </GlobalContext.Provider>
    )
}

export default MyContext
