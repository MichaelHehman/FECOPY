import React, { useState, useEffect, useMemo, useContext } from 'react';  
import { Card, List, Typography, Progress, Tag, DatePicker, Button } from 'antd';  
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';  
import dayjs from 'dayjs';  
import styles from './Activities.module.css';  
import { TaskContext } from '../../context/TaskContext'; // Add this import  
  
const { Title, Text } = Typography;  
const { RangePicker } = DatePicker;  
  
const Activities = () => {  
  // Use TaskContext instead of local state for tasks  
  const { tasks, updateTask, deleteTask } = useContext(TaskContext);  
  const [loading, setLoading] = useState(false);  
  const [dateRange, setDateRange] = useState([  
    dayjs().subtract(30, 'days'),  
    dayjs()  
  ]);  
  const [userProgress, setUserProgress] = useState({  
    done: 60,  
    notDone: 40,  
    userName: "Nhi"  
  });  
  
  // Calculate progress whenever tasks change  
  useEffect(() => {  
    const completedTasks = tasks.filter(task => task.status === 'completed').length;  
    const totalTasks = tasks.length;  
    const donePercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;  
      
    setUserProgress(prev => ({  
      ...prev,  
      done: donePercentage,  
      notDone: 100 - donePercentage  
    }));  
  }, [tasks]);  
  
  const handleDateRangeChange = (dates) => {  
    setDateRange(dates);  
  };  
  
  // Filter tasks based on date range  
  const filteredTasks = useMemo(() => {  
    if (!dateRange[0] || !dateRange[1]) return tasks;  
      
    return tasks.filter(task => {  
      const taskDate = dayjs(task.date);  
      return taskDate.isAfter(dateRange[0]) && taskDate.isBefore(dateRange[1]);  
    });  
  }, [tasks, dateRange]);  
  
  // Handle completing a task  
  const handleComplete = (taskId) => {  
    updateTask(taskId, { status: 'completed' });  
  };  
  
  // Handle deleting a task  
  const handleDelete = (taskId) => {  
    deleteTask(taskId);  
  };  
  
  const ProgressCard = () => (  
    <Card className={styles.progressCard}>  
      <div className={styles.progressWrapper}>  
        <Progress  
          type="circle"  
          percent={userProgress.done}  
          strokeColor="#FFD700"  
          trailColor="#F08080"  
          size={120}  
          className={styles.progressCircle}  
        />  
        <div>  
          <Title level={4} className={styles.progressTitle}>  
            {userProgress.userName}'s Progress  
          </Title>  
          <div className={styles.progressStatus}>  
            <div className={styles.statusItem}>  
              <span  
                className={styles.statusDot}  
                style={{ backgroundColor: '#FFD700' }}  
              />  
              <Text className={styles.statusText}>Done</Text>  
              <Text className={styles.statusPercent}>{userProgress.done}%</Text>  
            </div>  
          </div>  
        </div>  
      </div>  
    </Card>  
  );  
  
  return (  
    <div className={styles.container}>  
      <ProgressCard />  
        
      <div className={styles.feedHeader}>  
        <Title level={4} className={styles.feedTitle}>Activities Feed</Title>  
        <RangePicker  
          value={dateRange}  
          onChange={handleDateRangeChange}  
          className={styles.datePicker}  
        />  
      </div>  
  
      <div className={styles.activitiesList}>  
        <List  
          loading={loading}  
          dataSource={filteredTasks}  
          renderItem={(task) => (  
            <List.Item   
              className={styles.taskItem}  
              actions={[  
                <Button  
                  key="complete"  
                  type="primary"  
                  onClick={() => handleComplete(task.id)}  
                  disabled={task.status === 'completed'}  
                >  
                  {task.status === 'completed' ? '✓' : 'Complete'}  
                </Button>,  
                <Button  
                  key="delete"  
                  type="primary"  
                  danger  
                  onClick={() => handleDelete(task.id)}  
                >  
                  Delete  
                </Button>  
              ]}  
            >  
              <Tag   
                className={styles.taskTag}   
                color={task.status === 'completed' ? 'green' : 'orange'}  
              >  
                Task #{task.id}  
              </Tag>  
              <Title level={5} className={styles.taskTitle}>{task.title}</Title>  
              <div className={styles.taskDetails}>  
                <Text>  
                  <UserOutlined className={styles.icon} />  
                  Done by <span className={styles.detailValue}>{task.doneBy}</span>  
                </Text>  
                <Text>  
                  <CalendarOutlined className={styles.icon} />  
                  <span className={styles.detailValue}>  
                    {dayjs(task.date).format('MMM DD, YYYY')}  
                  </span>  
                </Text>  
              </div>  
            </List.Item>  
          )}  
        />  
      </div>  
    </div>  
  );  
};  
  
export default Activities;  