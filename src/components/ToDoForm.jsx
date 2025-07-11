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
      <label>Masukkan todo: </label>
      <form onSubmit={addToDo}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button type="submit">+</button>
      </form>
    </>
  )
}

export default ToDoForm