import { useState } from "react"
import { useContext } from "react/cjs/react.development";
import { HeaderContext } from "../App";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useStyles } from "../Styles";
import { TextField } from "@material-ui/core";
import { Alert } from "@mui/material";

const AddTask = () => {
   
    const classes = useStyles()

    const {addTask} = useContext(HeaderContext)
    const[text, setText] = useState('');
    const[done, setDone] = useState(false);
    const[emptyText, setEmptyText] = useState(false);
    const onSubmit = (e) =>{
        e.preventDefault();
        if(!text){
            setEmptyText(true);
            return
        }
        const checked = done;
        addTask({text, checked});
        setText('');
        setDone(false);
        setEmptyText(false);
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            {/* <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e)=>setText(e.target.value)}/>
            </div> */}
            {emptyText &&<Alert severity="error" sx={{margin:'5px 0px'}}>Task can't be empty!</Alert>}
            <TextField error={emptyText} fullWidth size ="small" label="Add Task" variant="outlined" value={text} onChange={(e)=>setText(e.target.value)}/>
            <div>
                {/* <label>Done</label> */}
                <FormControlLabel
                className = {classes.formIcons}
                control={<Checkbox checked={done} onChange={(e)=>setDone(e.currentTarget.checked)}/>}
                label="Done"
                />
                {/* <input type='checkbox' checked={done} value={done} onChange={(e)=>setDone(e.currentTarget.checked)}/>
                 */}
            </div>
            <input type='submit' value='Save Task' className={`${classes.btn} ${classes.btnBlock}`}/>
        </form>
    )
}

export default AddTask
