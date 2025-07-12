import { useState } from "react";

function ToDoForm({onAdd}) {
  const [text, setText] = useState("");

  const addToDo = (e) => {
    e.preventDefault()
    if (!text.trim()) {
     return 
    }
    onAdd(text)
    setText("")
  }


  return(
    <>
      <form onSubmit={addToDo} className="w-full flex justify-between space-x-1">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="text-gray-800 p-2 border bg-gray-100 border-gray-300 rounded-sm flex-1 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-200" placeholder="Learning React JS"/>
        <button type="submit" className="bg-blue-300 hover:bg-blue-500 hover:-translate-y-1 cursor-pointer py-1 px-3 rounded-sm transition-all duration-300">+ Add Task</button>
      </form>
    </>
  )
}

export default ToDoForm