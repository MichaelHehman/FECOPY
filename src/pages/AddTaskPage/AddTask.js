import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, Radio, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './AddTask.module.css';

const { TextArea } = Input;
const { Option } = Select;

const AddTask = () => {
  const [fileList, setFileList] = useState([]);
  const [members, setMembers] = useState([]);

  // Simulate API call to fetch team members
  useEffect(() => {
    setTimeout(() => {
      setMembers([
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        { id: '3', name: 'Alice Johnson' },
      ]);
    }, 1000);
  }, []);

  const handleSubmit = (values) => {
    console.log('Task created:', values);
    message.success('Task successfully created!');
  };

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

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
          <Select placeholder="Choose a team member" loading={members.length === 0}>
            {members.map((member) => (
              <Option key={member.id} value={member.id}>
                {member.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Repeat?"
          name="repeat"
          rules={[{ required: true, message: 'Please choose an option!' }]}
          className={styles.formItem}
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Note" name="note" className={styles.formItem}>
          <TextArea placeholder="Add any additional notes here" rows={4} />
        </Form.Item>

        <Form.Item label="Images" className={styles.uploadContainer}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // Prevent auto-upload
            className={styles.uploadButton}
          >
            {fileList.length < 5 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Add image</div>
              </div>
            )}
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