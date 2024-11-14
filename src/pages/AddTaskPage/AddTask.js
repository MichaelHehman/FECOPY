// AddTask.js
import React from 'react';
import { Form, Input, DatePicker, Button, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './AddTask.module.css';

const { TextArea } = Input;
const { Option } = Select;

const AddTask = () => {
  const handleSubmit = (values) => {
    console.log('Task created:', values);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Task</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Task Name"
          name="taskName"
          rules={[{ required: true, message: 'Please enter a task name!' }]}
          className={styles.formItem}
        >
          <Input placeholder="Enter task name" />
        </Form.Item>

        <Form.Item
          label="Assign To"
          name="assignTo"
          rules={[{ required: true, message: 'Please choose a member!' }]}
          className={styles.formItem}
        >
          <Select placeholder="Choose 1 member">
            <Option value="member1">Member 1</Option>
            <Option value="member2">Member 2</Option>
            {/* Add more members as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          label="From"
          name="fromDate"
          rules={[{ required: true, message: 'Please select a start date!' }]}
          className={styles.formItem}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="To"
          name="toDate"
          rules={[{ required: true, message: 'Please select an end date!' }]}
          className={styles.formItem}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Note" name="note" className={styles.formItem}>
          <TextArea placeholder="Add any additional notes here" rows={4} />
        </Form.Item>

        <Form.Item label="Images" className={styles.uploadContainer}>
          <Upload listType="picture-card" className={styles.uploadButton}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Add image</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.submitButton}>
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTask;
