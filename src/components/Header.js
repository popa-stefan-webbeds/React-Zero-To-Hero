import { useContext } from "react/cjs/react.development"
import { HeaderContext } from "../App"
import { useStyles } from "../Styles"
import Button from "./Button"

const Header = ({title}) => {
    const classes = useStyles();
    const {remainingTodos, doneTodos, showAddTask, onShowAdd} = useContext(HeaderContext)
    return (
        <header className={classes.header}>
            <h1>{title}</h1>
            <h3>Todo: {remainingTodos}</h3>
            <h3>Done: {doneTodos}</h3>
            <Button color={showAddTask ? 'red':'green'} text={showAddTask ? 'Close':'Add'} onClick={onShowAdd}/>
        </header>
    )
}

Header.defaultProps ={
    title: 'Todo App'
}

export default Header
