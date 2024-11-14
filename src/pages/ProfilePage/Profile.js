import React, { useState } from 'react';
import { Card, Avatar, Form, Input, Button, List } from 'antd';
import { UserOutlined, SettingOutlined, QuestionCircleOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import './Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });
  
  const [householdMembers, setHouseholdMembers] = useState([
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
    { name: "Bob Brown", email: "bob.brown@example.com" }
  ]);

  const [editing, setEditing] = useState(false);

  const handleFinish = (values) => {
    setUser(values);
    setEditing(false);
  };

  const addHouseholdMember = () => {
    const newUser = { name: "New User", email: "new.user@example.com" };
    setHouseholdMembers([...householdMembers, newUser]);
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
              <Button
                onClick={() => setEditing(false)}
              >
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
              <Card>
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
          onClick={addHouseholdMember}
        >
          Add User
        </Button>
      </div>

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
