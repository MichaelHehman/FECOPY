import React, { useState, useContext } from 'react';  
import { Calendar, Badge, List, Typography, Card } from 'antd';  
import dayjs from 'dayjs';  
import { TaskContext } from '../../context/TaskContext';  
import styles from './TaskCalendar.module.css';  // You'll need to create this CSS module  
  
const { Title } = Typography;  
  
const TaskCalendar = () => {  
  const { tasks } = useContext(TaskContext);  
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));  
  
  // Render tasks in each calendar cell  
  const dateCellRender = (value) => {  
    const formattedDate = value.format('YYYY-MM-DD');  
    const dayTasks = tasks.filter(task => task.date === formattedDate);  
      
    return (  
      <ul className={styles.events}>  
        {dayTasks.map(task => (  
          <li key={task.id}>  
            <Badge   
              status={task.status === 'completed' ? 'success' : 'warning'}   
              text={task.title}  
              className={styles.badge}  
            />  
          </li>  
        ))}  
      </ul>  
    );  
  };  
  
  // Filter tasks for the selected date  
  const tasksForSelectedDate = tasks.filter(task => task.date === selectedDate);  
  
  return (  
    <div className={styles.calendarContainer}>  
      <Card className={styles.calendarCard}>  
        <Calendar  
          fullscreen={false}  
          dateCellRender={dateCellRender}  
          onSelect={(value) => setSelectedDate(value.format('YYYY-MM-DD'))}  
          className={styles.calendar}  
        />  
      </Card>  
  
      <Card className={styles.tasksCard}>  
        <Title level={4}>Tasks for {selectedDate}</Title>  
        <List   
          className={styles.taskList}  
          dataSource={tasksForSelectedDate}  
          renderItem={(task) => (  
            <List.Item key={task.id} className={styles.taskItem}>  
              <List.Item.Meta   
                title={task.title}  
                description={  
                  <div className={styles.taskDescription}>  
                    <span><strong>Assigned To:</strong> {task.doneBy}</span>  
                    <span><strong>Status:</strong> {task.status}</span>  
                  </div>  
                }  
              />  
            </List.Item>  
          )}  
          locale={{ emptyText: 'No tasks for this date' }}  
        />  
      </Card>  
    </div>  
  );  
};  
  
export default TaskCalendar;  