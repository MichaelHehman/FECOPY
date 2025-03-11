import React, { useState, useCallback, useContext } from 'react';  
import { Form, Input, DatePicker, Button, Select, Upload, message, Card } from 'antd';  
import { PlusOutlined, LoadingOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';  
import dayjs from 'dayjs';  
import styles from './AddTask.module.css';  
import { TaskContext } from '../../context/TaskContext';  
  
const { TextArea } = Input;  
const { Option } = Select;  
  
const AddTask = () => {  
  const [form] = Form.useForm();  
  const [loading, setLoading] = useState(false);  
  const [imageUrl, setImageUrl] = useState('');  
  const { addTask } = useContext(TaskContext);  
  
  const teamMembers = [  
    { id: 1, name: 'Michael' },  
    { id: 2, name: 'Neha' },  
    { id: 3, name: 'Nhi' },  
  ];  
  
  const uploadButton = (  
    <div>  
      {loading ? <LoadingOutlined /> : <PlusOutlined />}  
      <div style={{ marginTop: 8 }}>Upload</div>  
    </div>  
  );  
  
  const uploadConfig = {  
    name: 'file',  
    listType: 'picture-card',  
    className: styles.uploader,  
    showUploadList: false,  
    action: 'your-upload-endpoint',  
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
        
      // Find the team member name based on the selected ID  
      const selectedMember = teamMembers.find(member => member.id === values.assignTo);  
        
      const taskData = {  
        title: values.title,  
        description: values.description,  
        assignTo: selectedMember.name, // Use the name instead of ID  
        dueDate: values.dueDate.format('YYYY-MM-DD'),  
        image: imageUrl  
      };  
  
      addTask(taskData);  
        
      // Reset form and show success message  
      form.resetFields();  
      setImageUrl('');  
      message.success('Task created successfully!');  
    } catch (error) {  
      console.error('Error creating task:', error);  
      message.error('Failed to create task');  
    } finally {  
      setLoading(false);  
    }  
  }, [form, imageUrl, addTask, teamMembers]);  
  
  return (  
    <div className={styles.container}>  
      <Card className={styles.card}>  
        <Form  
          form={form}  
          onFinish={handleSubmit}  
          layout="vertical"  
          className={styles.form}  
        >  
          <Form.Item  
            label="Task Title"  
            name="title"  
            rules={[{ required: true, message: 'Please enter a task title!' }]}  
            className={styles.formItem}  
          >  
            <Input placeholder="Enter task title" />  
          </Form.Item>  
  
          <Form.Item  
            label="Description"  
            name="description"  
            rules={[{ required: true, message: 'Please enter a task description!' }]}  
            className={styles.formItem}  
          >  
            <TextArea  
              placeholder="Enter task description"  
              autoSize={{ minRows: 3, maxRows: 5 }}  
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