import { useState, useEffect } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5050/tasks/`)
    const data = await res.json();

    return data
  }

  // Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5050/tasks/${id}`)
    const data = await res.json();

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5050/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

  }

  // Delete a task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5050/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5050/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        (task.id === id) ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <div className="container">
      {/* The header */}
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

      {/* Add a task */}
      {showAddTask && <AddTask onAdd={addTask} />}

      {/* The list of tasks added */}
      {tasks.length > 0 ?
        (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) :
        ('No Tasks to Show')}

      {/* The footer */}
      <About />
      <Footer />
    </div>
  );
}

export default App;
