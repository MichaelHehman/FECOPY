import React, { createContext, useState } from 'react';  
   
export const TaskContext = createContext();  
  
export const TaskProvider = ({ children }) => {  
  // Initialize with your existing mock tasks to have some data to start with  
  const [tasks, setTasks] = useState([  
    {      
      id: 10,      
      title: 'Clean up Bath Tub',      
      doneBy: 'Neha',      
      date: '2024-10-10',      
      status: 'completed'      
    },  
    {      
      id: 18,      
      title: 'Take out the trash in kitchen',      
      doneBy: 'Michael',      
      date: '2024-10-08',      
      status: 'completed'      
    },  
    {      
      id: 1,      
      title: 'Buy new detergent for dishwasher',      
      doneBy: 'Michael',      
      date: '2024-10-07',      
      status: 'pending'      
    }  
  ]);  
  
  // Function to add a new task  
  const addTask = (task) => {  
    // Create a new task object with proper structure matching your existing tasks  
    const newTask = {  
      id: Date.now(),  
      title: task.title || task.name, // Handle both title and name properties  
      doneBy: task.assignTo, // Map from your form field  
      date: task.dueDate, // Map from your form field  
      status: 'pending',    
      description: task.description,  
      image: task.image  
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