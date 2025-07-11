import { useState } from "react";

function ToDoShowList({todo,onChange,onDelete, onUpdate, filter}) {

  const [editingId, setEditingId] = useState("null")
  const [newValue, setNewValue] = useState("")

  const onClickComplete = (id)=> {
    onChange(id)
  }

  const onClickDelete = (id) => {
    onDelete(id)
  }

  const onClickEdit = (id,name) => {
    setEditingId(id)
    setNewValue(name)
  }

  const onConfirmEdit = (id,name) => {
    if (!name.trim()) return;
    onUpdate(id,name)
    setEditingId(null)
  }

  const onCancelEdit = () => {
    setEditingId(null)
    setNewValue("")
  }

  const filteredToDo = todo.filter((item) => {
    if (filter === "completed") return item.completed
    if (filter === "incomplete") return !item.completed
    return item
  })

  return(
    <>
      <table>
        <thead>
          <tr>
            <th>Complete</th>
            <th>ToDo Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredToDo.map((item) => {
            if (item.id === editingId) {
              return (
                <tr key={item.id}>
                  <td></td>
                  <td><input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)}/></td>
                  <td><button onClick={()=>onConfirmEdit(editingId,newValue)}>✅</button><button onClick={() => onCancelEdit()}>❌</button></td>
                </tr>
              )
            } else {
              return (
              <tr key={item.id}>
                <td><button onClick={()=>onClickComplete(item.id)}>{item.completed === true ? "✅" : "❌"}</button></td>
                <td>{item.name}</td>
                <td><button onClick={()=>onClickDelete(item.id)}>🗑</button><button onClick={()=>onClickEdit(item.id,item.name)}>🖊</button></td>
              </tr>
              )
            }
          })}
        </tbody>
      </table>
    </>
  )
}

export default ToDoShowList