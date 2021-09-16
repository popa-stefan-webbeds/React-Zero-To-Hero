import Task from './Task'
import { useContext } from 'react'
import { TasksContext } from '../App'

const Tasks = () => {
    const {tasks} = useContext(TasksContext)
    return (
        <>
            {
                tasks.map((myTask)=>
                <Task key={myTask.id} task={myTask}/>
                )
            }
        </>
    )
}
export default Tasks
