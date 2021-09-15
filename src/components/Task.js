import { FaTimes } from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
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
                    } onClick={() => onToggle(task.id)} />
                    <FaTimes style={{
                        color: 'red',
                        cursor: 'pointer',
                    }}
                        onClick={() => onDelete(task.id)}
                    />
                </div>
            </h3>

        </div>
    )
}

export default Task
