import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCross, faPen, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

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

  const xMarkIcon = <FontAwesomeIcon icon={faXmark} className="text-red-500 text-lg cursor-pointer"/>
  const checkIcon = <FontAwesomeIcon icon={faCheck} className="text-green-500 text-lg cursor-pointer"/>

  return(
    <AnimatePresence>
          {filteredToDo.map((item) => {
            if (item.id === editingId) {
              return (
                <motion.div
                key={item.id}
                className="mt-4 p-4 border border-gray-100 rounded-lg bg-gray-50 flex space-x-2 min-h-20 justify-center items-center shadow-md scale-104 transition-all duration-300"
                initial={{ opacity: 0, y: -10 }}     // saat pertama muncul
                animate={{ opacity: 1, y: 0 }}       // setelah muncul
                exit={{ opacity: 0, y: 10 }}         // saat dihapus
                transition={{ duration: 0.3 }}>
                  <input className="flex-1 text-gray-800 p-2 border-1 bg-white border-gray-500 rounded-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-200" type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)}/>
                  <div className="space-x-3">
                    <button onClick={()=>onConfirmEdit(editingId,newValue)}>{checkIcon}</button>
                    <button onClick={() => onCancelEdit()}>{xMarkIcon}</button>
                  </div>
                </motion.div>
              )
            } else {
              return (
              <motion.div
              key={item.id}
              className="mt-4 p-4 border border-gray-100 rounded-lg bg-gray-50 flex space-x-2 min-h-20 justify-center items-center shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: -5, scale:0.98 }}     // saat pertama muncul
              animate={{ opacity: 1, y: 0,scale:1 }}       // setelah muncul
              exit={{ opacity: 0, y: 10, scale:0.1 }}         // saat dihapus
              transition={{ duration: 0.2 }}>
                <button className="flex-none flex justify-center min-w-5 items-center" onClick={()=>onClickComplete(item.id)}>{item.completed === true ? checkIcon : xMarkIcon}</button>
                <h2 className={`flex-1 ${item.completed? "line-through" : ""}`}>{item.name}</h2>
                <div className="flex flex-none space-x-3">
                  <button className="" onClick={()=>onClickDelete(item.id)}><FontAwesomeIcon icon={faTrash} className="text-orange-700 cursor-pointer"/></button>
                  <button onClick={()=>onClickEdit(item.id,item.name)}><FontAwesomeIcon icon={faPen} className="text-cyan-700 cursor-pointer"/></button>
                </div>
              </motion.div>
              )
            }
          })}
    </AnimatePresence>
  )
}

export default ToDoShowList