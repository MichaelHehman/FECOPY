import React, { useState, useContext } from 'react';  
import { Card, Form, Input, DatePicker, Button, message, Select } from 'antd';  
import dayjs from 'dayjs';  
import { TaskContext } from '../../context/TaskContext';  
import styles from './AddTask.module.css';  
  
const { Option } = Select;  
const ASSIGNEES = ['Michael', 'Neha'];  
  
const AddTask = () => {  
  const { addTask } = useContext(TaskContext);  
  const [form] = Form.useForm();  
  
  const onFinish = (values) => {  
    const newTask = {  
      id: Date.now(), // simple id generation for now  
      title: values.title,  
      description: values.description || '',  
      date: values.date.format('YYYY-MM-DD'),  
      doneBy: values.doneBy || '',  
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
              {ASSIGNEES.map(person => (  
                <Option key={person} value={person}>  
                  {person}  
                </Option>  
              ))}  
            </Select>  
          </Form.Item>    
          {/* The image uploader has been removed */}    
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