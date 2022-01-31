//import logo from './logo.svg';
//import './App.css';
// https://www.youtube.com/watch?v=w7ejDZ8SWv8&list=PLkRGfesjgGZhOuJOMp57axVdreOEhlcRH&index=3&t=5s

import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // FetchTasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    console.log(data);
    return data;
  };

  //FetchTask
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    console.log(data);
    return data;
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    console.log("delete", id);

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Add task
  const addTask = async (task) => {
    console.log(task);
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);

    /*
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
    */
    //... what does this mean
    /*
    1. Combine Arrays (Concatenate Arrays)
    var arr1 = ['two', 'three'];
    var arr2 = ['one', ...arr1, 'four', 'five'];

    arr2 = ["one", "two", "three", "four", "five"]

    2. Copying Arrays
    var arr = [1,2,3];
    var arr2 = [...arr];
    // arr2 = [1,2,3]

    
    */
  };

  // Toggle reminder

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    console.log("Toggle", id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
        <Route
          path="/"
          element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No tasks"
              )}
            </>
          }
        />
        <Route path="/about" element={<About/>} />
        <Route path='/task/:id' element={<TaskDetails/>} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
//  {showAddTask  &&  <AddTask onAdd={addTask} /> } , the && is used instead of ? : when you dont need an else
//     <h2>Only one parent can be returned {x ? 'yes' : 'no'} {1+1} </h2>

export default App;

/* ------------------------------------------------------------
 Class component, not so widely used anymore?
class App extends React.Component {
  render() {
    return <h1>Hello from a class</h1> 
  }
}

/* ------------------------------------------------------------
JSX - HTML/Javascript together - Expressions in JSX
As we can see above we can combine divs and javascript together.
The return statement can only return one parent class.
This can be a div or an empty bracket like so <></>.
The empty bracket will not be shown in the element tree
*/

/* ------------------------------------------------------------
<header className="App-header">
   <img src={logo} className="App-logo" alt="logo" />
   <p className="HelloWorld">
     Hello world!!!!
   </p>
   <a
     className="App-link"
     href="https://reactjs.org"
     target="_blank"
     rel="noopener noreferrer"
   >
     Learn React
   </a>
 </header>
 */
