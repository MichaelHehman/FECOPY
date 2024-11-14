import React from 'react';
import { Card } from 'antd';
import { Flex, Progress } from 'antd';

const Todo = () => {
  // Array of task objects, each with a title and description
  const tasks = [
    { title: "Task 1", description: "Description for Task 1" },
    { title: "Task 2", description: "Description for Task 2" },
    { title: "Task 3", description: "Description for Task 3" },
    { title: "Task 4", description: "Description for Task 4" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {tasks.map((task, index) => (
          <Card key={index} title={task.title} bordered={false} style={{ width: 300 }}>
            <p>{task.description}</p>
          </Card>
        ))}
      </div>
  );
};

export default Todo;
