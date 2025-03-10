import React, { useState, useEffect, useMemo } from 'react';  
import { Card, List, Typography, Progress, Tag, DatePicker, Button } from 'antd';  
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';  
import dayjs from 'dayjs';  
import styles from './Activities.module.css';  
  
const { Title, Text } = Typography;  
const { RangePicker } = DatePicker;  
  
const Activities = () => {  
  // Initial state with mock tasks (you can adjust as needed)  
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
  const [loading, setLoading] = useState(false);  
  const [dateRange, setDateRange] = useState([dayjs().subtract(30, 'days'), dayjs()]);  
  const [userProgress, setUserProgress] = useState({  
    done: 0,  
    notDone: 0,  
    userName: "Nhi"  
  });  
  
  // Calculate progress from tasks whenever tasks update  
  useEffect(() => {  
    const totalTasks = tasks.length;  
    const completedTasks = tasks.filter(task => task.status === 'completed').length;  
    const donePercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;  
    setUserProgress(prev => ({  
      ...prev,  
      done: donePercentage,  
      notDone: 100 - donePercentage  
    }));  
  }, [tasks]);  
  
  const handleDateRangeChange = values => {  
    setDateRange(values);  
  };  
  
  // Filter tasks based on the selected date range  
  const filteredTasks = useMemo(() => {  
    if (!dateRange[0] || !dateRange[1]) return tasks;  
    return tasks.filter(task => {  
      const taskDate = dayjs(task.date);  
      return taskDate.isAfter(dateRange[0]) && taskDate.isBefore(dateRange[1]);  
    });  
  }, [tasks, dateRange]);  
  
  // Mark task as complete  
  const handleComplete = taskId => {  
    setTasks(prevTasks =>  
      prevTasks.map(task =>   
        task.id === taskId ? { ...task, status: 'completed' } : task  
      )  
    );  
  };  
  
  // Delete a task  
  const handleDelete = taskId => {  
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));  
  };  
  
  const ProgressCard = () => (  
    <Card className={styles.progressCard}>  
      <div className={styles.progressWrapper}>  
        <Progress   
          type="circle"   
          percent={userProgress.done}   
          strokeColor={userProgress.done === 100 ? "#52c41a" : "#FFD700"}   
          trailColor="#F08080"   
          size={120}   
          className={styles.progressCircle}   
        />  
        <div>  
          <Title level={4} className={styles.progressTitle}>Progress</Title>  
          <div className={styles.progressStatus}>  
            <div className={styles.statusItem}>  
              <span   
                className={styles.statusDot}   
                style={{ backgroundColor: '#F08080' }}   
              />  
              <Text className={styles.statusText}>NOT done</Text>  
              <Text className={styles.statusPercent}>{userProgress.notDone}%</Text>  
            </div>  
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
          renderItem={task => (  
            <List.Item className={styles.taskItem}>  
              <Tag className={styles.taskTag} color={task.status === 'completed' ? 'green' : 'orange'}>  
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
              <div className={styles.taskActions}>  
                {task.status !== 'completed' && (  
                  <Button   
                    type="primary"   
                    onClick={() => handleComplete(task.id)}  
                    className={`${styles.taskButton} ${styles.completeButton}`}  
                  >  
                    Complete  
                  </Button>  
                )}  
                <Button   
                  danger   
                  onClick={() => handleDelete(task.id)}  
                  className={`${styles.taskButton} ${styles.deleteButton}`}  
                >  
                  Delete  
                </Button>  
              </div>  
            </List.Item>  
          )}  
        />  
      </div>  
    </div>  
  );  
};  
  
export default Activities;  