import { CheckBox, Delete } from '@material-ui/icons'
import { useContext } from 'react/cjs/react.development'
import Box from '@material-ui/core/Box'
import { GlobalContext } from '../context/MyContext'
const Task = ({ task }) => {
    const { deleteTask, updateTask } = useContext(GlobalContext)
    return (
        <div className={`task ${task.checked ? 'done' : ''}`}>
            <h3>
                {task.text}
                <Box>
                    <CheckBox
                        style={{
                            color: 'green',
                        }}
                        onClick={() => updateTask(task.id)} />
                    <Delete style={{
                        color: 'red',
                    }}
                        onClick={() => deleteTask(task.id)}
                    />
                </Box>
            </h3>

        </div>
    )
}

export default Task
