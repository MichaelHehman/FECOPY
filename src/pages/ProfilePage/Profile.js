import React, { useState, useEffect } from 'react';  
import { Card, Form, Input, Button, message, Tabs, Avatar } from 'antd';  
import { UserOutlined } from '@ant-design/icons';  
import styles from './Profile.module.css';  
  
const { TabPane } = Tabs;  
  
const Profile = () => {  
  // State for profile and household members  
  const [profile, setProfile] = useState({  
    name: '',  
    email: ''  
  });  
  
  const [householdMembers, setHouseholdMembers] = useState([]);  
  const [form] = Form.useForm();  
  const [memberForm] = Form.useForm();  
  
  // Load saved data on component mount  
  useEffect(() => {  
    const storedProfile = localStorage.getItem('profile');  
    if (storedProfile) {  
      const parsedProfile = JSON.parse(storedProfile);  
      setProfile(parsedProfile);  
      form.setFieldsValue(parsedProfile);  
    }  
  
    const storedMembers = localStorage.getItem('householdMembers');  
    if (storedMembers) {  
      const parsedMembers = JSON.parse(storedMembers);  
      setHouseholdMembers(parsedMembers);  
    }  
  }, [form]);  
  
  const onProfileFinish = (values) => {  
    const updatedProfile = {  
      name: values.name,  
      email: values.email  
    };  
    setProfile(updatedProfile);  
    localStorage.setItem('profile', JSON.stringify(updatedProfile));  
    message.success('Profile updated successfully!');  
  };  
  
  const onMemberFinish = (values) => {  
    if (!values.memberName || !values.memberEmail) {  
      message.error('Please enter both name and email');  
      return;  
    }  
  
    const newMember = {  
      id: Date.now(),  
      name: values.memberName,  
      email: values.memberEmail  
    };  
  
    const updatedMembers = [...householdMembers, newMember];  
    setHouseholdMembers(updatedMembers);  
    localStorage.setItem('householdMembers', JSON.stringify(updatedMembers));  
    message.success('Household member added successfully!');  
    memberForm.resetFields();  
  };  
  
  const removeMember = (memberId) => {  
    const updatedMembers = householdMembers.filter(member => member.id !== memberId);  
    setHouseholdMembers(updatedMembers);  
    localStorage.setItem('householdMembers', JSON.stringify(updatedMembers));  
    message.success('Household member removed successfully!');  
  };  
  
  return (  
    <div className={styles.profileContainer}>  
      <Tabs className={styles.tabs}>  
        <TabPane tab="Profile" key="1">  
          <Card className={styles.profileCard}>  
            <div className={styles.avatarSection}>  
              <div className={styles.avatar}>  
                <Avatar size={100} icon={<UserOutlined />} />  
                <div className={styles.avatarOverlay}>  
                  <UserOutlined style={{ color: 'white', fontSize: '24px' }} />  
                </div>  
              </div>  
            </div>  
            <Form  
              form={form}  
              layout="vertical"  
              onFinish={onProfileFinish}  
              className={styles.profileForm}  
              initialValues={profile}  
            >  
              <Form.Item  
                label="Name"  
                name="name"  
                rules={[{ required: true, message: 'Please enter your name' }]}  
              >  
                <Input placeholder="Enter your name" />  
              </Form.Item>  
              <Form.Item  
                label="Email"  
                name="email"  
                rules={[  
                  { required: true, message: 'Please enter your email' },  
                  { type: 'email', message: 'Please enter a valid email' }  
                ]}  
              >  
                <Input placeholder="Enter your email" />  
              </Form.Item>  
              <Form.Item>  
                <Button type="primary" htmlType="submit">  
                  Update Profile  
                </Button>  
              </Form.Item>  
            </Form>  
          </Card>  
        </TabPane>  
  
        <TabPane tab="Household Members" key="2">  
          <div className={styles.householdSection}>  
            <div className={styles.sectionHeader}>  
              <h2>Household Members</h2>  
              <Form  
                form={memberForm}  
                layout="vertical"  
                onFinish={onMemberFinish}  
              >  
                <Form.Item  
                  name="memberName"  
                  rules={[{ required: true, message: 'Please enter member name' }]}  
                >  
                  <Input placeholder="Enter member name" />  
                </Form.Item>  
                <Form.Item  
                  name="memberEmail"  
                  rules={[  
                    { required: true, message: 'Please enter member email' },  
                    { type: 'email', message: 'Please enter a valid email' }  
                  ]}  
                >  
                  <Input placeholder="Enter member email" />  
                </Form.Item>  
                <Form.Item>  
                  <Button type="primary" htmlType="submit">  
                    Add Member  
                  </Button>  
                </Form.Item>  
              </Form>  
            </div>  
  
            {householdMembers.map((member) => (  
              <Card key={member.id} className={styles.memberCard}>  
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>  
                  <div>  
                    <h3>{member.name}</h3>  
                    <p>{member.email}</p>  
                  </div>  
                  <Button danger onClick={() => removeMember(member.id)}>  
                    Remove  
                  </Button>  
                </div>  
              </Card>  
            ))}  
          </div>  
        </TabPane>  
      </Tabs>  
    </div>  
  );  
};  
  
export default Profile;  