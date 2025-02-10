import React from 'react';
import { Card, List, Typography, Progress, Tag } from 'antd';
import styles from './Todo.module.css';

const { Title, Text } = Typography;

const Todo = () => {
  // Array of task objects, each with a title, description, date, time, and status
  const tasks = [
    { id: 1, title: "Clean up Bath Tub", description: "Buy new brush DON'T FORGET!!!", date: "10/10/2024", time: "10:30", status: "Not done" },
    { id: 2, title: "Wash Dishes", description: "Clean up the drain filter", date: "10/10/2024", time: "15:30", status: "Not done" },
    { id: 3, title: "Put laundry in the washing machine", description: "Clean up the closet - wash the bed sheet as well - bring the tide pods!!!", date: "10/10/2024", time: "20:30", status: "Not done" },
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Progress Section */}
      <Card className={styles.progressCard}>
        <div className={styles.progressWrapper}>
          <Progress type="circle" percent={60} strokeColor="#FFD700" trailColor="#F08080" size={120} className={styles.progressCircle} />
          <div>
            <Title level={4} className={styles.progressTitle} style={{ color: '#A75E2A' }}>Nhi’s Progress</Title>
            <div className={styles.progressStatus}>
              <div className={styles.statusItem}>
                <span className={styles.statusDot} style={{ backgroundColor: '#F08080' }}></span>
                <Text className={styles.statusText} style={{ color: '#A75E2A' }}>NOT done</Text>
                <Text className={styles.statusPercent} style={{ color: '#A75E2A' }}>40%</Text>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusDot} style={{ backgroundColor: '#FFD700' }}></span>
                <Text className={styles.statusText} style={{ color: '#A75E2A' }}>Done</Text>
                <Text className={styles.statusPercent} style={{ color: '#A75E2A' }}>60%</Text>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Task List Section */}
      <div className={styles.taskListWrapper}>
        <List
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item className={styles.taskItem}>
              <Card title={<span className={styles.taskTitle} style={{ color: '#A75E2A' }}><Tag color="red">Task #{task.id}</Tag> {task.title}</span>} bordered={false} className={styles.taskCard} style={{ backgroundColor: '#FFF2DC', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <Text className={styles.taskDescription} style={{ color: '#A75E2A' }}>{task.description}</Text>
                <div className={styles.taskMeta}>
                  {task.date && <Tag className={styles.taskDate}>{task.date}</Tag>}
                  {task.time && <Tag className={styles.taskTime}>{task.time}</Tag>}
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>

    </div>
  );
};

export default Todo;
