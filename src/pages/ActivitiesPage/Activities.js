import React from 'react';
import { Card, List, Typography, Progress, Tag } from 'antd';
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
    {
      id: 1,
      title: 'Buy new detergent for dishwasher',
      doneBy: 'Michael',
      date: '10/07/2024',
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
            strokeColor="#FFD700" // Gold for "Done"
            trailColor="#F08080" // Light Coral for "Not Done"
            size={120}
            className={styles.progressCircle}
          />
          <div>
            <Title level={4} className={styles.progressTitle}>Nhi's Progress</Title> {/* Changed Title */}
            <div className={styles.progressStatus}>
              <div className={styles.statusItem}>
                <span className={styles.statusDot} style={{ backgroundColor: '#F08080' }}></span>
                <Text className={styles.statusText}>NOT done</Text>
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
      <div className={styles.feedHeader}>
        <Title level={4} className={styles.feedTitle}>Activities Feed</Title>
      </div>
      <div className={styles.activitiesList}>
        <List
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item className={styles.taskItem}>
              <Tag className={styles.taskTag}>Task #{task.id}</Tag>
              <Title level={5} className={styles.taskTitle}>{task.title}</Title>
              <div className={styles.taskDetails}>
                <Text>Done by <span className={styles.detailValue}>{task.doneBy}</span></Text>
                <Text>Date <span className={styles.detailValue}>{task.date}</span></Text>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Activities;