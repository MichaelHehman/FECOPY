import React, { useMemo } from "react";  
import { Card, List, Typography, Progress, Tag } from "antd";  
import styles from "./Todo.module.css";  
  
const { Title, Text } = Typography;  
  
const Todo = () => {  
  // Sample array of task objects  
  const tasks = [  
    { id: 1, title: "Clean up Bath Tub", description: "Buy new brush DON'T FORGET!!!", date: "10/10/2024", time: "10:30", status: "Not done" },  
    { id: 2, title: "Wash Dishes", description: "Clean up the drain filter", date: "10/10/2024", time: "15:30", status: "Not done" },  
    { id: 3, title: "Put laundry in the washing machine", description: "Clean up the closet - wash the bed sheet as well - bring the tide pods!!!", date: "10/10/2024", time: "20:30", status: "Not done" },  
    // Additional tasks can go here  
  ];  
  
  // Calculate progress percentage dynamically  
  const progressPercent = useMemo(() => {  
    const total = tasks.length;  
    const doneCount = tasks.filter(task => task.status.toLowerCase() === "done").length;  
    return total > 0 ? Math.round((doneCount / total) * 100) : 0;  
  }, [tasks]);  
  
  return (  
    <div className={styles.pageWrapper}>  
      {/* Dynamic Progress Section */}  
      <Card className={styles.progressCard}>  
        <div className={styles.progressWrapper}>  
          <Progress  
            type="circle"  
            percent={progressPercent}  
            strokeColor={progressPercent === 100 ? "#52c41a" : "#FFD700"}  
            trailColor="#F08080"  
            size={120}  
            className={styles.progressCircle}  
          />  
          <div>  
            <Title level={4} className={styles.progressTitle} style={{ color: '#A75E2A' }}>  
              Your Progress  
            </Title>  
            <div className={styles.progressStatus}>  
              <div className={styles.statusItem}>  
                <span className={styles.statusDot} style={{ backgroundColor: progressPercent === 100 ? "#52c41a" : "#F08080" }}></span>  
                <Text className={styles.statusText} style={{ color: '#A75E2A' }}>  
                  {progressPercent === 100 ? "Done" : "Not done"}  
                </Text>  
                <Text className={styles.statusPercent} style={{ color: '#A75E2A' }}>  
                  {progressPercent}%  
                </Text>  
              </div>  
            </div>  
          </div>  
        </div>  
      </Card>  
        
      {/* Task List Section */}  
      <Card  
        title={<Title level={4} style={{ color: '#A75E2A' }}>Tasks</Title>}  
        className={styles.taskCard}  
      >  
        <List  
          itemLayout="vertical"  
          dataSource={tasks}  
          renderItem={task => (  
            <List.Item key={task.id} className={styles.taskItem}>  
              <List.Item.Meta  
                title={<span className={styles.taskTitle}>{task.title}</span>}  
                description={<Text className={styles.taskDescription}>{task.description}</Text>}  
              />  
              <div className={styles.taskDetails}>  
                <Text className={styles.taskDate}>{task.date}</Text>  
                <Text className={styles.taskTime}>{task.time}</Text>  
                <Tag color={task.status.toLowerCase() === "not done" ? "volcano" : "green"}>  
                  {task.status}  
                </Tag>  
              </div>  
            </List.Item>  
          )}  
        />  
      </Card>  
    </div>  
  );  
};  
  
export default Todo;  