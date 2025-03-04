import React, { useState, useEffect, useMemo } from 'react';  
import { Card, List, Typography, Progress, Tag, DatePicker } from 'antd';  
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';  
import dayjs from 'dayjs';  
import styles from './Activities.module.css';  
  
const { Title, Text } = Typography;  
const { RangePicker } = DatePicker;  
  
const Activities = () => {  
  // State management  
  const [tasks, setTasks] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [dateRange, setDateRange] = useState([  
    dayjs().subtract(30, 'days'),  
    dayjs()  
  ]);  
  const [userProgress, setUserProgress] = useState({  
    done: 60,  
    notDone: 40,  
    userName: "Nhi"  
  });  
  
  // Fetch tasks (simulate API call)  
  useEffect(() => {  
    const fetchTasks = async () => {  
      try {  
        setLoading(true);  
        // Simulate API call  
        const mockTasks = [  
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
        ];  
          
        // Simulate network delay  
        await new Promise(resolve => setTimeout(resolve, 500));  
        setTasks(mockTasks);  
      } catch (error) {  
        console.error('Error fetching tasks:', error);  
      } finally {  
        setLoading(false);  
      }  
    };  
  
    fetchTasks();  
  }, []);  
  
  // Filter tasks based on date range  
  const filteredTasks = useMemo(() => {  
    return tasks.filter(task => {  
      const taskDate = dayjs(task.date);  
      return taskDate.isAfter(dateRange[0]) && taskDate.isBefore(dateRange[1]);  
    });  
  }, [tasks, dateRange]);  
  
  // Handle date range change  
  const handleDateRangeChange = (dates) => {  
    setDateRange(dates);  
  };  
  
  // Progress card component  
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
          renderItem={(task) => (  
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
            </List.Item>  
          )}  
        />  
      </div>  
    </div>  
  );  
};  
  
export default Activities;  