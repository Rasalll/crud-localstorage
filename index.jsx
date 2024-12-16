import React,{useState,useEffect} from 'react'

function index() {

    const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);


  // Save tasks to localStorage whenever tasks are updated
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle adding a new task
  const handleAddTask = () => {
      const newTaskItem = { id: Date.now(), text: newTask };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Handle editing a task
  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditTaskId(id);
      setEditTaskText(taskToEdit.text);
    }
  };

  // Handle saving an edited task
  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editTaskId ? { ...task, text: editTaskText } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditTaskText('');
  };
}
  return (
   <>
    
    
    
    <div className="App">
      <h1>Todo App</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {editTaskId === task.id ? (
              // Show input field and Update/Delete buttons for the task in edit mode
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <button onClick={() => handleUpdateTask(task.id)}>Update</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            ) : (
              // Show task text and Edit/Delete buttons for tasks not in edit mode
              <>
                <span>{task.text}</span>
                <button onClick={() => handleEditTask(task.id)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
   

   </>
  )


export default index
