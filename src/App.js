import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import MyContext from './context/MyContext'

function App() {
  return (
    <MyContext>
      <Header />
      <AddTask />
      <Tasks />
    </MyContext>
  );
}

export default App;
