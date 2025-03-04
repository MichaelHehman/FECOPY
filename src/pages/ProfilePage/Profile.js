import React, { useState, useCallback, useEffect } from "react";  
import {   
  Button, Card, List, Modal, Form, Input, Upload,   
  Avatar, Typography, message, Spin, Popconfirm, Tabs   
} from "antd";  
import {   
  UserOutlined, MailOutlined, CameraOutlined,   
  EditOutlined, DeleteOutlined, PlusOutlined   
} from '@ant-design/icons';  
import styles from "./Profile.module.css";  
  
const { Title, Text } = Typography;  
const { TabPane } = Tabs;  
  
const Profile = () => {  
  // State management  
  const [form] = Form.useForm();  
  const [loading, setLoading] = useState(false);  
  const [profileData, setProfileData] = useState({  
    name: "Dikshya Thapa",  
    email: "dikshya.thapa@example.com",  
    avatar: null,  
    preferences: {  
      notifications: true,  
      theme: 'light'  
    }  
  });  
    
  const [householdMembers, setHouseholdMembers] = useState([  
    { id: 1, name: "Shreya Thapa", email: "shreya.thapa@example.com", avatar: null },  
    { id: 2, name: "Shova Thapa", email: "shova.thapa@example.com", avatar: null },  
  ]);  
    
  const [modalState, setModalState] = useState({  
    type: null, // 'add' or 'edit'  
    visible: false,  
    selectedMember: null  
  });  
  
  // File upload configuration  
  const uploadProps = {  
    name: 'avatar',  
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
      if (info.file.status === 'done') {  
        message.success('Avatar uploaded successfully');  
        setProfileData(prev => ({  
          ...prev,  
          avatar: info.file.response.url  
        }));  
      } else if (info.file.status === 'error') {  
        message.error('Avatar upload failed');  
      }  
    }  
  };  
  
  // Modal handlers  
  const showModal = useCallback((type, member = null) => {  
    setModalState({  
      type,  
      visible: true,  
      selectedMember: member  
    });  
    if (member) {  
      form.setFieldsValue(member);  
    }  
  }, [form]);  
  
  const handleModalCancel = useCallback(() => {  
    setModalState({ type: null, visible: false, selectedMember: null });  
    form.resetFields();  
  }, [form]);  
  
  // Member management  
  const handleMemberSubmit = useCallback(async (values) => {  
    try {  
      setLoading(true);  
      const newMember = {  
        id: modalState.selectedMember?.id || Date.now(),  
        ...values,  
        avatar: null  
      };  
  
      if (modalState.type === 'edit') {  
        setHouseholdMembers(prev =>   
          prev.map(member =>   
            member.id === modalState.selectedMember.id ? newMember : member  
          )  
        );  
        message.success('Member updated successfully');  
      } else {  
        setHouseholdMembers(prev => [...prev, newMember]);  
        message.success('Member added successfully');  
      }  
  
      handleModalCancel();  
    } catch (error) {  
      message.error('Operation failed. Please try again.');  
      console.error('Member operation error:', error);  
    } finally {  
      setLoading(false);  
    }  
  }, [modalState, handleModalCancel]);  
  
  const handleDeleteMember = useCallback(async (memberId) => {  
    try {  
      setLoading(true);  
      setHouseholdMembers(prev =>   
        prev.filter(member => member.id !== memberId)  
      );  
      message.success('Member removed successfully');  
    } catch (error) {  
      message.error('Failed to remove member');  
      console.error('Delete error:', error);  
    } finally {  
      setLoading(false);  
    }  
  }, []);  
  
  // Profile update handler  
  const handleProfileUpdate = useCallback(async (values) => {  
    try {  
      setLoading(true);  
      setProfileData(prev => ({  
        ...prev,  
        ...values  
      }));  
      message.success('Profile updated successfully');  
    } catch (error) {  
      message.error('Failed to update profile');  
      console.error('Profile update error:', error);  
    } finally {  
      setLoading(false);  
    }  
  }, []);  
  
  return (  
    <div className={styles.profileContainer}>  
      <Spin spinning={loading}>  
        <Tabs defaultActiveKey="profile" className={styles.tabs}>  
          <TabPane tab="Profile" key="profile">  
            <Card className={styles.profileCard}>  
              <div className={styles.avatarSection}>  
                <Upload {...uploadProps}>  
                  <Avatar   
                    size={100}   
                    src={profileData.avatar}  
                    icon={<UserOutlined />}  
                    className={styles.avatar}  
                  >  
                    <div className={styles.avatarOverlay}>  
                      <CameraOutlined />  
                    </div>  
                  </Avatar>  
                </Upload>  
              </div>  
                
              <Form  
                layout="vertical"  
                initialValues={profileData}  
                onFinish={handleProfileUpdate}  
                className={styles.profileForm}  
              >  
                <Form.Item  
                  name="name"  
                  rules={[{ required: true, message: 'Name is required' }]}  
                >  
                  <Input prefix={<UserOutlined />} placeholder="Name" />  
                </Form.Item>  
                  
                <Form.Item  
                  name="email"  
                  rules={[  
                    { required: true, message: 'Email is required' },  
                    { type: 'email', message: 'Invalid email format' }  
                  ]}  
                >  
                  <Input prefix={<MailOutlined />} placeholder="Email" />  
                </Form.Item>  
  
                <Button type="primary" htmlType="submit" block>  
                  Update Profile  
                </Button>  
              </Form>  
            </Card>  
          </TabPane>  
  
          <TabPane tab="Household Members" key="household">  
            <div className={styles.householdSection}>  
              <div className={styles.sectionHeader}>  
                <Title level={4}>Household Members</Title>  
                <Button   
                  type="primary"   
                  icon={<PlusOutlined />}  
                  onClick={() => showModal('add')}  
                >  
                  Add Member  
                </Button>  
              </div>  
  
              <List  
                grid={{ gutter: 16, column: 2, xs: 1, sm: 2 }}  
                dataSource={householdMembers}  
                renderItem={(member) => (  
                  <List.Item>  
                    <Card  
                      className={styles.memberCard}  
                      actions={[  
                        <EditOutlined key="edit" onClick={() => showModal('edit', member)} />,  
                        <Popconfirm  
                          title="Are you sure you want to remove this member?"  
                          onConfirm={() => handleDeleteMember(member.id)}  
                          okText="Yes"  
                          cancelText="No"  
                        >  
                          <DeleteOutlined key="delete" />  
                        </Popconfirm>  
                      ]}  
                    >  
                      <Card.Meta  
                        avatar={  
                          <Avatar   
                            src={member.avatar}  
                            icon={<UserOutlined />}  
                          />  
                        }  
                        title={member.name}  
                        description={member.email}  
                      />  
                    </Card>  
                  </List.Item>  
                )}  
              />  
            </div>  
          </TabPane>  
        </Tabs>  
  
        <Modal  
          title={modalState.type === 'add' ? 'Add Member' : 'Edit Member'}  
          visible={modalState.visible}  
          onCancel={handleModalCancel}  
          footer={null}  
        >  
          <Form  
            form={form}  
            layout="vertical"  
            onFinish={handleMemberSubmit}  
          >  
            <Form.Item  
              name="name"  
              rules={[{ required: true, message: 'Name is required' }]}  
            >  
              <Input prefix={<UserOutlined />} placeholder="Name" />  
            </Form.Item>  
              
            <Form.Item  
              name="email"  
              rules={[  
                { required: true, message: 'Email is required' },  
                { type: 'email', message: 'Invalid email format' }  
              ]}  
            >  
              <Input prefix={<MailOutlined />} placeholder="Email" />  
            </Form.Item>  
  
            <Form.Item className={styles.modalFooter}>  
              <Button onClick={handleModalCancel} style={{ marginRight: 8 }}>  
                Cancel  
              </Button>  
              <Button type="primary" htmlType="submit">  
                {modalState.type === 'add' ? 'Add' : 'Save'}  
              </Button>  
            </Form.Item>  
          </Form>  
        </Modal>  
      </Spin>  
    </div>  
  );  
};  
  
export default Profile;  