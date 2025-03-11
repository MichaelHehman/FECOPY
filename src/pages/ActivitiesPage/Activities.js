import React, { useMemo, useContext } from 'react';  
import { Card, List, Progress, Tag, Typography } from 'antd';  
import { TaskContext } from '../../context/TaskContext';  
import styles from './Activities.module.css';  
  
const { Title } = Typography;  
  
const Activities = () => {  
  const { tasks } = useContext(TaskContext);  
  
  // Calculate overall progress percentage for all tasks  
  const progressPercent = useMemo(() => {  
    const total = tasks.length;  
    const doneCount = tasks.filter(task => task.status.toLowerCase() === 'completed').length;  
    return total > 0 ? Math.round((doneCount / total) * 100) : 0;  
  }, [tasks]);  
  
  // Sort tasks by date (most recent first)  
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.date) - new Date(a.date));  
  
  return (  
    <div className={styles.activitiesContainer}>  
      {/* Progress Wheel Section for Household Tasks */}  
      <Card className={styles.progressCard}>  
        <div className={styles.progressWrapper}>  
          <Progress  
            type="circle"  
            percent={progressPercent}  
            strokeColor={progressPercent === 100 ? "#52c41a" : "#FFD700"}  
            className={styles.progressCircle}  
          />  
          <div className={styles.progressStatus}>  
            <Title level={4} className={styles.progressTitle}>  
              Household Tasks Progress  
            </Title>  
            <div className={styles.statusItem}>  
              <div className={styles.statusDot} style={{ background: "#52c41a" }} />  
              <span className={styles.statusText}>Completed {progressPercent}%</span>  
            </div>  
          </div>  
        </div>  
      </Card>  
  
      {/* Recent Activities Section */}  
      <div className={styles.tasksSection}>  
        <Card className={styles.tasksCard}>  
          <Title level={4}>Recent Activities</Title>  
          <List  
            className={styles.taskList}  
            itemLayout="horizontal"  
            dataSource={sortedTasks}  
            renderItem={task => (  
              <List.Item>  
                <List.Item.Meta  
                  title={task.title}  
                  description={  
                    <div className={styles.taskDescription}>  
                      <span>Done by: {task.doneBy}</span>  
                      <span>Date: {task.date}</span>  
                      <Tag color={task.status.toLowerCase() === 'completed' ? 'green' : 'volcano'}>  
                        {task.status}  
                      </Tag>  
                    </div>  
                  }  
                />  
              </List.Item>  
            )}  
          />  
        </Card>  
      </div>  
    </div>  
  );  
};  
  
export default Activities;  