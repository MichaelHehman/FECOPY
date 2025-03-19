import React, { createContext, useState, useEffect } from 'react';  
  
export const TaskContext = createContext();  
  
export const TaskProvider = ({ children }) => {  
  // On initial load, attempt to retrieve tasks from localStorage,  
  // otherwise use the default mock tasks.  
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [  
    {  
      id: 10,  
      title: 'Clean up Bath Tub',  
      doneBy: 'Neha',  
      description: 'Deep clean the bathtub with cleaning supplies under the sink',  
      date: '2024-10-10',  
      status: 'completed'  
    },  
    {  
      id: 18,  
      title: 'Take out the trash in kitchen',  
      description: 'Empty all trash bins and replace bags',  
      doneBy: 'Michael',  
      date: '2024-10-08',  
      status: 'completed'  
    },  
    {  
      id: 1,  
      title: 'Buy new detergent for dishwasher',  
      description: 'Get the Cascade Complete pods from Target',  
      doneBy: 'Michael',  
      date: '2024-10-07',  
      status: 'pending'  
    }  
  ];  
  
  const [tasks, setTasks] = useState(initialTasks);  
  
  // Save tasks to localStorage whenever the tasks state changes  
  useEffect(() => {  
    localStorage.setItem('tasks', JSON.stringify(tasks));  
  }, [tasks]);  
  
  // Function to add a new task  
  const addTask = (task) => {  
    const newTask = {  
      id: task.id,  
      title: task.title,  
      description: task.description || '',  
      doneBy: task.doneBy,  
      date: task.date,  
      status: task.status || 'pending'  
    };  
    setTasks(prevTasks => [...prevTasks, newTask]);  
  };  
  
  // Function to update a task status  
  const updateTaskStatus = (taskId, newStatus) => {  
    setTasks(prevTasks =>  
      prevTasks.map(task =>  
        task.id === taskId ? { ...task, status: newStatus } : task  
      )  
    );  
  };  
  
  // Function to delete a task  
  const deleteTask = (taskId) => {  
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));  
  };  
  
  // Function to get tasks by date range  
  const getTasksByDateRange = (startDate, endDate) => {  
    return tasks.filter(task => {  
      const taskDate = new Date(task.date);  
      return taskDate >= startDate && taskDate <= endDate;  
    });  
  };  
  
  return (  
    <TaskContext.Provider value={{  
      tasks,  
      addTask,  
      updateTaskStatus,  
      deleteTask,  
      getTasksByDateRange  
    }}>  
      {children}  
    </TaskContext.Provider>  
  );  
};  
  
export default TaskProvider;  