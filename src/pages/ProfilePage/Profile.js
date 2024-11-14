import React, { useState } from 'react';
import { Card, Avatar, Form, Input, Button, List, Modal } from 'antd';
import { UserOutlined, SettingOutlined, QuestionCircleOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import './Profile.module.css';


const Profile = () => {
  const [user, setUser] = useState({
    name: "Dikshya Thapa",
    email: "dikshyathapa1414@gmail.com",
  });
  
  const [householdMembers, setHouseholdMembers] = useState([
    { name: "Shreya Thapa", email: "shreyathapa@gmail.com" },
    { name: "Alice Johnson", email: "alice.johnson@example.com" },

  ]);

  const [editing, setEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [isMemberModalVisible, setIsMemberModalVisible] = useState(false);

  const handleFinish = (values) => {
    setUser(values);
    setEditing(false);
  };

  const handleMemberFinish = (values) => {
    if (currentMember) {
      const updatedMembers = householdMembers.map(member => 
        member.email === currentMember.email ? values : member
      );
      setHouseholdMembers(updatedMembers);
    } else {
      setHouseholdMembers([...householdMembers, values]);
    }
    setIsMemberModalVisible(false);
    setCurrentMember(null);
  };

  const openMemberModal = (member = null) => {
    setCurrentMember(member);
    setIsMemberModalVisible(true);
  };

  const deleteHouseholdMember = (email) => {
    setHouseholdMembers(householdMembers.filter(member => member.email !== email));
  };

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-avatar">
          <Avatar size={100} icon={<UserOutlined />} />
        </div>
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>

        {editing ? (
          <Form
            name="profileForm"
            layout="vertical"
            initialValues={user}
            onFinish={handleFinish}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item className="form-buttons">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Button type="primary" onClick={() => setEditing(true)} className="edit-profile-btn">
            Edit Profile
          </Button>
        )}
      </Card>

      <div className="household-members">
        <h3>Household Members</h3>
        <List
          dataSource={householdMembers}
          renderItem={member => (
            <List.Item className="member-card">
              <Card
                actions={[
                  <Button onClick={() => openMemberModal(member)}>Edit</Button>,
                  <Button onClick={() => deleteHouseholdMember(member.email)}>Delete</Button>
                ]}
              >
                <Card.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={member.name}
                  description={member.email}
                />
              </Card>
            </List.Item>
          )}
        />
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          className="add-user-btn"
          onClick={() => openMemberModal()}
        >
          Add User
        </Button>
      </div>

      <Modal
        title={currentMember ? "Edit Household Member" : "Add Household Member"}
        visible={isMemberModalVisible}
        onCancel={() => setIsMemberModalVisible(false)}
        footer={null}
      >
        <Form
          name="memberForm"
          layout="vertical"
          initialValues={currentMember || { name: "", email: "" }}
          onFinish={handleMemberFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentMember ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="footer-buttons">
        <Button type="text" icon={<SettingOutlined />}>
          Settings
        </Button>
        <Button type="text" icon={<QuestionCircleOutlined />}>
          Help
        </Button>
        <Button type="text" icon={<LogoutOutlined />} className="logout-btn">
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
