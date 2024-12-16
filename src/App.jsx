import React,{ useState,useEffect } from 'react'
import './App.css'

function App() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [editTaskId, setEditTaskId] = useState(null)
    const [updateTask,setUpdateTask] = useState('')
  
    useEffect(() => {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(storedTasks);
    }, []);
  
    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
  

    const handleAddTask = () => {
      
        const newTaskItem = { id: Date.now(), text: newTask };
        setTasks([...tasks, newTaskItem]);
        setNewTask('');
      
    }

    const handleDeleteTask = (id) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    }
  
    const handleEditTask = (id) => {
      const taskToEdit = tasks.find((task) => task.id === id);
      if (taskToEdit) {
        setEditTaskId(id);
        setUpdateTask(taskToEdit.text);
      }
    };
  
    const handleSaveEdit = () => {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: updateTask } : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      setUpdateTask('');
    };

  return (
    <>
      
      <div className="App text-center">
      <h1>Add Your Next Task</h1>

      <div className="task-input d-flex justify-content-center">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className='form-control border w-25 bg-light   mb-3'
        />
        <button className='btn btn-info p-2 s-3' onClick={handleAddTask}>Add Task</button>
      </div>

      <ul className="task-list border border-dark">
        {tasks.map((task) => (
          <h5 key={task.id}>
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={updateTask}
                  onChange={(e) => setUpdateTask(e.target.value)}
                  className='form-control  border border-dark mt-3 w-25 bg-light'
                  
                />
                <button className='btn btn-success ms-3' onClick={handleSaveEdit}>Save</button>
              </>) : (
              <>
                <h3>{task.text}</h3>
                <div className="d-flex justify-content-end me-3">
                <button className='btn btn-success me-3 ' onClick={() => handleEditTask(task.id)}>Edit</button>
              
              <button className='btn btn-warning' onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
                
              </>
            )}
          </h5>
        ))}
      </ul>
    </div>

   
    </>
  )
}

export default App
