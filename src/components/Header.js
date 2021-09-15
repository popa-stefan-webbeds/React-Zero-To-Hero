import Button from "./Button"

const Header = ({title, remainingTodos, doneTodos, onShowAdd, showAddTask}) => {

    return (
        <header className='header'>
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
