import Task from './Task'
const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <>
            {
                tasks.map((myTask)=>
                <Task key={myTask.id} task={myTask} onDelete={onDelete} onToggle={onToggle}/>
                )
            }
        </>
    )
}
export default Tasks
