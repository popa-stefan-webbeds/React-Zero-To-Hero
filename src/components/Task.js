import { CheckBox, Delete} from '@material-ui/icons'
import { useContext } from 'react/cjs/react.development'
import { TasksContext } from '../App'
import Box from '@material-ui/core/Box'
const Task = ({ task }) => {
    const {deleteTask, toggleChecked} = useContext(TasksContext)
    return (
        <div className={`task ${task.checked ? 'done' : ''}`}>
            <h3>
                {task.text}
                <Box>
                    <CheckBox 
                           style={{
                            color: 'green',
                        }}
                     onClick={() => toggleChecked(task.id)} />
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
