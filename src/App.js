import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect, createContext } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { useStyles } from './Styles'
import Box from '@material-ui/core/Box'
import { theme } from './Styles'
import { ThemeProvider } from '@material-ui/styles'

const SERVER_ADDRESS = 'https://localhost:5001'

export const TasksContext = createContext();
export const HeaderContext = createContext();

function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true);

  const classes = useStyles()
  const remainingTodos = tasks.filter((task) => !task.checked).length;
  const doneTodos = tasks.length - remainingTodos

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks(SERVER_ADDRESS + '/tasks')
      setTasks(tasksFromServer)
      setTimeout(()=>{
        setLoading(false);
      },1000)
    }
    getTasks()
  }, [])

  const fetchTasks = async (route) => {
    const res = await fetch(route)
    const data = await res.json()
    console.log(data)
    return data
  }

  const onShowAdd = () => setShowAddTask(!showAddTask)

  const addTask = async (newTask) => {
    const res = await fetch(`${SERVER_ADDRESS}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })

    const data = await res.json()
    console.log(data);
    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(`${SERVER_ADDRESS}/tasks/${id}`, {
      method: 'DELETE'
    })

    console.log('delete', id);
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleChecked = async (id) => {
    const myTask = await fetchTasks(`${SERVER_ADDRESS}/tasks/${id}`)
    console.log('myTask', myTask)
    await updateTaskToggle(myTask.id, { 'text': myTask.text, 'checked': !myTask.checked })
    const updatedTask = await fetchTasks(`${SERVER_ADDRESS}/tasks/${id}`)
    console.log('updatedTask', updatedTask);
    setTasks(tasks.map((task) => task.id === id ?
      updatedTask : task))
  }

  const updateTaskToggle = async (id, taskBody) => {
    await fetch(`${SERVER_ADDRESS}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(taskBody)
    })
  }

  return (
    <ThemeProvider theme={theme}>
      {loading ? <Box className={classes.loadingIcon} ><ClipLoader size={125} color={"aqua"}/></Box> :
      <div className={classes.container}>
        <HeaderContext.Provider value={{ remainingTodos, doneTodos, onShowAdd, showAddTask, addTask }}>
          <Header />
          {showAddTask && <AddTask/>}
        </HeaderContext.Provider>
        <TasksContext.Provider value={{ tasks, deleteTask, toggleChecked }}>
          {
            tasks.length > 0 ? <Tasks /> : <h3>You are free :)</h3>
          }
        </TasksContext.Provider>
      </div>}
    </ThemeProvider>
  );
}

export default App;
