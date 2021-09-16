import { FaTimes } from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa'
import { useContext } from 'react/cjs/react.development'
import { TasksContext } from '../App'

const Task = ({ task }) => {
    const {deleteTask, toggleChecked} = useContext(TasksContext)
    return (
        <div className={`task ${task.checked ? 'done' : ''}`}>
            <h3>
                {task.text}
                <div>
                    <FaCheckCircle style={
                        {
                            color: 'green',
                            cursor: 'pointer',
                            margin: '0px 10px'
                        }
                    } onClick={() => toggleChecked(task.id)} />
                    <FaTimes style={{
                        color: 'red',
                        cursor: 'pointer',
                    }}
                        onClick={() => deleteTask(task.id)}
                    />
                </div>
            </h3>

        </div>
    )
}

export default Task
