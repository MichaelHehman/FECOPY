import React, { useMemo, useContext } from "react";  
import { Card, List, Typography, Progress, Tag, Button } from "antd";  
import styles from "./Todo.module.css";  
import { TaskContext } from "../../context/TaskContext";  
  
const { Title, Text } = Typography;  
  
const Todo = () => {  
  const { tasks, updateTaskStatus, deleteTask } = useContext(TaskContext);  
  
  // Dynamically calculate the progress percentage  
  const progressPercent = useMemo(() => {  
    const total = tasks.length;  
    const completedCount = tasks.filter(  
      (task) => task.status.toLowerCase() === "completed"  
    ).length;  
    return total > 0 ? Math.round((completedCount / total) * 100) : 0;  
  }, [tasks]);  
  
  // Function to mark a task as complete  
  const handleComplete = (taskId) => {  
    updateTaskStatus(taskId, "completed");  
  };  
  
  // Function to delete a task from the list  
  const handleDelete = (taskId) => {  
    deleteTask(taskId);  
  };  
  
  return (  
    <div className={styles.pageWrapper}>  
      {/* Progress Card */}  
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
              Task Progress  
            </Title>  
            <div className={styles.statusItem}>  
              <div  
                className={styles.statusDot}  
                style={{ background: "#52c41a" }}  
              />  
              <Text className={styles.statusText}>Completed</Text>  
              <Text className={styles.statusPercent}>{progressPercent}%</Text>  
            </div>  
          </div>  
        </div>  
      </Card>  
  
      {/* Task List */}  
      <Card title={<Title level={4}>Tasks</Title>} className={styles.taskCard}>  
        <List  
          itemLayout="vertical"  
          dataSource={tasks}  
          renderItem={(task) => (  
            <List.Item  
              key={task.id}  
              className={styles.taskItem}  
              actions={[  
                <Button  
                  onClick={() => handleComplete(task.id)}  
                  type="primary"  
                  key="complete"  
                >  
                  {task.status === "completed" ? "✓" : "Complete"}  
                </Button>,  
                <Button onClick={() => handleDelete(task.id)} danger key="delete">  
                  Delete  
                </Button>,  
              ]}  
            >  
              <List.Item.Meta  
                title={<span className={styles.taskTitle}>{task.title}</span>}  
                description={  
                  <Text className={styles.taskDescription}>  
                    {task.description}  
                  </Text>  
                }  
              />  
              <div className={styles.taskDetails}>  
                <Text className={styles.taskDate}>{task.date}</Text>  
                <Text>Done by: {task.doneBy}</Text>  
                <Tag  
                  color={  
                    task.status.toLowerCase() === "completed"  
                      ? "green"  
                      : "volcano"  
                  }  
                >  
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