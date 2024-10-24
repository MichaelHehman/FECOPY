import React, { useState } from "react";
import styles from "./Home.module.css";
import { Alert, Col, Row } from "antd";
import { Badge, Calendar } from 'antd';
import dayjs from 'dayjs';
import TaskList from "../../components/TaskList";

const Home = () => {
  const [value, setValue] = useState(() => dayjs(new Date()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(new Date()));
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const getListData = (dateValue) => {
    let listData = [];
    switch (dateValue.date()) {
      case 24:
        listData = [
          {
            id: 'task-1',
            content: 'Task 1',
          },
          {
            id: 'task-2',
            content: 'Task 2',
          },
          {
            id: 'task-3',
            content: 'Task 3',
          },
          {
            id: 'task-4',
            content: 'Task 4',
          }
        ];
        break;
      case 25:
        listData = [
          {
            id: 'task-1',
            content: 'Task 1',
          }
        ];
        break;
      case 26:
        listData = [
          {
            id: 'task-1',
            content: 'Task 1',
          },
          {
            id: 'task-2',
            content: 'Task 2',
          },
          {
            id: 'task-3',
            content: 'Task 3',
          },
          {
            id: 'task-4',
            content: 'Task 4',
          },
          {
            id: 'task-5',
            content: 'Task 5',
          },
          {
            id: 'task-6',
            content: 'Task 6',
          }
        ];
        break;
      default:
    }
    return listData || [];
  };

  const dateCellRender = (value) => {
    return (
      <Badge key="badge" color="yellow" />
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <Col className={styles.container}>
      <Row className={styles.calendar}>
        <Calendar mode="month" cellRender={cellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange} fullscreen={false} />
      </Row>
      <Row className={styles.taskList}>
        <div className={styles.taskListTitle}>TASK</div>
        <TaskList taskList={getListData(selectedValue)} />
      </Row>
    </Col>
  )
};

export default Home;