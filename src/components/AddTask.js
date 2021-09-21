import { useState } from "react"
import { useContext } from "react/cjs/react.development";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useStyles } from "../Styles";
import { TextField } from "@material-ui/core";
import { Alert } from "@mui/material";
import { GlobalContext } from "../context/MyContext";

const AddTask = () => {
    const { showAddTask, addTask } = useContext(GlobalContext)

    const classes = useStyles()
    const [text, setText] = useState('');
    const [done, setDone] = useState(false);
    const [emptyText, setEmptyText] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            setEmptyText(true);
            return
        }
        const checked = done;
        addTask({ text, checked });
        setText('');
        setDone(false);
        setEmptyText(false);
    }
    return (
        showAddTask &&
        <form className='add-form' onSubmit={onSubmit}>
            {emptyText && <Alert severity="error" sx={{ margin: '5px 0px' }}>Task can't be empty!</Alert>}
            <TextField error={emptyText} fullWidth size="small" label="Add Task" variant="outlined" value={text} onChange={(e) => setText(e.target.value)} />
            <div>
                <FormControlLabel
                    className={classes.formIcons}
                    control={<Checkbox checked={done} onChange={(e) => setDone(e.currentTarget.checked)} />}
                    label="Done"
                />
            </div>
            <input type='submit' value='Save Task' className={`${classes.btn} ${classes.btnBlock}`} />
        </form>
    )
}

export default AddTask
