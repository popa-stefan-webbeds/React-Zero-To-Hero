import Task from './Task'
import { useContext } from 'react'
import { GlobalContext } from '../context/MyContext'

const Tasks = () => {
    const { tasks } = useContext(GlobalContext)
    return (
        tasks.length > 0 ?
            tasks.map((myTask) =>
                <Task key={myTask.id} task={myTask} />
            ) :
            <h3>You are free ;)</h3>
    )
}
export default Tasks
