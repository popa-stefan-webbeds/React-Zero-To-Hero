import { useState } from "react"
const AddTask = ({onAdd}) => {
    const[text, setText] = useState('');
    const[done, setDone] = useState(false);
    const onSubmit = (e) =>{
        e.preventDefault();
        if(!text){
            alert('Please add a task')
            return
        }
        const checked = done;
        onAdd({text, checked});
        setText('');
        setDone(false);
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e)=>setText(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Done</label>
                <input type='checkbox' checked={done} value={done} onChange={(e)=>setDone(e.currentTarget.checked)}/>
            </div>
            <input type='submit' value='Save Task' className='btn btn-block'/>
        </form>
    )
}

export default AddTask
