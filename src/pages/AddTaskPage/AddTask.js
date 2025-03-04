import React, { useState, useCallback } from 'react';  
import { Form, Input, DatePicker, Button, Select, Upload, message, Card } from 'antd';  
import { PlusOutlined, LoadingOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';  
import dayjs from 'dayjs';  
import styles from './AddTask.module.css';  
  
const { TextArea } = Input;  
const { Option } = Select;  
  
const AddTask = () => {  
  const [form] = Form.useForm();  
  const [loading, setLoading] = useState(false);  
  const [imageUrl, setImageUrl] = useState('');  
  
  // Mock team members - replace with API call in production  
  const teamMembers = [  
    { id: 1, name: 'Michael' },  
    { id: 2, name: 'Neha' },  
    { id: 3, name: 'Nhi' },  
  ];  
  
  // File upload configuration  
  const uploadConfig = {  
    name: 'file',  
    listType: 'picture-card',  
    className: styles.uploader,  
    showUploadList: false,  
    action: 'your-upload-endpoint', // Replace with your actual upload endpoint  
    beforeUpload: (file) => {  
      const isImage = file.type.startsWith('image/');  
      if (!isImage) {  
        message.error('You can only upload image files!');  
        return false;  
      }  
      const isLt2M = file.size / 1024 / 1024 < 2;  
      if (!isLt2M) {  
        message.error('Image must be smaller than 2MB!');  
        return false;  
      }  
      return true;  
    },  
    onChange: (info) => {  
      if (info.file.status === 'uploading') {  
        setLoading(true);  
        return;  
      }  
      if (info.file.status === 'done') {  
        setLoading(false);  
        setImageUrl(info.file.response.url);  
        message.success('Upload successful!');  
      }  
    },  
  };  
  
  const handleSubmit = useCallback(async (values) => {  
    try {  
      setLoading(true);  
      // Format the date  
      const formattedValues = {  
        ...values,  
        dueDate: values.dueDate?.format('YYYY-MM-DD'),  
        image: imageUrl,  
      };  
  
      // Simulate API call  
      await new Promise(resolve => setTimeout(resolve, 1000));  
      console.log('Task created:', formattedValues);  
        
      message.success('Task created successfully!');  
      form.resetFields();  
      setImageUrl('');  
    } catch (error) {  
      message.error('Failed to create task. Please try again.');  
      console.error('Error creating task:', error);  
    } finally {  
      setLoading(false);  
    }  
  }, [form, imageUrl]);  
  
  const uploadButton = (  
    <div>  
      {loading ? <LoadingOutlined /> : <PlusOutlined />}  
      <div className={styles.uploadText}>Upload</div>  
    </div>  
  );  
  
  return (  
    <div className={styles.container}>  
      <Card className={styles.formCard}>  
        <h2 className={styles.title}>Add New Task</h2>  
        <Form  
          form={form}  
          layout="vertical"  
          onFinish={handleSubmit}  
          className={styles.form}  
          initialValues={{  
            dueDate: dayjs(),  
          }}  
        >  
          <Form.Item  
            label="Task Name"  
            name="taskName"  
            rules={[  
              { required: true, message: 'Please enter a task name!' },  
              { min: 3, message: 'Task name must be at least 3 characters!' },  
            ]}  
            className={styles.formItem}  
          >  
            <Input   
              placeholder="Enter task name"  
              maxLength={100}  
              showCount  
            />  
          </Form.Item>  
  
          <Form.Item  
            label="Description"  
            name="description"  
            rules={[{ required: true, message: 'Please enter a description!' }]}  
            className={styles.formItem}  
          >  
            <TextArea  
              placeholder="Enter task description"  
              autoSize={{ minRows: 3, maxRows: 6 }}  
              maxLength={500}  
              showCount  
            />  
          </Form.Item>  
  
          <Form.Item  
            label="Assign To"  
            name="assignTo"  
            rules={[{ required: true, message: 'Please choose a team member!' }]}  
            className={styles.formItem}  
          >  
            <Select  
              placeholder="Select team member"  
              suffixIcon={<UserOutlined />}  
            >  
              {teamMembers.map(member => (  
                <Option key={member.id} value={member.id}>  
                  {member.name}  
                </Option>  
              ))}  
            </Select>  
          </Form.Item>  
  
          <Form.Item  
            label="Due Date"  
            name="dueDate"  
            rules={[{ required: true, message: 'Please select a due date!' }]}  
            className={styles.formItem}  
          >  
            <DatePicker  
              className={styles.datePicker}  
              format="YYYY-MM-DD"  
              suffixIcon={<CalendarOutlined />}  
              disabledDate={current => current && current < dayjs().startOf('day')}  
            />  
          </Form.Item>  
  
          <Form.Item  
            label="Task Image"  
            name="image"  
            className={styles.formItem}  
          >  
            <Upload {...uploadConfig}>  
              {imageUrl ? (  
                <img src={imageUrl} alt="task" className={styles.uploadedImage} />  
              ) : (  
                uploadButton  
              )}  
            </Upload>  
          </Form.Item>  
  
          <Form.Item className={styles.submitButton}>  
            <Button  
              type="primary"  
              htmlType="submit"  
              loading={loading}  
              block  
            >  
              Create Task  
            </Button>  
          </Form.Item>  
        </Form>  
      </Card>  
    </div>  
  );  
};  
  
export default AddTask;  