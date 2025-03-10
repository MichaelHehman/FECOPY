import React, { useState, useEffect, useContext } from 'react';  
import { Card, List, Typography, Progress, Tag, DatePicker, Button } from 'antd';  
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';  
import dayjs from 'dayjs';  
import styles from './Activities.module.css';  
import { TaskContext } from '../../context/TaskContext';  
  
const { Title, Text } = Typography;  
const { RangePicker } = DatePicker;  
  
const Activities = () => {  
  // Replace tasks state with context  
  const { tasks, updateTaskStatus, deleteTask } = useContext(TaskContext);  
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
  const filteredTasks = tasks.filter(task => {  
    if (!dateRange || !dateRange[0] || !dateRange[1]) return true;  
    const taskDate = dayjs(task.date);  
    return taskDate.isAfter(dateRange[0]) && taskDate.isBefore(dateRange[1]);  
  });  
  
  const handleComplete = async (taskId) => {  
    try {  
      setLoading(true);  
      await updateTaskStatus(taskId, 'completed');  
      setLoading(false);  
    } catch (error) {  
      console.error('Error completing task:', error);  
      setLoading(false);  
    }  
  };  
  
  const handleDelete = async (taskId) => {  
    try {  
      setLoading(true);  
      await deleteTask(taskId);  
      setLoading(false);  
    } catch (error) {  
      console.error('Error deleting task:', error);  
      setLoading(false);  
    }  
  };  
  
  return (  
    <div className={styles.container}>  
      <Card className={styles.progressCard}>  
        <Title level={4}>Task Progress</Title>  
        <Progress  
          type="circle"  
          percent={userProgress.done}  
          format={percent => `${percent}% Done`}  
          className={styles.progressCircle}  
        />  
        <Text className={styles.progressText}>  
          Tasks completed by {userProgress.userName}  
        </Text>  
      </Card>  
  
      <div className={styles.filterSection}>  
        <Title level={4}>Activity History</Title>  
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