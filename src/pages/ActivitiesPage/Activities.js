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
        <div className={styles.feedHeader} style={{ backgroundColor: '#A75E2A', color: 'white', padding: '10px', borderRadius: '8px 8px 0 0' }}> {/* Updated header style */}
          <Title level={4} className={styles.feedTitle} style={{ margin: 0, color: '#FFF8E7' }}>Activities Feed</Title> {/* Updated title color */}
        </div>
        <div className={styles.activitiesList}>
          <List
            dataSource={tasks}
            renderItem={(task) => (
              <List.Item className={styles.taskItem}>
                <div className={styles.taskHeader}>
                  <Tag className={styles.taskTag} style={{ backgroundColor: '#FF9999', color: 'white', border: 'none' }}>Task #{task.id}</Tag> {/* Updated tag style */}
                </div>
                <Title level={5} className={styles.taskTitle}>{task.title}</Title>
                <div className={styles.taskDetails}>
                  <Text>
                    <i>Done by</i> <span className={styles.detailValue}>{task.doneBy}</span>
                  </Text>
                  <Text>
                    <i>Date</i> <span className={styles.detailValue}>{task.date}</span>
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