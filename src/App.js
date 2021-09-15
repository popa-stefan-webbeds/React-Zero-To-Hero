import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'

const SERVER_ADDRESS = 'https://localhost:5001'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks(SERVER_ADDRESS + '/tasks')
      setTasks(tasksFromServer)
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
      //{ ...task, checked: !task.checked }
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

  //const remainingTodos = () => { return tasks.filter((task)=>!task.checked).length;}
  const remainingTodos = tasks.filter((task) => !task.checked).length;
  //const doneTodos = () => { return tasks.length - remainingTodos() }
  const doneTodos = tasks.length - remainingTodos
  return (
    <div className="container">
      <Header remainingTodos={remainingTodos} doneTodos={doneTodos} onShowAdd={onShowAdd} showAddTask={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {
        tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleChecked} /> : 'You are free :)'
      }
    </div>
  );
}

export default App;
