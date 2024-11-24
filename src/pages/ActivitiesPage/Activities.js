import React from 'react';
import { Card, List, Typography, Progress, Space, Tag } from 'antd';
import styles from './Activities.module.css';

const { Title, Text } = Typography;

const Activities = () => {
  const tasks = [
    {
      id: 10,
      title: 'Clean up Bath Tub',
      doneBy: 'Neha',
      date: '10/10/2024',
    },
    {
      id: 18,
      title: 'Take out the trash in kitchen',
      doneBy: 'Michael',
      date: '10/08/2024',
    },
    {
      id: 1,
      title: 'Buy new detergent for dishwasher',
      doneBy: 'Michael',
      date: '10/07/2024',
    },
  ];

  return (
    <div className={styles.container}>
      {/* Progress Section */}
      <Card className={styles.progressCard}>
        <div className={styles.progressWrapper}>
          <Progress
            type="circle"
            percent={60}
            strokeColor="#FFD700"
            trailColor="#F08080"
            size={120}
            className={styles.progressCircle}
          />
          <div>
            <Title level={4} className={styles.progressTitle}>Household Dashboard</Title>
            <div className={styles.progressStatus}>
              <div className={styles.statusItem}>
                <span className={styles.statusDot} style={{ backgroundColor: '#F08080' }}></span>
                <Text className={styles.statusText}>Not done</Text>
                <Text className={styles.statusPercent}>40%</Text>
              </div>
              <div className={styles.statusItem}>
                <span className={styles.statusDot} style={{ backgroundColor: '#FFD700' }}></span>
                <Text className={styles.statusText}>Done</Text>
                <Text className={styles.statusPercent}>60%</Text>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activities Feed Section */}
      <Title level={4} className={styles.feedTitle}>Activities Feed</Title>
      <Card className={styles.activitiesCard}>
        <List
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item className={styles.taskItem}>
              <div className={styles.taskHeader}>
                <Tag color="red" className={styles.taskTag}>Task #{task.id}</Tag>
              </div>
              <Title level={5} className={styles.taskTitle}>{task.title}</Title>
              <div className={styles.taskDetails}>
                <Text>
                  <span className={styles.detailLabel}>Done by: </span>
                  <span className={styles.detailValue}>{task.doneBy}</span>
                </Text>
                <Text>
                  <span className={styles.detailLabel}>Date: </span>
                  <span className={styles.detailValue}>{task.date}</span>
                </Text>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Activities;
