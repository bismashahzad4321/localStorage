import React, { useState, useEffect } from 'react'
import "./App.css"

const App = () => {
  const [name, setName] = useState("")
  const [array, setArray] = useState([])
  const [message, setMessage] = useState("")
  const [editIndex, setEditIndex] = useState(null)



  const saveBtn = () => {
    if (name.trim().length === 0) {
      setMessage("No Task Added")
      return
    }

    if (editIndex !== null) {
      const updatedArray = [...array]
      updatedArray[editIndex] = name
      setArray(updatedArray)
      localStorage.setItem("Task", JSON.stringify(updatedArray))
      setMessage("Task Updated Successfully")
      setEditIndex(null)
    } else {
      const newArray = [...array, name]
      setArray(newArray)
      localStorage.setItem("Task", JSON.stringify(newArray))
      setMessage("Your Task Saved")
    }

    setName("")
  }

  const reloadData = () => {
    const storeData = JSON.parse(localStorage.getItem("Task")) || []
    setArray(storeData)
    setMessage("Old Tasks Reloaded")
  }

  const editBtn = (index) => {
    setName(array[index])
    setEditIndex(index)
    setMessage("Your Task is in Edit Mode")
  }

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("Task")) || []
  //   setArray(storedData)
  // }, [])
  const deleteBtn = (index) => {
    const updatedArray = [...array];
    updatedArray.splice(index, 1)
    setArray(updatedArray)
    localStorage.setItem("Task", JSON.stringify(updatedArray))
    setMessage("Task Deleted Successfully");
  }
  const resetBtn = () => {
    setArray([])
    localStorage.setItem("Task", JSON.stringify([]))
  }
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Task")) || [];
    setArray(storedData);
  }, [])
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Your Task"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={saveBtn}>
        {editIndex !== null ? "Update Task" : "Save Task"}
      </button>

      <p>{message}</p>

      {array.map((item, index) => (
        <div key={index}>
          <div className='BTN'>
            {item}


            <button onClick={() => editBtn(index)}>Edit</button>
            <button onClick={() => deleteBtn(index)}>Delete</button>
          </div>
        </div>
      ))}

      <button onClick={reloadData}>Reload Old Data</button>
      <button onClick={resetBtn}>Clear All</button>
    </div>
  )
}

export default App
