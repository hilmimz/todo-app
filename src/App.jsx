import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoShowList from './components/ToDoShowList'
import ToDoForm from './components/ToDoForm'

function App() {
  const [idCounter, setIdCounter] = useState(1)
  const [toDo, setToDo] = useState([])
  const [filter, setFilter] = useState("all");

  const addToDo = (name) => {
    const newToDo = {
      id: idCounter,
      name,
      completed: false
    }

    setToDo(prev => [
      ...prev,
      newToDo
    ])

    setIdCounter(prev => prev+1)
  }

  const changeStatus = (id) => {
    const updatedToDoStatus = toDo.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed
        }
      } else {
        return item
      }
    })
    setToDo(updatedToDoStatus)
  }

  const deleteToDo = (id) => {
    const filteredToDo = toDo.filter(item => item.id != id)
    setToDo(filteredToDo)
  }

  const updateToDo = (id, newName) => {
    const updatedToDo = toDo.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          name: newName
        }
      } else {
        return item
      }
    })

    setToDo(updatedToDo)
  }

  return(
    <>
      <h1>To Do List App</h1>
      <p>Tambahkan To Do di input di bawah ini</p>
      <ToDoForm onAdd={addToDo} />
      <br />
      <h3>Filter To Do</h3>
      <button onClick={() => setFilter("all")}>Semua</button>
      <button onClick={() => setFilter("completed")}>Selesai</button>
      <button onClick={() => setFilter("incomplete")}>Belum Selesai</button>
      <ToDoShowList todo={toDo} onChange={changeStatus} onDelete={deleteToDo} onUpdate={updateToDo} filter={filter}/>
    </>
  )
}

export default App
