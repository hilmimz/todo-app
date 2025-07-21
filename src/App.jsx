import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoShowList from './components/ToDoShowList'
import ToDoForm from './components/ToDoForm'


function App() {
  const [idCounter, setIdCounter] = useState(()=> {
    const storedId = localStorage.getItem("todos_id")
    return storedId ? JSON.parse(storedId) : 1
  })

  const [toDo, setToDo] = useState(()=>{
    const stored = localStorage.getItem("todos")
    return stored ? JSON.parse(stored) : []
  })

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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDo));
  }, [toDo]);

  useEffect(() => {
    localStorage.setItem("todos_id", idCounter.toString());
  }, [idCounter]);

  return(
    <div
    className={`mx-auto m-5 shadow-2xl min-w-[700px] max-w-[700px] flex flex-col items-center rounded-2xl transition-all duration-300 ease-in-out overflow-hidden`}
    style={{ height: `${270 + toDo.length * 96}px` }}
    >
      <header className='bg-blue-300 w-full flex flex-col items-center space-y-5 p-5 rounded-t-2xl'>
        <h1 className='text-4xl text-white'>To Do List App</h1>
        <p className='italic'>A better day starts with a simple list</p>
      </header>
      <main className='w-full p-8 flex flex-col'>
        <ToDoForm onAdd={addToDo} />
        <div className='flex space-x-6 mt-5'>
          <button onClick={() => setFilter("all")} className={`${filter === "all"? ' border-sky-500 bg-sky-500 text-white ': 'border-gray-300'} text-sm px-3 py-1 border cursor-pointer rounded-lg hover:-translate-y-0.5 transition-all duration-300`}>Semua</button>
          <button onClick={() => setFilter("completed")} className={`${filter === "completed"? ' border-sky-500 bg-sky-500 text-white ': 'border-gray-300'} text-sm px-3 py-1 border cursor-pointer rounded-lg hover:-translate-y-0.5 transition-all duration-300`}>Selesai</button>
          <button onClick={() => setFilter("incomplete")} className={`${filter === "incomplete"? ' border-sky-500 bg-sky-500 text-white ': 'border-gray-300'} text-sm px-3 py-1 border cursor-pointer rounded-lg hover:-translate-y-0.5 transition-all duration-300`}>Belum Selesai</button>
        </div>
        <div className='transition-all duration-500'>
          <ToDoShowList todo={toDo} onChange={changeStatus} onDelete={deleteToDo} onUpdate={updateToDo} filter={filter}/>
        </div> 
      </main>
    </div>

  )
}

export default App
