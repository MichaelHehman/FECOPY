import React, { useState, useContext, useEffect } from 'react';  
import { Card, Form, Input, DatePicker, Button, message, Select } from 'antd';  
import dayjs from 'dayjs';  
import { TaskContext } from '../../context/TaskContext';  
import styles from './AddTask.module.css';  
  
const { Option } = Select;  
  
const AddTask = () => {  
  const { addTask } = useContext(TaskContext);  
  const [form] = Form.useForm();  
  const [assignees, setAssignees] = useState([]);  
  
  // Load both profile and household members for the dropdown  
  useEffect(() => {  
    // Get profile  
    const storedProfile = localStorage.getItem('profile');  
    let profileName = '';  
    if (storedProfile) {  
      try {  
        const parsedProfile = JSON.parse(storedProfile);  
        profileName = parsedProfile.name;  
      } catch (error) {  
        console.error('Error parsing profile:', error);  
      }  
    }  
  
    // Get household members  
    const storedMembers = localStorage.getItem('householdMembers');  
    let householdMembers = [];  
    if (storedMembers) {  
      try {  
        householdMembers = JSON.parse(storedMembers);  
      } catch (error) {  
        console.error('Error parsing household members:', error);  
      }  
    }  
  
    // Combine profile name and household member names into assignees array  
    const allAssignees = [  
      ...(profileName ? [{ id: 'profile', name: profileName }] : []), // Add profile if it exists  
      ...householdMembers // Add household members  
    ].filter(assignee => assignee.name); // Filter out any empty names  
  
    setAssignees(allAssignees);  
  }, []); // Empty dependency array means this effect runs once on mount  
  
  const onFinish = (values) => {  
    const newTask = {  
      id: Date.now(),  
      title: values.title,  
      description: values.description || '',  
      date: values.date.format('YYYY-MM-DD'),  
      doneBy: values.doneBy,  
      status: 'pending'  
    };  
  
    addTask(newTask);  
    message.success('Task added successfully!');  
    form.resetFields();  
  };  
  
  return (  
    <div className={styles.container}>  
      <Card className={styles.formCard}>  
        <h2 className={styles.title}>Add New Task</h2>  
        <Form  
          form={form}  
          layout="vertical"  
          onFinish={onFinish}  
          className={styles.form}  
        >  
          <Form.Item  
            label="Title"  
            name="title"  
            rules={[{ required: true, message: 'Please enter the title' }]}  
            className={styles.formItem}  
          >  
            <Input placeholder="Enter task title" />  
          </Form.Item>  
  
          <Form.Item  
            label="Description"  
            name="description"  
            className={styles.formItem}  
          >  
            <Input.TextArea placeholder="Enter task description" rows={4} />  
          </Form.Item>  
  
          <Form.Item  
            label="Date"  
            name="date"  
            rules={[{ required: true, message: 'Please select a date' }]}  
            className={styles.formItem}  
          >  
            <DatePicker className={styles.datePicker} />  
          </Form.Item>  
  
          <Form.Item  
            label="Done By"  
            name="doneBy"  
            rules={[{ required: true, message: 'Please select a person' }]}  
            className={styles.formItem}  
          >  
            <Select placeholder="Assign person responsible">  
              {assignees.map((person) => (  
                <Option key={person.id} value={person.name}>  
                  {person.name}  
                </Option>  
              ))}  
            </Select>  
          </Form.Item>  
  
          <Form.Item className={styles.formItem}>  
            <Button type="primary" htmlType="submit" className={styles.submitButton}>  
              Add Task  
            </Button>  
          </Form.Item>  
        </Form>  
      </Card>  
    </div>  
  );  
};  
  
export default AddTask;  