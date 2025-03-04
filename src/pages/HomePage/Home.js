import React, { useState, useEffect } from "react";  
import styles from "./Home.module.css";  
import { Col, Row } from "antd";  
import { Badge, Calendar } from 'antd';  
import dayjs from 'dayjs';  
import TaskList from "../../components/TaskList";  
  
const Home = () => {  
  // Initialize states with dayjs  
  const [value, setValue] = useState(() => dayjs());  
  const [selectedValue, setSelectedValue] = useState(() => dayjs());  
  const [tasks, setTasks] = useState({});  
  
  // Effect to fetch tasks when component mounts  
  useEffect(() => {  
    // Here you would typically fetch tasks from your API  
    // For now using mock data  
    const mockTasks = {  
      '2025-03-24': [  
        { id: 'task-1', content: 'Complete Project Presentation', status: 'pending' },  
        { id: 'task-2', content: 'Team Meeting at 2 PM', status: 'pending' },  
        { id: 'task-3', content: 'Review Code Changes', status: 'completed' },  
      ],  
      '2025-03-25': [  
        { id: 'task-4', content: 'Client Call', status: 'pending' },  
      ],  
      '2025-03-26': [  
        { id: 'task-5', content: 'Submit Weekly Report', status: 'pending' },  
        { id: 'task-6', content: 'Team Lunch', status: 'pending' },  
      ],  
    };  
    setTasks(mockTasks);  
  }, []);  
  
  // Handle date selection  
  const onSelect = (newValue) => {  
    setValue(newValue);  
    setSelectedValue(newValue);  
  };  
  
  // Handle panel changes (month/year navigation)  
  const onPanelChange = (newValue) => {  
    setValue(newValue);  
  };  
  
  // Get tasks for a specific date  
  const getListData = (date) => {  
    const dateStr = date.format('YYYY-MM-DD');  
    return tasks[dateStr] || [];  
  };  
  
  // Render date cell with badge if tasks exist  
  const dateCellRender = (current) => {  
    const dateStr = current.format('YYYY-MM-DD');  
    const hasTasks = tasks[dateStr] && tasks[dateStr].length > 0;  
      
    return hasTasks ? (  
      <Badge   
        count={tasks[dateStr].length}   
        color={tasks[dateStr].some(task => task.status === 'completed') ? 'green' : 'blue'}  
        size="small"  
      />  
    ) : null;  
  };  
  
  // Cell renderer for calendar  
  const cellRender = (current, info) => {  
    if (info.type === 'date') return dateCellRender(current);  
    return info.originNode;  
  };  
  
  return (  
    <Col className={styles.container}>  
      <Row className={styles.calendar}>  
        <Calendar   
          mode="month"   
          cellRender={cellRender}   
          value={value}   
          onSelect={onSelect}   
          onPanelChange={onPanelChange}   
          fullscreen={false}  
        />  
      </Row>  
      <Row className={styles.taskList}>  
        <div className={styles.taskListTitle}>  
          Tasks for {selectedValue.format('MMMM D, YYYY')}  
        </div>  
        <TaskList   
          taskList={getListData(selectedValue)}  
          onTaskUpdate={(updatedTask) => {  
            // Handle task updates here  
            console.log('Task updated:', updatedTask);  
          }}  
        />  
      </Row>  
    </Col>  
  );  
};  
  
export default Home;  