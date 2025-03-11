import React, { useContext } from 'react';  
import { Card, Calendar, Badge, Typography, List } from 'antd';  
import dayjs from 'dayjs';  
import { TaskContext } from '../../context/TaskContext';  
import styles from './Home.module.css';  
  
const { Title, Text } = Typography;  
  
const Home = () => {  
  const { tasks } = useContext(TaskContext);  
  
  // Render tasks inside calendar cells  
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
            />  
          </li>  
        ))}  
      </ul>  
    );  
  };  
  
  // Today's tasks list  
  const today = dayjs().format('YYYY-MM-DD');  
  const todaysTasks = tasks.filter(task => task.date === today);  
  
  return (  
    <div className={styles.container}>  
      {/* Calendar Section */}  
      <Card className={styles.calendar}>  
        <Calendar   
          fullscreen={false}   
          dateCellRender={dateCellRender}  
        />  
      </Card>  
  
      {/* Today's Tasks Section */}  
      <Card className={styles.taskList}>  
        <Title level={4} className={styles.taskListTitle}>  
          Today's Tasks ({today})  
        </Title>  
        {todaysTasks.length > 0 ? (  
          <List  
            dataSource={todaysTasks}  
            renderItem={task => (  
              <List.Item key={task.id}>  
                <List.Item.Meta  
                  title={task.title}  
                  description={  
                    <div>  
                      <Text>Done by: {task.doneBy}</Text>  
                      <br />  
                      <Text>Status: </Text>  
                      <Badge   
                        status={task.status === 'completed' ? 'success' : 'warning'}   
                        text={task.status}   
                      />  
                    </div>  
                  }  
                />  
              </List.Item>  
            )}  
          />  
        ) : (  
          <Text>No tasks for today.</Text>  
        )}  
      </Card>  
    </div>  
  );  
};  
  
export default Home;  